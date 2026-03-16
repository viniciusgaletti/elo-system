import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Save, CheckCircle2 } from 'lucide-react'

interface Props {
  canComplete: boolean
  onSaveDraft: () => void
  onComplete: () => void
}

export function OtimizacaoBottomBar({ canComplete, onSaveDraft, onComplete }: Props) {
  return (
    <div className="fixed bottom-0 left-0 lg:left-[var(--sidebar-width,16rem)] right-0 border-t border-border/50 bg-background/80 backdrop-blur-md z-40 p-4 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-muted-foreground hidden sm:block uppercase tracking-wider">
          Fase 3 de 3
        </span>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={onSaveDraft} className="flex-1 sm:flex-none">
            <Save className="w-4 h-4 sm:mr-2" />{' '}
            <span className="hidden sm:inline">Salvar Rascunho</span>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={!canComplete}
                className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <CheckCircle2 className="w-4 h-4 sm:mr-2" />{' '}
                <span className="hidden sm:inline">Concluir Diagnóstico</span>
                <span className="sm:hidden">Concluir</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Finalizar Diagnóstico</DialogTitle>
                <DialogDescription>
                  Você está prestes a concluir o projeto e marcar o diagnóstico como finalizado.
                  Deseja continuar?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={onComplete}>Sim, Concluir Projeto</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
