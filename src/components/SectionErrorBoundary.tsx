import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Section Error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 flex flex-col items-center justify-center text-center my-4">
          <AlertCircle className="w-8 h-8 text-destructive mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-1">Algo deu errado aqui.</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ocorreu um erro inesperado ao carregar esta seção.
          </p>
          <Button variant="outline" size="sm" onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
