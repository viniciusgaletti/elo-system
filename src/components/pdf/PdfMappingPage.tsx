import { PdfReportData } from '@/hooks/usePdfExport'
import { PAGE_STYLE, PdfGlobalFooter, SectionTitle, verdictColor } from './PdfShared'

export function PdfMappingPage({ data, totalPages }: { data: PdfReportData; totalPages: number }) {
  const steps = data.enquadramento.steps || []
  const stepAnalysis = data.enquadramento.analysisResult?.stepAnalysis || []
  const summary = data.enquadramento.analysisResult?.summary

  return (
    <div data-pdf-page style={PAGE_STYLE}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <SectionTitle>Mapeamento do Processo</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {steps.map((step, i) => {
              const analysis = stepAnalysis.find((s: any) => s.step === step.text)
              const color = analysis ? verdictColor(analysis.verdict) : '#94a3b8'
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '14px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      flexShrink: 0,
                      marginTop: '5px',
                    }}
                  />
                  <span style={{ fontWeight: 600, color: '#64748b', flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#334155', lineHeight: 1.4 }}>{step.text}</span>
                </div>
              )
            })}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              fontSize: '10px',
              color: '#64748b',
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                }}
              />{' '}
              Candidata a IA
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#eab308',
                }}
              />{' '}
              Possível candidata
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#94a3b8',
                }}
              />{' '}
              Não se aplica
            </span>
          </div>
        </div>

        <div>
          <SectionTitle>Análise ELO de Candidatura a IA</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stepAnalysis.map((sa: any, i: number) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>
                    {sa.step}
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      backgroundColor: verdictColor(sa.verdict) + '20',
                      color: verdictColor(sa.verdict),
                      fontWeight: 600,
                    }}
                  >
                    {sa.verdict}
                  </span>
                  {sa.criteria?.map((c: string) => (
                    <span
                      key={c}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        fontWeight: 500,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#64748b',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {sa.justification}
                </p>
              </div>
            ))}
          </div>
        </div>

        {summary && (
          <div
            style={{
              marginTop: 'auto',
              backgroundColor: '#f0fdf4',
              padding: '20px',
              borderRadius: '12px',
              borderLeft: '4px solid #22c55e',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#16a34a',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Etapa Recomendada para Foco
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '8px',
              }}
            >
              {summary.recommendedStep}
            </div>
            <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
              {summary.overallSummary}
            </div>
          </div>
        )}
      </div>
      <PdfGlobalFooter pageNum={2} totalPages={totalPages} />
    </div>
  )
}
