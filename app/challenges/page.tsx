'use client'
import { CHALLENGES } from '@/lib/data'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { SectionHeading } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function ChallengesPage() {
  const [completed, setCompleted] = useLocalStorage<string[]>('fitgenie_challenges', [])

  function toggle(id: string) {
    setCompleted(
      completed.includes(id) ? completed.filter((c) => c !== id) : [...completed, id]
    )
  }

  return (
    <div className="page-enter">
      <SectionHeading title="DAILY CHALLENGES" sub="Push your limits every single day" />

      <div className="flex flex-col gap-4">
        {CHALLENGES.map((ch) => {
          const done = completed.includes(ch.id)
          return (
            <div key={ch.id} className={cn(
              'card overflow-hidden transition-all duration-200',
              done ? 'border-brand-green/30' : ''
            )}>
              {/* Header */}
              <div className={cn(
                'px-6 py-4 flex justify-between items-center border-b border-dark-400',
                done
                  ? 'bg-gradient-to-r from-brand-green/10 to-transparent'
                  : 'bg-gradient-to-r from-brand-red/10 to-transparent'
              )}>
                <div className="font-display text-2xl tracking-wide">
                  {ch.emoji} {ch.title}
                </div>
                <span className="text-xs text-gray-500 bg-dark-700 px-3 py-1 rounded-md whitespace-nowrap ml-4">
                  {ch.category} · {ch.difficulty}
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex gap-3 mb-5 flex-wrap">
                  {ch.steps.map((step, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 min-w-[70px] rounded-xl p-3 text-center transition-colors',
                        done
                          ? 'bg-brand-green/10 border border-brand-green/30'
                          : 'bg-dark-700 border border-dark-300'
                      )}
                    >
                      <div className={cn('font-display text-2xl leading-none', done ? 'text-brand-green' : 'text-brand-red2')}>
                        {step.num}
                      </div>
                      <div className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">{step.lbl}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => toggle(ch.id)}
                  className={cn(
                    'w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200',
                    done
                      ? 'bg-brand-green/10 border border-brand-green/40 text-brand-green hover:bg-brand-green/20'
                      : 'bg-dark-700 border border-dark-300 text-gray-400 hover:border-brand-red/30 hover:text-white'
                  )}
                >
                  {done ? '✓ Completed! Click to undo' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="card p-5 mt-6 flex items-center justify-between">
        <div>
          <div className="font-display text-2xl text-brand-red2">{completed.length}/{CHALLENGES.length}</div>
          <div className="text-xs text-gray-600 mt-0.5">Challenges completed today</div>
        </div>
        {completed.length > 0 && (
          <button
            onClick={() => setCompleted([])}
            className="text-xs text-gray-600 border border-dark-300 px-3 py-1.5 rounded-lg hover:text-red-400 hover:border-red-400/30 transition-colors"
          >
            Reset All
          </button>
        )}
      </div>
    </div>
  )
}
