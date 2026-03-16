import { supabase } from '@/lib/supabase/client'
import { handleSupabaseError } from '@/lib/errors'
import { Diagnostico } from '@/types'

const SELECT_FIELDS =
  'id, consultant_id, client_name, company_name, segment, role, process_name, process_description, status, current_phase, enquadramento_completed, lancamento_completed, otimizacao_completed, final_observations, created_at, updated_at'

const mapToDiagnostico = (row: any): Diagnostico => ({
  ...row,
  user_id: row.consultant_id,
  client_role: row.role,
  project_scope: row.process_name,
})

export const diagnosticoService = {
  async getDiagnosticos(): Promise<Diagnostico[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { data, error } = await supabase
      .from('diagnosticos')
      .select(SELECT_FIELDS)
      .eq('consultant_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) throw new Error(handleSupabaseError(error))
    return (data || []).map(mapToDiagnostico)
  },

  async getDiagnosticoById(id: string): Promise<Diagnostico | null> {
    const { data, error } = await supabase
      .from('diagnosticos')
      .select(SELECT_FIELDS)
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(handleSupabaseError(error))
    if (error && error.code === 'PGRST116') return null
    return mapToDiagnostico(data)
  },

  async createDiagnostico(data: {
    client_name: string
    company_name: string
    segment: string
    process_name?: string
    project_scope?: string
    client_role?: string
    process_description?: string
    consultant_id?: string
  }): Promise<string> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Usuario nao autenticado.')
    }

    const { data: result, error } = await supabase
      .from('diagnosticos')
      .insert([
        {
          client_name: data.client_name,
          company_name: data.company_name,
          segment: data.segment,
          role: data.client_role || null,
          process_name: data.process_name || data.project_scope || null,
          process_description: data.process_description || null,
          consultant_id: user.id,
        },
      ])
      .select('id')
      .single()

    if (error || !result) {
      throw new Error('Nao foi possivel criar o diagnostico. Tente novamente.')
    }

    return String(result.id)
  },

  async updateDiagnostico(id: string, updates: Partial<Diagnostico>): Promise<Diagnostico> {
    const { data, error } = await supabase
      .from('diagnosticos')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select(SELECT_FIELDS)
      .single()

    if (error) throw new Error(handleSupabaseError(error))
    return mapToDiagnostico(data)
  },

  async updatePhase(id: string, nextPhase: string): Promise<Diagnostico> {
    const isEnquadramentoDone = nextPhase === 'lancamento' || nextPhase === 'otimizacao'
    const isLancamentoDone = nextPhase === 'otimizacao'

    const { data, error } = await supabase
      .from('diagnosticos')
      .update({ 
        current_phase: nextPhase,
        ...(isEnquadramentoDone && { enquadramento_completed: true }),
        ...(isLancamentoDone && { lancamento_completed: true }),
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select(SELECT_FIELDS)
      .single()

    if (error) throw new Error(handleSupabaseError(error))
    return mapToDiagnostico(data)
  },

  async deleteDiagnostico(id: string): Promise<void> {
    const { error } = await supabase.from('diagnosticos').delete().eq('id', id)
    if (error) throw new Error(handleSupabaseError(error))
  },
}
