import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function Perfil() {
  const { user, signOut } = useAuth()

  const userEmail = user?.email || 'N/A'
  const initial = userEmail.charAt(0).toUpperCase()

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-fade-in-up">
      <div>
        <h1 className="text-display tracking-tight mb-3">Perfil</h1>
        <p className="text-body text-muted-foreground text-lg">
          Gerencie suas informações e preferências do ELO System.
        </p>
      </div>

      <Card className="shadow-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-secondary/30"></div>
        <CardHeader className="relative z-10 pt-20 pb-4">
          <div className="flex items-end gap-6">
            <Avatar className="h-28 w-28 border-4 border-card bg-card shadow-sm">
              <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${user?.id || 1}`} />
              <AvatarFallback className="text-4xl text-primary-foreground bg-primary">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="pb-2">
              <CardTitle className="text-h2">{userEmail.split('@')[0]}</CardTitle>
              <CardDescription className="text-base mt-1">{userEmail}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-muted/40 rounded-2xl border border-border/50">
              <p className="text-sm font-medium text-muted-foreground mb-1">Status da Conta</p>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                <span className="font-semibold text-foreground">Ativa (Consultor IA)</span>
              </div>
            </div>
            <div className="p-6 bg-muted/40 rounded-2xl border border-border/50 flex flex-col justify-center items-start">
              <p className="text-sm font-medium text-muted-foreground mb-3">Ações</p>
              <Button variant="outline" onClick={() => signOut()} className="w-full sm:w-auto">
                Encerrar Sessão
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="opacity-60 pointer-events-none border-dashed border-2 bg-transparent shadow-none">
        <CardHeader>
          <CardTitle>Preferências do Sistema</CardTitle>
          <CardDescription className="text-base">
            Em breve: personalização de notificações e relatórios avançados.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
