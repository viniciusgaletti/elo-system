import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  eligibleStepsCount: number
  implementationsCount: number
  successCount: number
  refinementsCount: number
  finalObservations: string
  setFinalObservations: (val: string) => void
}

export function SummaryMetrics({
  eligibleStepsCount,
  implementationsCount,
  successCount,
  refinementsCount,
  finalObservations,
  setFinalObservations,
}: Props) {
  return (
    <div className="space-y-6 pt-6 border-t border-border/50">
      <div>
        <h3 className="text-h3 text-foreground">3. Conclusão do Diagnóstico</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Resumo final das implementações do Método ELO.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{eligibleStepsCount}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-medium mt-2">
              Etapas Candidatas
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-primary">{implementationsCount}</p>
            <p className="text-[10px] sm:text-xs text-primary/70 uppercase font-medium mt-2">
              Soluções Mapeadas
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-green-600">{successCount}</p>
            <p className="text-[10px] sm:text-xs text-green-600/80 uppercase font-medium mt-2">
              Casos de Sucesso
            </p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{refinementsCount}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase font-medium mt-2">
              Refinamentos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3 pt-4">
        <label className="text-sm font-semibold pl-1">Observações Finais (Opcional)</label>
        <Textarea
          placeholder="Registre as conclusões gerais e próximos passos após o fechamento deste diagnóstico..."
          value={finalObservations}
          onChange={(e) => setFinalObservations(e.target.value)}
          className="min-h-[140px] bg-background text-base"
        />
      </div>
    </div>
  )
}
