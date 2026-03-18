import { DiffBadge, EqBadge } from '@/components/ui'
import type { Exercise } from '@/types'

interface Props {
  exercise: Exercise
  onClick: () => void
}

export function ExerciseCard({ exercise, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-dark-800 border border-dark-400 rounded-xl overflow-hidden cursor-pointer
                 transition-all duration-200 hover:border-brand-red/40 hover:-translate-y-0.5 group"
    >
      {/* GIF placeholder */}
      <div className="h-40 bg-dark-700 flex items-center justify-center text-6xl relative overflow-hidden">
        <span className="group-hover:scale-110 transition-transform duration-300">{exercise.emoji}</span>
        <span className="absolute top-2 right-2 text-[9px] font-bold tracking-widest
                         bg-brand-red/80 text-white px-1.5 py-0.5 rounded">
          DEMO
        </span>
      </div>

      <div className="p-4">
        <div className="font-semibold text-[15px] mb-2 text-white">{exercise.name}</div>
        <div className="flex gap-2 flex-wrap mb-2">
          <DiffBadge diff={exercise.diff} />
          <EqBadge eq={exercise.eq} />
        </div>
        <div className="text-xs text-gray-500">
          <span className="text-gray-400">Target:</span>{' '}
          {exercise.muscle}
          {exercise.secondary.length > 0 && ` · ${exercise.secondary[0]}`}
        </div>
      </div>
    </div>
  )
}
