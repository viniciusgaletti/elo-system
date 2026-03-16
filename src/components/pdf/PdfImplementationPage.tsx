import { PAGE_STYLE, PdfGlobalFooter, SectionTitle, verdictColor, priorityColor } from './PdfShared'

export function PdfImplementationPage({
  step,
  imp,
  pageNum,
  totalPages,
}: {
  step: any
  imp: any
  pageNum: number
  totalPages: number
}) {
  return (
    <div data-pdf-page style={PAGE_STYLE}>
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            fontSize: '12px',
            color: '#64748b',
            marginBottom: '8px',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          Detalhes da Implementação
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <h2 style={{ fontSize: '28px', margin: 0, color: '#0f172a', fontWeight: 600 }}>
            {step.step}
          </h2>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              backgroundColor: verdictColor(step.verdict) + '20',
              color: verdictColor(step.verdict),
              fontWeight: 700,
            }}
          >
            {step.verdict}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {step.criteria?.map((c: string) => (
            <span
              key={c}
              style={{
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '11px',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                fontWeight: 500,
              }}
            >
              {c}
            </span>
          ))}
          {imp.priority && (
            <span
              style={{
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '11px',
                backgroundColor: priorityColor(imp.priority) + '20',
                color: priorityColor(imp.priority),
                fontWeight: 700,
                marginLeft: 'auto',
              }}
            >
              Prioridade {imp.priority}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <SectionTitle>Solução Proposta</SectionTitle>
          <p
            style={{
              fontSize: '14px',
              color: '#475569',
              lineHeight: 1.6,
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {imp.solution || 'Nenhuma solução definida.'}
          </p>
        </div>

        <div>
          <SectionTitle>Ferramentas Selecionadas</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {imp.tools?.map((t: any, i: number) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: 600, fontSize: '15px', color: '#0f172a' }}>
                    {t.name}
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      backgroundColor: '#e0e7ff',
                      color: '#4f46e5',
                      fontWeight: 600,
                    }}
                  >
                    {t.category}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                  {t.useCase}
                </div>
              </div>
            ))}
            {imp.customTools?.map((t: string, i: number) => (
              <div
                key={`c-${i}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '16px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px dashed #cbd5e1',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: 600, fontSize: '15px', color: '#0f172a' }}>{t}</span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      backgroundColor: '#f1f5f9',
                      color: '#64748b',
                      fontWeight: 600,
                    }}
                  >
                    Adicionada Manualmente
                  </span>
                </div>
              </div>
            ))}
            {!imp.tools?.length && !imp.customTools?.length && (
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                Nenhuma ferramenta selecionada.
              </div>
            )}
          </div>
        </div>

        <div>
          <SectionTitle>Impacto Esperado</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '1px solid #bbf7d0',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#16a34a',
                  marginBottom: '6px',
                  fontWeight: 600,
                }}
              >
                Economia de Tempo
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#14532d',
                  lineHeight: 1.4,
                }}
              >
                {imp.expectedTimeGain || '-'}
              </div>
            </div>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#eff6ff',
                borderRadius: '12px',
                border: '1px solid #bfdbfe',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#2563eb',
                  marginBottom: '6px',
                  fontWeight: 600,
                }}
              >
                Ganho de Qualidade
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1e3a8a',
                  lineHeight: 1.4,
                }}
              >
                {imp.expectedQualityGain || '-'}
              </div>
            </div>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#475569',
                  marginBottom: '6px',
                  fontWeight: 600,
                }}
              >
                Resultado Esperado
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0f172a',
                  lineHeight: 1.4,
                }}
              >
                {imp.expectedResult || '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PdfGlobalFooter pageNum={pageNum} totalPages={totalPages} />
    </div>
  )
}
