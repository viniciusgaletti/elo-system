import { useOutletContext, useNavigate, Link } from 'react-router-dom'
import { Diagnosis } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { diagnosesService } from '@/services/diagnoses'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionErrorBoundary } from '@/components/SectionErrorBoundary'
import { useOtimizacao } from '@/hooks/useOtimizacao'
import { MetricsCard } from '@/components/otimizacao/MetricsCard'
import { RefinementsSection } from '@/components/otimizacao/RefinementsSection'
import { SummaryMetrics } from '@/components/otimizacao/SummaryMetrics'
import { OtimizacaoBottomBar } from '@/components/otimizacao/OtimizacaoBottomBar'

export default function DiagnosticoOtimizacao() {
  const { diagnosis, refetch } = useOutletContext<{ diagnosis: Diagnosis; refetch: () => void }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const hookData = useOtimizacao(diagnosis.id, diagnosis.project_scope || 'Processo')

  const handleComplete = async () => {
    try {
      if (diagnosis.status !== 'concluido') {
        if (diagnosis.current_phase !== 'otimizacao') {
          await diagnosesService.updatePhase(diagnosis.id, 'otimizacao')
        }
        await diagnosesService.updateStatus(diagnosis.id, 'concluido')
      }
      hookData.saveDraft()
      refetch?.()
      toast({
        title: 'Sucesso',
        description: 'Diagnostico concluido! Relatorio disponivel.',
        duration: 4000,
      })
      navigate(`/diagnostico/${diagnosis.id}`)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao concluir diagnostico.',
        variant: 'destructive',
        duration: 4000,
      })
    }
  }

  if (hookData.isLoadingData) {
    return (
      <div className="space-y-12 animate-fade-in">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-6">
          <Skeleton className="w-full h-[250px] rounded-3xl" />
          <Skeleton className="w-full h-[250px] rounded-3xl" />
        </div>
      </div>
    )
  }

  if (hookData.hasLancamentoData === false) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-500" />
        </div>
        <h3 className="text-h2 mb-4">Lançamento não encontrado</h3>
        <p className="text-body text-muted-foreground mb-8 max-w-md">
          Conclua o Lançamento antes de iniciar a Otimização.
        </p>
        <Button asChild size="lg">
          <Link to={`/diagnostico/${diagnosis.id}/lancamento`}>Ir para Lançamento</Link>
        </Button>
      </div>
    )
  }

  const canComplete = Object.values(hookData.measuredResults).some(
    (r) =>
      r.status !== 'Ainda em implementacao' &&
      (r.realTimeGain || r.realQualityGain || r.realResult),
  )

  return (
    <SectionErrorBoundary>
      <div className="space-y-12 animate-fade-in relative pb-28">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-wider"
            >
              Fase 3
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">
              {diagnosis.project_scope || 'Processo não definido'}
            </span>
          </div>
          <h2 className="text-h2 text-foreground">Otimização</h2>
          <p className="text-body text-muted-foreground mt-2 max-w-2xl">
            Avalie os resultados reais do lançamento, registre ajustes finos e valide o impacto da
            IA.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-h3 text-foreground">1. Medição de Resultados</h3>
          <div className="grid grid-cols-1 gap-6">
            {hookData.eligibleSteps.map((step) => (
              <MetricsCard
                key={step.step}
                step={step}
                implementation={hookData.implementations[step.step]}
                result={hookData.measuredResults[step.step]}
                onUpdate={(updates) => hookData.updateResult(step.step, updates)}
              />
            ))}
          </div>
        </div>

        <RefinementsSection
          steps={hookData.eligibleSteps}
          refinements={hookData.refinements}
          onAdd={hookData.addRefinement}
          onRemove={hookData.removeRefinement}
          onSuggest={hookData.suggestRefinements}
          isSuggesting={hookData.isSuggesting}
          suggestions={hookData.suggestions}
        />

        <SummaryMetrics
          eligibleStepsCount={hookData.eligibleSteps.length}
          implementationsCount={Object.keys(hookData.implementations).length}
          successCount={
            Object.values(hookData.measuredResults).filter(
              (r) => r.status === 'Sim, funcionando bem',
            ).length
          }
          refinementsCount={hookData.refinements.length}
          finalObservations={hookData.finalObservations}
          setFinalObservations={hookData.setFinalObservations}
        />

        <OtimizacaoBottomBar
          canComplete={canComplete}
          onSaveDraft={hookData.saveDraft}
          onComplete={handleComplete}
        />
      </div>
    </SectionErrorBoundary>
  )
}
