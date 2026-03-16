import { MeasuredResult, MeasurementStatus } from '@/types/otimizacao'
import { EnquadramentoStep, Implementation } from '@/hooks/useLancamento'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const statusConfig: Record<MeasurementStatus, { label: string; color: string }> = {
  'Sim, funcionando bem': {
    label: 'Sucesso',
    color: 'bg-green-500/10 text-green-600 border-green-500/20',
  },
  'Funcionando parcialmente': {
    label: 'Em ajuste',
    color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  },
  'Nao esta funcionando': {
    label: 'Requer atenção',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
  },
  'Ainda em implementacao': {
    label: 'Em andamento',
    color: 'bg-muted text-muted-foreground border-border',
  },
}

interface Props {
  step: EnquadramentoStep
  implementation?: Implementation
  result?: MeasuredResult
  onUpdate: (updates: Partial<MeasuredResult>) => void
}

export function MetricsCard({ step, implementation, result, onUpdate }: Props) {
  const currentResult = result || {
    realTimeGain: '',
    realQualityGain: '',
    realResult: '',
    status: 'Ainda em implementacao',
  }
  const conf = statusConfig[currentResult.status]

  return (
    <Card className="border-border/60 shadow-sm overflow-hidden">
      <CardHeader className="bg-muted/20 pb-4 border-b border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg">{step.step}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Solução:{' '}
            <span className="font-medium">
              {implementation?.solution || 'Nenhuma solução definida'}
            </span>
          </p>
        </div>
        <Badge variant="outline" className={conf.color}>
          {conf.label}
        </Badge>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-2">
            <span className="text-sm font-semibold">
              Ganho de Tempo (Esperado: {implementation?.expectedTimeGain || '-'})
            </span>
            <Input
              placeholder="Ex: Reduzimos de 2h para 15min"
              value={currentResult.realTimeGain}
              onChange={(e) => onUpdate({ realTimeGain: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-semibold">
              Ganho de Qualidade (Esperado: {implementation?.expectedQualityGain || '-'})
            </span>
            <Input
              placeholder="Ex: Zero erros no último mês"
              value={currentResult.realQualityGain}
              onChange={(e) => onUpdate({ realQualityGain: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold">
              Resultado Final (Esperado: {implementation?.expectedResult || '-'})
            </span>
            <Input
              placeholder="Ex: Meta atingida com folga"
              value={currentResult.realResult}
              onChange={(e) => onUpdate({ realResult: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2 max-w-sm pt-2">
          <label className="text-sm font-semibold pl-1">A solução está funcionando?</label>
          <Select
            value={currentResult.status}
            onValueChange={(val: MeasurementStatus) => onUpdate({ status: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(statusConfig).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
