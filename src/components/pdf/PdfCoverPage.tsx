import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PdfReportData } from '@/hooks/usePdfExport'
import { PAGE_STYLE } from './PdfShared'

export function PdfCoverPage({ data }: { data: PdfReportData }) {
  const { diagnosis, consultantName } = data
  const dateFormatted = format(new Date(), 'dd/MM/yyyy', { locale: ptBR })

  return (
    <div
      data-pdf-page
      style={{
        ...PAGE_STYLE,
        backgroundColor: 'hsl(40, 28%, 92%)',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          textTransform: 'lowercase',
          fontVariant: 'small-caps',
          color: '#64748b',
          fontSize: '16px',
          letterSpacing: '0.05em',
          fontWeight: 600,
        }}
      >
        ELO System
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 300,
            margin: 0,
            letterSpacing: '-0.02em',
            color: '#0f172a',
          }}
        >
          Diagnóstico ELO
        </h1>
        <h2
          style={{
            fontSize: '36px',
            fontFamily: 'serif',
            margin: 0,
            color: '#0f172a',
            fontWeight: 600,
          }}
        >
          {diagnosis.company_name}
        </h2>
        <div
          style={{
            fontSize: '18px',
            color: '#475569',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span>
            {diagnosis.client_name} • {diagnosis.client_role || 'Cargo não definido'}
          </span>
          <div>
            <span
              style={{
                backgroundColor: '#e2e8f0',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#334155',
              }}
            >
              {diagnosis.segment}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid #cbd5e1',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
            Processo Analisado
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#0f172a',
              maxWidth: '400px',
              lineHeight: 1.4,
            }}
          >
            {diagnosis.project_scope || 'Processo não definido'}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '24px' }}>
            Gerado em {dateFormatted}
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'right' }}>
          Consultor AI
          <br />
          <strong style={{ color: '#64748b', fontSize: '14px' }}>{consultantName}</strong>
        </div>
      </div>
    </div>
  )
}
