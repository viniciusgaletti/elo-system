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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-h2 text-primary">Fase 1: Enquadramento</h2>
        <p className="text-muted-foreground mt-2">
          Defina o problema principal, levante hipóteses e construa o baseline do projeto de IA.
        </p>
      </div>

      <div className="space-y-4 bg-background p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-small font-semibold">Análise de Cenário Atual</label>
          <Textarea
            placeholder="Descreva a dor do cliente, processos impactados..."
            className="min-h-[150px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-small font-semibold">Hipótese de IA</label>
          <Textarea
            placeholder="Como a Inteligência Artificial pode resolver este problema?"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext}>Concluir e Avançar para Lançamento</Button>
      </div>
    </div>
  )
}
