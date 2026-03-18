'use client'
import { useState } from 'react'
import { EXERCISES } from '@/lib/data'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { SectionHeading } from '@/components/ui'
import type { BuilderExercise, Routine } from '@/types'

export default function BuilderPage() {
  const [routines, setRoutines] = useLocalStorage<Routine[]>('fitgenie_routines', [])
  const [name, setName]         = useState('')
  const [current, setCurrent]   = useState<BuilderExercise[]>([])
  const [search, setSearch]     = useState('')

  const filteredList = EXERCISES.filter((e) => {
    const q = search.toLowerCase()
    return !q || e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q)
  })

  function addEx(exName: string) {
    const ex = EXERCISES.find((e) => e.name === exName)
    if (!ex) return
    setCurrent((prev) => [...prev, { ...ex, sets: 3, reps: '10–12' }])
  }

  function removeEx(i: number) {
    setCurrent((prev) => prev.filter((_, idx) => idx !== i))
  }

  function updateEx(i: number, field: 'sets' | 'reps', value: string | number) {
    setCurrent((prev) =>
      prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e)
    )
  }

  function saveRoutine() {
    if (!current.length) return
    const routineName = name.trim() || `Routine ${routines.length + 1}`
    setRoutines([...routines, { name: routineName, exercises: current, date: new Date().toISOString() }])
    setCurrent([])
    setName('')
  }

  function loadRoutine(idx: number) {
    setCurrent([...routines[idx].exercises])
    setName(routines[idx].name)
  }

  function deleteRoutine(idx: number) {
    setRoutines(routines.filter((_, i) => i !== idx))
  }

  return (
    <div className="page-enter">
      <SectionHeading title="WORKOUT BUILDER" sub="Craft your perfect routine" />

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Builder canvas */}
        <div className="flex-1 min-w-0">
          <div className="card p-5 mb-4">
            <div className="text-sm font-semibold text-gray-400 mb-3">🏗️ Build Routine</div>
            <input
              className="input-field w-full mb-4"
              placeholder="Routine name (e.g. My Push Day)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Drop area */}
            <div className="min-h-[180px] border-2 border-dashed border-dark-300 rounded-xl p-4 mb-4">
              {current.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-600 text-sm py-10 text-center">
                  Add exercises from the list on the right →
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {current.map((ex, i) => (
                    <div key={i} className="flex items-center gap-3 bg-dark-700 rounded-lg px-3 py-2.5">
                      <span className="text-xl flex-shrink-0">{ex.emoji}</span>
                      <span className="text-sm font-medium text-white flex-1 truncate">{ex.name}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <input
                          type="number"
                          className="input-field w-14 text-center px-2 py-1 text-xs"
                          value={ex.sets}
                          min={1} max={10}
                          onChange={(e) => updateEx(i, 'sets', +e.target.value)}
                        />
                        <span className="text-gray-600 text-xs">×</span>
                        <input
                          className="input-field w-20 text-center px-2 py-1 text-xs"
                          value={ex.reps}
                          onChange={(e) => updateEx(i, 'reps', e.target.value)}
                        />
                      </div>
                      <button
                        onClick={() => removeEx(i)}
                        className="text-gray-600 hover:text-brand-red transition-colors text-sm ml-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={saveRoutine}
              disabled={current.length === 0}
              className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              💾 Save Routine
            </button>
          </div>

          {/* Saved routines */}
          {routines.length > 0 && (
            <div className="card p-5">
              <div className="text-sm font-semibold text-gray-400 mb-3">📋 Saved Routines</div>
              <div className="flex flex-col gap-2">
                {routines.map((r, i) => (
                  <div key={i} className="bg-dark-700 rounded-lg px-4 py-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{r.name}</div>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {r.exercises.length} exercises · {r.exercises.slice(0, 2).map(e => e.name).join(', ')}
                        {r.exercises.length > 2 ? '…' : ''}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => loadRoutine(i)}
                        className="text-xs font-semibold text-brand-red2 bg-brand-red/10 border border-brand-red/20
                                   px-3 py-1.5 rounded-lg hover:bg-brand-red/20 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRoutine(i)}
                        className="text-xs text-gray-500 border border-dark-300 px-3 py-1.5 rounded-lg
                                   hover:text-red-400 hover:border-red-400/30 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Exercise picker */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="card p-5 sticky top-20">
            <div className="text-sm font-semibold text-gray-400 mb-3">📚 Add Exercises</div>
            <input
              className="input-field w-full mb-3"
              placeholder="Search exercises…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex flex-col gap-1.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredList.map((ex) => (
                <button
                  key={ex.name}
                  onClick={() => addEx(ex.name)}
                  className="flex items-center gap-3 bg-dark-700 hover:bg-dark-600 rounded-lg px-3 py-2.5
                             text-left transition-colors group w-full"
                >
                  <span className="text-xl flex-shrink-0">{ex.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{ex.name}</div>
                    <div className="text-xs text-gray-600">{ex.muscle} · {ex.diff}</div>
                  </div>
                  <span className="text-brand-red2 text-lg opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
