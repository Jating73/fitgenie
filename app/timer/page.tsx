'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { SectionHeading } from '@/components/ui'
import { cn } from '@/lib/utils'

type Tab = 'rest' | 'interval' | 'hiit' | 'stopwatch'

function fmt(s: number) {
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}
function fmtSW(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
}

const REST_PRESETS = [30, 60, 90, 120, 180, 300]

export default function TimerPage() {
  const [tab, setTab] = useState<Tab>('rest')

  // Rest timer
  const [restTime,     setRestTime]     = useState(90)
  const [restRunning,  setRestRunning]  = useState(false)
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Interval
  const [workSec,   setWorkSec]   = useState(40)
  const [restSec,   setRestSec]   = useState(20)
  const [rounds,    setRounds]    = useState(8)
  const [ivRunning, setIvRunning] = useState(false)
  const [ivPhase,   setIvPhase]   = useState<'work'|'rest'>('work')
  const [ivRound,   setIvRound]   = useState(1)
  const [ivTime,    setIvTime]    = useState(40)
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // HIIT (reuses interval state with preset)
  function startHIIT(w: number, r: number, rds: number) {
    setWorkSec(w); setRestSec(r); setRounds(rds)
    setIvTime(w); setIvPhase('work'); setIvRound(1); setIvRunning(false)
    clearInterval(ivRef.current!)
    setTab('interval')
  }

  // Stopwatch
  const [swTime,    setSwTime]    = useState(0)
  const [swRunning, setSwRunning] = useState(false)
  const [laps,      setLaps]      = useState<number[]>([])
  const swRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // REST TIMER
  useEffect(() => {
    if (restRunning) {
      restRef.current = setInterval(() => {
        setRestTime((t) => {
          if (t <= 1) { clearInterval(restRef.current!); setRestRunning(false); return 0 }
          return t - 1
        })
      }, 1000)
    } else {
      clearInterval(restRef.current!)
    }
    return () => clearInterval(restRef.current!)
  }, [restRunning])

  function toggleRest() {
    if (restTime === 0) return
    setRestRunning((r) => !r)
  }
  function resetRest(preset = 90) { clearInterval(restRef.current!); setRestRunning(false); setRestTime(preset) }

  // INTERVAL TIMER
  useEffect(() => {
    if (ivRunning) {
      ivRef.current = setInterval(() => {
        setIvTime((t) => {
          if (t <= 1) {
            setIvPhase((phase) => {
              if (phase === 'work') { setIvTime(restSec); return 'rest' }
              else {
                setIvRound((r) => {
                  if (r >= rounds) { clearInterval(ivRef.current!); setIvRunning(false); return r }
                  setIvTime(workSec); return r + 1
                })
                return 'work'
              }
            })
            return t
          }
          return t - 1
        })
      }, 1000)
    } else clearInterval(ivRef.current!)
    return () => clearInterval(ivRef.current!)
  }, [ivRunning, workSec, restSec, rounds])

  function resetInterval() {
    clearInterval(ivRef.current!); setIvRunning(false)
    setIvPhase('work'); setIvRound(1); setIvTime(workSec)
  }

  // STOPWATCH
  useEffect(() => {
    if (swRunning) {
      swRef.current = setInterval(() => setSwTime((t) => t + 1), 1000)
    } else clearInterval(swRef.current!)
    return () => clearInterval(swRef.current!)
  }, [swRunning])

  function resetSW() { clearInterval(swRef.current!); setSwRunning(false); setSwTime(0); setLaps([]) }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'rest',      label: 'Rest Timer'  },
    { key: 'interval',  label: 'Interval'    },
    { key: 'hiit',      label: 'HIIT'        },
    { key: 'stopwatch', label: 'Stopwatch'   },
  ]

  return (
    <div className="page-enter">
      <SectionHeading title="WORKOUT TIMERS" sub="Rest, interval, HIIT, and stopwatch" />

      {/* Tab row */}
      <div className="flex gap-1 bg-dark-800 border border-dark-400 rounded-xl p-1 mb-6">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'flex-1 py-2 rounded-lg text-[13px] font-medium transition-all duration-150',
              tab === key ? 'bg-dark-700 text-white shadow' : 'text-gray-600 hover:text-gray-400'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ---- REST ---- */}
      {tab === 'rest' && (
        <>
          <div className="card p-8 mb-4 text-center">
            <div className={cn(
              'font-display text-[80px] leading-none tracking-widest transition-colors',
              restRunning && restTime > 10 ? 'text-brand-green'
                : restTime <= 10 && restTime > 0 ? 'text-brand-red2 animate-blink'
                : 'text-white'
            )}>
              {fmt(restTime)}
            </div>
            <div className="text-xs text-gray-600 tracking-widest uppercase mt-2">REST TIMER</div>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={toggleRest}
                className={cn('btn-primary', restRunning ? 'bg-brand-accent hover:bg-brand-accent/90' : '')}
              >
                {restRunning ? '⏸ Pause' : '▶ Start'}
              </button>
              <button onClick={() => resetRest()} className="btn-secondary">↺ Reset</button>
            </div>
          </div>
          <div className="card p-5">
            <div className="text-sm font-semibold text-gray-400 mb-3">⚡ Quick Presets</div>
            <div className="flex gap-2 flex-wrap">
              {REST_PRESETS.map((s) => (
                <button
                  key={s}
                  onClick={() => { resetRest(s) }}
                  className={cn(
                    'px-4 py-2 rounded-full border text-sm font-medium transition-all',
                    restTime === s && !restRunning
                      ? 'bg-brand-red/10 border-brand-red2 text-brand-red2'
                      : 'bg-dark-700 border-dark-300 text-gray-500 hover:text-white'
                  )}
                >
                  {s < 60 ? `${s}s` : `${s/60}:00`}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ---- INTERVAL ---- */}
      {tab === 'interval' && (
        <>
          <div className="card p-5 mb-4">
            <div className="text-sm font-semibold text-gray-400 mb-3">⚙️ Settings</div>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'Work (sec)', val: workSec, set: setWorkSec },
                { label: 'Rest (sec)', val: restSec, set: setRestSec },
                { label: 'Rounds',     val: rounds,  set: setRounds  },
              ].map(({ label, val, set }) => (
                <div key={label} className="flex-1 min-w-[80px]">
                  <div className="text-xs text-gray-600 mb-1">{label}</div>
                  <input
                    type="number" className="input-field w-full text-center"
                    value={val} min={1}
                    onChange={(e) => { set(+e.target.value); resetInterval() }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="card p-8 text-center">
            <div className={cn('font-display text-[80px] leading-none tracking-widest',
              ivPhase === 'work' ? 'text-brand-green' : 'text-blue-400'
            )}>
              {fmt(ivTime)}
            </div>
            <div className="text-xs text-gray-600 tracking-widest uppercase mt-2">
              {ivRunning || ivTime !== workSec
                ? `${ivPhase.toUpperCase()} PHASE — ROUND ${ivRound}/${rounds}`
                : 'READY'}
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setIvRunning((r) => !r)}
                className={cn('btn-primary', ivRunning ? 'bg-brand-accent hover:bg-brand-accent/90' : '')}
              >
                {ivRunning ? '⏸ Pause' : '▶ Start'}
              </button>
              <button onClick={resetInterval} className="btn-secondary">↺ Reset</button>
            </div>
          </div>
        </>
      )}

      {/* ---- HIIT ---- */}
      {tab === 'hiit' && (
        <div className="card p-5">
          <div className="text-sm font-semibold text-gray-400 mb-4">🔥 HIIT Programs</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: 'Tabata',    work: 20, rest: 10, rounds: 8,  desc: '20s work · 10s rest · 8 rounds'  },
              { name: 'AMRAP',     work: 40, rest: 20, rounds: 10, desc: '40s work · 20s rest · 10 rounds' },
              { name: 'EMOM',      work: 30, rest: 30, rounds: 12, desc: '30s work · 30s rest · 12 rounds' },
              { name: 'Heavy HIIT',work: 45, rest: 15, rounds: 6,  desc: '45s work · 15s rest · 6 rounds'  },
            ].map(({ name, work, rest, rounds: r, desc }) => (
              <button
                key={name}
                onClick={() => startHIIT(work, rest, r)}
                className="flex items-center gap-3 bg-dark-700 hover:bg-dark-600 border border-dark-300
                           hover:border-brand-red/30 rounded-xl px-4 py-3 text-left transition-all group"
              >
                <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{name}</div>
                  <div className="text-xs text-gray-600">{desc}</div>
                </div>
                <span className="ml-auto text-brand-red2 opacity-0 group-hover:opacity-100 text-sm">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---- STOPWATCH ---- */}
      {tab === 'stopwatch' && (
        <>
          <div className="card p-8 mb-4 text-center">
            <div className={cn('font-display text-[72px] leading-none tracking-widest', swRunning ? 'text-brand-green' : 'text-white')}>
              {fmtSW(swTime)}
            </div>
            <div className="text-xs text-gray-600 tracking-widest uppercase mt-2">STOPWATCH</div>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => setSwRunning((r) => !r)}
                className={cn('btn-primary', swRunning ? 'bg-brand-accent hover:bg-brand-accent/90' : '')}
              >
                {swRunning ? '⏸ Pause' : '▶ Start'}
              </button>
              <button onClick={resetSW} className="btn-secondary">↺ Reset</button>
              <button
                onClick={() => setLaps((l) => [...l, swTime])}
                className="btn-secondary"
              >
                ⬤ Lap
              </button>
            </div>
          </div>
          {laps.length > 0 && (
            <div className="card p-4">
              <div className="text-sm font-semibold text-gray-400 mb-3">Lap Times</div>
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {[...laps].reverse().map((l, i) => (
                  <div key={i} className="flex justify-between items-center bg-dark-700 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-400">Lap {laps.length - i}</span>
                    <span className="font-display text-lg text-brand-red2">{fmtSW(l)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
