import { useState } from 'react'
import { EnquadramentoStep } from '@/hooks/useLancamento'
import { Refinement, RefinementSuggestion } from '@/types/otimizacao'
import { Button } from '@/components/ui/button'
import { Plus, Sparkles, Loader2, Trash2, Pencil } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

interface Props {
  steps: EnquadramentoStep[]
  refinements: Refinement[]
  onAdd: (r: Omit<Refinement, 'id'>) => void
  onRemove: (id: string) => void
  onSuggest: () => void
  isSuggesting: boolean
  suggestions: RefinementSuggestion[]
}

export function RefinementsSection({
  steps,
  refinements,
  onAdd,
  onRemove,
  onSuggest,
  isSuggesting,
  suggestions,
}: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [step, setStep] = useState('')
  const [what, setWhat] = useState('')
  const [why, setWhy] = useState('')
  const [result, setResult] = useState('')

  const handleSave = () => {
    if (!step || !what) return
    onAdd({
      step,
      what,
      why,
      result,
      date: new Date().toISOString(),
    })
    setStep('')
    setWhat('')
    setWhy('')
    setResult('')
    setIsFormOpen(false)
  }

  const fillFromSuggestion = (s: RefinementSuggestion) => {
    setWhat(s.title)
    setWhy(s.explanation)
    setIsFormOpen(true)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6 pt-6 border-t border-border/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-h3 text-foreground">2. Registro de Refinamentos</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Log cronológico de ajustes feitos nas soluções de IA.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onSuggest}
            disabled={isSuggesting}
            className="flex-1 sm:flex-none"
          >
            {isSuggesting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            <span className="hidden sm:inline">Sugerir Ajustes com IA</span>
            <span className="sm:hidden">Sugerir Ajustes</span>
          </Button>
          <Button
            onClick={() => setIsFormOpen(true)}
            disabled={isFormOpen}
            className="flex-1 sm:flex-none"
          >
            <Plus className="w-4 h-4 mr-2" /> Novo
          </Button>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up bg-muted/20 p-4 sm:p-6 rounded-3xl border border-border/50">
          <div className="md:col-span-2 mb-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Sugestões da IA
            </h4>
          </div>
          {suggestions.map((s, i) => (
            <Card key={i} className="bg-background">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-base text-primary leading-tight">{s.title}</CardTitle>
                  <Badge variant="secondary" className="text-[10px] whitespace-nowrap">
                    {s.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{s.explanation}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => fillFromSuggestion(s)}
                >
                  Adicionar como Refinamento
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isFormOpen && (
        <Card className="border-primary/40 shadow-md animate-fade-in-down">
          <CardContent className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium pl-1">Etapa Relacionada *</label>
              <Select value={step} onValueChange={setStep}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a etapa" />
                </SelectTrigger>
                <SelectContent>
                  {steps.map((s) => (
                    <SelectItem key={s.step} value={s.step}>
                      {s.step}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium pl-1">O que foi ajustado? *</label>
              <Input
                placeholder="Ex: Alteração no prompt da IA"
                value={what}
                onChange={(e) => setWhat(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium pl-1">Por quê?</label>
              <Textarea
                placeholder="Motivo do ajuste..."
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium pl-1">Resultado Observado</label>
              <Input
                placeholder="O que melhorou após o ajuste"
                value={result}
                onChange={(e) => setResult(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setIsFormOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={!step || !what}>
                Salvar Registro
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {refinements.length === 0 && !isFormOpen && (
          <div className="flex flex-col items-center justify-center py-10 bg-muted/20 rounded-3xl border border-dashed border-border/60 text-center px-6">
            <Pencil className="w-8 h-8 text-muted-foreground/50 mb-3" />
            <p className="font-semibold text-foreground">Nenhum refinamento registrado</p>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">
              Adicione refinamentos conforme for ajustando a solucao.
            </p>
          </div>
        )}
        {refinements.map((r) => (
          <Card key={r.id} className="animate-fade-in-up border-border/60">
            <CardContent className="p-5 flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-mono text-muted-foreground">
                    {format(new Date(r.date), 'dd/MM/yyyy')}
                  </span>
                  <Badge variant="secondary" className="text-xs bg-muted/60">
                    {r.step}
                  </Badge>
                </div>
                <h4 className="font-semibold text-foreground text-lg">{r.what}</h4>
                {r.why && <p className="text-sm text-muted-foreground">{r.why}</p>}
                {r.result && (
                  <p className="text-sm font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-md inline-block mt-2">
                    Resultado: {r.result}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                onClick={() => onRemove(r.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
