'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { EXERCISES } from '@/lib/data'
import { useAuth } from '@/lib/auth'
import {
  insertLog, fetchLogs, deleteLog,
  type DbWorkoutLog,
} from '@/lib/db'
import { SectionHeading } from '@/components/ui'
import { cn } from '@/lib/utils'

const MUSCLE_GROUPS = Array.from(new Set(EXERCISES.map((e) => e.muscle))).sort()

export default function TrackerPage() {
  const { user, isLoading, openAuthModal } = useAuth()
  const router = useRouter()

  const [logs, setLogs] = useState<DbWorkoutLog[]>([])
  const [fetching, setFetching] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [exName, setExName] = useState('')
  const [muscle, setMuscle] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')
  const [formErr, setFormErr] = useState('')

  // When an exercise is chosen, auto-fill its muscle group
  useEffect(() => {
    const ex = EXERCISES.find((e) => e.name === exName)
    if (ex) setMuscle(ex.muscle)
  }, [exName])

  // Load this user's logs
  const loadLogs = useCallback(async () => {
    if (!user) return
    setFetching(true)
    const data = await fetchLogs(user.id)
    setLogs(data)
    setFetching(false)
  }, [user])

  useEffect(() => { loadLogs() }, [loadLogs])

  // Redirect unauthenticated users (middleware also handles this server-side)
  useEffect(() => {
    if (!isLoading && !user) {
      openAuthModal('login')
      router.replace('/?auth=required')
    }
  }, [isLoading, user, openAuthModal, router])

  async function handleLog() {
    setFormErr('')
    if (!exName) { setFormErr('Please select an exercise.'); return }
    if (!sets || !reps) { setFormErr('Sets and reps are required.'); return }
    if (!user) return

    setSaving(true)
    const row = await insertLog(user.id, {
      exercise_name: exName,
      muscle_group: muscle || 'Other',
      sets: +sets,
      reps: +reps,
      weight_kg: +(weight || 0),
      notes: notes.trim() || undefined,
    })
    setSaving(false)

    if (row) {
      setLogs((prev) => [row, ...prev])
      setSets(''); setReps(''); setWeight(''); setNotes('')
    } else {
      setFormErr('Failed to save. Check your Supabase connection.')
    }
  }

  async function handleDelete(id: string) {
    const ok = await deleteLog(id)
    if (ok) setLogs((prev) => prev.filter((l) => l.id !== id))
  }

  // ── Grouping helpers ──
  const today = new Date().toISOString().slice(0, 10)
  const todayLogs = logs.filter((l) => l.logged_at.slice(0, 10) === today)
  const totalVolToday = todayLogs.reduce((s, l) => s + l.sets * l.reps * (l.weight_kg || 1), 0)

  const byDate: Record<string, DbWorkoutLog[]> = {}
  logs.forEach((l) => {
    const d = l.logged_at.slice(0, 10)
    if (!byDate[d]) byDate[d] = []
    byDate[d].push(l)
  })
  const sortedDates = Object.keys(byDate)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 14) // show last 14 days

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null // middleware redirects, but just in case

  return (
    <div className="page-enter">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <SectionHeading
          title="WORKOUT TRACKER"
          sub={`Logging as ${user.name} · ${logs.length} sets total`}
        />
        <div className="flex items-center gap-2 bg-dark-800 border border-dark-400 rounded-xl px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-red to-brand-accent
                          flex items-center justify-center text-[11px] font-bold text-white">
            {user.avatar}
          </div>
          <span className="text-sm font-medium text-white">{user.name}</span>
        </div>
      </div>

      {/* ── Log Form ── */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">➕ Log a Set</div>

        {/* Exercise picker */}
        <select
          className="input-field w-full mb-3"
          value={exName}
          onChange={(e) => setExName(e.target.value)}
        >
          <option value="">Select exercise…</option>
          {MUSCLE_GROUPS.map((grp) => (
            <optgroup key={grp} label={grp}>
              {EXERCISES.filter((e) => e.muscle === grp).map((e) => (
                <option key={e.name} value={e.name}>{e.name}</option>
              ))}
            </optgroup>
          ))}
        </select>

        {/* Muscle group (auto-filled, but editable) */}
        <div className="flex gap-2 flex-wrap mb-3">
          <div className="flex-1 min-w-[140px]">
            <label className="text-[10px] text-gray-600 uppercase tracking-wider block mb-1">Muscle Group</label>
            <select
              className="input-field w-full"
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
            >
              <option value="">Auto</option>
              {MUSCLE_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* Sets / Reps / Weight */}
        <div className="flex gap-2 flex-wrap mb-3">
          <div className="flex-1 min-w-[70px]">
            <label className="text-[10px] text-gray-600 uppercase tracking-wider block mb-1">Sets</label>
            <input type="number" className="input-field w-full" placeholder="4" min={1} max={20}
              value={sets} onChange={(e) => setSets(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[70px]">
            <label className="text-[10px] text-gray-600 uppercase tracking-wider block mb-1">Reps</label>
            <input type="number" className="input-field w-full" placeholder="8" min={1} max={200}
              value={reps} onChange={(e) => setReps(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[90px]">
            <label className="text-[10px] text-gray-600 uppercase tracking-wider block mb-1">Weight (kg)</label>
            <input type="number" className="input-field w-full" placeholder="60" min={0}
              value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
        </div>

        {/* Notes */}
        <input
          className="input-field w-full mb-3"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {formErr && (
          <div className="text-xs text-brand-red2 bg-brand-red/10 border border-brand-red/20
                          rounded-lg px-3 py-2 mb-3 flex items-center gap-2">
            ⚠ {formErr}
          </div>
        )}

        <button
          onClick={handleLog}
          disabled={saving}
          className={cn('btn-primary w-full justify-center', saving && 'opacity-60 cursor-not-allowed')}
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
              Saving…
            </span>
          ) : '💾 Save Set'}
        </button>
      </div>

      {/* ── Today's Log ── */}
      <div className="card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-gray-400">📝 Today's Log</div>
          {todayLogs.length > 0 && (
            <div className="text-xs text-gray-600">
              {todayLogs.length} sets · <span className="text-brand-red2 font-bold">{Math.round(totalVolToday).toLocaleString()} kg</span> volume
            </div>
          )}
        </div>

        {fetching ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : todayLogs.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-sm">
            <div className="text-3xl mb-2">🏋️</div>
            No sets logged today. Let's get to work!
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {todayLogs.map((l) => {
              const vol = l.sets * l.reps * (l.weight_kg || 1)
              return (
                <div key={l.id}
                  className="flex items-center gap-3 bg-dark-700 rounded-xl px-4 py-3 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{l.exercise_name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {l.sets} sets × {l.reps} reps
                      {l.weight_kg ? ` @ ${l.weight_kg} kg` : ''}
                      {l.notes ? ` · ${l.notes}` : ''}
                    </div>
                  </div>
                  <div className="font-display text-xl text-brand-red2 flex-shrink-0">
                    {Math.round(vol).toLocaleString()}
                    <span className="text-[10px] text-gray-600 ml-0.5">kg</span>
                  </div>
                  <button
                    onClick={() => handleDelete(l.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400
                               transition-all text-sm flex-shrink-0"
                  >✕</button>
                </div>
              )
            })}

            <div className="flex justify-between items-center mt-1 px-4 py-2.5
                            bg-gradient-to-r from-brand-red/10 to-transparent rounded-xl border border-brand-red/15">
              <span className="text-sm font-semibold text-gray-300">Total Volume Today</span>
              <span className="font-display text-2xl text-brand-red2">
                {Math.round(totalVolToday).toLocaleString()} kg
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── History ── */}
      <div className="card p-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">📅 Workout History</div>
        {sortedDates.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-sm">No history yet.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {sortedDates.map((d) => {
              const entries = byDate[d]
              const dayVol = entries.reduce((s, l) => s + l.sets * l.reps * (l.weight_kg || 1), 0)
              const isToday = d === today
              const label = isToday
                ? 'TODAY'
                : new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

              return (
                <div key={d}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn(
                      'text-xs font-bold tracking-widest uppercase',
                      isToday ? 'text-brand-red2' : 'text-gray-600',
                    )}>
                      {label}
                    </div>
                    <div className="text-xs text-gray-600">
                      {Math.round(dayVol).toLocaleString()} kg total
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {entries.map((l) => (
                      <div key={l.id}
                        className="flex items-center justify-between bg-dark-700 rounded-lg px-4 py-2.5 group">
                        <div>
                          <div className="text-sm font-medium text-white">{l.exercise_name}</div>
                          <div className="text-xs text-gray-600 mt-0.5">
                            {l.sets}×{l.reps}{l.weight_kg ? ` @ ${l.weight_kg}kg` : ''}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="font-display text-lg text-brand-red2">
                            {Math.round(l.sets * l.reps * (l.weight_kg || 1)).toLocaleString()}
                          </div>
                          <button
                            onClick={() => handleDelete(l.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400
                                       transition-all text-sm"
                          >✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}