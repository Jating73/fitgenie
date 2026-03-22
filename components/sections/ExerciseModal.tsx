'use client'
import { useEffect, useState, memo, useCallback } from 'react'
import { DiffBadge, EqBadge } from '@/components/ui'
import type { Exercise } from '@/types'
import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'

interface Props {
  exercise: Exercise | null
  onClose: () => void
  onAddToBuilder?: (ex: Exercise) => void
}

// ─── YouTube helpers ──────────────────────────────────────────────────────────

function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return ''
  // already ID
  if (/^[A-Za-z0-9_-]{11}$/.test(urlOrId)) return urlOrId

  // youtu.be
  const short = urlOrId.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)
  if (short) return short[1]

  // youtube shorts
  const shorts = urlOrId.match(/shorts\/([A-Za-z0-9_-]{11})/)
  if (shorts) return shorts[1]

  // watch or embed
  const long = urlOrId.match(/[?&/]v(?:=|\/)([A-Za-z0-9_-]{11})/)
  if (long) return long[1]

  return ''
}

// ─── GIF banner ───────────────────────────────────────────────────────────────
const GifBanner = memo(function GifBanner({
  gifUrl, emoji, name,
}: { gifUrl?: string; emoji: string; name: string }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(gifUrl ? 'loading' : 'error')
  useEffect(() => { setStatus(gifUrl ? 'loading' : 'error') }, [gifUrl])

  return (
    <div className="relative h-52 bg-dark-700 rounded-t-2xl overflow-hidden flex items-center justify-center">
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700" />
      )}
      {gifUrl && status !== 'error' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={gifUrl} alt={`${name} demonstration`} loading="lazy" decoding="async"
          className={cn('absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
            status === 'loaded' ? 'opacity-100' : 'opacity-0')}
          onLoad={() => setStatus('loaded')} onError={() => setStatus('error')} />
      )}
      {(status === 'loading' || status === 'error') && (
        <span className={cn('text-8xl select-none transition-opacity duration-300 relative z-10',
          status === 'loading' ? 'opacity-40' : 'opacity-100')}>{emoji}</span>
      )}
      {status === 'loaded' && (
        <span className="absolute top-3 left-3 z-20 text-[9px] font-bold tracking-widest
                         bg-brand-green/90 text-black px-2 py-0.5 rounded-full uppercase">Live Demo</span>
      )}
    </div>
  )
})

