import { PdfReportData } from '@/hooks/usePdfExport'
import { PdfCoverPage } from './PdfCoverPage'
import { PdfMappingPage } from './PdfMappingPage'
import { PdfImplementationPage } from './PdfImplementationPage'
import { PdfOptimizationPage } from './PdfOptimizationPage'

interface Props {
  data: PdfReportData
}

export default function PdfReportTemplate({ data }: Props) {
  const stepAnalysis = data.enquadramento.analysisResult?.stepAnalysis || []
  const eligibleSteps = stepAnalysis.filter(
    (s: any) => s.verdict === 'Candidata a IA' || s.verdict === 'Possível candidata',
  )
  const totalPages = 3 + eligibleSteps.length

  return (
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -100 }}>
      <PdfCoverPage data={data} />
      <PdfMappingPage data={data} totalPages={totalPages} />
      {eligibleSteps.map((step: any, idx: number) => (
        <PdfImplementationPage
          key={idx}
          step={step}
          imp={data.lancamento[step.step] || {}}
          pageNum={idx + 3}
          totalPages={totalPages}
        />
      ))}
      <PdfOptimizationPage data={data} totalPages={totalPages} />
    </div>
  )
}
