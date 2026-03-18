'use client'
import { useState, useCallback, memo } from 'react'
import { ExerciseModal } from '@/components/sections/ExerciseModal'
import { MuscleExercisePanel } from '@/components/sections/MuscleExercisePanel'
import { SectionHeading } from '@/components/ui'
import { MUSCLE_DETAILS } from '@/lib/muscleMapData'
import { cn } from '@/lib/utils'
import type { Exercise } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// SVG colour config — derived from MUSCLE_DETAILS so it stays in sync
// ─────────────────────────────────────────────────────────────────────────────
const MUSCLE_COLORS: Record<string, { fill: string; stroke: string }> = {
  Chest: { fill: '#2a1515', stroke: '#e63946' },
  Back: { fill: '#1a2a1a', stroke: '#39d353' },
  Shoulders: { fill: '#1c1c2a', stroke: '#64a0ff' },
  Biceps: { fill: '#1a1a2e', stroke: '#a78bfa' },
  Triceps: { fill: '#1a1a2e', stroke: '#c084fc' },
  Abs: { fill: '#2a1515', stroke: '#f87171' },
  Quads: { fill: '#241f10', stroke: '#fbbf24' },
  Hamstrings: { fill: '#241f10', stroke: '#fb923c' },
  Glutes: { fill: '#2a1a0a', stroke: '#ff6b35' },
  Calves: { fill: '#102020', stroke: '#6ee7b7' },
}

