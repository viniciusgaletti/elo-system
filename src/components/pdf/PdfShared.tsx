import React from 'react'

export const PAGE_STYLE: React.CSSProperties = {
  width: '794px',
  height: '1123px',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  overflow: 'hidden',
  position: 'relative',
  fontFamily: 'Inter, system-ui, sans-serif',
  color: '#0f172a',
  padding: '60px 50px',
  display: 'flex',
  flexDirection: 'column',
}

export const verdictColor = (v: string) =>
  v === 'Candidata a IA' ? '#22c55e' : v === 'Possível candidata' ? '#eab308' : '#94a3b8'

export const priorityColor = (p: string) =>
  p === 'Alta' || p === 'Alta prioridade'
    ? '#ef4444'
    : p === 'Media' || p === 'Média' || p === 'Media prioridade'
      ? '#f97316'
      : '#10b981'

export const statusColor = (s: string) =>
  s === 'Sim, funcionando bem'
    ? '#22c55e'
    : s === 'Funcionando parcialmente'
      ? '#eab308'
      : s === 'Nao esta funcionando'
        ? '#ef4444'
        : '#94a3b8'

export const PdfGlobalFooter = ({
  pageNum,
  totalPages,
}: {
  pageNum: number
  totalPages: number
}) => (
  <div
    style={{
      position: 'absolute',
      bottom: '40px',
      left: '50px',
      right: '50px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#94a3b8',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '16px',
    }}
  >
    <span style={{ fontVariant: 'small-caps', fontWeight: 600 }}>ELO System</span>
    <span>
      Página {pageNum} de {totalPages}
    </span>
  </div>
)

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      fontSize: '18px',
      borderBottom: '2px solid #f1f5f9',
      paddingBottom: '8px',
      marginBottom: '16px',
      color: '#0f172a',
      fontWeight: 600,
    }}
  >
    {children}
  </h3>
)
