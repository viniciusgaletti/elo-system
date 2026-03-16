import { useState } from 'react'
import { ProcessStep } from '@/hooks/useEnquadramento'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Sparkles,
  GripVertical,
  Trash2,
  Activity,
  LayoutList,
  BrainCircuit,
  List,
} from 'lucide-react'

interface Props {
  steps: ProcessStep[]
  freeTextInput: string
  setFreeTextInput: (val: string) => void
  isGeneratingSteps: boolean
  isAnalyzing: boolean
  addStep: (text: string) => void
  removeStep: (id: string) => void
  updateStep: (id: string, text: string) => void
  reorderSteps: (from: number, to: number) => void
  generateStepsFromText: () => void
  analyzeWithAI: () => void
}

export function ProcessStepsInput({
  steps,
  freeTextInput,
  setFreeTextInput,
  isGeneratingSteps,
  isAnalyzing,
  addStep,
  removeStep,
  updateStep,
  reorderSteps,
  generateStepsFromText,
  analyzeWithAI,
}: Props) {
  const [newText, setNewText] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleDragStart = (e: React.DragEvent, index: number) =>
    e.dataTransfer.setData('text/plain', index.toString())
  const handleDragOver = (e: React.DragEvent) => e.preventDefault()
  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    const sourceIdx = parseInt(e.dataTransfer.getData('text/plain'))
    if (!isNaN(sourceIdx) && sourceIdx !== index) reorderSteps(sourceIdx, index)
  }

  return (
    <Card className="border-border/60 shadow-sm bg-card">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="text-xl flex items-center gap-2">
          <LayoutList className="w-5 h-5 text-primary" /> Mapeamento do Processo
        </CardTitle>
        <CardDescription>
          Descreva o processo de forma livre ou insira as etapas manualmente.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold">Geração por IA (Opcional)</label>
          <Textarea
            placeholder="Descreva o processo (min 20 caracteres)..."
            value={freeTextInput}
            onChange={(e) => setFreeTextInput(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={generateStepsFromText}
              disabled={isGeneratingSteps || freeTextInput.length < 20}
            >
              {isGeneratingSteps ? (
                <Activity className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Gerar Etapas com IA
            </Button>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border/50">
          <label className="text-sm font-semibold">Etapas Mapeadas ({steps.length})</label>
          <div className="flex gap-2">
            <Input
              placeholder="Descreva uma etapa do processo..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addStep(newText)
                  setNewText('')
                }
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                addStep(newText)
                setNewText('')
              }}
            >
              Adicionar
            </Button>
          </div>

          <div className="space-y-2 mt-4 max-h-[400px] overflow-y-auto pr-2">
            {steps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/20 rounded-xl border border-dashed border-border/60">
                <List className="w-8 h-8 text-muted-foreground mb-3" />
                <p className="font-semibold text-foreground">Nenhuma etapa adicionada</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Descreva o processo ou adicione etapas manualmente.
                </p>
              </div>
            ) : (
              steps.map((step, idx) => (
                <div
                  key={step.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  className="flex items-center gap-3 p-3 bg-muted/30 border border-border/50 rounded-xl group hover:border-primary/30 transition-colors"
                >
                  <div className="cursor-grab text-muted-foreground active:cursor-grabbing">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium shrink-0">
                    {idx + 1}
                  </div>
                  <div
                    className="flex-1 cursor-text"
                    onClick={() => {
                      setEditingId(step.id)
                      setEditValue(step.text)
                    }}
                  >
                    {editingId === step.id ? (
                      <Input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => {
                          updateStep(step.id, editValue)
                          setEditingId(null)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            updateStep(step.id, editValue)
                            setEditingId(null)
                          }
                        }}
                        className="h-8"
                      />
                    ) : (
                      <span className="text-sm font-medium">{step.text}</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:text-destructive"
                    onClick={() => removeStep(step.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 flex flex-col items-center gap-3">
          {steps.length > 0 && steps.length < 2 && (
            <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md text-center">
              Adicione pelo menos 2 etapas para continuar.
            </p>
          )}
          <Button
            className="w-full"
            size="lg"
            onClick={analyzeWithAI}
            disabled={steps.length < 2 || isAnalyzing}
          >
            {isAnalyzing ? (
              <Activity className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <BrainCircuit className="w-5 h-5 mr-2" />
            )}{' '}
            Analisar com IA
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            A IA vai identificar quais etapas são candidatas a automação.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
