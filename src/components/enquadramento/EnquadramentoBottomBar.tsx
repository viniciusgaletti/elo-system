import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Play } from 'lucide-react'

interface Props {
  canComplete: boolean
  onSaveDraft: () => void
  onComplete: () => void
}

export function EnquadramentoBottomBar({ canComplete, onSaveDraft, onComplete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleConfirm = () => {
    setShowConfirm(false)
    onComplete()
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl p-4 bg-background/95 backdrop-blur-md border border-border/60 rounded-3xl shadow-xl z-40 flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground hidden sm:block pl-2">
          Fase 1 de 3
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <Button variant="secondary" onClick={onSaveDraft} className="w-full sm:w-auto">
            Salvar Rascunho
          </Button>
          <Button
            onClick={() => setShowConfirm(true)}
            disabled={!canComplete}
            className="w-full sm:w-auto"
          >
            Concluir Enquadramento
            <Play className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Concluir Enquadramento?</DialogTitle>
            <DialogDescription>
              Ao concluir, o Lançamento será desbloqueado. Você ainda poderá editar as etapas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>Concluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
