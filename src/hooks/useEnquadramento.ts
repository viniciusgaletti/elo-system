import { useState, useEffect, useCallback } from 'react'
import { aiService, AnalysisResult } from '@/services/ai'
import { enquadramentoService } from '@/services/enquadramentoService'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

export interface ProcessStep {
  id: string
  text: string
}

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15)

export function useEnquadramento(diagnosisId: string, processName: string) {
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [freeTextInput, setFreeTextInput] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isGeneratingSteps, setIsGeneratingSteps] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!diagnosisId) return
    let isMounted = true
    setIsLoadingData(true)
    enquadramentoService
      .loadEnquadramento(diagnosisId)
      .then((data) => {
        if (isMounted) {
          if (data.steps && data.steps.length > 0) setSteps(data.steps)
          if (data.analysis_result) setAnalysisResult(data.analysis_result)
        }
      })
      .catch((e) => {
        console.error('Failed to load enquadramento', e)
      })
      .finally(() => {
        if (isMounted) setIsLoadingData(false)
      })
    return () => {
      isMounted = false
    }
  }, [diagnosisId])

  const saveDraft = useCallback(async () => {
    if (!diagnosisId || !user) return
    try {
      await enquadramentoService.saveEnquadramento(diagnosisId, user.id, steps, analysisResult)
      toast({ title: 'Sucesso', description: 'Rascunho salvo.', duration: 4000 })
    } catch (e: any) {
      toast({
        title: 'Erro',
        description: e.message || 'Falha ao salvar rascunho.',
        variant: 'destructive',
        duration: 4000,
      })
    }
  }, [diagnosisId, user, steps, analysisResult, toast])

  const addStep = (text: string) => {
    if (!text.trim() || steps.length >= 20) return
    setSteps((prev) => [...prev, { id: generateId(), text: text.trim() }])
  }

  const removeStep = (id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id))
  }

  const updateStep = (id: string, newText: string) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, text: newText } : s)))
  }

  const reorderSteps = (sourceIndex: number, destinationIndex: number) => {
    setSteps((prev) => {
      const newSteps = [...prev]
      const [removed] = newSteps.splice(sourceIndex, 1)
      newSteps.splice(destinationIndex, 0, removed)
      return newSteps
    })
  }

  const generateStepsFromText = async () => {
    if (freeTextInput.length < 20) return
    setIsGeneratingSteps(true)
    try {
      const generated = await aiService.generateProcessSteps(freeTextInput, processName)
      setSteps(generated.map((text) => ({ id: generateId(), text })))
      toast({ title: 'Sucesso', description: 'Etapas geradas com IA.', duration: 4000 })
    } catch (error: any) {
      toast({
        title: 'Erro na IA',
        description: error.message,
        variant: 'destructive',
        duration: 4000,
      })
    } finally {
      setIsGeneratingSteps(false)
    }
  }

  const analyzeWithAI = async () => {
    if (steps.length < 2) return
    setIsAnalyzing(true)
    try {
      const result = await aiService.analyzeProcess(
        steps.map((s) => s.text),
        processName,
      )
      setAnalysisResult(result)
      toast({
        title: 'Análise Concluída',
        description: 'A IA avaliou as etapas do processo.',
        duration: 4000,
      })
    } catch (error: any) {
      toast({
        title: 'Erro na IA',
        description: error.message,
        variant: 'destructive',
        duration: 4000,
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    isLoadingData,
    steps,
    freeTextInput,
    setFreeTextInput,
    analysisResult,
    isGeneratingSteps,
    isAnalyzing,
    addStep,
    removeStep,
    updateStep,
    reorderSteps,
    generateStepsFromText,
    analyzeWithAI,
    saveDraft,
  }
}
