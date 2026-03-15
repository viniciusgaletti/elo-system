import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { diagnosesService } from '@/services/diagnoses'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const novoDiagnosticoSchema = z.object({
  clientName: z.string().min(2, 'O nome do cliente deve ter pelo menos 2 caracteres'),
  projectScope: z.string().min(10, 'Descreva o escopo brevemente (mín. 10 caracteres)'),
})

export default function NovoDiagnostico() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof novoDiagnosticoSchema>>({
    resolver: zodResolver(novoDiagnosticoSchema),
    defaultValues: {
      clientName: '',
      projectScope: '',
    },
  })

  async function onSubmit(values: z.infer<typeof novoDiagnosticoSchema>) {
    setIsSubmitting(true)
    try {
      const diag = await diagnosesService.create(values.clientName, values.projectScope)
      toast({
        title: 'Sucesso!',
        description: 'Diagnóstico criado. Iniciando Fase de Enquadramento.',
      })
      navigate(`/diagnostico/${diag.id}/enquadramento`)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o diagnóstico.',
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-h1">Novo Diagnóstico</h1>
        <p className="text-body text-muted-foreground mt-1">
          Inicie o Método ELO para um novo cliente.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados Iniciais do Cliente</CardTitle>
          <CardDescription>
            Estas informações serão utilizadas na base de todo o processo metodológico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Cliente ou Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: TechNova Solutions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectScope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escopo do Projeto</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva brevemente o desafio principal ou área de atuação..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Um resumo do que motivou a consultoria.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Iniciar ELO Method'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
