import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h1 className="text-h2 mb-2 text-center">Algo deu errado.</h1>
          <p className="text-muted-foreground text-center mb-6 max-w-md">
            Ocorreu um erro inesperado no sistema. Por favor, tente recarregar a página.
          </p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      )
    }

    return this.props.children
  }
}
