import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { otimizacaoService } from '@/services/otimizacaoService'
import { enquadramentoService } from '@/services/enquadramentoService'
import { lancamentoService } from '@/services/lancamentoService'
import { MeasuredResult, Refinement, RefinementSuggestion } from '@/types/otimizacao'
import { EnquadramentoStep, Implementation } from '@/hooks/useLancamento'
import { useAuth } from '@/hooks/use-auth'

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15)

export function useOtimizacao(diagnosisId: string, processName: string) {
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [hasLancamentoData, setHasLancamentoData] = useState<boolean | null>(null)
  const [eligibleSteps, setEligibleSteps] = useState<EnquadramentoStep[]>([])
  const [implementations, setImplementations] = useState<Record<string, Implementation>>({})

  const [measuredResults, setMeasuredResults] = useState<Record<string, MeasuredResult>>({})
  const [refinements, setRefinements] = useState<Refinement[]>([])
  const [finalObservations, setFinalObservations] = useState('')

  const [isSuggesting, setIsSuggesting] = useState(false)
  const [suggestions, setSuggestions] = useState<RefinementSuggestion[]>([])

  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!diagnosisId) return
    let isMounted = true
    setIsLoadingData(true)

    async function load() {
      try {
        const enq = await enquadramentoService.loadEnquadramento(diagnosisId)
        let loadedSteps: EnquadramentoStep[] = []
        if (isMounted && enq.analysis_result?.stepAnalysis) {
          loadedSteps = enq.analysis_result.stepAnalysis.filter(
            (s: any) => s.verdict === 'Candidata a IA' || s.verdict === 'Possível candidata',
          )
          setEligibleSteps(loadedSteps)
        }

        const lanc = await lancamentoService.loadLancamento(diagnosisId)
        if (isMounted) {
          if (lanc.implementations && Object.keys(lanc.implementations).length > 0) {
            setImplementations(lanc.implementations)
            setHasLancamentoData(true)
          } else {
            setHasLancamentoData(false)
          }
        }

        const otim = await otimizacaoService.loadOtimizacao(diagnosisId)
        if (isMounted) {
          if (otim.measured_results && Object.keys(otim.measured_results).length > 0) {
            setMeasuredResults(otim.measured_results)
          } else {
            const initialResults: Record<string, MeasuredResult> = {}
            loadedSteps.forEach((step) => {
              initialResults[step.step] = {
                realTimeGain: '',
                realQualityGain: '',
                realResult: '',
                status: 'Ainda em implementacao',
              }
            })
            setMeasuredResults(initialResults)
          }
          if (otim.refinements) setRefinements(otim.refinements)
          if (otim.final_observations) setFinalObservations(otim.final_observations)
        }
      } catch (e) {
        console.error('Failed to load otimizacao', e)
      } finally {
        if (isMounted) setIsLoadingData(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [diagnosisId])

  const saveDraft = useCallback(async () => {
    if (!diagnosisId || !user) return
    try {
      await otimizacaoService.saveOtimizacao(
        diagnosisId,
        user.id,
        measuredResults,
        refinements,
        finalObservations,
      )
      toast({ title: 'Sucesso', description: 'Rascunho salvo.', duration: 4000 })
    } catch (e: any) {
      toast({
        title: 'Erro',
        description: e.message || 'Falha ao salvar rascunho.',
        variant: 'destructive',
        duration: 4000,
      })
    }
  }, [diagnosisId, user, measuredResults, refinements, finalObservations, toast])

  const updateResult = (stepName: string, updates: Partial<MeasuredResult>) => {
    setMeasuredResults((prev) => ({
      ...prev,
      [stepName]: {
        ...(prev[stepName] || {
          realTimeGain: '',
          realQualityGain: '',
          realResult: '',
          status: 'Ainda em implementacao',
        }),
        ...updates,
      },
    }))
  }

  const addRefinement = (ref: Omit<Refinement, 'id'>) => {
    setRefinements((prev) => [...prev, { ...ref, id: generateId() }])
  }

  const removeRefinement = (id: string) => {
    setRefinements((prev) => prev.filter((r) => r.id !== id))
  }

  const suggestRefinements = async () => {
    setIsSuggesting(true)
    try {
      const sugs = await otimizacaoService.suggestRefinements(
        processName,
        eligibleSteps,
        implementations,
        measuredResults,
        refinements,
      )
      setSuggestions(sugs)
      toast({
        title: 'Sugestões geradas',
        description: 'A IA identificou novos caminhos.',
        duration: 4000,
      })
    } catch (e: any) {
      toast({ title: 'Erro na IA', description: e.message, variant: 'destructive', duration: 4000 })
    } finally {
      setIsSuggesting(false)
    }
  }

  return {
    isLoadingData,
    hasLancamentoData,
    eligibleSteps,
    implementations,
    measuredResults,
    updateResult,
    refinements,
    addRefinement,
    removeRefinement,
    finalObservations,
    setFinalObservations,
    saveDraft,
    suggestRefinements,
    isSuggesting,
    suggestions,
  }
}
