import { useState, useEffect, useCallback } from 'react'
import { diagnosticoService } from '@/services/diagnosticoService'
import { Diagnostico } from '@/types'

export function useDiagnostico(id: string) {
  const [data, setData] = useState<Diagnostico | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDiagnostico = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)

      const result = await diagnosticoService.getDiagnosticoById(id)
      if (result) {
        setData(result)
      } else {
        setData(null)
      }
    } catch (err) {
      console.error(err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchDiagnostico()
  }, [fetchDiagnostico])

  return { data, loading, error, refetch: fetchDiagnostico }
}
