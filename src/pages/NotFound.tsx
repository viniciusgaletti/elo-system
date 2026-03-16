import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SearchX } from 'lucide-react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-muted/30"></div>

      <div className="max-w-md w-full text-center space-y-6 relative z-10 animate-fade-in-up">
        <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-8 border border-border/50 shadow-sm">
          <SearchX className="w-12 h-12 text-muted-foreground" />
        </div>

        <h1 className="text-display font-serif tracking-tight text-foreground">
          Pagina nao encontrada
        </h1>

        <p className="text-body text-muted-foreground text-lg">
          A pagina que voce esta procurando nao existe ou foi movida para outro endereco.
        </p>

        <div className="pt-8">
          <Button
            size="lg"
            asChild
            className="rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Link to="/dashboard">Voltar ao Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
