import { supabase } from '@/lib/supabase/client'

export interface StepAnalysis {
  step: string
  verdict: 'Candidata a IA' | 'Possível candidata' | 'Não se aplica'
  justification: string
  criteria: ('Operacional' | 'Repetitivo' | 'Lento')[]
}

export interface AnalysisResult {
  stepAnalysis: StepAnalysis[]
  summary: {
    overallSummary: string
    recommendedStep: string
  }
}

export interface AITool {
  name: string
  description: string
  useCase: string
  category: string
}

export interface AISolution {
  solution: string
  tools: AITool[]
  expectedTimeGain: string
  expectedQualityGain: string
  expectedResult: string
  priority: 'Alta' | 'Media' | 'Baixa'
}

export const aiService = {
  async generateProcessSteps(processDescription: string, processName: string): Promise<string[]> {
    const { data, error } = await supabase.functions.invoke('generate-process-steps', {
      body: { processDescription, processName },
    })

    if (error) throw new Error(error.message || 'Falha ao conectar com o serviço de IA')
    if (data?.error) throw new Error(data.error)

    return data.steps || []
  },

  async analyzeProcess(steps: string[], processName: string): Promise<AnalysisResult> {
    const { data, error } = await supabase.functions.invoke('analyze-process-with-ai', {
      body: { steps, processName },
    })

    if (error) throw new Error(error.message || 'Falha ao conectar com o serviço de IA')
    if (data?.error) throw new Error(data.error)

    return data as AnalysisResult
  },

  async generateSolutionForStep(
    stepName: string,
    stepJustification: string,
    criteria: string[],
    processName: string,
  ): Promise<AISolution> {
    const { data, error } = await supabase.functions.invoke('suggest-tools-for-step', {
      body: { stepName, stepJustification, criteria, processName },
    })

    if (error) throw new Error(error.message || 'Falha ao conectar com o serviço de IA')
    if (data?.error) throw new Error(data.error)

    return {
      solution: data.solution || '',
      tools: data.tools || [],
      expectedTimeGain: data.expectedTimeGain || '',
      expectedQualityGain: data.expectedQualityGain || '',
      expectedResult: data.expectedResult || '',
      priority: data.priority || 'Media',
    }
  },
}
