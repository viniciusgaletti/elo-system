import { Outlet, Link, useLocation } from 'react-router-dom'
import { Sun, Moon, LayoutDashboard, PlusCircle, User, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useTheme } from '@/hooks/use-theme'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export default function Layout() {
  const { signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Novo Diagnóstico', href: '/diagnostico/novo', icon: PlusCircle },
    { name: 'Perfil', href: '/perfil', icon: User },
  ]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-border">
          <Link
            to="/dashboard"
            className="text-h2 text-primary hover:opacity-90 transition-opacity"
          >
            ELO System
          </Link>
        </SidebarHeader>
        <SidebarContent className="py-4">
          <SidebarGroup>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                    <Link to={item.href} className="flex items-center gap-3 px-3 py-2 text-small">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => signOut()}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-background relative">
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-border bg-card z-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <span className="text-h3 lg:hidden text-primary">ELO System</span>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md hover:bg-accent text-foreground transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto p-5 lg:p-8 animate-fade-in-up">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
