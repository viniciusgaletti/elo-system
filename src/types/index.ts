export type Phase = 'enquadramento' | 'lancamento' | 'otimizacao'

export interface Diagnosis {
  id: string
  user_id: string
  client_name: string
  project_scope: string | null
  current_phase: Phase
  created_at: string
  updated_at: string
}
