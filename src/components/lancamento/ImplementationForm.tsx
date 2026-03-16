import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Implementation, EnquadramentoStep } from '@/hooks/useLancamento'
import { Plus, Wrench, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  step: EnquadramentoStep
  implementation: Implementation
  updateImplementation: (updates: Partial<Implementation>) => void
  addCustomTool: (tool: string) => void
  removeCustomTool: (index: number) => void
}

export function ImplementationForm({
  step,
  implementation,
  updateImplementation,
  addCustomTool,
  removeCustomTool,
}: Props) {
  const [newTool, setNewTool] = useState('')

  const handleAddTool = () => {
    if (newTool.trim()) {
      addCustomTool(newTool)
      setNewTool('')
    }
  }

  return (
    <Card className="border-primary/20 bg-muted/20 ml-0 md:ml-12 shadow-inner">
      <CardContent className="p-6 space-y-8">
        {/* Solution */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Solucao Proposta</Label>
          <Textarea
            placeholder="Descreva como a IA vai atuar nesta etapa..."
            value={implementation.solution}
            onChange={(e) => updateImplementation({ solution: e.target.value })}
            className={cn(
              'bg-background min-h-[100px]',
              implementation.solution.length > 0 && implementation.solution.length < 10
                ? 'border-destructive/50'
                : '',
            )}
          />
          {implementation.solution.length > 0 && implementation.solution.length < 10 && (
            <p className="text-xs text-destructive">A solução deve ter pelo menos 10 caracteres.</p>
          )}
        </div>

        {/* Tools */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Ferramentas Recomendadas</Label>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {implementation.tools.map((tool, i) => (
              <div
                key={i}
                className="bg-background border border-border/50 rounded-xl p-4 shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-primary shrink-0" /> {tool.name}
                  </h4>
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    {tool.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
                <p className="text-xs font-medium text-foreground bg-muted p-2 rounded-md mt-auto">
                  <span className="text-muted-foreground">Uso:</span> {tool.useCase}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-center flex-wrap mt-4">
            {implementation.customTools.map((tool, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="pl-3 pr-1 py-1 flex items-center gap-1 text-sm bg-background border-border/50"
              >
                {tool}
                <button
                  onClick={() => removeCustomTool(i)}
                  className="text-muted-foreground hover:text-destructive p-0.5 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm">
            <Input
              placeholder="Adicionar outra ferramenta..."
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              className="bg-background h-9 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTool())}
            />
            <Button size="sm" onClick={handleAddTool} variant="outline" className="shrink-0 h-9">
              <Plus className="w-4 h-4 mr-1" /> Adicionar
            </Button>
          </div>
        </div>

        {/* Impact */}
        <div className="space-y-4 pt-4 border-t border-border/50">
          <Label className="text-base font-semibold">Impacto Esperado</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Economia de Tempo</Label>
              <Input
                placeholder="Ex: 5h por semana"
                value={implementation.expectedTimeGain}
                onChange={(e) => updateImplementation({ expectedTimeGain: e.target.value })}
                className="bg-background text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Ganho de Qualidade</Label>
              <Input
                placeholder="Ex: Menos erros manuais"
                value={implementation.expectedQualityGain}
                onChange={(e) => updateImplementation({ expectedQualityGain: e.target.value })}
                className="bg-background text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Resultado Financeiro</Label>
              <Input
                placeholder="Ex: Economia de R$ 2.000/mês"
                value={implementation.expectedResult}
                onChange={(e) => updateImplementation({ expectedResult: e.target.value })}
                className="bg-background text-sm"
              />
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <Label className="text-base font-semibold">Prioridade de Implementação</Label>
          <div className="flex gap-3">
            {['Alta', 'Media', 'Baixa'].map((p) => (
              <Button
                key={p}
                variant={implementation.priority === p ? 'default' : 'outline'}
                onClick={() => updateImplementation({ priority: p as any })}
                className={cn(
                  'flex-1 sm:flex-none w-24',
                  implementation.priority === p ? '' : 'bg-background',
                )}
              >
                {p === 'Media' ? 'Média' : p}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
