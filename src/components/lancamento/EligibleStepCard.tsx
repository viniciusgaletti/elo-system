import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EnquadramentoStep } from '@/hooks/useLancamento'

export function EligibleStepCard({ step, index }: { step: EnquadramentoStep; index: number }) {
  const verdictColors = {
    'Candidata a IA': 'bg-green-500/10 text-green-600 border-green-500/20',
    'Possível candidata': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  }

  return (
    <Card className="border-border/60 shadow-sm relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
              {index}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.step}</h3>
              <p className="text-sm text-muted-foreground">{step.justification}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge
              variant="outline"
              className={verdictColors[step.verdict as keyof typeof verdictColors] || ''}
            >
              {step.verdict}
            </Badge>
            <div className="flex gap-1 flex-wrap justify-end mt-1">
              {step.criteria.map((c) => (
                <Badge key={c} variant="secondary" className="text-[10px] py-0 px-2 h-5">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
