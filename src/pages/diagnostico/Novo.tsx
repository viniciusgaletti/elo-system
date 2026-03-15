import { ArrowLeft, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCreateDiagnostico } from '@/hooks/useCreateDiagnostico'
import { SEGMENTOS } from '@/schemas/diagnosticoSchema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function NovoDiagnostico() {
  const navigate = useNavigate()
  const { form, isSubmitting, handleSubmit } = useCreateDiagnostico()

  const isSubmitDisabled =
    isSubmitting || (!form.formState.isDirty && !form.formState.isSubmitted)

  return (
    <div className="max-w-[640px] mx-auto py-10 animate-fade-in-up">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center gap-1.5 text-small text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Voltar
      </button>

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-h1 mb-2">Novo Diagnóstico</h1>
        <p className="text-body text-muted-foreground">
          Preencha os dados do cliente e do processo que será analisado.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1 — Dados do Cliente */}
          <div className="mb-8">
            <h2 className="text-h4 mb-6">Dados do Cliente</h2>

            <div className="space-y-5">
              <FormField
                control={form.control}
                name="client_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Cliente</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Ana Silva"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Grupo Saúde Total"
                        disabled={isSubmitting}
                        {...field}
                      />
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-full px-5">
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SEGMENTOS.map((seg) => (
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

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Cargo do Cliente{' '}
                      <span className="text-muted-foreground font-normal">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: CEO, Gerente de Operações"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="my-8" />

          {/* Section 2 — Sobre o Processo */}
          <div className="mb-8">
            <h2 className="text-h4 mb-6">Sobre o Processo</h2>

            <div className="space-y-5">
              <FormField
                control={form.control}
                name="process_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Processo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Criação de conteúdo para redes sociais"
                        disabled={isSubmitting}
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
                      <span className="text-muted-foreground font-normal">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva brevemente como esse processo funciona hoje na empresa..."
                        rows={4}
                        className="resize-none rounded-2xl px-5 py-3"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate('/dashboard')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:flex-1"
              disabled={isSubmitDisabled}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
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
