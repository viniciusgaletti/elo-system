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
    <div className="space-y-10 animate-fade-in">
      <div>
        <h2 className="text-h2 text-foreground">Fase 2: Lançamento</h2>
        <p className="text-body text-muted-foreground mt-3 max-w-2xl">
          Estruture a implementação do piloto, defina ferramentas e cronograma inicial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/30 p-8 lg:p-10 rounded-3xl border border-border/50">
        <div className="space-y-3">
          <label className="text-base font-semibold pl-2">Stack Tecnológico</label>
          <Input placeholder="Ex: OpenAI API, Langchain, Supabase" className="bg-background" />
        </div>
        <div className="space-y-3">
          <label className="text-base font-semibold pl-2">Prazo Piloto (Semanas)</label>
          <Input type="number" placeholder="Ex: 4" className="bg-background" />
        </div>
        <div className="space-y-3 md:col-span-2 mt-4">
          <label className="text-base font-semibold pl-2">KPIs de Sucesso do Piloto</label>
          <Input
            placeholder="Ex: Redução de 30% no tempo de atendimento"
            className="bg-background"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        <Button
          variant="ghost"
          size="lg"
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
        </Button>
        <Button size="lg" onClick={handleNext}>
          Avançar para Otimização
        </Button>
      </div>
    </div>
  )
}
