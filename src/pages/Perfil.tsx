import { useProfile } from '@/hooks/useProfile'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { LogOut, Loader2, CheckCircle2, LayoutDashboard, Clock } from 'lucide-react'

export default function Perfil() {
  const {
    user,
    loading,
    stats,
    name,
    setName,
    updateName,
    savingName,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    updatePassword,
    changingPass,
    handleSignOut,
  } = useProfile()

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
        <div className="space-y-4">
          <Skeleton className="w-48 h-12" />
          <Skeleton className="w-96 h-6" />
        </div>
        <Skeleton className="w-full h-40 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="w-full h-32 rounded-3xl" />
          <Skeleton className="w-full h-32 rounded-3xl" />
          <Skeleton className="w-full h-32 rounded-3xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-80 rounded-3xl" />
          <Skeleton className="w-full h-96 rounded-3xl" />
        </div>
      </div>
    )
  }

  const userEmail = user?.email || 'N/A'
  const initial = name ? name.charAt(0).toUpperCase() : userEmail.charAt(0).toUpperCase()

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up pb-16">
      <div>
        <h1 className="text-display tracking-tight mb-3">Perfil</h1>
        <p className="text-body text-muted-foreground text-lg">
          Gerencie suas informações e credenciais do ELO System.
        </p>
      </div>

      <Card className="shadow-sm overflow-hidden relative border-border/60 bg-card">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <CardHeader className="relative z-10 pt-12 pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
            <Avatar className="h-24 w-24 border-4 border-card bg-card shadow-sm">
              <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${user?.id || 1}`} />
              <AvatarFallback className="text-3xl text-primary-foreground bg-primary font-serif font-bold">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="pb-1">
              <CardTitle className="text-h2 text-foreground">{name || 'Consultor IA'}</CardTitle>
              <CardDescription className="text-base mt-1 text-muted-foreground">
                {userEmail}
              </CardDescription>
            </div>
            <Badge className="sm:ml-auto mt-4 sm:mt-0 mb-2">Conta Ativa</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-card border-border/60 shadow-sm">
          <CardContent className="p-6 flex flex-col justify-center items-center text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <LayoutDashboard className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total de diagnósticos
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border/60 shadow-sm">
          <CardContent className="p-6 flex flex-col justify-center items-center text-center space-y-2">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.concluido}</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Concluídos
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border/60 shadow-sm">
          <CardContent className="p-6 flex flex-col justify-center items-center text-center space-y-2">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.emAndamento}</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Em andamento
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-border/60 shadow-sm bg-card h-fit">
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>Atualize seu nome e informações de contato.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={userEmail}
                disabled
                className="bg-muted/50 cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">O email nao pode ser alterado.</p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/20 border-t border-border/50 pt-6">
            <Button
              onClick={updateName}
              disabled={savingName || !name.trim()}
              className="w-full sm:w-auto"
            >
              {savingName ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...
                </>
              ) : (
                'Salvar Dados'
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-border/60 shadow-sm bg-card h-fit">
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Altere sua senha de acesso ao sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current">Senha atual</Label>
              <Input
                id="current"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">Nova senha</Label>
              <Input
                id="new"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirmar nova senha</Label>
              <Input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/20 border-t border-border/50 pt-6">
            <Button
              onClick={updatePassword}
              disabled={changingPass || !currentPassword || !newPassword || !confirmPassword}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {changingPass ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Alterando...
                </>
              ) : (
                'Alterar Senha'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="p-6 rounded-3xl bg-destructive/5 border border-destructive/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div>
          <h3 className="text-lg font-semibold text-destructive">Encerrar Sessão</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Sair da sua conta no dispositivo atual.
          </p>
        </div>
        <Button variant="destructive" onClick={handleSignOut} className="w-full sm:w-auto shrink-0">
          <LogOut className="w-4 h-4 mr-2" /> Encerrar Sessao
        </Button>
      </div>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 ${className}`}
    >
      {children}
    </div>
  )
}
