import { supabase } from '@/lib/supabase/client'
import { handleSupabaseError } from '@/lib/errors'
import { RefinementSuggestion } from '@/types/otimizacao'

export const otimizacaoService = {
  async saveOtimizacao(
    diagnosticoId: string,
    consultantId: string,
    measuredResults: any,
    refinements: any,
    finalObservations: string,
  ) {
    const { error } = await supabase.from('otimizacao_data').upsert(
      {
        diagnostico_id: diagnosticoId,
        consultant_id: consultantId,
        measured_results: measuredResults,
        refinements,
        final_observations: finalObservations,
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

  async loadOtimizacao(diagnosticoId: string) {
    const { data, error } = await supabase
      .from('otimizacao_data')
      .select('measured_results, refinements, final_observations')
      .eq('diagnostico_id', diagnosticoId)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(handleSupabaseError(error))
    return data || { measured_results: {}, refinements: [], final_observations: '' }
  },

  async completeDiagnostico(diagnosticoId: string) {
    const { error } = await supabase
      .from('diagnosticos')
      .update({
        status: 'concluido',
        otimizacao_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', diagnosticoId)
    if (error) throw new Error(handleSupabaseError(error))
  },

  async suggestRefinements(
    processName: string,
    steps: any[],
    solutions: any,
    measuredResults: any,
    existingRefinements: any[],
  ): Promise<RefinementSuggestion[]> {
    const { data, error } = await supabase.functions.invoke('suggest-refinements', {
      body: { processName, steps, solutions, measuredResults, existingRefinements },
    })
    if (error) throw new Error(error.message || 'Falha ao conectar com o serviço de IA')
    if (data?.error) throw new Error(data.error)
    return data.suggestions || []
  },
}
