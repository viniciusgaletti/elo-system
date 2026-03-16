import { supabase } from '@/lib/supabase/client'
import { handleSupabaseError } from '@/lib/errors'

export const lancamentoService = {
  async saveLancamento(diagnosticoId: string, consultantId: string, implementations: any) {
    const { error } = await supabase.from('lancamento_data').upsert(
      {
        diagnostico_id: diagnosticoId,
        consultant_id: consultantId,
        implementations,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'diagnostico_id' },
    )
    if (error) throw new Error(handleSupabaseError(error))

    const { error: error2 } = await supabase
      .from('diagnosticos')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', diagnosticoId)
    if (error2) throw new Error(handleSupabaseError(error2))
  },

  async loadLancamento(diagnosticoId: string) {
    const { data, error } = await supabase
      .from('lancamento_data')
      .select('implementations')
      .eq('diagnostico_id', diagnosticoId)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(handleSupabaseError(error))
    return data || { implementations: {} }
  },

  async completeLancamento(diagnosticoId: string) {
    const { error } = await supabase
      .from('diagnosticos')
      .update({
        current_phase: 'otimizacao',
        lancamento_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', diagnosticoId)
    if (error) throw new Error(handleSupabaseError(error))
  },
}
