'use client'
import { useState } from 'react'
import { AI_PLAN_TEMPLATES, AI_EXERCISE_POOLS } from '@/lib/data'
import { SectionHeading } from '@/components/ui'
import { cn } from '@/lib/utils'

type Goal   = 'muscle' | 'fat' | 'strength' | 'endurance'
type Exp    = 'beginner' | 'intermediate' | 'advanced'
type Equip  = 'full' | 'dumbbells' | 'bodyweight' | 'bands'
type Days   = '3' | '4' | '5' | '6'

interface GeneratedDay {
  name: string
  exercises: { ex: string; sets: string; reps: string }[]
}

export default function AIPage() {
  const [goal,  setGoal]  = useState<Goal>('muscle')
  const [exp,   setExp]   = useState<Exp>('beginner')
  const [equip, setEquip] = useState<Equip>('full')
  const [days,  setDays]  = useState<Days>('4')
  const [plan,  setPlan]  = useState<GeneratedDay[] | null>(null)

  function generate() {
    const equipKey = equip === 'full' || equip === 'dumbbells' ? 'full' : 'bodyweight'
    const goalKey  = (AI_PLAN_TEMPLATES[goal] ? goal : 'muscle') as keyof typeof AI_PLAN_TEMPLATES
    const dayNames = AI_PLAN_TEMPLATES[goalKey]?.[equipKey]?.[days] ??
                     AI_PLAN_TEMPLATES.muscle.full['4']

    const pools = AI_EXERCISE_POOLS
    const generated: GeneratedDay[] = dayNames.map((name, i) => {
      let exPool = pools.push[equipKey]
      const lower = name.toLowerCase()
      if (lower.includes('pull') || lower.includes('back') || lower.includes('bi'))  exPool = pools.pull[equipKey]
      if (lower.includes('leg')  || lower.includes('quad') || lower.includes('glute')) exPool = pools.legs[equipKey]
      if (lower.includes('core') || lower.includes('ab'))  exPool = pools.core[equipKey]

      const repsMultiplier: Record<Exp, number> = { beginner: 1, intermediate: 0, advanced: -1 }
      const adj = repsMultiplier[exp]

      return {
        name,
        exercises: exPool.map((e) => ({
          ...e,
          sets: String(+e.sets + (exp === 'advanced' ? 1 : 0)),
        })),
      }
    })
    setPlan(generated)
    setTimeout(() => {
      document.getElementById('ai-result')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="page-enter">
      <SectionHeading title="AI WORKOUT GENERATOR" sub="Get a personalized training plan in seconds" />

      {/* GOAL */}
      <StepCard step={1} title="YOUR GOAL">
        <OptionGrid>
          {[
            { key: 'muscle',    icon: '💪', label: 'Muscle Gain', sub: 'Hypertrophy focus' },
            { key: 'fat',       icon: '🔥', label: 'Fat Loss',    sub: 'Burn & tone'       },
            { key: 'strength',  icon: '🏆', label: 'Strength',    sub: 'Max power'         },
            { key: 'endurance', icon: '🏃', label: 'Endurance',   sub: 'Cardio base'       },
          ].map(({ key, icon, label, sub }) => (
            <OptionBtn key={key} icon={icon} label={label} sub={sub}
              selected={goal === key} onClick={() => setGoal(key as Goal)} />
          ))}
        </OptionGrid>
      </StepCard>

      {/* EXPERIENCE */}
      <StepCard step={2} title="EXPERIENCE LEVEL">
        <OptionGrid>
          {[
            { key: 'beginner',     icon: '🌱', label: 'Beginner',     sub: '0–1 year'  },
            { key: 'intermediate', icon: '⚡', label: 'Intermediate', sub: '1–3 years' },
            { key: 'advanced',     icon: '🦁', label: 'Advanced',     sub: '3+ years'  },
          ].map(({ key, icon, label, sub }) => (
            <OptionBtn key={key} icon={icon} label={label} sub={sub}
              selected={exp === key} onClick={() => setExp(key as Exp)} />
          ))}
        </OptionGrid>
      </StepCard>

      {/* EQUIPMENT */}
      <StepCard step={3} title="AVAILABLE EQUIPMENT">
        <OptionGrid>
          {[
            { key: 'full',       icon: '🏋️', label: 'Full Gym',    sub: 'All equipment'    },
            { key: 'dumbbells',  icon: '🔵', label: 'Dumbbells',   sub: 'Home setup'        },
            { key: 'bodyweight', icon: '🤸', label: 'Bodyweight',  sub: 'No equipment'      },
            { key: 'bands',      icon: '🟡', label: 'Bands',       sub: 'Resistance bands'  },
          ].map(({ key, icon, label, sub }) => (
            <OptionBtn key={key} icon={icon} label={label} sub={sub}
              selected={equip === key} onClick={() => setEquip(key as Equip)} />
          ))}
        </OptionGrid>
      </StepCard>

      {/* DAYS */}
      <StepCard step={4} title="DAYS PER WEEK">
        <OptionGrid cols={4}>
          {(['3', '4', '5', '6'] as Days[]).map((d) => (
            <OptionBtn key={d} icon={`${d}️⃣`} label={`${d} Days`} sub=""
              selected={days === d} onClick={() => setDays(d)} />
          ))}
        </OptionGrid>
      </StepCard>

      <button
        onClick={generate}
        className="btn-primary w-full justify-center py-4 text-base mb-8"
      >
        ⚡ Generate My Workout Plan
      </button>

      {/* Result */}
      {plan && (
        <div id="ai-result">
          <h2 className="section-title mb-1">YOUR PLAN</h2>
          <p className="section-sub mb-5">
            {goal.charAt(0).toUpperCase() + goal.slice(1)} · {exp} · {equip} · {days} days/week
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.map((day, i) => (
              <div key={i} className="card p-5">
                <div className="font-display text-xl text-brand-red2 tracking-wide mb-3 pb-2 border-b border-dark-400">
                  DAY {i + 1} — {day.name.toUpperCase()}
                </div>
                <div className="flex flex-col gap-2">
                  {day.exercises.map((ex, j) => (
                    <div key={j} className="flex justify-between items-center bg-dark-700 rounded-lg px-3 py-2.5">
                      <div className="text-sm font-medium text-white">{ex.ex}</div>
                      <div className="text-sm font-bold text-brand-red2 flex-shrink-0 ml-3">
                        {ex.sets} × {ex.reps}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setPlan(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="btn-secondary mt-6 w-full text-center justify-center"
          >
            ↺ Regenerate
          </button>
        </div>
      )}
    </div>
  )
}

// --- Sub-components ---
function StepCard({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5 mb-4">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-display text-2xl tracking-wide text-white">{title}</h3>
        <span className="text-[10px] font-bold tracking-widest text-brand-red2 bg-brand-red/20 border border-brand-red/40 px-2 py-0.5 rounded">
          STEP {step}
        </span>
      </div>
      {children}
    </div>
  )
}

function OptionGrid({ children, cols = 4 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={cn('grid gap-3',
      cols === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'
    )}>
      {children}
    </div>
  )
}

function OptionBtn({
  icon, label, sub, selected, onClick,
}: { icon: string; label: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-150',
        selected
          ? 'bg-brand-red/10 border-brand-red2 text-brand-red2'
          : 'bg-dark-700 border-dark-300 text-gray-500 hover:text-white hover:border-dark-200'
      )}
    >
      <span className="text-2xl mb-2">{icon}</span>
      <div className="font-semibold text-sm leading-tight">{label}</div>
      {sub && <div className="text-[11px] opacity-60 mt-0.5">{sub}</div>}
    </button>
  )
}
