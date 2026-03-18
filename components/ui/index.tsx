import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ---------- Card ----------
export function Card({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-dark-800 border border-dark-400 rounded-xl',
        onClick && 'cursor-pointer transition-all duration-200 hover:border-brand-red/40 hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  )
}

// ---------- Badge ----------
export function DiffBadge({ diff }: { diff: string }) {
  return (
    <span className={cn('badge', {
      'badge-beginner':     diff === 'Beginner',
      'badge-intermediate': diff === 'Intermediate',
      'badge-advanced':     diff === 'Advanced',
    })}>
      {diff}
    </span>
  )
}

export function EqBadge({ eq }: { eq: string }) {
  return <span className="badge-equipment">{eq}</span>
}

// ---------- Section Heading ----------
export function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-3xl tracking-widest text-white">{title}</h2>
      {sub && <p className="text-gray-500 text-sm mt-1">{sub}</p>}
    </div>
  )
}

// ---------- Tag ----------
export function MuscleTag({ tag, label }: { tag: string; label: string }) {
  return (
    <span className={cn(
      'text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mt-2 inline-block',
      tag === 'upper'  && 'tag-upper',
      tag === 'lower'  && 'tag-lower',
      tag === 'core'   && 'tag-core',
      tag === 'cardio' && 'tag-cardio',
    )}>
      {label}
    </span>
  )
}

// ---------- Stat Card ----------
export function StatCard({ value, label, change }: { value: string | number; label: string; change?: string }) {
  return (
    <div className="bg-dark-800 border border-dark-400 rounded-xl p-4 relative overflow-hidden">
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-red/8 pointer-events-none" />
      <div className="font-display text-4xl text-brand-red2 leading-none">{value}</div>
      <div className="text-xs text-gray-600 font-medium tracking-wide mt-1.5">{label}</div>
      {change && <div className="text-xs text-brand-green mt-1">{change}</div>}
    </div>
  )
}

// ---------- Progress Bar ----------
export function ProgressBar({ label, value, displayValue }: { label: string; value: number; displayValue: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold text-white">{displayValue}</span>
      </div>
      <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-red to-brand-red2 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  )
}

// ---------- Filter Chip ----------
export function FilterChip({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-[13px] font-medium px-3.5 py-1.5 rounded-full border transition-all duration-150 whitespace-nowrap',
        active
          ? 'bg-brand-red/10 border-brand-red2 text-brand-red2'
          : 'bg-dark-700 border-dark-300 text-gray-500 hover:text-white hover:border-dark-200'
      )}
    >
      {label}
    </button>
  )
}

// ---------- Day Number Dot ----------
export function DayDot({ day }: { day: number }) {
  return (
    <div className="w-6 h-6 bg-brand-red rounded-md flex items-center justify-center
                    text-[11px] font-bold text-white flex-shrink-0">
      {day}
    </div>
  )
}
