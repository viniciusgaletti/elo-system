import { useOutletContext, useNavigate } from 'react-router-dom'
import { Diagnosis } from '@/types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function DiagnosticoOtimizacao() {
  const { diagnosis } = useOutletContext<{ diagnosis: Diagnosis }>()
  const navigate = useNavigate()

  const handleBack = () => navigate(`/diagnostico/${diagnosis.id}/lancamento`)
  const handleFinish = () => navigate('/dashboard')

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h2 className="text-h2 text-foreground">Fase 3: Otimização</h2>
        <p className="text-body text-muted-foreground mt-3 max-w-2xl">
          Avalie os resultados do lançamento e planeje a escala sustentável.
        </p>
      </div>

      <div className="space-y-8 bg-muted/30 p-8 lg:p-10 rounded-3xl border border-border/50">
        <div className="space-y-3">
          <label className="text-base font-semibold pl-2">Gargalos Identificados</label>
          <Textarea
            placeholder="Quais foram os desafios durante o piloto?"
            className="min-h-[140px] bg-background"
          />
        </div>
        <div className="space-y-3">
          <label className="text-base font-semibold pl-2">Plano de Escala</label>
          <Textarea
            placeholder="Próximos passos para adoção em toda a empresa..."
            className="min-h-[140px] bg-background"
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
        <Button size="lg" onClick={handleFinish} className="bg-primary text-primary-foreground">
          <CheckCircle2 className="w-5 h-5 mr-2" /> Finalizar Projeto
        </Button>
      </div>
    </div>
  )
}
