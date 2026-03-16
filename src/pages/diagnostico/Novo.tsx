import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2 } from 'lucide-react'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import { diagnosticoSchema, type DiagnosticoFormData } from '@/schemas/diagnosticoSchema'
import { useCreateDiagnostico } from '@/hooks/useCreateDiagnostico'

const segmentos = [
  'Varejo',
  'Saúde',
  'Educação',
  'Tecnologia',
  'Financeiro',
  'Indústria',
  'Serviços',
  'Alimentação',
  'Outro',
]

export default function NovoDiagnostico() {
  const { createDiagnostico, isLoading } = useCreateDiagnostico()

  const form = useForm<DiagnosticoFormData>({
    resolver: zodResolver(diagnosticoSchema),
    defaultValues: {
      client_name: '',
      company_name: '',
      segment: '',
      client_role: '',
      process_name: '',
      process_description: '',
    },
  })

  const onSubmit = (data: DiagnosticoFormData) => {
    createDiagnostico(data)
  }

  return (
    <div className="max-w-[640px] mx-auto py-[40px] px-4 md:px-0 animate-fade-in-up">
      <Button
        variant="ghost"
        asChild
        className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <Link to="/dashboard">
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
        </Link>
      </Button>

      <div className="mb-10">
        <h1 className="text-display font-serif text-foreground tracking-tight">Novo Diagnóstico</h1>
        <p className="text-body font-sans text-muted-foreground mt-3 text-lg">
          Preencha os dados do cliente e do processo que será analisado.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground tracking-tight">
              Dados do Cliente
            </h2>

            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Ana Silva" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Grupo Saúde Total" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="segment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segmento</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {segmentos.map((seg) => (
                          <SelectItem key={seg} value={seg}>
                            {seg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="client_role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Cargo do Cliente{' '}
                    <span className="text-muted-foreground font-normal">(Opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: CEO, Gerente de Operações"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Separator className="my-10" />

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground tracking-tight">
              Sobre o Processo
            </h2>

            <FormField
              control={form.control}
              name="process_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Processo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Criação de conteúdo para redes sociais"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Descreva o processo principal que será analisado neste diagnóstico.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="process_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descrição Inicial{' '}
                    <span className="text-muted-foreground font-normal">(Opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva brevemente como esse processo funciona hoje na empresa..."
                      className="min-h-[120px] resize-none"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              disabled={isLoading}
              asChild
            >
              <Link to="/dashboard">Cancelar</Link>
            </Button>
            <Button type="submit" className="w-full sm:w-auto min-w-[160px]" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar Diagnóstico'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
