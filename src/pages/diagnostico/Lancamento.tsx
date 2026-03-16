import { useOutletContext, useNavigate, Link } from 'react-router-dom'
import { Diagnosis } from '@/types'
import { Button } from '@/components/ui/button'
import { diagnosesService } from '@/services/diagnoses'
import { useToast } from '@/hooks/use-toast'
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionErrorBoundary } from '@/components/SectionErrorBoundary'
import { useLancamento } from '@/hooks/useLancamento'
import { EligibleStepCard } from '@/components/lancamento/EligibleStepCard'
import { ImplementationForm } from '@/components/lancamento/ImplementationForm'
import { LancamentoBottomBar } from '@/components/lancamento/LancamentoBottomBar'

export default function DiagnosticoLancamento() {
  const { diagnosis, refetch } = useOutletContext<{ diagnosis: Diagnosis; refetch: () => void }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const hookData = useLancamento(diagnosis.id, diagnosis.project_scope || 'Processo')

  const handleComplete = async () => {
    try {
      await hookData.saveDraft()

      if (diagnosis.current_phase === 'lancamento') {
        await diagnosesService.updatePhase(diagnosis.id, 'otimizacao')
      }
      refetch?.()
      toast({ title: 'Sucesso', description: 'Lancamento concluido!', duration: 4000 })
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
      <div className="space-y-12 animate-fade-in">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-10">
          <Skeleton className="w-full h-[300px] rounded-3xl" />
          <Skeleton className="w-full h-[300px] rounded-3xl" />
        </div>
      </div>
    )
  }

  if (hookData.hasEnquadramentoData === false) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-500" />
        </div>
        <h3 className="text-h2 mb-4">Enquadramento nao encontrado</h3>
        <p className="text-body text-muted-foreground mb-8 max-w-md">
          Conclua o Enquadramento antes de iniciar o Lancamento.
        </p>
        <Button asChild size="lg">
          <Link to={`/diagnostico/${diagnosis.id}/enquadramento`}>Ir para Enquadramento</Link>
        </Button>
      </div>
    )
  }

  if (hookData.isAutoGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
        <h3 className="text-h2 mb-4">Gerando soluções com IA...</h3>
        <p className="text-body text-muted-foreground max-w-md">
          A inteligência artificial está analisando cada etapa e criando soluções personalizadas
          com ferramentas, impacto esperado e prioridade.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Isso pode levar alguns segundos...
        </p>
      </div>
    )
  }

  const canComplete = hookData.eligibleSteps.length > 0

  return (
    <SectionErrorBoundary>
      <div className="space-y-12 animate-fade-in relative pb-28">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-wider"
            >
              Fase 2
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">
              {diagnosis.project_scope || 'Processo não definido'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-h2 text-foreground">Lancamento</h2>
              <p className="text-body text-muted-foreground mt-2 max-w-2xl">
                Soluções de IA geradas automaticamente para as etapas elegíveis. Revise e ajuste
                conforme necessário.
              </p>
            </div>
            <Button
              onClick={hookData.regenerateAll}
              disabled={hookData.isAutoGenerating}
              variant="outline"
              size="sm"
              className="shrink-0 gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerar com IA
            </Button>
          </div>
        </div>

        <div className="space-y-10">
          {hookData.eligibleSteps.map((step, index) => {
            const imp = hookData.implementations[step.step] || {
              solution: '',
              tools: [],
              customTools: [],
              expectedTimeGain: '',
              expectedQualityGain: '',
              expectedResult: '',
              priority: null,
              isSuggesting: false,
            }

            return (
              <div key={index} className="space-y-4">
                <EligibleStepCard step={step} index={index + 1} />
                <ImplementationForm
                  step={step}
                  implementation={imp}
                  updateImplementation={(updates) =>
                    hookData.updateImplementation(step.step, updates)
                  }
                  addCustomTool={(tool) => hookData.addCustomTool(step.step, tool)}
                  removeCustomTool={(i) => hookData.removeCustomTool(step.step, i)}
                />
              </div>
            )
          })}
        </div>

        <LancamentoBottomBar
          canComplete={canComplete}
          onSaveDraft={hookData.saveDraft}
          onComplete={handleComplete}
        />
      </div>
    </SectionErrorBoundary>
  )
}
