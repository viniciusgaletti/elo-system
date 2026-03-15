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
  enquadramento: 'bg-secondary text-secondary-foreground',
  lancamento: 'bg-muted text-muted-foreground',
  otimizacao: 'bg-primary text-primary-foreground',
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
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-display mb-2">Dashboard</h1>
          <p className="text-body text-muted-foreground">
            Você tem {diagnoses.length} projeto{diagnoses.length !== 1 ? 's' : ''} ativo{diagnoses.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0 shadow-sm">
          <Link to="/diagnostico/novo">
            <PlusCircle className="mr-2 h-5 w-5" />
            Novo Diagnóstico
          </Link>
        </Button>
      </div>

      {diagnoses.length === 0 ? (
        <Card className="border-dashed border-2 bg-transparent shadow-none">
          <CardContent className="flex flex-col items-center justify-center h-80 text-center p-12">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
              <LayoutTemplate className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-h2 mb-3">Nenhum projeto encontrado</h3>
            <p className="text-body text-muted-foreground mb-8 max-w-md">
              Comece aplicando o Método ELO com seu primeiro cliente para transformar a operação deles com Inteligência Artificial.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/diagnostico/novo">Criar Primeiro Diagnóstico</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {diagnoses.map((diag) => (
            <Card
              key={diag.id}
              className="group hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <Badge
                    variant="outline"
                    className={`font-medium border-transparent ${phaseColors[diag.current_phase]}`}
                  >
                    {phaseLabels[diag.current_phase]}
                  </Badge>
                </div>
                <CardTitle className="text-h3 line-clamp-1 text-foreground" title={diag.client_name}>
                  {diag.client_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-body text-muted-foreground line-clamp-3">
                  {diag.project_scope || 'Sem escopo definido.'}
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center border-t border-border/50 mt-6 pt-6">
                <div className="flex items-center text-sm font-medium text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(diag.created_at), "dd 'de' MMM, yyyy", { locale: ptBR })}
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="group-hover:bg-primary group-hover:text-primary-foreground rounded-full"
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
