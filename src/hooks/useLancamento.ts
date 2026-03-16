import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { aiService, AITool } from '@/services/ai'
import { enquadramentoService } from '@/services/enquadramentoService'
import { lancamentoService } from '@/services/lancamentoService'
import { useAuth } from '@/hooks/use-auth'

export interface EnquadramentoStep {
  step: string
  verdict: 'Candidata a IA' | 'Possível candidata' | 'Não se aplica'
  justification: string
  criteria: ('Operacional' | 'Repetitivo' | 'Lento')[]
}

export interface Implementation {
  solution: string
  tools: AITool[]
  customTools: string[]
  expectedTimeGain: string
  expectedQualityGain: string
  expectedResult: string
  priority: 'Alta' | 'Media' | 'Baixa' | null
  isSuggesting: boolean
}

export function useLancamento(diagnosisId: string, processName: string) {
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [hasEnquadramentoData, setHasEnquadramentoData] = useState<boolean | null>(null)
  const [eligibleSteps, setEligibleSteps] = useState<EnquadramentoStep[]>([])
  const [implementations, setImplementations] = useState<Record<string, Implementation>>({})
  const [isAutoGenerating, setIsAutoGenerating] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()

  const autoGenerateForSteps = useCallback(
    async (steps: EnquadramentoStep[]) => {
      if (steps.length === 0) return
      setIsAutoGenerating(true)
      try {
        const results = await Promise.allSettled(
          steps.map((step) =>
            aiService.generateSolutionForStep(
              step.step,
              step.justification,
              step.criteria,
              processName,
            ),
          ),
        )

        const newImplementations: Record<string, Implementation> = {}
        results.forEach((result, index) => {
          const stepName = steps[index].step
          if (result.status === 'fulfilled') {
            const sol = result.value
            newImplementations[stepName] = {
              solution: sol.solution,
              tools: sol.tools,
              customTools: [],
              expectedTimeGain: sol.expectedTimeGain,
              expectedQualityGain: sol.expectedQualityGain,
              expectedResult: sol.expectedResult,
              priority: sol.priority,
              isSuggesting: false,
            }
          } else {
            newImplementations[stepName] = {
              solution: '',
              tools: [],
              customTools: [],
              expectedTimeGain: '',
              expectedQualityGain: '',
              expectedResult: '',
              priority: null,
              isSuggesting: false,
            }
          }
        })

        setImplementations(newImplementations)
        toast({
          title: 'Soluções geradas com IA',
          description: `${Object.keys(newImplementations).length} soluções foram criadas automaticamente.`,
          duration: 5000,
        })
      } catch (err: any) {
        toast({
          title: 'Erro na IA',
          description: err.message || 'Falha ao gerar soluções.',
          variant: 'destructive',
          duration: 5000,
        })
      } finally {
        setIsAutoGenerating(false)
      }
    },
    [processName, toast],
  )

  useEffect(() => {
    if (!diagnosisId) return
    let isMounted = true
    setIsLoadingData(true)

    async function load() {
      try {
        const enq = await enquadramentoService.loadEnquadramento(diagnosisId)
        let eligible: EnquadramentoStep[] = []

        if (isMounted) {
          if (enq.analysis_result?.stepAnalysis) {
            eligible = enq.analysis_result.stepAnalysis.filter(
              (s: any) => s.verdict === 'Candidata a IA' || s.verdict === 'Possível candidata',
            )
            setEligibleSteps(eligible)
            setHasEnquadramentoData(true)
          } else {
            setHasEnquadramentoData(false)
          }
        }

        const lanc = await lancamentoService.loadLancamento(diagnosisId)
        if (isMounted && lanc.implementations && Object.keys(lanc.implementations).length > 0) {
          setImplementations(lanc.implementations)
        } else if (isMounted && eligible.length > 0) {
          // No saved implementations — auto-generate with AI
          setIsLoadingData(false)
          await autoGenerateForSteps(eligible)
          return
        }
      } catch (e) {
        console.error('Failed to load lancamento', e)
      } finally {
        if (isMounted) setIsLoadingData(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [diagnosisId, autoGenerateForSteps])

  const saveDraft = useCallback(async () => {
    if (!diagnosisId || !user) return
    try {
      await lancamentoService.saveLancamento(diagnosisId, user.id, implementations)
      toast({ title: 'Sucesso', description: 'Rascunho salvo.', duration: 4000 })
    } catch (e: any) {
      toast({
        title: 'Erro',
        description: e.message || 'Falha ao salvar rascunho.',
        variant: 'destructive',
        duration: 4000,
      })
    }
  }, [diagnosisId, user, implementations, toast])

  const updateImplementation = (stepName: string, updates: Partial<Implementation>) => {
    setImplementations((prev) => ({
      ...prev,
      [stepName]: {
        ...(prev[stepName] || {
          solution: '',
          tools: [],
          customTools: [],
          expectedTimeGain: '',
          expectedQualityGain: '',
          expectedResult: '',
          priority: null,
          isSuggesting: false,
        }),
        ...updates,
      },
    }))
  }

  const regenerateAll = useCallback(async () => {
    await autoGenerateForSteps(eligibleSteps)
  }, [eligibleSteps, autoGenerateForSteps])

  const addCustomTool = (stepName: string, tool: string) => {
    if (!tool.trim()) return
    setImplementations((prev) => {
      const current = prev[stepName] || { customTools: [] }
      return {
        ...prev,
        [stepName]: {
          ...current,
          customTools: [...(current.customTools || []), tool],
        },
      }
    })
  }

  const removeCustomTool = (stepName: string, index: number) => {
    setImplementations((prev) => {
      const current = prev[stepName]
      if (!current) return prev
      const newTools = [...current.customTools]
      newTools.splice(index, 1)
      return {
        ...prev,
        [stepName]: {
          ...current,
          customTools: newTools,
        },
      }
    })
  }

  return {
    isLoadingData,
    isAutoGenerating,
    hasEnquadramentoData,
    eligibleSteps,
    implementations,
    updateImplementation,
    saveDraft,
    regenerateAll,
    addCustomTool,
    removeCustomTool,
  }
}