// ─── No-video creative placeholder ───────────────────────────────────────────
function NoVideoPlaceholder({ exercise }: { exercise: Exercise }) {
  // Animated wave bars that pulse to simulate a player
  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-dark-700 via-[#1a0a1a] to-dark-900
                    border border-dark-300 flex flex-col items-center justify-center gap-4 py-8 px-6 min-h-[180px]">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(230,57,70,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

      {/* Pulsing play-button ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-brand-red/10 animate-ping opacity-40" />
        <div className="absolute w-16 h-16 rounded-full bg-brand-red/15 animate-pulse" />
        <div className="relative w-14 h-14 rounded-full bg-dark-600 border border-dark-300 flex items-center justify-center text-2xl z-10">
          {exercise.emoji}
        </div>
      </div>

      {/* Fake audio-wave bars */}
      <div className="flex items-end gap-1 h-8">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-brand-red/40"
            style={{
              height: `${20 + Math.sin(i * 0.9) * 12}px`,
              animation: `barPulse ${0.6 + (i % 4) * 0.15}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <p className="text-sm font-semibold text-gray-300">{exercise.name}</p>
        <p className="text-xs text-gray-600 mt-1">No video tutorial available yet</p>
      </div>

      {/* Search on YouTube link */}
      <a
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' exercise tutorial')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex items-center gap-2 text-xs font-semibold text-brand-red2
                   bg-brand-red/10 border border-brand-red/25 px-4 py-2 rounded-full
                   hover:bg-brand-red/20 transition-colors"
      >
        <span className="text-base">▶</span> Search on YouTube
      </a>
    </div>
  )
}

// ─── YouTube embed ────────────────────────────────────────────────────────────
function YouTubeEmbed({ videoId }: { videoId: string }) {
  const [ready, setReady] = useState(false)
  return (
    <div className="relative rounded-xl overflow-hidden bg-dark-900 border border-dark-300">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-800 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-brand-red border-t-transparent animate-spin" />
            <span className="text-xs text-gray-600">Loading video…</span>
          </div>
        </div>
      )}
      <div className="aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=red`}
          title="Exercise tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => setReady(true)}
        />
      </div>
    </div>
  )
}

// ─── Media tabs ───────────────────────────────────────────────────────────────
type MediaTab = 'demo' | 'video'

function MediaPanel({ exercise }: { exercise: Exercise }) {
  const videoId = exercise.youtubeUrl ? extractYouTubeId(exercise.youtubeUrl) : ''
  const hasVideo = videoId.length === 11
  const [tab, setTab] = useState<MediaTab>('demo')

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-1 bg-dark-700 rounded-xl p-1 mb-3">
        <button
          onClick={() => setTab('demo')}
          className={cn('flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all',
            tab === 'demo' ? 'bg-dark-500 text-white' : 'text-gray-600 hover:text-gray-400')}
        >
          {exercise.gifUrl ? '🎬 GIF Demo' : '🏋️ Exercise'}
        </button>
        <button
          onClick={() => setTab('video')}
          className={cn('flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all',
            tab === 'video' ? 'bg-dark-500 text-white' : 'text-gray-600 hover:text-gray-400',
          )}
        >
          {hasVideo ? '▶ YouTube Tutorial' : '📹 Tutorial'}
          {hasVideo && <span className="ml-1.5 text-[8px] font-bold bg-brand-red text-white px-1.5 py-0.5 rounded-full">NEW</span>}
        </button>
      </div>

      {tab === 'demo' ? (
        <GifBanner gifUrl={exercise.gifUrl} emoji={exercise.emoji} name={exercise.name} />
      ) : hasVideo ? (
        <YouTubeEmbed videoId={videoId} />
      ) : (
        <NoVideoPlaceholder exercise={exercise} />
      )}
    </div>
  )
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export function ExerciseModal({ exercise, onClose, onAddToBuilder }: Props) {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!exercise) return

    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = original
    }
  }, [exercise])

  if (!exercise || !mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex justify-center items-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-dark-800 border border-dark-400 rounded-2xl max-w-xl w-full max-h-[90vh]
                      overflow-y-auto shadow-2xl shadow-black/60">

        {/* ── Media panel (GIF / YouTube) ── */}
        <div className="relative p-4 pb-0">
          <MediaPanel exercise={exercise} />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 z-30 bg-black/70 text-white w-8 h-8 rounded-lg
                       flex items-center justify-center text-base hover:bg-black/90 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <h2 className="font-display text-3xl tracking-wide mb-1">{exercise.name}</h2>

          {exercise.primaryMuscle && (
            <p className="text-xs text-brand-green font-semibold tracking-wider uppercase mb-3">
              ↳ {exercise.primaryMuscle}
            </p>
          )}

          <div className="flex gap-2 flex-wrap mb-4">
            <DiffBadge diff={exercise.diff} />
            <EqBadge eq={exercise.eq} />
            <span className="badge bg-blue-400/15 text-blue-400">{exercise.muscle}</span>
          </div>

          <Section title="Target Muscles">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-md bg-brand-red/10 border border-brand-red/20 text-brand-red2">
                {exercise.primaryMuscle ?? exercise.muscle}
              </span>
              {exercise.secondary.map((s) => (
                <span key={s} className="text-xs px-3 py-1 rounded-md bg-dark-700 border border-dark-300 text-gray-400">{s}</span>
              ))}
            </div>
          </Section>

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

          <Section title="Step-by-Step Instructions">
            <ol className="space-y-2">
              {exercise.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 bg-dark-700 rounded-lg px-3 py-2.5 text-sm text-gray-300">
                  <span className="text-brand-red2 font-bold flex-shrink-0 w-4">{i + 1}.</span>{step}
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Common Mistakes">
            <ul className="space-y-2">
              {exercise.mistakes.map((m, i) => (
                <li key={i} className="flex gap-2 bg-dark-700 rounded-lg px-3 py-2.5 text-sm text-gray-300">
                  <span className="text-red-400 flex-shrink-0">✕</span> {m}
                </li>
              ))}
            </ul>
          </Section>

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
            <button onClick={() => { onAddToBuilder(exercise); onClose() }} className="btn-primary w-full justify-center mt-2">
              + Add to Workout Builder
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
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
