import { AnalysisResult } from '@/services/ai'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Sparkles, Activity, CheckCircle2 } from 'lucide-react'

export function AnalysisResults({
  isAnalyzing,
  result,
}: {
  isAnalyzing: boolean
  result: AnalysisResult | null
}) {
  if (!isAnalyzing && !result) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center p-10 text-center border-2 border-dashed border-border/60 rounded-3xl bg-muted/10">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Aguardando análise</h3>
        <p className="text-muted-foreground text-sm max-w-[250px] mt-2">
          Clique em Analisar com IA para iniciar a avaliação do processo.
        </p>
      </div>
    )
  }

  if (isAnalyzing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-6 mb-4 bg-muted/20 rounded-2xl border border-border/50">
          <Activity className="w-6 h-6 text-primary animate-spin mr-3" />
          <span className="font-medium text-foreground">Analisando o processo...</span>
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border/40 shadow-sm">
            <CardContent className="p-5 space-y-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {result?.stepAnalysis.map((res, idx) => (
          <Card
            key={idx}
            className={`border-border/60 shadow-sm overflow-hidden transition-all ${res.verdict === 'Candidata a IA' ? 'border-primary/50 bg-primary/5' : ''}`}
          >
            <CardHeader className="p-4 pb-2 border-b border-border/30 bg-muted/20">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <h4 className="font-medium text-sm leading-snug">{res.step}</h4>
                </div>
                <Badge
                  variant={
                    res.verdict === 'Candidata a IA'
                      ? 'default'
                      : res.verdict === 'Possível candidata'
                        ? 'secondary'
                        : 'outline'
                  }
                  className="shrink-0 whitespace-nowrap"
                >
                  {res.verdict}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{res.justification}</p>
              {res.criteria && res.criteria.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {res.criteria.map((c) => (
                    <Badge
                      key={c}
                      variant="outline"
                      className="text-[10px] bg-background border-border/60 text-muted-foreground font-medium uppercase tracking-wider"
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/30 bg-card shadow-md">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" /> Resumo da Análise
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <p className="text-sm text-foreground leading-relaxed">
            {result?.summary.overallSummary}
          </p>
          <div className="bg-muted/40 p-4 rounded-xl border border-border/60">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
              Etapa Recomendada para Foco
            </p>
            <p className="text-sm font-medium text-primary">{result?.summary.recommendedStep}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
