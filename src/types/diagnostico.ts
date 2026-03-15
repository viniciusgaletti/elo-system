export type DiagnosticoStatus = 'em_andamento' | 'concluido' | 'pausado'

export type DiagnosticoPhase = 'enquadramento' | 'lancamento' | 'otimizacao'

export type DiagnosticoSegmento =
  | 'Varejo'
  | 'Saude'
  | 'Educacao'
  | 'Tecnologia'
  | 'Financeiro'
  | 'Industria'
  | 'Servicos'
  | 'Alimentacao'
  | 'Outro'

export interface CreateDiagnosticoInput {
  client_name: string
  company_name: string
  segment: DiagnosticoSegmento
  role?: string
  process_name: string
  process_description?: string
  status: DiagnosticoStatus
  current_phase: DiagnosticoPhase
  consultant_id: string
}

export interface Diagnostico {
  id: string
  client_name: string
  company_name: string
  segment: DiagnosticoSegmento
  role?: string
  process_name: string
  process_description?: string
  status: DiagnosticoStatus
  current_phase: DiagnosticoPhase
  consultant_id: string
  created_at: string
  updated_at: string
}
