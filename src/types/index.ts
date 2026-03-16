export type Phase = 'enquadramento' | 'lancamento' | 'otimizacao'
export type Status = 'em_andamento' | 'concluido'

export interface Diagnostico {
  id: string
  consultant_id: string
  user_id?: string // For backwards compatibility
  client_name: string
  company_name: string | null
  segment: string | null
  role: string | null
  client_role?: string | null // For backwards compatibility
  process_name: string | null
  project_scope?: string | null // For backwards compatibility
  process_description: string | null
  status: Status
  current_phase: Phase
  enquadramento_completed: boolean
  lancamento_completed: boolean
  otimizacao_completed: boolean
  final_observations: string | null
  created_at: string
  updated_at: string
}

export type Diagnosis = Diagnostico

export interface Profile {
  id: string
  email: string
  name: string | null
  created_at: string
  updated_at: string
}
