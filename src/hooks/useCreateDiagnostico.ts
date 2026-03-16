import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { diagnosesService } from '@/services/diagnoses'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'
import { DiagnosticoFormData } from '@/schemas/diagnosticoSchema'

export const useCreateDiagnostico = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { user } = useAuth()

  const createDiagnostico = async (data: DiagnosticoFormData) => {
    if (!user) {
      toast({
        title: 'Sessão expirada',
        description: 'Por favor, faça login novamente.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      const diagId = await diagnosesService.createDiagnostico({
        client_name: data.client_name,
        company_name: data.company_name,
        segment: data.segment,
        project_scope: data.process_name,
        client_role: data.client_role,
        process_description: data.process_description,
        consultant_id: user.id,
      })

      toast({
        title: 'Diagnóstico criado com sucesso!',
      })
      navigate(`/diagnostico/${diagId}/enquadramento`)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Não foi possível criar o diagnóstico. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { createDiagnostico, isLoading }
}
