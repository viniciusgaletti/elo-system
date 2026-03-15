import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { diagnosticoService } from '@/services/diagnosticoService'
import { diagnosticoSchema, type DiagnosticoFormValues } from '@/schemas/diagnosticoSchema'

interface UseCreateDiagnosticoReturn {
  form: ReturnType<typeof useForm<DiagnosticoFormValues>>
  isSubmitting: boolean
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export function useCreateDiagnostico(): UseCreateDiagnosticoReturn {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<DiagnosticoFormValues>({
    resolver: zodResolver(diagnosticoSchema),
    defaultValues: {
      client_name: '',
      company_name: '',
      segment: undefined,
      role: '',
      process_name: '',
      process_description: '',
    },
    mode: 'onBlur',
  })

  const handleSubmit = form.handleSubmit(async (values: DiagnosticoFormValues) => {
    if (!user) return

    setIsSubmitting(true)

    try {
      const diagnostico = await diagnosticoService.createDiagnostico({
        ...values,
        status: 'em_andamento',
        current_phase: 'enquadramento',
        consultant_id: user.id,
      })

      toast.success('Diagnóstico criado com sucesso!')
      navigate(`/diagnostico/${diagnostico.id}/enquadramento`)
    } catch (error) {
      console.error('[useCreateDiagnostico]', error)
      toast.error('Não foi possível criar o diagnóstico. Tente novamente.')
      setIsSubmitting(false)
    }
  })

  return { form, isSubmitting, handleSubmit }
}
