import { useOutletContext, useNavigate } from 'react-router-dom'
import { Diagnosis } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionErrorBoundary } from '@/components/SectionErrorBoundary'
import { diagnosesService } from '@/services/diagnoses'
import { useToast } from '@/hooks/use-toast'
import { useEnquadramento } from '@/hooks/useEnquadramento'
import { ProcessStepsInput } from '@/components/enquadramento/ProcessStepsInput'
import { AnalysisResults } from '@/components/enquadramento/AnalysisResults'
import { EnquadramentoBottomBar } from '@/components/enquadramento/EnquadramentoBottomBar'

export default function DiagnosticoEnquadramento() {
  const { diagnosis, refetch } = useOutletContext<{ diagnosis: Diagnosis; refetch: () => void }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const hookData = useEnquadramento(diagnosis.id, diagnosis.project_scope || 'Processo')

  const handleFinish = async () => {
    try {
      await hookData.saveDraft()
      
      if (diagnosis.current_phase === 'enquadramento') {
        await diagnosesService.updatePhase(diagnosis.id, 'lancamento')
      }
      refetch?.()
      toast({ title: 'Sucesso', description: 'Enquadramento concluido!', duration: 4000 })
      navigate(`/diagnostico/${diagnosis.id}`)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao concluir fase.',
        variant: 'destructive',
        duration: 4000,
      })
    }
  }

  if (hookData.isLoadingData) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <Skeleton className="w-full lg:w-[55%] h-[500px] rounded-3xl" />
          <Skeleton className="w-full lg:w-[45%] h-[500px] rounded-3xl" />
        </div>
      </div>
    )
  }

  return (
    <SectionErrorBoundary>
      <div className="space-y-8 animate-fade-in relative pb-28">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-wider"
            >
              Fase 1
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">
              {diagnosis.project_scope || 'Processo não definido'}
            </span>
          </div>
          <h2 className="text-h2 text-foreground">Enquadramento</h2>
          <p className="text-body text-muted-foreground mt-2 max-w-2xl">
            Mapeie as etapas do processo e utilize a IA para identificar onde automações geram maior
            impacto.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-[55%] flex-shrink-0">
            <ProcessStepsInput {...hookData} />
          </div>
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24">
            <AnalysisResults isAnalyzing={hookData.isAnalyzing} result={hookData.analysisResult} />
          </div>
        </div>

        <EnquadramentoBottomBar
          canComplete={!!hookData.analysisResult}
          onSaveDraft={hookData.saveDraft}
          onComplete={handleFinish}
        />
      </div>
    </SectionErrorBoundary>
  )
}
