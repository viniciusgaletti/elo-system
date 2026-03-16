import { useParams, Outlet, useLocation, Link } from 'react-router-dom'
import { PhaseStepper } from '@/components/PhaseStepper'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useDiagnostico } from '@/hooks/useDiagnostico'
import OverviewIndex from './OverviewIndex'

export default function DiagnosticoOverview() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const { data: diagnosis, loading, error, refetch } = useDiagnostico(id!)

  if (loading) {
    return (
      <div className="space-y-12 animate-fade-in pb-16 w-full">
        <div className="space-y-8">
          <Skeleton className="w-48 h-10 rounded-full" />
          <div>
            <Skeleton className="w-3/4 md:w-1/2 h-12 mb-4" />
            <Skeleton className="w-64 h-6" />
          </div>
        </div>
        <Skeleton className="w-full h-48 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-72 rounded-3xl" />
          <Skeleton className="h-72 rounded-3xl" />
          <Skeleton className="h-72 rounded-3xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <h3 className="text-h2 mb-4 text-foreground">
          Não foi possível carregar este diagnóstico.
        </h3>
        <p className="text-body text-muted-foreground mb-8 max-w-md">
          Ocorreu um erro ao buscar os dados. Verifique sua conexão e tente novamente.
        </p>
        <Button onClick={refetch} size="lg">
          Tentar novamente
        </Button>
      </div>
    )
  }

  if (!diagnosis) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <h3 className="text-h2 mb-4">Diagnóstico não encontrado.</h3>
        <p className="text-body text-muted-foreground mb-8 max-w-md">
          O projeto que você está procurando não existe ou pode ter sido excluído.
        </p>
        <Button asChild size="lg">
          <Link to="/dashboard">Voltar ao Dashboard</Link>
        </Button>
      </div>
    )
  }

  // Determine if we are exactly at /diagnostico/:id (with or without trailing slash)
  const isOverview = location.pathname.replace(/\/$/, '') === `/diagnostico/${id}`

  if (isOverview) {
    return <OverviewIndex diagnosis={diagnosis} refetch={refetch} />
  }

  // Render the Phase Layout if we are inside a specific phase (e.g., /enquadramento)
  return (
    <div className="space-y-10 pb-16 animate-fade-in">
      <div className="space-y-6">
        <Button
          variant="ghost"
          asChild
          className="-ml-4 text-muted-foreground hover:text-foreground"
        >
          <Link to={`/diagnostico/${id}`}>
            <ArrowLeft className="w-5 h-5 mr-2" /> Voltar à Visão Geral
          </Link>
        </Button>
        <div>
          <h1 className="text-display tracking-tight text-foreground">{diagnosis.company_name}</h1>
          <p className="text-body text-muted-foreground max-w-3xl mt-3 text-lg">
            {diagnosis.project_scope || 'Processo não definido'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6">
        <PhaseStepper currentPhase={diagnosis.current_phase} diagId={diagnosis.id} />
      </div>

      <div className="bg-card rounded-[2rem] border border-border/60 shadow-lg p-6 sm:p-8 lg:p-12 relative overflow-hidden">
        <Outlet context={{ diagnosis, refetch }} />
      </div>
    </div>
  )
}
