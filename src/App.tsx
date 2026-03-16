import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/hooks/use-theme'
import { AuthProvider } from '@/hooks/use-auth'
import { ErrorBoundary } from '@/components/ErrorBoundary'

import Layout from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import NovoDiagnostico from '@/pages/diagnostico/Novo'
import DiagnosticoOverview from '@/pages/diagnostico/Overview'
import DiagnosticoEnquadramento from '@/pages/diagnostico/Enquadramento'
import DiagnosticoLancamento from '@/pages/diagnostico/Lancamento'
import DiagnosticoOtimizacao from '@/pages/diagnostico/Otimizacao'
import Perfil from '@/pages/Perfil'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/diagnostico/novo" element={<NovoDiagnostico />} />

                  <Route path="/diagnostico/:id" element={<DiagnosticoOverview />}>
                    <Route path="enquadramento" element={<DiagnosticoEnquadramento />} />
                    <Route path="lancamento" element={<DiagnosticoLancamento />} />
                    <Route path="otimizacao" element={<DiagnosticoOtimizacao />} />
                  </Route>

                  <Route path="/perfil" element={<Perfil />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
