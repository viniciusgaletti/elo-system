import { Phase } from '@/types'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const PHASES: { id: Phase; label: string }[] = [
  { id: 'enquadramento', label: 'Enquadramento' },
  { id: 'lancamento', label: 'Lançamento' },
  { id: 'otimizacao', label: 'Otimização' },
]

export function PhaseStepper({ currentPhase, diagId }: { currentPhase: Phase; diagId: string }) {
  const currentIndex = PHASES.findIndex((p) => p.id === currentPhase)

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-border z-0" />

        {PHASES.map((phase, idx) => {
          const isCompleted = idx < currentIndex
          const isCurrent = idx === currentIndex

          return (
            <Link
              key={phase.id}
              to={`/diagnostico/${diagId}/${phase.id}`}
              className={cn(
                'relative z-10 flex flex-col items-center gap-2 group',
                isCompleted || isCurrent ? '' : 'pointer-events-none opacity-60',
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-background',
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'border-primary ring-4 ring-primary/20'
                      : 'border-muted-foreground text-muted-foreground',
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{idx + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-small font-medium absolute -bottom-8 whitespace-nowrap',
                  isCurrent ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {phase.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
