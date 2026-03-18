'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { EXERCISES, MUSCLES } from '@/lib/data'
import { ExerciseCard } from '@/components/sections/ExerciseCard'
import { ExerciseModal } from '@/components/sections/ExerciseModal'
import { FilterChip, SectionHeading } from '@/components/ui'
import type { Exercise } from '@/types'
import { useLocalStorage } from '@/lib/useLocalStorage'
import type { Routine } from '@/types'

const DIFFICULTIES = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
const EQUIPMENTS = ['All Equipment', 'Barbell', 'Dumbbell', 'Bodyweight', 'Machine']

export default function ExercisesClient() {
    const searchParams = useSearchParams()
    const initMuscle = searchParams.get('muscle') || 'All'

    const [query, setQuery] = useState('')
    const [muscle, setMuscle] = useState(initMuscle)
    const [diff, setDiff] = useState('All Levels')
    const [eq, setEq] = useState('All Equipment')
    const [selected, setSelected] = useState<Exercise | null>(null)
    const [routines, setRoutines] = useLocalStorage<Routine[]>('fitgenie_routines', [])

    const filtered = useMemo(() => {
        return EXERCISES.filter((e) => {
            const q = query.toLowerCase()
            const matchQ = !q || e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q)
            const matchD = diff === 'All Levels' || e.diff === diff
            const matchEq = eq === 'All Equipment' || e.eq === eq
            const matchM = muscle === 'All' || e.muscle === muscle
            return matchQ && matchD && matchEq && matchM
        })
    }, [query, muscle, diff, eq])

    function addToBuilder(ex: Exercise) {
        const updated = [...routines]
        if (!updated.length) {
            updated.push({ name: 'My Routine', exercises: [{ ...ex, sets: 3, reps: '10–12' }], date: new Date().toISOString() })
        } else {
            updated[updated.length - 1].exercises.push({ ...ex, sets: 3, reps: '10–12' })
        }
        setRoutines(updated)
    }

    return (
        <div className="page-enter">
            <SectionHeading title="EXERCISE LIBRARY" sub="Browse 250+ exercises with full demonstrations" />

            {/* Search */}
            <div className="relative mb-5">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-lg">🔍</span>
                <input
                    className="input-field w-full pl-11 py-3.5 text-[15px]"
                    placeholder="Search exercises by name or muscle…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {/* Muscle filter */}
            <div className="flex gap-2 flex-wrap mb-3">
                <FilterChip label="All" active={muscle === 'All'} onClick={() => setMuscle('All')} />
                {MUSCLES.map((m) => (
                    <FilterChip key={m.name} label={m.name} active={muscle === m.name} onClick={() => setMuscle(m.name)} />
                ))}
            </div>

            {/* Diff + Equipment filter */}
            <div className="flex gap-2 flex-wrap mb-6">
                {DIFFICULTIES.map((d) => (
                    <FilterChip key={d} label={d} active={diff === d} onClick={() => setDiff(d)} />
                ))}
                {EQUIPMENTS.map((e) => (
                    <FilterChip key={e} label={e} active={eq === e} onClick={() => setEq(e)} />
                ))}
            </div>

            {/* Count */}
            <p className="text-sm text-gray-600 mb-4">
                Showing <span className="text-brand-red2 font-semibold">{filtered.length}</span> exercises
            </p>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-600">
                    <div className="text-5xl mb-4">🔍</div>
                    <div className="text-lg font-semibold text-gray-500">No exercises found</div>
                    <div className="text-sm mt-1">Try different filters or search terms</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((ex) => (
                        <ExerciseCard key={ex.name} exercise={ex} onClick={() => setSelected(ex)} />
                    ))}
                </div>
            )}

            <ExerciseModal
                exercise={selected}
                onClose={() => setSelected(null)}
                onAddToBuilder={addToBuilder}
            />
        </div>
    )
}
