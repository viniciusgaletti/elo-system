import { supabase } from '@/lib/supabase/client'
import { handleSupabaseError } from '@/lib/errors'

export const enquadramentoService = {
  async saveEnquadramento(
    diagnosticoId: string,
    consultantId: string,
    steps: any[],
    analysisResult: any,
  ) {
    const { error } = await supabase.from('enquadramento_data').upsert(
      {
        diagnostico_id: diagnosticoId,
        consultant_id: consultantId,
        steps,
        analysis_result: analysisResult,
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

  async loadEnquadramento(diagnosticoId: string) {
    const { data, error } = await supabase
      .from('enquadramento_data')
      .select('steps, analysis_result')
      .eq('diagnostico_id', diagnosticoId)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(handleSupabaseError(error))
    return data || { steps: [], analysis_result: null }
  },

  async completeEnquadramento(diagnosticoId: string) {
    const { error } = await supabase
      .from('diagnosticos')
      .update({
        current_phase: 'lancamento',
        enquadramento_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', diagnosticoId)
    if (error) throw new Error(handleSupabaseError(error))
  },
}
