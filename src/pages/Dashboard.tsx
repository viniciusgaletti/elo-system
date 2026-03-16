import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  PlusCircle,
  Calendar,
  LayoutTemplate,
  Search,
  RefreshCcw,
  AlertCircle,
  ClipboardList,
} from 'lucide-react'
import { useDiagnosticos } from '@/hooks/useDiagnosticos'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionErrorBoundary } from '@/components/SectionErrorBoundary'

const phaseLabels = {
  enquadramento: 'Enquadramento',
  lancamento: 'Lançamento',
  otimizacao: 'Otimização',
}

const phaseColors = {
  enquadramento: 'bg-secondary text-secondary-foreground border-transparent',
  lancamento: 'bg-muted text-muted-foreground border-transparent',
  otimizacao: 'bg-primary text-primary-foreground border-transparent',
}

const statusLabels = {
  em_andamento: 'Em Andamento',
  concluido: 'Concluído',
}

const statusColors = {
  em_andamento: 'text-blue-500 border-blue-500/30 bg-blue-500/10',
  concluido: 'text-green-500 border-green-500/30 bg-green-500/10',
}

export default function Dashboard() {
  const { data, allData, loading, error, searchQuery, setSearchQuery, refetch } = useDiagnosticos()

  const total = allData.length
  const emAndamento = allData.filter((d) => d.status === 'em_andamento').length
  const concluidos = allData.filter((d) => d.status === 'concluido').length

  const isSearchEmpty = data.length === 0 && searchQuery.length > 0 && !loading
  const isCompletelyEmpty = allData.length === 0 && !loading && !error

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-display mb-2 text-foreground">Seus Diagnósticos</h1>
        <p className="text-body text-muted-foreground">
          Acompanhe e gerencie todos os seus projetos do ELO Method.
        </p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="shadow-sm bg-card border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total de Diagnósticos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-10 w-16" /> : <div className="text-h1">{total}</div>}
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-card border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Em Andamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              <div className="text-h1 text-blue-500/90">{emAndamento}</div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-card border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Concluídos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              <div className="text-h1 text-green-500/90">{concluidos}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Buscar por cliente ou empresa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-background border-border/60 text-base"
            disabled={loading || isCompletelyEmpty}
          />
        </div>
        <Button asChild size="lg" className="shrink-0 shadow-sm w-full sm:w-auto">
          <Link to="/diagnostico/novo">
            <PlusCircle className="mr-2 h-5 w-5" />
            Novo Diagnóstico
          </Link>
        </Button>
      </div>

      {/* Grid & States */}
      {error ? (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <h3 className="text-h3 mb-2">{error}</h3>
            <Button onClick={refetch} variant="outline" className="mt-4">
              <RefreshCcw className="w-4 h-4 mr-2" /> Tentar novamente
            </Button>
          </CardContent>
        </Card>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="flex flex-col border border-border/60 p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div>
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
              <Skeleton className="h-12 w-full" />
              <div className="flex justify-between items-center pt-4 border-t border-border/50">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-24 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : isCompletelyEmpty ? (
        <Card className="border-dashed border-2 bg-transparent shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
              <ClipboardList className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-h2 mb-3">Nenhum diagnostico ainda</h3>
            <p className="text-body text-muted-foreground mb-8 max-w-md">
              Crie seu primeiro diagnostico ELO para comecar.
            </p>
            <Button asChild size="lg">
              <Link to="/diagnostico/novo">Criar Diagnostico</Link>
            </Button>
          </CardContent>
        </Card>
      ) : isSearchEmpty ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-h3 text-muted-foreground">Nenhum resultado para sua busca.</h3>
        </div>
      ) : (
        <SectionErrorBoundary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
            {data.map((diag) => (
              <Card
                key={diag.id}
                className="group hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col bg-card"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="font-semibold bg-muted/40 text-muted-foreground border-border/50"
                      >
                        {diag.segment}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`font-semibold ${phaseColors[diag.current_phase]}`}
                      >
                        {phaseLabels[diag.current_phase]}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`font-semibold ${statusColors[diag.status]}`}
                      >
                        {statusLabels[diag.status]}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle
                    className="text-h3 text-foreground line-clamp-1 mb-1"
                    title={diag.company_name}
                  >
                    {diag.company_name}
                  </CardTitle>
                  <CardDescription className="text-body text-muted-foreground">
                    {diag.client_name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-body text-muted-foreground line-clamp-2">
                    {diag.project_scope || 'Sem escopo definido.'}
                  </p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between items-center border-t border-border/50 mt-4 pt-6">
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(diag.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary rounded-full transition-colors"
                  >
                    <Link to={`/diagnostico/${diag.id}`}>Abrir</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </SectionErrorBoundary>
      )}
    </div>
  )
}
