export type MeasurementStatus =
  | 'Sim, funcionando bem'
  | 'Funcionando parcialmente'
  | 'Nao esta funcionando'
  | 'Ainda em implementacao'

export interface MeasuredResult {
  realTimeGain: string
  realQualityGain: string
  realResult: string
  status: MeasurementStatus
}

export interface Refinement {
  id: string
  step: string
  what: string
  why: string
  result: string
  date: string
}

export interface RefinementSuggestion {
  title: string
  explanation: string
  priority: 'Alta prioridade' | 'Media prioridade' | 'Baixa prioridade'
}
