import { diagnosticoService } from './diagnosticoService'
import { enquadramentoService } from './enquadramentoService'
import { lancamentoService } from './lancamentoService'
import { otimizacaoService } from './otimizacaoService'
import { supabase } from '@/lib/supabase/client'
import { PdfReportData } from '@/hooks/usePdfExport'

export const pdfService = {
  async getPdfData(diagnosticoId: string): Promise<PdfReportData> {
    const diag = await diagnosticoService.getDiagnosticoById(diagnosticoId)
    if (!diag) throw new Error('Diagnóstico não encontrado.')

    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', diag.consultant_id)
      .single()

    const enq = await enquadramentoService.loadEnquadramento(diagnosticoId)
    const lanc = await lancamentoService.loadLancamento(diagnosticoId)
    const otim = await otimizacaoService.loadOtimizacao(diagnosticoId)

    return {
      diagnosis: diag,
      consultantName: profile?.name || 'Consultor ELO',
      enquadramento: {
        steps: enq.steps,
        analysisResult: enq.analysis_result,
      },
      lancamento: lanc.implementations,
      otimizacao: {
        measuredResults: otim.measured_results,
        refinements: otim.refinements,
        finalObservations: otim.final_observations,
      },
    }
  },
}
