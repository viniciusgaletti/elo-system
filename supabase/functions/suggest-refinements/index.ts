import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'

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
    const { processName, steps, solutions, measuredResults, existingRefinements } = await req.json()
    const apiKey = Deno.env.get('GEMINI_API_KEY')

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Chave de API nao configurada. Contate o administrador.' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    const prompt = `Você é um consultor especialista em otimização de IA (Método ELO).
Processo: ${processName}

Resultados Medidos Atuais:
${JSON.stringify(measuredResults)}

Soluções Planejadas:
${JSON.stringify(solutions)}

Refinamentos Já Feitos:
${JSON.stringify(existingRefinements)}

Com base nos resultados medidos (especialmente os que "Nao esta funcionando" ou "Funcionando parcialmente"), sugira de 2 a 3 próximos ajustes práticos para melhorar a implementação de IA. Se tudo estiver funcionando bem, sugira passos para escala sustentável.
Retorne APENAS um objeto JSON válido estritamente com a seguinte estrutura e sem markdown formatting:
{
  "suggestions": [
    {
      "title": "Título curto",
      "explanation": "Por que e como aplicar",
      "priority": "Alta prioridade" | "Media prioridade" | "Baixa prioridade"
    }
  ]
}`

    let response: Response

    try {
      response = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        },
      )
    } catch (err) {
      console.error('Fetch API error:', err)
      return new Response(JSON.stringify({ error: 'Erro ao chamar a IA. Tente novamente.' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!response.ok) {
      const errBody = await response.text()
      console.error(`AI Service Error (Status ${response.status}):`, errBody)
      return new Response(JSON.stringify({ error: 'Erro ao chamar a IA. Tente novamente.' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let result
    try {
      const data = await response.json()
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

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
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
