import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PlusCircle, Loader2, Calendar, LayoutTemplate } from 'lucide-react'
import { diagnosesService } from '@/services/diagnoses'
import { Diagnosis } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const phaseLabels = {
  enquadramento: 'Enquadramento',
  lancamento: 'Lançamento',
  otimizacao: 'Otimização',
}

const phaseColors = {
  enquadramento: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  lancamento: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  otimizacao: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
}

export default function Dashboard() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await diagnosesService.getAll()
        setDiagnoses(data)
      } catch (error) {
        console.error('Failed to fetch diagnoses', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDiagnoses()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-h1">Dashboard</h1>
          <p className="text-body text-muted-foreground mt-1">
            Você tem {diagnoses.length} projeto{diagnoses.length !== 1 ? 's' : ''} ativo
            {diagnoses.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/diagnostico/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Diagnóstico
          </Link>
        </Button>
      </div>

      {diagnoses.length === 0 ? (
        <Card className="border-dashed bg-transparent shadow-none">
          <CardContent className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <LayoutTemplate className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-h3 mb-2">Nenhum diagnóstico encontrado</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Comece aplicando o Método ELO com seu primeiro cliente.
            </p>
            <Button asChild variant="secondary">
              <Link to="/diagnostico/novo">Criar Primeiro Diagnóstico</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {diagnoses.map((diag) => (
            <Card
              key={diag.id}
              className="group hover:border-primary/50 transition-colors flex flex-col"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant="outline"
                    className={`font-normal border-transparent ${phaseColors[diag.current_phase]}`}
                  >
                    {phaseLabels[diag.current_phase]}
                  </Badge>
                </div>
                <CardTitle className="text-h3 line-clamp-1" title={diag.client_name}>
                  {diag.client_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-small text-muted-foreground line-clamp-2">
                  {diag.project_scope || 'Sem escopo definido.'}
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center border-t border-border mt-4 pt-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {format(new Date(diag.created_at), "dd 'de' MMM, yyyy", { locale: ptBR })}
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <Link to={`/diagnostico/${diag.id}`}>Acessar</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
