import type { CreateDiagnosticoInput, Diagnostico } from '@/types/diagnostico'

export const diagnosticoService = {
  async createDiagnostico(input: CreateDiagnosticoInput): Promise<Diagnostico> {
    console.log('[diagnosticoService] createDiagnostico:', input)

    // Mock — Supabase integration comes in a later phase
    const mockId = crypto.randomUUID()
    const now = new Date().toISOString()

    return {
      ...input,
      id: mockId,
      created_at: now,
      updated_at: now,
    }
  },
}
