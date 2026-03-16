import { useState, useEffect, useMemo, useCallback } from 'react'
import { Diagnostico } from '@/types'
import { diagnosticoService } from '@/services/diagnosticoService'

export function useDiagnosticos() {
  const [allData, setAllData] = useState<Diagnostico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const fetchDiagnoses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await diagnosticoService.getDiagnosticos()
      setAllData(data)
    } catch (err: any) {
      console.error('Failed to fetch diagnoses:', err)
      setError(err.message || 'Não foi possível carregar os diagnósticos.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDiagnoses()
  }, [fetchDiagnoses])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const data = useMemo(() => {
    if (!debouncedQuery) return allData
    const query = debouncedQuery.toLowerCase()
    return allData.filter(
      (d) =>
        d.client_name.toLowerCase().includes(query) ||
        (d.company_name && d.company_name.toLowerCase().includes(query)),
    )
  }, [allData, debouncedQuery])

  return {
    data,
    allData,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    refetch: fetchDiagnoses,
  }
}
