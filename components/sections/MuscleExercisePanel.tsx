'use client'
import { useState, memo, useCallback } from 'react'
import { getMuscleDetail, getExercisesForMuscle } from '@/lib/muscleMapData'
import type { Exercise } from '@/types'
import { cn } from '@/lib/utils'

const GifThumb = memo(function GifThumb({
  gifUrl,
  emoji,
  name,
}: {
  gifUrl?: string
  emoji: string
  name: string
}) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    gifUrl ? 'loading' : 'error',
  )

  return (
    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-dark-600">
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-dark-600 via-dark-500 to-dark-600" />
      )}

      {gifUrl && status !== 'error' && (
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}

      {(status === 'loading' || status === 'error') && (
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          {emoji}
        </div>
      )}
    </div>
  )
})

// ─────────────────────────────────────────────────────────────────────────────
// Single exercise row card
// ─────────────────────────────────────────────────────────────────────────────
interface ExerciseRowProps {
  exercise: Exercise
  accentColor: string
  onClick: () => void
}

const ExerciseRow = memo(function ExerciseRow({
  exercise,
  accentColor,
  onClick,
}: ExerciseRowProps) {
  const diffColor = {
    Beginner: 'text-brand-green  bg-brand-green/10',
    Intermediate: 'text-yellow-400   bg-yellow-400/10',
    Advanced: 'text-brand-red2   bg-brand-red/10',
  }[exercise.diff]

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 w-full bg-dark-800 border border-dark-400
                 rounded-xl px-3 py-2.5 text-left
                 hover:border-white/10 hover:bg-dark-600
                 transition-all duration-150 cursor-pointer"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      {/* GIF thumbnail */}
      <GifThumb gifUrl={exercise.gifUrl} emoji={exercise.emoji} name={exercise.name} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white truncate leading-tight">
          {exercise.name}
        </div>
        {exercise.primaryMuscle && (
          <div className="text-[10px] font-medium mt-0.5 truncate" style={{ color: accentColor }}>
            {exercise.primaryMuscle}
          </div>
        )}
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          <span className={cn('text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded uppercase', diffColor)}>
            {exercise.diff}
          </span>
          <span className="text-[10px] text-gray-600">{exercise.eq}</span>
        </div>
      </div>

      {/* Arrow */}
      <span className="text-gray-700 group-hover:text-white group-hover:translate-x-0.5
                       transition-all duration-150 text-sm flex-shrink-0">
        →
      </span>
    </button>
  )
})

// ─────────────────────────────────────────────────────────────────────────────
// Main panel exported to the muscle map page
// ─────────────────────────────────────────────────────────────────────────────
interface Props {
  /** Top-level muscle key from SVG click (e.g. "Chest") or null if none selected */
  selectedMuscle: string | null
  /** Called when user wants to open the full exercise modal */
  onSelectExercise: (exercise: Exercise) => void
}

export function MuscleExercisePanel({ selectedMuscle, onSelectExercise }: Props) {
  const [activeSubMuscle, setActiveSubMuscle] = useState<string | null>(null)

  // Reset sub-muscle selection whenever the top-level muscle changes
  const handleTopMuscleChange = useCallback(
    (prev: string | null, next: string | null) => {
      if (prev !== next) setActiveSubMuscle(null)
    },
    [],
  )

  // Trigger the reset whenever selectedMuscle changes
  // (using a ref to compare without an effect)
  const prevMuscleRef = { current: selectedMuscle }
  if (prevMuscleRef.current !== selectedMuscle) handleTopMuscleChange(prevMuscleRef.current, selectedMuscle)

  if (!selectedMuscle) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-14 gap-3">
        <span className="text-5xl select-none">👆</span>
        <p className="text-sm font-semibold text-gray-400">Select a muscle</p>
        <p className="text-xs text-gray-600 text-center max-w-[180px]">
          Click any region on the front or back diagram
        </p>
      </div>
    )
  }

  const detail = getMuscleDetail(selectedMuscle)
  const exercises = getExercisesForMuscle(selectedMuscle, activeSubMuscle)
  const accentColor = detail?.accentColor ?? '#e63946'

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* ── Heading ── */}
      <div>
        <h3
          className="font-display text-2xl tracking-wide leading-none"
          style={{ color: accentColor }}
        >
          {selectedMuscle}
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* ── Sub-muscle chips ── */}
      {detail && detail.subMuscles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {/* "All" chip */}
          <button
            onClick={() => setActiveSubMuscle(null)}
            className={cn(
              'text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-150',
              activeSubMuscle === null
                ? 'text-white border-white/30 bg-white/10'
                : 'text-gray-600 border-dark-300 hover:text-gray-300 hover:border-dark-200',
            )}
          >
            All
          </button>

          {detail.subMuscles.map((sub) => {
            const isActive = activeSubMuscle === sub.name
            return (
              <button
                key={sub.name}
                onClick={() => setActiveSubMuscle(isActive ? null : sub.name)}
                title={sub.desc}
                className={cn(
                  'text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-150',
                  isActive
                    ? 'border-opacity-60'
                    : 'text-gray-500 border-dark-300 hover:text-gray-300 hover:border-dark-200',
                )}
                style={
                  isActive
                    ? { color: sub.color, borderColor: sub.color, background: sub.color + '18' }
                    : undefined
                }
              >
                {sub.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Active sub-muscle description */}
      {activeSubMuscle && detail && (
        <p className="text-xs text-gray-500 leading-relaxed -mt-1 px-0.5">
          {detail.subMuscles.find((s) => s.name === activeSubMuscle)?.desc}
        </p>
      )}

      {/* ── Exercise list ── */}
      <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-0.5">
        {exercises.length === 0 ? (
          <p className="text-sm text-gray-600 py-4 text-center">
            No exercises found — try selecting &ldquo;All&rdquo;
          </p>
        ) : (
          exercises.map((ex) => (
            <ExerciseRow
              key={ex.name}
              exercise={ex}
              accentColor={accentColor}
              onClick={() => onSelectExercise(ex)}
            />
          ))
        )}
      </div>
    </div>
  )
}
