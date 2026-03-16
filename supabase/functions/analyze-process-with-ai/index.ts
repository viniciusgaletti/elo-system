import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { ELO_SYSTEM_PROMPT } from '../_shared/elo-system-prompt.ts'

async function fetchWithRetry(url: string, options: any, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options)
    if (res.status === 503 && i < retries - 1) {
      await new Promise((r) => setTimeout(r, Math.pow(2, i + 1) * 1000))
      continue
    }
    return res
  }
  return fetch(url, options)
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { steps, processName } = await req.json()
    const apiKey = Deno.env.get('OPENAI_API_KEY')

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Chave de API nao configurada. Contate o administrador.' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    const prompt = `Você é um consultor de IA aplicando o Método ELO.
Nome do Processo: ${processName}
Etapas do Processo: 
${steps.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}

Analise as etapas fornecidas para identificar alavancas de eficiência usando IA.
Retorne APENAS um objeto JSON válido estritamente com a seguinte estrutura e sem markdown:
{
  "stepAnalysis": [
    {
      "step": "nome da etapa igual ao fornecido",
      "verdict": "Candidata a IA" | "Possível candidata" | "Não se aplica",
      "justification": "justificativa em português (1 parágrafo)",
      "criteria": ["Operacional" | "Repetitivo" | "Lento"] // inclua apenas os critérios que se aplicam
    }
  ],
  "summary": {
    "overallSummary": "Resumo geral da análise...",
    "recommendedStep": "A etapa que mais se beneficia de IA"
  }
}`

    let response: Response

    try {
      response = await fetchWithRetry(
        `https://api.openai.com/v1/chat/completions`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: ELO_SYSTEM_PROMPT },
              { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' }
          }),
        },
      )
    } catch (err: any) {
      console.error('Fetch API error:', err)
      return new Response(JSON.stringify({ error: 'Erro de conexão ao chamar a IA. Tente novamente.', detail: err?.message }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!response.ok) {
      const errBody = await response.text()
      console.error(`AI Service Error (Status ${response.status}):`, errBody)
      
      let parsedError = errBody;
      try {
        const jsonBody = JSON.parse(errBody);
        if (jsonBody.error && jsonBody.error.message) {
          parsedError = jsonBody.error.message;
        }
      } catch (e) {}

      return new Response(JSON.stringify({ error: `Erro ${response.status}: ${parsedError}`, detail: errBody }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let result
    try {
      const data = await response.json()
      let text = data.choices?.[0]?.message?.content || ''

      text = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      result = JSON.parse(text)
    } catch (parseError) {
      console.error('Response parsing error:', parseError)
      return new Response(
        JSON.stringify({ error: 'A IA retornou um formato inesperado. Tente novamente.' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
