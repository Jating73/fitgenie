'use client'
import { useEffect } from 'react'
import { DiffBadge, EqBadge } from '@/components/ui'
import type { Exercise } from '@/types'

interface Props {
  exercise: Exercise | null
  onClose: () => void
  onAddToBuilder?: (ex: Exercise) => void
}

export function ExerciseModal({ exercise, onClose, onAddToBuilder }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!exercise) return null

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-dark-800 border border-dark-400 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Top banner */}
        <div className="h-48 bg-dark-700 rounded-t-2xl flex items-center justify-center text-8xl relative">
          {exercise.emoji}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 text-white w-8 h-8 rounded-lg
                       flex items-center justify-center text-lg hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <h2 className="font-display text-3xl tracking-wide mb-3">{exercise.name}</h2>

          {/* Meta badges */}
          <div className="flex gap-2 flex-wrap mb-4">
            <DiffBadge diff={exercise.diff} />
            <EqBadge eq={exercise.eq} />
            <span className="badge bg-blue-400/15 text-blue-400">{exercise.muscle}</span>
          </div>

          {/* Target muscles */}
          <Section title="Target Muscles">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-md bg-brand-red/10 border border-brand-red/20 text-brand-red2">
                {exercise.muscle}
              </span>
              {exercise.secondary.map((s) => (
                <span key={s} className="text-xs px-3 py-1 rounded-md bg-dark-700 border border-dark-300 text-gray-400">
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* Calories */}
          <div className="bg-gradient-to-r from-brand-red/10 to-transparent border border-brand-red/20
                          rounded-lg px-4 py-3 flex justify-between items-center mb-5">
            <div>
              <div className="text-[11px] text-gray-500 tracking-widest uppercase">Est. Calories / Set</div>
              <div className="text-sm text-gray-400 mt-0.5">Based on avg weight &amp; reps</div>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl text-brand-red2 leading-none">{exercise.calories}</div>
              <div className="text-xs text-gray-600">kcal</div>
            </div>
          </div>

          {/* Instructions */}
          <Section title="Step-by-Step Instructions">
            <ol className="space-y-2">
              {exercise.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 bg-dark-700 rounded-lg px-3 py-2.5 text-sm text-gray-300">
                  <span className="text-brand-red2 font-bold flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </Section>

          {/* Common Mistakes */}
          <Section title="Common Mistakes">
            <ul className="space-y-2">
              {exercise.mistakes.map((m, i) => (
                <li key={i} className="flex gap-2 bg-dark-700 rounded-lg px-3 py-2.5 text-sm text-gray-300">
                  <span className="text-red-400 flex-shrink-0">✕</span> {m}
                </li>
              ))}
            </ul>
          </Section>

          {/* Pro Tips */}
          <Section title="Pro Tips">
            <ul className="space-y-2">
              {exercise.tips.map((t, i) => (
                <li key={i} className="flex gap-2 bg-dark-700 rounded-lg px-3 py-2.5 text-sm text-gray-300">
                  <span className="text-brand-green flex-shrink-0">→</span> {t}
                </li>
              ))}
            </ul>
          </Section>

          {onAddToBuilder && (
            <button
              onClick={() => { onAddToBuilder(exercise); onClose() }}
              className="btn-primary w-full justify-center mt-2"
            >
              + Add to Workout Builder
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="text-[11px] font-bold text-gray-600 tracking-widest uppercase mb-2.5">{title}</h4>
      {children}
    </div>
  )
}
