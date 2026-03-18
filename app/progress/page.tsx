'use client'
import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { StatCard, ProgressBar, SectionHeading } from '@/components/ui'
import type { WorkoutLog, PRData, Measurements } from '@/types'

const DEFAULT_PRS: PRData      = { bench: 60, squat: 80, dl: 100, ohp: 40 }
const DEFAULT_MEAS: Measurements = { weight: 75, chest: 96, waist: 82, arms: 36 }
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function ProgressPage() {
  const [logs]         = useLocalStorage<WorkoutLog[]>('fitgenie_log', [])
  const [prs,  setPrs] = useLocalStorage<PRData>('fitgenie_prs', DEFAULT_PRS)
  const [meas, setMeas]= useLocalStorage<Measurements>('fitgenie_meas', DEFAULT_MEAS)

  const strengthRef = useRef<HTMLCanvasElement>(null)
  const volumeRef   = useRef<HTMLCanvasElement>(null)
  const chartsRef   = useRef<{ s?: unknown; v?: unknown }>({})

  const [newLift,  setNewLift]  = useState('')
  const [liftKey,  setLiftKey]  = useState<keyof PRData>('bench')
  const [measForm, setMeasForm] = useState<Partial<Measurements>>({})

  // Stats
  const today   = new Date().toDateString()
  const uniqDays = new Set(logs.map((l) => new Date(l.date).toDateString()))
  const totalVol = logs.reduce((s, l) => s + l.sets * l.reps * (l.weight || 1), 0)

  let streak = 0
  for (let i = 0; i < 30; i++) {
    const d = new Date(); d.setDate(d.getDate() - i)
    if (uniqDays.has(d.toDateString())) streak++; else break
  }

  // Weekly streak dots
  const weekDots = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 6 + i)
    const ds = d.toDateString()
    return { label: ['S','M','T','W','T','F','S'][d.getDay()], done: uniqDays.has(ds), today: ds === today }
  })

  useEffect(() => {
    let ChartJS: typeof import('chart.js').Chart | null = null

    async function init() {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      ChartJS = Chart

      const sCtx = strengthRef.current?.getContext('2d')
      const vCtx = volumeRef.current?.getContext('2d')
      if (!sCtx || !vCtx) return

      // Destroy old
      if (chartsRef.current.s) (chartsRef.current.s as InstanceType<typeof Chart>).destroy()
      if (chartsRef.current.v) (chartsRef.current.v as InstanceType<typeof Chart>).destroy()

      chartsRef.current.s = new Chart(sCtx, {
        type: 'line',
        data: {
          labels: MONTHS,
          datasets: [
            { label: 'Bench', data: [50, 55, 55, 58, 60, prs.bench], borderColor: '#e63946', tension: 0.4, fill: false, pointRadius: 3 },
            { label: 'Squat', data: [60, 65, 70, 75, 78, prs.squat], borderColor: '#39d353', tension: 0.4, fill: false, pointRadius: 3 },
            { label: 'Deadlift', data: [80, 85, 90, 95, 98, prs.dl], borderColor: '#64a0ff', tension: 0.4, fill: false, pointRadius: 3 },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: '#999', boxWidth: 12, font: { size: 11 } } } },
          scales: {
            x: { ticks: { color: '#666' }, grid: { color: '#1e1e1e' } },
            y: { ticks: { color: '#666' }, grid: { color: '#1e1e1e' } },
          },
        },
      })

      const weekVol = DAYS.map(() => Math.floor(Math.random() * 5000 + 2000))
      chartsRef.current.v = new Chart(vCtx, {
        type: 'bar',
        data: {
          labels: DAYS,
          datasets: [{ label: 'Volume (kg)', data: weekVol, backgroundColor: 'rgba(230,57,70,0.6)', borderColor: '#e63946', borderWidth: 1, borderRadius: 4 }],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#666' }, grid: { color: '#1e1e1e' } },
            y: { ticks: { color: '#666' }, grid: { color: '#1e1e1e' } },
          },
        },
      })
    }
    init()
  }, [prs])

  function updateLift() {
    if (!newLift) return
    setPrs({ ...prs, [liftKey]: +newLift })
    setNewLift('')
  }

  function updateMeas() {
    const updated = { ...meas } as Measurements
    ;(Object.keys(measForm) as (keyof Measurements)[]).forEach((k) => {
      if (measForm[k]) updated[k] = measForm[k]!
    })
    setMeas(updated)
    setMeasForm({})
  }

  const prMax = { bench: 150, squat: 200, dl: 250, ohp: 100 }

  return (
    <div className="page-enter">
      <SectionHeading title="PROGRESS DASHBOARD" sub="Your fitness journey at a glance" />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard value={uniqDays.size}       label="Total Workouts"    change="↑ Keep building" />
        <StatCard value={`${streak}🔥`}       label="Day Streak"        change="Don't break it!" />
        <StatCard value={`${Math.round(totalVol / 1000)}k`} label="Total Volume (kg)" change="Weekly total" />
        <StatCard value={logs.length}          label="Sets Logged"       change="This month" />
      </div>

      {/* Streak */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-3">📅 Weekly Activity</div>
        <div className="flex gap-2 flex-wrap">
          {weekDots.map((d, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all
                ${d.done  ? 'bg-brand-green/20 text-brand-green border border-brand-green/30' : 'bg-dark-700 text-gray-600'}
                ${d.today ? 'ring-2 ring-brand-red/50' : ''}`}
            >
              {d.label}
            </div>
          ))}
        </div>
      </div>

      {/* Strength Progress */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">💪 Strength Progress</div>
        <ProgressBar label="Bench Press"    value={(prs.bench / prMax.bench) * 100} displayValue={`${prs.bench} kg`} />
        <ProgressBar label="Squat"          value={(prs.squat / prMax.squat) * 100} displayValue={`${prs.squat} kg`} />
        <ProgressBar label="Deadlift"       value={(prs.dl    / prMax.dl)    * 100} displayValue={`${prs.dl} kg`} />
        <ProgressBar label="Overhead Press" value={(prs.ohp   / prMax.ohp)   * 100} displayValue={`${prs.ohp} kg`} />

        <div className="flex gap-2 mt-4 flex-wrap">
          <input
            type="number"
            className="input-field flex-1 min-w-[100px]"
            placeholder="New PR (kg)"
            value={newLift}
            onChange={(e) => setNewLift(e.target.value)}
          />
          <select
            className="input-field"
            value={liftKey}
            onChange={(e) => setLiftKey(e.target.value as keyof PRData)}
          >
            <option value="bench">Bench Press</option>
            <option value="squat">Squat</option>
            <option value="dl">Deadlift</option>
            <option value="ohp">Overhead Press</option>
          </select>
          <button onClick={updateLift} className="btn-primary flex-shrink-0">Update PR</button>
        </div>

        <div className="mt-5">
          <canvas ref={strengthRef} height={100} />
        </div>
      </div>

      {/* Body Measurements */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">📏 Body Measurements</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { key: 'weight', label: 'Weight (kg)' },
            { key: 'chest',  label: 'Chest (cm)'  },
            { key: 'waist',  label: 'Waist (cm)'  },
            { key: 'arms',   label: 'Arms (cm)'   },
          ].map(({ key, label }) => (
            <div key={key} className="bg-dark-700 rounded-lg p-3 text-center">
              <div className="font-display text-3xl text-brand-red2 leading-none">
                {meas[key as keyof Measurements]}
              </div>
              <div className="text-xs text-gray-600 mt-1">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['weight', 'chest', 'waist', 'arms'] as (keyof Measurements)[]).map((k) => (
            <input
              key={k}
              type="number"
              className="input-field flex-1 min-w-[80px]"
              placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
              value={measForm[k] ?? ''}
              onChange={(e) => setMeasForm({ ...measForm, [k]: +e.target.value || undefined })}
            />
          ))}
          <button onClick={updateMeas} className="btn-primary flex-shrink-0">Update</button>
        </div>
      </div>

      {/* Volume chart */}
      <div className="card p-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">📈 Weekly Volume</div>
        <canvas ref={volumeRef} height={100} />
      </div>
    </div>
  )
}
