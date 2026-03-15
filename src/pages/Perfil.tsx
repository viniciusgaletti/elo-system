import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Perfil() {
  const { user } = useAuth()

  const userEmail = user?.email || 'N/A'
  const initial = userEmail.charAt(0).toUpperCase()

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-h1">Perfil do Consultor</h1>
        <p className="text-body text-muted-foreground mt-1">Gerencie suas informações de conta.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Detalhes sincronizados via Supabase Auth.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${user?.id || 1}`} />
            <AvatarFallback className="text-2xl">{initial}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <p className="text-small text-muted-foreground">Endereço de Email</p>
            <p className="text-h3">{userEmail}</p>
            <div className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
              Conta Ativa
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="opacity-60 pointer-events-none">
        <CardHeader>
          <CardTitle>Preferências do Sistema</CardTitle>
          <CardDescription>Em breve: personalização de notificações e relatórios.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
