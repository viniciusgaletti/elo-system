import { supabase } from '@/lib/supabase/client'
import { handleSupabaseError } from '@/lib/errors'
import { Profile } from '@/types'

export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, name, created_at, updated_at')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(handleSupabaseError(error))
    if (error && error.code === 'PGRST116') return null
    return data as Profile
  },

  async updateProfile(userId: string, name: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ name, updated_at: new Date().toISOString() })
      .eq('id', userId)

    if (error) throw new Error(handleSupabaseError(error))
  },

  async changePassword(current: string, newPass: string, email: string): Promise<void> {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: current,
    })
    if (signInError) throw new Error('Senha atual incorreta.')

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPass,
    })
    if (updateError) throw new Error('Falha ao atualizar a senha.')
  },

  async getStats(
    userId: string,
  ): Promise<{ total: number; concluido: number; emAndamento: number }> {
    const { data, error } = await supabase
      .from('diagnosticos')
      .select('status')
      .eq('consultant_id', userId)

    if (error) throw new Error(handleSupabaseError(error))

    const validData = data || []
    const total = validData.length
    const concluido = validData.filter((d) => d.status === 'concluido').length
    const emAndamento = validData.filter((d) => d.status === 'em_andamento').length

    return { total, concluido, emAndamento }
  },
}
