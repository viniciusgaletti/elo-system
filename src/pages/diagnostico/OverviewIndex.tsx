import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Download, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { diagnosesService } from '@/services/diagnoses'
import { Diagnosis } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { usePdfExport, PdfReportData } from '@/hooks/usePdfExport'
import PdfReportTemplate from '@/components/pdf/PdfReportTemplate'
import { SectionErrorBoundary } from '@/components/SectionErrorBoundary'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

interface Props {
  diagnosis: Diagnosis
  refetch: () => void
}

export default function OverviewIndex({ diagnosis, refetch }: Props) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const { exportPdf, isExporting } = usePdfExport()

  const [isEditing, setIsEditing] = useState(false)
  const [processName, setProcessName] = useState(diagnosis.project_scope || '')
  const [processDesc, setProcessDesc] = useState(diagnosis.process_description || '')
  const [saving, setSaving] = useState(false)
  const [reportDataForPdf, setReportDataForPdf] = useState<PdfReportData | null>(null)

  const handleSaveProcess = async () => {
    try {
      setSaving(true)
      await diagnosesService.updateProcess(diagnosis.id, processName, processDesc)
      toast({ title: 'Sucesso', description: 'Processo atualizado.', duration: 4000 })
      setIsEditing(false)
      refetch()
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao salvar processo.',
        variant: 'destructive',
        duration: 4000,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await diagnosesService.delete(diagnosis.id)
      toast({ title: 'Sucesso', description: 'Diagnostico excluido.', duration: 4000 })
      navigate('/dashboard')
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao excluir.',
        variant: 'destructive',
        duration: 4000,
      })
    }
  }

  const handleGeneratePdf = async () => {
    if (diagnosis.status !== 'concluido') return

    const enquadramentoData = JSON.parse(
      localStorage.getItem(`elo-enquadramento-${diagnosis.id}`) || '{}',
    )
    const lancamentoData = JSON.parse(
      localStorage.getItem(`elo-lancamento-${diagnosis.id}`) || '{}',
    )
    const otimizacaoData = JSON.parse(
      localStorage.getItem(`elo-otimizacao-${diagnosis.id}`) || '{}',
    )

    const data: PdfReportData = {
      diagnosis,
      consultantName: user?.user_metadata?.name || user?.email || 'Consultor ELO',
      enquadramento: enquadramentoData,
      lancamento: lancamentoData,
      otimizacao: otimizacaoData,
    }

    setReportDataForPdf(data)

    setTimeout(async () => {
      const dateStr = format(new Date(), 'yyyyMMdd')
      const safeName = diagnosis.company_name.replace(/\s+/g, '-')
      const filename = `ELO-Diagnostico-${safeName}-${dateStr}.pdf`
      try {
        await exportPdf(data, filename)
        toast({ title: 'Sucesso', description: 'PDF exportado com sucesso!', duration: 4000 })
      } catch (err) {
        toast({
          title: 'Erro',
          description: 'Falha ao exportar PDF.',
          variant: 'destructive',
          duration: 4000,
        })
      } finally {
        setReportDataForPdf(null)
      }
    }, 300)
  }

  const phases = [
    {
      id: 'enquadramento',
      title: 'Enquadramento',
      num: '1',
      desc: 'Identificar as etapas do processo e onde a IA pode atuar.',
      completed: diagnosis.enquadramento_completed,
      enabled: true,
      tooltip: '',
    },
    {
      id: 'lancamento',
      title: 'Lançamento',
      num: '2',
      desc: 'Definir soluções práticas e ferramentas para implementar.',
      completed: diagnosis.lancamento_completed,
      enabled: diagnosis.enquadramento_completed,
      tooltip: 'Conclua o Enquadramento primeiro.',
    },
    {
      id: 'otimizacao',
      title: 'Otimização',
      num: '3',
      desc: 'Medir resultados e refinar a solução implementada.',
      completed: diagnosis.otimizacao_completed,
      enabled: diagnosis.lancamento_completed,
      tooltip: 'Conclua o Lançamento primeiro.',
    },
  ]

  const isConcluido = diagnosis.status === 'concluido'

  return (
    <div className="space-y-12 animate-fade-in pb-16">
      {/* Header Block */}
      <header className="space-y-8">
        <Button
          variant="ghost"
          asChild
          className="-ml-4 text-muted-foreground hover:text-foreground"
        >
          <Link to="/dashboard">
            <ArrowLeft className="w-5 h-5 mr-2" /> Voltar aos Diagnósticos
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="text-display tracking-tight text-foreground mb-2">
              {diagnosis.company_name}
            </h1>
            <p className="text-body text-muted-foreground text-lg mb-4">
              {diagnosis.client_name} • {diagnosis.client_role || 'Cargo não definido'}
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-muted/40 font-semibold py-1.5 px-3">
                {diagnosis.segment}
              </Badge>
              <Badge
                variant="outline"
                className={`py-1.5 px-3 font-semibold ${
                  diagnosis.status === 'em_andamento'
                    ? 'text-blue-500 border-blue-500/30 bg-blue-500/10'
                    : 'text-green-500 border-green-500/30 bg-green-500/10'
                }`}
              >
                {diagnosis.status === 'em_andamento' ? 'Em Andamento' : 'Concluído'}
              </Badge>
            </div>
            <p className="text-sm font-medium text-muted-foreground/80">
              Criado em {format(new Date(diagnosis.created_at), 'dd/MM/yyyy', { locale: ptBR })}
            </p>
          </div>
          <SectionErrorBoundary>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="inline-block w-full sm:w-auto">
                    <Button
                      onClick={handleGeneratePdf}
                      variant="secondary"
                      disabled={!isConcluido || isExporting}
                      className={`w-full sm:w-auto ${!isConcluido ? 'pointer-events-none' : ''}`}
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando PDF...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" /> Gerar PDF
                        </>
                      )}
                    </Button>
                  </span>
                </TooltipTrigger>
                {!isConcluido && (
                  <TooltipContent side="top">
                    <p>Conclua todas as fases do diagnostico para exportar o PDF.</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </SectionErrorBoundary>
        </div>
      </header>

      {/* Process Summary Card */}
      <Card className="border-border/60 shadow-sm overflow-hidden bg-gradient-to-br from-card to-muted/20">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border/50 bg-muted/10 pb-4 space-y-4 sm:space-y-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Processo Analisado</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Editar Processo
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <h3 className="text-h3 text-foreground mb-3">
            {diagnosis.project_scope || 'Processo não definido'}
          </h3>
          <p className="text-body text-muted-foreground max-w-4xl leading-relaxed">
            {diagnosis.process_description ||
              'Nenhuma descrição inicial adicionada para este processo.'}
          </p>
        </CardContent>
      </Card>

      {/* ELO Phases Progress Block */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-foreground tracking-tight">Fases do Método ELO</h2>
          <p className="text-body text-muted-foreground mt-2">
            Acompanhe a implementação sequencial do seu projeto de IA.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TooltipProvider>
            {phases.map((phase) => (
              <Card
                key={phase.id}
                className={`flex flex-col relative overflow-hidden transition-all duration-300 ${
                  phase.enabled
                    ? 'border-border hover:border-primary/30 hover:shadow-md'
                    : 'opacity-60 bg-muted/30 border-dashed'
                }`}
              >
                {phase.completed && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-green-500/80"></div>
                )}
                {!phase.completed && phase.enabled && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-4xl font-serif text-muted-foreground/30 font-bold select-none">
                      {phase.num}
                    </span>
                    {phase.completed ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-500/10 text-green-600 border-transparent hover:bg-green-500/20"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Concluído
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground/70 bg-background">
                        Pendente
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl tracking-tight">{phase.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-body text-muted-foreground text-sm mb-8">{phase.desc}</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full">
                        <Button
                          variant={phase.completed ? 'secondary' : 'default'}
                          className="w-full"
                          disabled={!phase.enabled}
                          onClick={() => navigate(`/diagnostico/${diagnosis.id}/${phase.id}`)}
                        >
                          {phase.completed ? `Continuar ${phase.title}` : `Iniciar ${phase.title}`}
                        </Button>
                      </div>
                    </TooltipTrigger>
                    {!phase.enabled && (
                      <TooltipContent side="top">
                        <p className="font-medium">{phase.tooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </CardContent>
              </Card>
            ))}
          </TooltipProvider>
        </div>
      </section>

      {/* Danger Zone */}
      <div className="mt-16 pt-10 border-t border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-3xl bg-destructive/5 border border-destructive/10">
          <div>
            <h3 className="text-lg font-semibold text-destructive flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Excluir Diagnóstico
            </h3>
            <p className="text-muted-foreground mt-1 text-sm max-w-xl">
              Essa ação não pode ser desfeita. Todos os dados, descrições e fases deste diagnóstico
              serão perdidos permanentemente.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="shrink-0 w-full sm:w-auto">
                Excluir Diagnóstico
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Todos os dados deste diagnóstico serão perdidos
                  permanentemente da sua conta.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Sim, excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Edit Process Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Editar Processo</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-3">
              <Label className="text-base">
                Nome do Processo <span className="text-destructive">*</span>
              </Label>
              <Input
                value={processName}
                onChange={(e) => setProcessName(e.target.value)}
                placeholder="Ex: Criação de conteúdo"
                className="bg-background"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-base">
                Descrição Inicial{' '}
                <span className="text-muted-foreground font-normal">(Opcional)</span>
              </Label>
              <Textarea
                value={processDesc}
                onChange={(e) => setProcessDesc(e.target.value)}
                placeholder="Descreva brevemente..."
                className="min-h-[140px] resize-none bg-background"
              />
            </div>
          </div>
          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={saving}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProcess}
              disabled={saving || !processName.trim()}
              className="w-full sm:w-auto min-w-[140px]"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden PDF Template */}
      {reportDataForPdf && <PdfReportTemplate data={reportDataForPdf} />}
    </div>
  )
}
