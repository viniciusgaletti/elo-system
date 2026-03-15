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
        <SidebarHeader className="p-6 border-b border-sidebar-border">
          <Link
            to="/dashboard"
            className="text-h2 font-serif font-bold text-sidebar-foreground hover:text-sidebar-primary transition-colors tracking-tight"
          >
            ELO System
          </Link>
        </SidebarHeader>
        <SidebarContent className="py-6">
          <SidebarGroup>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                    <Link to={item.href} className="flex items-center gap-4 px-4 py-3 text-base">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-6 border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => signOut()}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-5 h-5 mr-1" />
                <span className="font-medium">Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-background relative">
        <header className="h-20 flex items-center justify-between px-6 lg:px-12 border-b border-border/50 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden text-foreground" />
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground lg:hidden">
              ELO System
            </span>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 rounded-full hover:bg-accent text-foreground transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1100px] mx-auto p-6 md:p-12 lg:p-16 animate-fade-in-up space-y-16">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
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
