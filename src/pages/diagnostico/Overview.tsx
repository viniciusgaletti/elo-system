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
  }, [id, location.pathname]) // Re-fetch if pathname changes to catch phase updates

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!diagnosis) {
    return <Navigate to="/dashboard" replace />
  }

  // If we are exactly at /diagnostico/:id, redirect to its current phase
  if (location.pathname === `/diagnostico/${id}`) {
    return <Navigate to={`/diagnostico/${id}/${diagnosis.current_phase}`} replace />
  }

  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-4">
        <Button variant="ghost" asChild className="-ml-4 text-muted-foreground">
          <Link to="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-h1">{diagnosis.client_name}</h1>
          <p className="text-body text-muted-foreground max-w-3xl mt-2">
            {diagnosis.project_scope}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <PhaseStepper currentPhase={diagnosis.current_phase} diagId={diagnosis.id} />
      </div>

      <div className="bg-card rounded-xl border border-border shadow-subtle p-6 lg:p-8">
        <Outlet context={{ diagnosis }} />
      </div>
    </div>
  )
}
