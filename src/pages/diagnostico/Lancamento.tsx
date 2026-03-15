import { useOutletContext, useNavigate } from 'react-router-dom'
import { Diagnosis } from '@/types'
import { Button } from '@/components/ui/button'
import { diagnosesService } from '@/services/diagnoses'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'

export default function DiagnosticoLancamento() {
  const { diagnosis } = useOutletContext<{ diagnosis: Diagnosis }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleNext = async () => {
    try {
      if (diagnosis.current_phase === 'lancamento') {
        await diagnosesService.updatePhase(diagnosis.id, 'otimizacao')
      }
      navigate(`/diagnostico/${diagnosis.id}/otimizacao`)
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao avançar fase.', variant: 'destructive' })
    }
  }

  const handleBack = () => navigate(`/diagnostico/${diagnosis.id}/enquadramento`)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-h2 text-primary">Fase 2: Lançamento</h2>
        <p className="text-muted-foreground mt-2">
          Estruture a implementação do piloto, defina ferramentas e cronograma inicial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-small font-semibold">Stack Tecnológico</label>
          <Input placeholder="Ex: OpenAI API, Langchain, Supabase" />
        </div>
        <div className="space-y-2">
          <label className="text-small font-semibold">Prazo Piloto (Semanas)</label>
          <Input type="number" placeholder="Ex: 4" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-small font-semibold">KPIs de Sucesso do Piloto</label>
          <Input placeholder="Ex: Redução de 30% no tempo de atendimento" />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
        <Button onClick={handleNext}>Avançar para Otimização</Button>
      </div>
    </div>
  )
}
