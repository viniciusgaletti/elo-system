import { supabase } from '@/lib/supabase/client'
import { Diagnosis, Phase } from '@/types'

export const diagnosesService = {
  async getAll(): Promise<Diagnosis[]> {
    const { data, error } = await supabase
      .from('diagnoses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Diagnosis[]
  },

  async getById(id: string): Promise<Diagnosis | null> {
    const { data, error } = await supabase.from('diagnoses').select('*').eq('id', id).single()

    if (error && error.code !== 'PGRST116') throw error
    return data as Diagnosis | null
  },

  async create(client_name: string, project_scope: string): Promise<Diagnosis> {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('diagnoses')
      .insert([
        {
          client_name,
          project_scope,
          user_id: userData.user.id,
          current_phase: 'enquadramento',
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data as Diagnosis
  },

  async updatePhase(id: string, phase: Phase): Promise<Diagnosis> {
    const { data, error } = await supabase
      .from('diagnoses')
      .update({ current_phase: phase, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Diagnosis
  },
}
