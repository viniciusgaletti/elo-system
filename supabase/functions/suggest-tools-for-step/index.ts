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
    const { stepName, stepJustification, criteria, processName } = await req.json()
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

    const prompt = `Você é um consultor especialista em automação com Inteligência Artificial, focado em gerar valor financeiro real para empresas.
Processo: ${processName}
Etapa Analisada: ${stepName}
Critérios da Etapa: ${criteria.join(', ')}
Justificativa da IA Anterior: ${stepJustification}

Gere uma solução completa de IA para esta etapa. Retorne APENAS um objeto JSON válido com a seguinte estrutura (sem markdown):
{
  "solution": "Descrição detalhada de como a IA vai atuar nesta etapa para resolver o problema identificado. Seja específico e prático (2-3 frases).",
  "tools": [
    {
      "name": "Nome real da ferramenta do mercado",
      "description": "O que a ferramenta faz (1 frase)",
      "useCase": "Como usar especificamente nesta etapa do processo do cliente",
      "category": "Geracao de Texto"
    }
  ],
  "expectedTimeGain": "Estimativa de economia de tempo por semana ou mês (ex: 8h por semana)",
  "expectedQualityGain": "Ganho de qualidade concreto (ex: Eliminação de 95% dos erros manuais)",
  "expectedResult": "Resultado financeiro estimado ou ganho tangível para o cliente (ex: Economia de R$ 3.000/mês em horas de trabalho)",
  "priority": "Alta"
}

REGRAS:
- Sugira no máximo 3 ferramentas, escolhendo as MELHORES e mais práticas do mercado atual.
- A categoria de cada ferramenta deve ser uma destas: "Geracao de Texto", "Automacao", "Analise de Dados", "Imagem", "Audio", "Outro".
- A prioridade deve ser "Alta", "Media" ou "Baixa" com base no impacto potencial.
- Foque em ganhos financeiros reais e mensuráveis no campo expectedResult.
- Seja específico ao contexto do processo "${processName}".`

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
      const geminiErrorBody = await response.text()
      console.error(`AI Service Error (Status ${response.status}):`, geminiErrorBody)
      
      let parsedError = geminiErrorBody;
      try {
        const jsonBody = JSON.parse(geminiErrorBody);
        if (jsonBody.error && jsonBody.error.message) {
          parsedError = jsonBody.error.message;
        }
      } catch (e) {}

      return new Response(
        JSON.stringify({
          error: `Erro ${response.status}: ${parsedError}`,
          detail: geminiErrorBody,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
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