// ─────────────────────────────────────────────────────────────────────────────
// Style helper — re-computed on every render but only for 10 muscles, negligible
// ─────────────────────────────────────────────────────────────────────────────
function ms(muscle: string, selected: string | null) {
  const cfg = MUSCLE_COLORS[muscle] ?? { fill: '#1e1e1e', stroke: '#444' }
  const isSelected = selected === muscle
  return {
    fill: cfg.fill,
    stroke: isSelected ? '#ffffff' : cfg.stroke,
    strokeWidth: isSelected ? 2.5 : 1.5,
    opacity: selected && !isSelected ? 0.5 : 1,
    cursor: 'pointer' as const,
    filter: isSelected ? `drop-shadow(0 0 6px ${cfg.stroke}80)` : undefined,
    transition: 'stroke 0.2s, opacity 0.2s, stroke-width 0.15s',
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG body diagrams — memo'd so they don't re-render when the modal opens
// ─────────────────────────────────────────────────────────────────────────────
interface SvgProps {
  selected: string | null
  onClick: (m: string) => void
}

const FrontBody = memo(function FrontBody({ selected, onClick }: SvgProps) {
  const s = (m: string) => ms(m, selected)
  return (
    <svg viewBox="0 0 140 320" width={170} className="max-w-full drop-shadow-lg">
      {/* Head */}
      <ellipse cx="70" cy="22" rx="18" ry="20" fill="#1e1e1e" stroke="#333" strokeWidth="1" />
      <rect x="63" y="40" width="14" height="14" rx="4" fill="#1e1e1e" stroke="#333" strokeWidth="1" />

      {/* Chest */}
      <rect x="38" y="55" width="64" height="40" rx="6" onClick={() => onClick('Chest')} {...s('Chest')} />
      <text x="70" y="79" textAnchor="middle" fontSize="9" fill={MUSCLE_COLORS.Chest.stroke}
        fontFamily="DM Sans" fontWeight="600" pointerEvents="none">CHEST</text>

      {/* Shoulder L & R */}
      <ellipse cx="30" cy="68" rx="13" ry="15" onClick={() => onClick('Shoulders')} {...s('Shoulders')} />
      <ellipse cx="110" cy="68" rx="13" ry="15" onClick={() => onClick('Shoulders')} {...s('Shoulders')} />
      <text x="17" y="72" textAnchor="middle" fontSize="6" fill={MUSCLE_COLORS.Shoulders.stroke} pointerEvents="none">DEL</text>

      {/* Biceps L & R */}
      <rect x="15" y="84" width="13" height="34" rx="6" onClick={() => onClick('Biceps')} {...s('Biceps')} />
      <rect x="112" y="84" width="13" height="34" rx="6" onClick={() => onClick('Biceps')} {...s('Biceps')} />
      <text x="21" y="104" textAnchor="middle" fontSize="6" fill={MUSCLE_COLORS.Biceps.stroke} pointerEvents="none">BI</text>

      {/* Forearms (decorative, not clickable) */}
      <rect x="11" y="120" width="12" height="28" rx="5" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1" />
      <rect x="117" y="120" width="12" height="28" rx="5" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1" />

      {/* Abs */}
      <rect x="50" y="97" width="40" height="52" rx="6" onClick={() => onClick('Abs')} {...s('Abs')} />
      <line x1="70" y1="97" x2="70" y2="149" stroke={MUSCLE_COLORS.Abs.stroke} strokeWidth="0.7" pointerEvents="none" />
      <line x1="50" y1="114" x2="90" y2="114" stroke={MUSCLE_COLORS.Abs.stroke} strokeWidth="0.7" pointerEvents="none" />
      <line x1="50" y1="129" x2="90" y2="129" stroke={MUSCLE_COLORS.Abs.stroke} strokeWidth="0.7" pointerEvents="none" />
      <text x="70" y="124" textAnchor="middle" fontSize="8" fill={MUSCLE_COLORS.Abs.stroke} pointerEvents="none">ABS</text>

      {/* Quads L & R */}
      <rect x="46" y="153" width="22" height="60" rx="6" onClick={() => onClick('Quads')} {...s('Quads')} />
      <rect x="72" y="153" width="22" height="60" rx="6" onClick={() => onClick('Quads')} {...s('Quads')} />
      <text x="57" y="187" textAnchor="middle" fontSize="7" fill={MUSCLE_COLORS.Quads.stroke} pointerEvents="none">Q</text>
      <text x="83" y="187" textAnchor="middle" fontSize="7" fill={MUSCLE_COLORS.Quads.stroke} pointerEvents="none">Q</text>

      {/* Calves L & R */}
      <rect x="47" y="220" width="18" height="40" rx="5" onClick={() => onClick('Calves')} {...s('Calves')} />
      <rect x="75" y="220" width="18" height="40" rx="5" onClick={() => onClick('Calves')} {...s('Calves')} />
      <text x="56" y="242" textAnchor="middle" fontSize="6" fill={MUSCLE_COLORS.Calves.stroke} pointerEvents="none">CAL</text>
    </svg>
  )
})

const BackBody = memo(function BackBody({ selected, onClick }: SvgProps) {
  const s = (m: string) => ms(m, selected)
  return (
    <svg viewBox="0 0 140 320" width={170} className="max-w-full drop-shadow-lg">
      <ellipse cx="70" cy="22" rx="18" ry="20" fill="#1e1e1e" stroke="#333" strokeWidth="1" />
      <rect x="63" y="40" width="14" height="14" rx="4" fill="#1e1e1e" stroke="#333" strokeWidth="1" />

      {/* Back / Lats */}
      <path
        d="M38,55 Q20,80 30,115 L50,115 L50,95 L90,95 L90,115 L110,115 Q120,80 102,55 Z"
        onClick={() => onClick('Back')} {...s('Back')}
      />
      <text x="70" y="82" textAnchor="middle" fontSize="8" fill={MUSCLE_COLORS.Back.stroke} pointerEvents="none">BACK</text>

      {/* Shoulder L & R (back) */}
      <ellipse cx="30" cy="68" rx="13" ry="15" onClick={() => onClick('Shoulders')} {...s('Shoulders')} />
      <ellipse cx="110" cy="68" rx="13" ry="15" onClick={() => onClick('Shoulders')} {...s('Shoulders')} />

      {/* Triceps L & R */}
      <rect x="15" y="84" width="13" height="34" rx="6" onClick={() => onClick('Triceps')} {...s('Triceps')} />
      <rect x="112" y="84" width="13" height="34" rx="6" onClick={() => onClick('Triceps')} {...s('Triceps')} />
      <text x="21" y="104" textAnchor="middle" fontSize="6" fill={MUSCLE_COLORS.Triceps.stroke} pointerEvents="none">TRI</text>

      {/* Glutes L & R */}
      <rect x="46" y="150" width="22" height="28" rx="6" onClick={() => onClick('Glutes')} {...s('Glutes')} />
      <rect x="72" y="150" width="22" height="28" rx="6" onClick={() => onClick('Glutes')} {...s('Glutes')} />
      <text x="70" y="167" textAnchor="middle" fontSize="7" fill={MUSCLE_COLORS.Glutes.stroke} pointerEvents="none">GLUTES</text>

      {/* Hamstrings L & R */}
      <rect x="46" y="180" width="22" height="36" rx="6" onClick={() => onClick('Hamstrings')} {...s('Hamstrings')} />
      <rect x="72" y="180" width="22" height="36" rx="6" onClick={() => onClick('Hamstrings')} {...s('Hamstrings')} />
      <text x="57" y="202" textAnchor="middle" fontSize="6" fill={MUSCLE_COLORS.Hamstrings.stroke} pointerEvents="none">HAM</text>

      {/* Calves (back) */}
      <rect x="47" y="220" width="18" height="40" rx="5" onClick={() => onClick('Calves')} {...s('Calves')} />
      <rect x="75" y="220" width="18" height="40" rx="5" onClick={() => onClick('Calves')} {...s('Calves')} />
    </svg>
  )
})

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function MuscleMapPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [modalEx, setModalEx] = useState<Exercise | null>(null)

  const handleClick = useCallback((muscle: string) => {
    setSelected((prev) => (prev === muscle ? null : muscle))
  }, [])

  const selectedDetail = MUSCLE_DETAILS.find((d) => d.key === selected)

  return (
    <div className="page-enter">
      <SectionHeading
        title="MUSCLE MAP"
        sub="Click a muscle to explore targeted sub-muscles and exercises with live GIF demos"
      />

      {/* Legend row */}
      <div className="flex flex-wrap gap-2 mb-5">
        {MUSCLE_DETAILS.map((d) => (
          <button
            key={d.key}
            onClick={() => handleClick(d.key)}
            className={cn(
              'text-[11px] font-semibold px-3 py-1 rounded-full border transition-all duration-150',
              selected === d.key
                ? 'text-white'
                : 'text-gray-600 border-dark-300 hover:text-gray-300 hover:border-dark-200',
            )}
            style={
              selected === d.key
                ? { color: d.accentColor, borderColor: d.accentColor, background: d.accentColor + '18' }
                : undefined
            }
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="card p-5 md:p-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">

          {/* ── SVG diagrams ── */}
          <div className="flex flex-row md:flex-col xl:flex-row gap-6 justify-center md:justify-start flex-shrink-0">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-gray-600 tracking-[3px] uppercase font-medium">
                FRONT
              </span>
              <FrontBody selected={selected} onClick={handleClick} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-gray-600 tracking-[3px] uppercase font-medium">
                BACK
              </span>
              <BackBody selected={selected} onClick={handleClick} />
            </div>
          </div>

          {/* ── Exercise panel ── */}
          <div
            className={cn(
              'flex-1 min-w-0 bg-dark-700 rounded-2xl p-4 md:p-5',
              'transition-all duration-300',
              selected ? 'border border-white/5' : '',
            )}
            style={selectedDetail ? { borderColor: selectedDetail.accentColor + '22' } : undefined}
          >
            <MuscleExercisePanel
              selectedMuscle={selected}
              onSelectExercise={setModalEx}
            />
          </div>
        </div>
      </div>

      {/* Exercise detail modal */}
      <ExerciseModal
        exercise={modalEx}
        onClose={() => setModalEx(null)}
      />
    </div>
  )
}
