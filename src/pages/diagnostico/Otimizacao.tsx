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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-h2 text-primary">Fase 3: Otimização</h2>
        <p className="text-muted-foreground mt-2">
          Avalie os resultados do lançamento e planeje a escala sustentável.
        </p>
      </div>

      <div className="space-y-4 bg-background p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-small font-semibold">Gargalos Identificados</label>
          <Textarea
            placeholder="Quais foram os desafios durante o piloto?"
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-small font-semibold">Plano de Escala</label>
          <Textarea
            placeholder="Próximos passos para adoção em toda a empresa..."
            className="min-h-[120px]"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
        <Button onClick={handleFinish} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <CheckCircle2 className="w-4 h-4 mr-2" /> Finalizar Diagnóstico
        </Button>
      </div>
    </div>
  )
}
