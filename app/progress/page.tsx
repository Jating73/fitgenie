'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import {
  fetchLogs, fetchDailyVolume, fetchMuscleBreakdown,
  fetchPRs, fetchPRHistory, upsertPR,
  fetchLatestMeasurement, fetchMeasurementHistory, insertMeasurement,
  computeStreak, computeWeeklyActivity,
  type DbWorkoutLog, type PRSummary,
  type LiftName,
} from '@/lib/db'
import { SectionHeading, ProgressBar } from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  LineController,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js'

// ── Chart.js colours ──────────────────────────────────────────────────────────
const RED = '#e63946'
const GREEN = '#39d353'
const BLUE = '#64a0ff'
const AMBER = '#fbbf24'
const PURPLE = '#a78bfa'

const PR_MAX: PRSummary = { bench: 200, squat: 300, dl: 350, ohp: 150 }
const PR_LABELS: Record<keyof PRSummary, LiftName> = {
  bench: 'Barbell Bench Press',
  squat: 'Squat',
  dl: 'Deadlift',
  ohp: 'Overhead Press',
}

function SpinnerCenter() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function ProgressPage() {
  const { user, isLoading, openAuthModal } = useAuth()
  const router = useRouter()
  const [ready, setReady] = useState(false)

  // Data state
  const [logs, setLogs] = useState<DbWorkoutLog[]>([])
  const [prs, setPrs] = useState<PRSummary>({ bench: 0, squat: 0, dl: 0, ohp: 0 })
  const [meas, setMeas] = useState({ weight_kg: 0, chest_cm: 0, waist_cm: 0, arms_cm: 0 })
  const [streak, setStreak] = useState(0)
  const [weekDots, setWeekDots] = useState<boolean[]>([])

  // Form state
  const [newPRVal, setNewPRVal] = useState('')
  const [newPRKey, setNewPRKey] = useState<keyof PRSummary>('bench')
  const [prSaving, setPrSaving] = useState(false)
  const [measForm, setMeasForm] = useState({ weight_kg: '', chest_cm: '', waist_cm: '', arms_cm: '' })
  const [measSaving, setMeasSaving] = useState(false)

  // Canvas refs
  const volumeRef = useRef<HTMLCanvasElement>(null)
  const muscleRef = useRef<HTMLCanvasElement>(null)
  const prRef = useRef<HTMLCanvasElement>(null)
  const measRef = useRef<HTMLCanvasElement>(null)
  const volumeChart = useRef<ChartJS<any> | null>(null)
  const muscleChart = useRef<ChartJS<any> | null>(null)
  const prChart = useRef<ChartJS<any> | null>(null)
  const measChart = useRef<ChartJS<any> | null>(null)

  // ── Auth guard ──
  useEffect(() => {
    if (!isLoading && !user) {
      openAuthModal('login')
      router.replace('/?auth=required')
    }
  }, [isLoading, user, openAuthModal, router])

  // ── Load all data ──
  const loadData = useCallback(async () => {
    if (!user) return
    const [allLogs, prData, latestMeas] = await Promise.all([
      fetchLogs(user.id, 2000),
      fetchPRs(user.id),
      fetchLatestMeasurement(user.id),
    ])
    setLogs(allLogs)
    setPrs(prData)
    if (latestMeas) {
      setMeas({
        weight_kg: latestMeas.weight_kg ?? 0,
        chest_cm: latestMeas.chest_cm ?? 0,
        waist_cm: latestMeas.waist_cm ?? 0,
        arms_cm: latestMeas.arms_cm ?? 0,
      })
    }
    setStreak(computeStreak(allLogs))
    setWeekDots(computeWeeklyActivity(allLogs))
    setReady(true)
  }, [user])

  useEffect(() => { loadData() }, [loadData])

  // ── Build charts once data is ready ──
  useEffect(() => {
    if (!ready || !user) return

    async function buildCharts() {
      ChartJS.register(
        BarController,
        BarElement,
        LineController,
        LineElement,
        ArcElement,
        CategoryScale,
        LinearScale,
        TimeScale,
        Tooltip,
        Legend,
        PointElement
      )

      // 1. Volume bar chart (last 30 days)
      if (volumeRef.current) {
        const volData = await fetchDailyVolume(user!.id, 30)
        const ctx = volumeRef.current.getContext('2d')!
        if (volumeChart.current) {
          volumeChart.current.destroy()
        }
        volumeChart.current = new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: volData.map((d) =>
              new Date(d.date + 'T12:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            ),
            datasets: [{
              label: 'Volume (kg)',
              data: volData.map((d) => d.volume),
              backgroundColor: (ctx: any) => {
                const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200)
                g.addColorStop(0, RED + 'cc')
                g.addColorStop(1, RED + '22')
                return g
              },
              borderColor: RED,
              borderWidth: 1,
              borderRadius: 4,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => ` ${Number(c.raw).toLocaleString()} kg` } }
            },
            scales: {
              x: { ticks: { color: '#555', font: { size: 10 }, maxTicksLimit: 10 }, grid: { color: '#1e1e1e' } },
              y: { ticks: { color: '#555', font: { size: 10 } }, grid: { color: '#1e1e1e' } },
            },
          },
        })
      }

      // 2. Muscle breakdown doughnut
      if (muscleRef.current) {
        const breakdown = await fetchMuscleBreakdown(user!.id)
        const ctx = muscleRef.current.getContext('2d')!
        const COLORS = [RED, GREEN, BLUE, AMBER, PURPLE, '#fb923c', '#34d399', '#f472b6', '#a3e635', '#38bdf8']
        if (muscleChart.current) {
          muscleChart.current.destroy()
        }

        muscleChart.current = new ChartJS(ctx, {
          type: 'doughnut',
          data: {
            labels: breakdown.map((b) => b.muscle),
            datasets: [{
              data: breakdown.map((b) => b.sets),
              backgroundColor: breakdown.map((_, i) => COLORS[i % COLORS.length] + 'cc'),
              borderColor: breakdown.map((_, i) => COLORS[i % COLORS.length]),
              borderWidth: 1,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'right', labels: { color: '#999', font: { size: 11 }, boxWidth: 12 } },
              tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.raw} sets` } },
            },
          },
        })
      }

      // 3. PR line chart (bench, squat, deadlift history)
      if (prRef.current) {
        const [benchH, squatH, dlH] = await Promise.all([
          fetchPRHistory(user!.id, 'Barbell Bench Press'),
          fetchPRHistory(user!.id, 'Squat'),
          fetchPRHistory(user!.id, 'Deadlift'),
        ])
        const ctx = prRef.current.getContext('2d')!
        if (prChart.current) {
          prChart.current.destroy()
        }

        prChart.current = new ChartJS(ctx, {
          type: 'line',
          data: {
            datasets: [
              {
                label: 'Bench', data: benchH.map((d) => ({ x: d.date, y: d.weight })),
                borderColor: RED, backgroundColor: RED + '22', fill: true, tension: 0.4, pointRadius: 3
              },
              {
                label: 'Squat', data: squatH.map((d) => ({ x: d.date, y: d.weight })),
                borderColor: GREEN, backgroundColor: GREEN + '22', fill: true, tension: 0.4, pointRadius: 3
              },
              {
                label: 'Deadlift', data: dlH.map((d) => ({ x: d.date, y: d.weight })),
                borderColor: BLUE, backgroundColor: BLUE + '22', fill: true, tension: 0.4, pointRadius: 3
              },
            ],
          },
          options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#999', boxWidth: 12, font: { size: 11 } } } },
            scales: {
              x: { type: 'time', time: { unit: 'month' }, ticks: { color: '#555' }, grid: { color: '#1e1e1e' } },
              y: { ticks: { color: '#555', callback: (v) => `${v}kg` }, grid: { color: '#1e1e1e' } },
            },
          },
        })
      }

      // 4. Body weight line chart
      if (measRef.current) {
        const wh = await fetchMeasurementHistory(user!.id, 'weight_kg', 24)
        const ctx = measRef.current.getContext('2d')!
        if (measChart.current) {
          measChart.current.destroy()
        }

        measChart.current = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: wh.map((d) => d.date),
            datasets: [{
              label: 'Body Weight (kg)',
              data: wh.map((d) => d.value),
              borderColor: AMBER,
              backgroundColor: AMBER + '22',
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: AMBER,
            }],
          },
          options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#999', font: { size: 11 } } } },
            scales: {
              x: { ticks: { color: '#555', maxTicksLimit: 8 }, grid: { color: '#1e1e1e' } },
              y: { ticks: { color: '#555', callback: (v) => `${v}kg` }, grid: { color: '#1e1e1e' } },
            },
          },
        })
      }
    }

    buildCharts()

    return () => {
      volumeChart.current?.destroy()
      muscleChart.current?.destroy()
      prChart.current?.destroy()
      measChart.current?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user])

  // ── Update PR ──
  async function handlePR() {
    if (!newPRVal || !user) return
    setPrSaving(true)
    const liftName = PR_LABELS[newPRKey]
    const ok = await upsertPR(user.id, liftName, +newPRVal)
    if (ok) {
      setPrs((prev) => ({ ...prev, [newPRKey]: +newPRVal }))
      setNewPRVal('')
      // Rebuild PR chart
      await loadData()
    }
    setPrSaving(false)
  }

  // ── Update Measurements ──
  async function handleMeas() {
    if (!user) return
    const data = {
      weight_kg: measForm.weight_kg ? +measForm.weight_kg : undefined,
      chest_cm: measForm.chest_cm ? +measForm.chest_cm : undefined,
      waist_cm: measForm.waist_cm ? +measForm.waist_cm : undefined,
      arms_cm: measForm.arms_cm ? +measForm.arms_cm : undefined,
    }
    if (!Object.values(data).some(Boolean)) return
    setMeasSaving(true)
    const ok = await insertMeasurement(user.id, data)
    if (ok) {
      setMeas((prev) => ({
        weight_kg: data.weight_kg ?? prev.weight_kg,
        chest_cm: data.chest_cm ?? prev.chest_cm,
        waist_cm: data.waist_cm ?? prev.waist_cm,
        arms_cm: data.arms_cm ?? prev.arms_cm,
      }))
      setMeasForm({ weight_kg: '', chest_cm: '', waist_cm: '', arms_cm: '' })
      setReady(false); setTimeout(() => setReady(true), 50)
    }
    setMeasSaving(false)
  }

  // ── Stats ──
  const totalWorkoutDays = new Set(logs.map((l) => l.logged_at.slice(0, 10))).size
  const totalSets = logs.length
  const totalVolume = logs.reduce((s, l) => s + l.sets * l.reps * (l.weight_kg || 1), 0)
  const thisWeekVol = logs
    .filter((l) => {
      const d = new Date(l.logged_at)
      const now = new Date()
      const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7)
      return d >= weekAgo
    })
    .reduce((s, l) => s + l.sets * l.reps * (l.weight_kg || 1), 0)

  const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const today = new Date().toISOString().slice(0, 10)

  if (isLoading || !user) return <SpinnerCenter />

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <SectionHeading title="PROGRESS DASHBOARD" sub="Your complete fitness history" />
        <div className="flex items-center gap-2 bg-dark-800 border border-dark-400 rounded-xl px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-red to-brand-accent
                          flex items-center justify-center text-[11px] font-bold text-white">
            {user.avatar}
          </div>
          <div>
            <div className="text-sm font-semibold text-white leading-tight">{user.name}</div>
            <div className="text-[10px] text-gray-600">{user.email}</div>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { value: totalWorkoutDays, label: 'Workout Days', sub: 'All time' },
          { value: `${streak} 🔥`, label: 'Current Streak', sub: 'Consecutive days' },
          { value: `${Math.round(thisWeekVol / 1000)}k kg`, label: 'This Week Volume', sub: 'Total lifted' },
          { value: totalSets, label: 'Sets Logged', sub: 'All time' },
        ].map(({ value, label, sub }) => (
          <div key={label} className="card p-4 relative overflow-hidden">
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-brand-red/8 pointer-events-none" />
            <div className="font-display text-3xl text-brand-red2 leading-none">{value}</div>
            <div className="text-xs text-gray-500 font-semibold mt-1.5 tracking-wide">{label}</div>
            <div className="text-[10px] text-gray-700 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Weekly Activity ── */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-3">📅 Weekly Activity</div>
        <div className="flex gap-2">
          {weekDots.map((done, i) => {
            const d = new Date()
            d.setDate(d.getDate() - 6 + i)
            const isToday = d.toISOString().slice(0, 10) === today
            return (
              <div
                key={i}
                className={cn(
                  'flex-1 h-10 rounded-lg flex flex-col items-center justify-center transition-all',
                  done ? 'bg-brand-green/20 border border-brand-green/30' : 'bg-dark-700',
                  isToday ? 'ring-2 ring-brand-red/50' : '',
                )}
              >
                <span className={cn('text-[9px] font-bold', done ? 'text-brand-green' : 'text-gray-600')}>
                  {DAY_LABELS[d.getDay()]}
                </span>
                {done && <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-0.5" />}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Volume Chart ── */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-1">📈 Daily Volume — Last 30 Days</div>
        <div className="text-xs text-gray-600 mb-4">Sets × Reps × Weight per training day</div>
        {ready ? (
          <canvas ref={volumeRef} height={110} />
        ) : (
          <div className="h-28 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* ── Muscle Breakdown ── */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-1">💪 Muscle Group Breakdown</div>
        <div className="text-xs text-gray-600 mb-4">Sets logged per muscle group — all time</div>
        {ready ? (
          <div className="max-w-sm mx-auto">
            <canvas ref={muscleRef} height={220} />
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {logs.length === 0 && (
          <p className="text-xs text-gray-600 text-center mt-3">Log workouts to see your muscle breakdown</p>
        )}
      </div>

      {/* ── Strength PRs ── */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">🏆 Personal Records</div>

        <div className="flex flex-col gap-3 mb-5">
          {(Object.entries(prs) as [keyof PRSummary, number][]).map(([key, val]) => (
            <ProgressBar
              key={key}
              label={PR_LABELS[key]}
              value={val > 0 ? (val / PR_MAX[key]) * 100 : 0}
              displayValue={val > 0 ? `${val} kg` : '— Not set'}
            />
          ))}
        </div>

        {/* Update PR form */}
        <div className="flex gap-2 flex-wrap">
          <input
            type="number"
            className="input-field flex-1 min-w-[100px]"
            placeholder="New PR weight (kg)"
            value={newPRVal}
            onChange={(e) => setNewPRVal(e.target.value)}
          />
          <select
            className="input-field"
            value={newPRKey}
            onChange={(e) => setNewPRKey(e.target.value as keyof PRSummary)}
          >
            <option value="bench">Bench Press</option>
            <option value="squat">Squat</option>
            <option value="dl">Deadlift</option>
            <option value="ohp">Overhead Press</option>
          </select>
          <button
            onClick={handlePR}
            disabled={prSaving || !newPRVal}
            className={cn('btn-primary flex-shrink-0', (prSaving || !newPRVal) && 'opacity-50 cursor-not-allowed')}
          >
            {prSaving ? '…' : 'Set PR'}
          </button>
        </div>

        {/* PR history chart */}
        <div className="mt-5">
          <div className="text-xs text-gray-600 mb-3">PR Progression Over Time</div>
          {ready ? (
            <canvas ref={prRef} height={110} />
          ) : (
            <div className="h-28 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* ── Body Measurements ── */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">📏 Body Measurements</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { key: 'weight_kg', label: 'Weight', unit: 'kg' },
            { key: 'chest_cm', label: 'Chest', unit: 'cm' },
            { key: 'waist_cm', label: 'Waist', unit: 'cm' },
            { key: 'arms_cm', label: 'Arms', unit: 'cm' },
          ].map(({ key, label, unit }) => {
            const val = meas[key as keyof typeof meas]
            return (
              <div key={key} className="bg-dark-700 rounded-xl p-3 text-center">
                <div className={cn('font-display text-3xl leading-none', val ? 'text-brand-red2' : 'text-gray-700')}>
                  {val || '—'}
                </div>
                <div className="text-[10px] text-gray-600 mt-1">{label} ({unit})</div>
              </div>
            )
          })}
        </div>

        {/* Update measurement form */}
        <div className="flex gap-2 flex-wrap mb-3">
          {[
            { key: 'weight_kg', ph: 'Weight (kg)' },
            { key: 'chest_cm', ph: 'Chest (cm)' },
            { key: 'waist_cm', ph: 'Waist (cm)' },
            { key: 'arms_cm', ph: 'Arms (cm)' },
          ].map(({ key, ph }) => (
            <input
              key={key}
              type="number"
              className="input-field flex-1 min-w-[80px]"
              placeholder={ph}
              value={measForm[key as keyof typeof measForm]}
              onChange={(e) => setMeasForm((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          ))}
          <button
            onClick={handleMeas}
            disabled={measSaving}
            className={cn('btn-primary flex-shrink-0', measSaving && 'opacity-50 cursor-not-allowed')}
          >
            {measSaving ? '…' : 'Log'}
          </button>
        </div>

        {/* Body weight chart */}
        <div className="mt-4">
          <div className="text-xs text-gray-600 mb-3">Body Weight History</div>
          {ready ? (
            <canvas ref={measRef} height={90} />
          ) : (
            <div className="h-24 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* ── All-time summary ── */}
      <div className="card p-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">📊 All-Time Summary</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryBlock
            label="Total Iron Moved"
            value={`${(totalVolume / 1000).toFixed(1)}t`}
            sub="tonnes lifted lifetime"
            color={RED}
          />
          <SummaryBlock
            label="Exercises Tried"
            value={new Set(logs.map((l) => l.exercise_name)).size}
            sub="unique exercises"
            color={GREEN}
          />
          <SummaryBlock
            label="Best Streak"
            value={streak}
            sub="consecutive training days"
            color={AMBER}
          />
        </div>
      </div>
    </div>
  )
}

function SummaryBlock({ label, value, sub, color }: {
  label: string; value: string | number; sub: string; color: string
}) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{ background: color + '0d', borderColor: color + '33' }}
    >
      <div className="font-display text-3xl leading-none" style={{ color }}>{value}</div>
      <div className="text-xs font-semibold text-white mt-1.5">{label}</div>
      <div className="text-[10px] text-gray-600 mt-0.5">{sub}</div>
    </div>
  )
}