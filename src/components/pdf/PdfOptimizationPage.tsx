import { PdfReportData } from '@/hooks/usePdfExport'
import { PAGE_STYLE, PdfGlobalFooter, SectionTitle, statusColor } from './PdfShared'

export function PdfOptimizationPage({
  data,
  totalPages,
}: {
  data: PdfReportData
  totalPages: number
}) {
  const steps = data.enquadramento.steps || []
  const stepAnalysis = data.enquadramento.analysisResult?.stepAnalysis || []
  const eligibleSteps = stepAnalysis.filter(
    (s: any) => s.verdict === 'Candidata a IA' || s.verdict === 'Possível candidata',
  )
  const measuredResults = data.otimizacao.measuredResults || {}
  const refinements = data.otimizacao.refinements || []
  const finalObservations = data.otimizacao.finalObservations || ''

  return (
    <div data-pdf-page style={PAGE_STYLE}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', margin: 0, color: '#0f172a', fontWeight: 600 }}>
          Otimização e Conclusão
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <SectionTitle>Resumo Quantitativo</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '4px',
                }}
              >
                {steps.length}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                Etapas Analisadas
              </div>
            </div>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#eff6ff',
                borderRadius: '12px',
                border: '1px solid #bfdbfe',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#3b82f6',
                  marginBottom: '4px',
                }}
              >
                {eligibleSteps.length}
              </div>
              <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 500 }}>
                Com Potencial IA
              </div>
            </div>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '1px solid #bbf7d0',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#22c55e',
                  marginBottom: '4px',
                }}
              >
                {
                  Object.values(measuredResults).filter(
                    (r: any) => r.status === 'Sim, funcionando bem',
                  ).length
                }
              </div>
              <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 500 }}>
                Funcionando Bem
              </div>
            </div>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#faf5ff',
                borderRadius: '12px',
                border: '1px solid #e9d5ff',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#9333ea',
                  marginBottom: '4px',
                }}
              >
                {refinements.length}
              </div>
              <div style={{ fontSize: '12px', color: '#9333ea', fontWeight: 500 }}>
                Refinamentos
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>Resultados Medidos</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {eligibleSteps.map((step: any, i: number) => {
              const res = measuredResults[step.step] || {}
              const imp = data.lancamento[step.step] || {}
              return (
                <div
                  key={i}
                  style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    fontSize: '13px',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <strong style={{ color: '#0f172a', fontSize: '14px' }}>{step.step}</strong>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '11px',
                        backgroundColor: statusColor(res.status) + '20',
                        color: statusColor(res.status),
                        fontWeight: 700,
                      }}
                    >
                      {res.status || 'Pendente'}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '24px',
                      backgroundColor: '#fff',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#94a3b8',
                          marginBottom: '4px',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}
                      >
                        Esperado
                      </div>
                      <div style={{ color: '#475569', lineHeight: 1.4 }}>
                        {imp.expectedResult || '-'}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#94a3b8',
                          marginBottom: '4px',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}
                      >
                        Realizado
                      </div>
                      <div style={{ color: '#0f172a', fontWeight: 600, lineHeight: 1.4 }}>
                        {res.realResult || '-'}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <SectionTitle>Refinamentos Registrados</SectionTitle>
          {refinements.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {refinements.map((ref: any, i: number) => (
                <div
                  key={i}
                  style={{
                    padding: '16px',
                    borderLeft: '4px solid #9333ea',
                    backgroundColor: '#fff',
                    fontSize: '13px',
                    borderTop: '1px solid #f1f5f9',
                    borderRight: '1px solid #f1f5f9',
                    borderBottom: '1px solid #f1f5f9',
                    borderRadius: '0 8px 8px 0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      color: '#64748b',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    <span
                      style={{
                        color: '#9333ea',
                        backgroundColor: '#faf5ff',
                        padding: '2px 8px',
                        borderRadius: '12px',
                      }}
                    >
                      {ref.step}
                    </span>
                    <span>{ref.date}</span>
                  </div>
                  <div
                    style={{
                      color: '#0f172a',
                      fontWeight: 600,
                      marginBottom: '4px',
                      fontSize: '14px',
                    }}
                  >
                    {ref.what}
                  </div>
                  <div style={{ color: '#475569', marginBottom: '8px', lineHeight: 1.4 }}>
                    <strong>Por que:</strong> {ref.why}
                  </div>
                  <div
                    style={{
                      color: '#16a34a',
                      fontSize: '13px',
                      backgroundColor: '#f0fdf4',
                      padding: '8px',
                      borderRadius: '6px',
                      fontWeight: 500,
                    }}
                  >
                    <strong>Resultado:</strong> {ref.result}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                fontSize: '14px',
                color: '#94a3b8',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px dashed #cbd5e1',
              }}
            >
              Nenhum refinamento registrado.
            </div>
          )}
        </div>

        {finalObservations && (
          <div>
            <SectionTitle>Observações Finais</SectionTitle>
            <div
              style={{
                padding: '20px',
                backgroundColor: '#fffbeb',
                borderRadius: '12px',
                color: '#78350f',
                fontSize: '14px',
                lineHeight: 1.6,
                border: '1px solid #fde68a',
              }}
            >
              {finalObservations}
            </div>
          </div>
        )}
      </div>
      <PdfGlobalFooter pageNum={totalPages} totalPages={totalPages} />
    </div>
  )
}
