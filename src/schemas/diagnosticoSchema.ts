import { z } from 'zod'

export const SEGMENTOS = [
  'Varejo',
  'Saude',
  'Educacao',
  'Tecnologia',
  'Financeiro',
  'Industria',
  'Servicos',
  'Alimentacao',
  'Outro',
] as const

export const diagnosticoSchema = z.object({
  client_name: z.string().min(2, 'Informe o nome do cliente.'),
  company_name: z.string().min(2, 'Informe o nome da empresa.'),
  segment: z.enum(SEGMENTOS, {
    errorMap: () => ({ message: 'Selecione o segmento da empresa.' }),
  }),
  role: z.string().optional(),
  process_name: z.string().min(3, 'Informe o nome do processo a ser analisado.'),
  process_description: z.string().optional(),
})

export type DiagnosticoFormValues = z.infer<typeof diagnosticoSchema>
