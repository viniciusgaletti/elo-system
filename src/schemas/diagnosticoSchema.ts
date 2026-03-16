import * as z from 'zod'

export const diagnosticoSchema = z.object({
  client_name: z.string().min(2, 'Informe o nome do cliente.'),
  company_name: z.string().min(2, 'Informe o nome da empresa.'),
  segment: z.string().min(1, 'Selecione o segmento da empresa.'),
  client_role: z.string().optional(),
  process_name: z.string().min(3, 'Informe o nome do processo a ser analisado.'),
  process_description: z.string().optional(),
})

export type DiagnosticoFormData = z.infer<typeof diagnosticoSchema>
