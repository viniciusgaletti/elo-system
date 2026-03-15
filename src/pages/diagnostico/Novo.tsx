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
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-h1 mb-3">Novo Projeto</h1>
        <p className="text-body text-muted-foreground max-w-2xl">
          Inicie o Método ELO para um novo cliente. Preencha as informações base que guiarão toda a
          consultoria.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-8">
          <CardTitle>Dados Iniciais</CardTitle>
          <CardDescription className="text-base mt-2">
            Estas informações definirão o baseline do projeto de IA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base pl-2">Empresa ou Cliente</FormLabel>
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
                    <FormLabel className="text-base pl-2">Escopo Principal</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva brevemente o desafio principal ou área de atuação..."
                        className="min-h-[160px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="pl-2 mt-2">
                      Um resumo direto do que motivou a consultoria.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4 pt-8 border-t border-border/50">
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Iniciando...' : 'Iniciar ELO Method'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
