import { useOutletContext, useNavigate } from 'react-router-dom'
import { Diagnosis } from '@/types'
import { Button } from '@/components/ui/button'
import { diagnosesService } from '@/services/diagnoses'
import { useToast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/textarea'

export default function DiagnosticoEnquadramento() {
  const { diagnosis } = useOutletContext<{ diagnosis: Diagnosis }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleNext = async () => {
    try {
      if (diagnosis.current_phase === 'enquadramento') {
        await diagnosesService.updatePhase(diagnosis.id, 'lancamento')
      }
      navigate(`/diagnostico/${diagnosis.id}/lancamento`)
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao avançar fase.', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h2 className="text-h2 text-foreground">Fase 1: Enquadramento</h2>
        <p className="text-body text-muted-foreground mt-3 max-w-2xl">
          Defina o problema principal, levante hipóteses e construa o baseline do projeto de IA.
        </p>
      </div>

      <div className="space-y-8 bg-muted/30 p-8 lg:p-10 rounded-3xl border border-border/50">
        <div className="space-y-3">
          <label className="text-base font-semibold pl-2">Análise de Cenário Atual</label>
          <Textarea
            placeholder="Descreva a dor do cliente, processos impactados..."
            className="min-h-[160px] bg-background"
          />
        </div>
        <div className="space-y-3">
          <label className="text-base font-semibold pl-2">Hipótese de IA</label>
          <Textarea
            placeholder="Como a Inteligência Artificial pode resolver este problema?"
            className="min-h-[120px] bg-background"
          />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button size="lg" onClick={handleNext}>
          Concluir e Avançar
        </Button>
      </div>
    </div>
  )
}
