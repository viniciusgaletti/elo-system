import { useEffect, useState } from 'react'
import { useParams, Navigate, Outlet, useLocation } from 'react-router-dom'
import { diagnosesService } from '@/services/diagnoses'
import { Diagnosis } from '@/types'
import { PhaseStepper } from '@/components/PhaseStepper'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DiagnosticoOverview() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    diagnosesService
      .getById(id)
      .then(setDiagnosis)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id, location.pathname])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!diagnosis) {
    return <Navigate to="/dashboard" replace />
  }

  if (location.pathname === `/diagnostico/${id}`) {
    return <Navigate to={`/diagnostico/${id}/${diagnosis.current_phase}`} replace />
  }

  return (
    <div className="space-y-12 pb-16">
      <div className="space-y-6">
        <Button variant="ghost" asChild className="-ml-4 text-muted-foreground hover:text-foreground">
          <Link to="/dashboard">
            <ArrowLeft className="w-5 h-5 mr-2" /> Voltar ao Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-display tracking-tight text-foreground">{diagnosis.client_name}</h1>
          <p className="text-body text-muted-foreground max-w-3xl mt-4 text-lg">
            {diagnosis.project_scope}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8">
        <PhaseStepper currentPhase={diagnosis.current_phase} diagId={diagnosis.id} />
      </div>

      <div className="bg-card rounded-[2rem] border border-border/60 shadow-lg p-8 lg:p-12">
        <Outlet context={{ diagnosis }} />
      </div>
    </div>
  )
}
