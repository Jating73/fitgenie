'use client'
import { useState } from 'react'
import { EXERCISES } from '@/lib/data'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { SectionHeading } from '@/components/ui'
import type { WorkoutLog } from '@/types'

function genId() { return Math.random().toString(36).slice(2) }

export default function TrackerPage() {
  const [logs, setLogs] = useLocalStorage<WorkoutLog[]>('fitgenie_log', [])
  const [exName,  setExName]  = useState('')
  const [sets,    setSets]    = useState('')
  const [reps,    setReps]    = useState('')
  const [weight,  setWeight]  = useState('')

  function logExercise() {
    if (!exName || !sets || !reps) return
    const entry: WorkoutLog = {
      id: genId(),
      ex: exName,
      sets: +sets,
      reps: +reps,
      weight: +(weight || 0),
      date: new Date().toISOString(),
    }
    setLogs([...logs, entry])
    setSets(''); setReps(''); setWeight('')
  }

  function deleteLog(id: string) {
    setLogs(logs.filter((l) => l.id !== id))
  }

  const today = new Date().toDateString()
  const todayLogs = logs.filter((l) => new Date(l.date).toDateString() === today)

  // Group history by date (last 7 days)
  const byDate: Record<string, WorkoutLog[]> = {}
  logs.forEach((l) => {
    const d = new Date(l.date).toDateString()
    if (!byDate[d]) byDate[d] = []
    byDate[d].push(l)
  })
  const sortedDates = Object.keys(byDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).slice(0, 7)

  const totalVol = (l: WorkoutLog) => l.sets * l.reps * (l.weight || 1)

  return (
    <div className="page-enter">
      <SectionHeading title="WORKOUT TRACKER" sub="Log every set, rep, and weight lifted" />

      {/* Log form */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">➕ Log Exercise</div>
        <select
          className="input-field w-full mb-3"
          value={exName}
          onChange={(e) => setExName(e.target.value)}
        >
          <option value="">Select exercise…</option>
          {EXERCISES.map((e) => (
            <option key={e.name} value={e.name}>{e.name} ({e.muscle})</option>
          ))}
        </select>
        <div className="flex gap-2 flex-wrap">
          <input
            type="number" className="input-field flex-1 min-w-[70px]"
            placeholder="Sets" min={1} max={20}
            value={sets} onChange={(e) => setSets(e.target.value)}
          />
          <input
            type="number" className="input-field flex-1 min-w-[70px]"
            placeholder="Reps" min={1} max={100}
            value={reps} onChange={(e) => setReps(e.target.value)}
          />
          <input
            type="number" className="input-field flex-1 min-w-[90px]"
            placeholder="Weight (kg)"
            value={weight} onChange={(e) => setWeight(e.target.value)}
          />
          <button onClick={logExercise} className="btn-primary flex-shrink-0">
            Log Set
          </button>
        </div>
      </div>

      {/* Today's log */}
      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">📝 Today's Log</div>
        {todayLogs.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-sm">
            No exercises logged yet. Start tracking above!
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {todayLogs.map((l) => (
              <div key={l.id} className="flex items-center justify-between bg-dark-700 rounded-lg px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-white">{l.ex}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {l.sets} sets × {l.reps} reps{l.weight ? ` @ ${l.weight} kg` : ''}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-display text-xl text-brand-red2">{totalVol(l)} kg</div>
                  <button
                    onClick={() => deleteLog(l.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors text-sm"
                  >✕</button>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-2 px-4 py-2 bg-dark-600 rounded-lg">
              <span className="text-sm font-semibold text-gray-400">Total Volume Today</span>
              <span className="font-display text-xl text-brand-red2">
                {todayLogs.reduce((s, l) => s + totalVol(l), 0)} kg
              </span>
            </div>
          </div>
        )}
      </div>

      {/* History */}
      <div className="card p-5">
        <div className="text-sm font-semibold text-gray-400 mb-4">📅 Workout History</div>
        {sortedDates.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-sm">No history yet.</div>
        ) : (
          <div className="flex flex-col gap-5">
            {sortedDates.map((d) => (
              <div key={d}>
                <div className="text-xs font-bold text-gray-600 tracking-widest uppercase mb-2">
                  {d === today ? 'TODAY' : d}
                </div>
                <div className="flex flex-col gap-1.5">
                  {byDate[d].map((l) => (
                    <div key={l.id} className="flex items-center justify-between bg-dark-700 rounded-lg px-4 py-2.5">
                      <div>
                        <div className="text-sm font-medium text-white">{l.ex}</div>
                        <div className="text-xs text-gray-600">
                          {l.sets}×{l.reps}{l.weight ? ` @ ${l.weight}kg` : ''}
                        </div>
                      </div>
                      <div className="font-display text-lg text-brand-red2">{totalVol(l)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
