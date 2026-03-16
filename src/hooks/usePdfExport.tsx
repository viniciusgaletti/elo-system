import { useState, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { pdfService } from '@/services/pdfService'
import { Diagnostico } from '@/types'

export interface PdfReportData {
  diagnosis: Diagnostico
  consultantName: string
  enquadramento: {
    steps?: { id: string; text: string }[]
    analysisResult?: {
      stepAnalysis?: any[]
      summary?: any
    }
  }
  lancamento: Record<string, any>
  otimizacao: {
    measuredResults?: Record<string, any>
    refinements?: any[]
    finalObservations?: string
  }
}

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const exportPdf = useCallback(
    async (inputData: PdfReportData | string, filename: string) => {
      setIsExporting(true)
      try {
        if (typeof inputData === 'string') {
          await pdfService.getPdfData(inputData)
        }

        await document.fonts.ready

        if (!(window as any).html2canvas) {
          await loadScript(
            'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
          )
        }
        if (!(window as any).jspdf) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
        }

        const html2canvas = (window as any).html2canvas
        const { jsPDF } = (window as any).jspdf

        const pages = document.querySelectorAll('[data-pdf-page]')
        if (pages.length === 0) throw new Error('No pages to export')

        const pdf = new jsPDF('p', 'mm', 'a4')
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        for (let i = 0; i < pages.length; i++) {
          const page = pages[i] as HTMLElement
          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
          })

          const imgData = canvas.toDataURL('image/jpeg', 1.0)

          if (i > 0) pdf.addPage()
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
        }

        pdf.save(filename)
        toast({ title: 'Sucesso', description: 'PDF exportado com sucesso!' })
      } catch (error: any) {
        console.error(error)
        toast({
          title: 'Erro',
          description: error.message || 'Não foi possivel gerar o PDF. Tente novamente.',
          variant: 'destructive',
        })
      } finally {
        setIsExporting(false)
      }
    },
    [toast],
  )

  return { exportPdf, isExporting }
}

function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}
