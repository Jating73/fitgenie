/**
 * lib/db.ts
 *
 * All Supabase database helpers for per-user fitness data.
 * Every function is async and returns typed data.
 *
 * Tables required in Supabase (see README for SQL):
 *   workout_logs   — individual logged sets
 *   personal_records — bench/squat/deadlift/ohp max weights
 *   measurements   — body measurements over time
 */

import { createClient } from '@/lib/supabase/client'

// ─────────────────────────────────────────────────────────────────────────────
// Types matching Supabase row shapes
// ─────────────────────────────────────────────────────────────────────────────

export interface DbWorkoutLog {
    id: string
    user_id: string
    exercise_name: string
    muscle_group: string
    sets: number
    reps: number
    weight_kg: number
    notes: string | null
    logged_at: string // ISO timestamp
}

export interface DbPR {
    id: string
    user_id: string
    exercise_name: string
    weight_kg: number
    recorded_at: string
}

export interface DbMeasurement {
    id: string
    user_id: string
    weight_kg: number | null
    chest_cm: number | null
    waist_cm: number | null
    arms_cm: number | null
    recorded_at: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Workout Logs
// ─────────────────────────────────────────────────────────────────────────────

export async function insertLog(
    userId: string,
    data: {
        exercise_name: string
        muscle_group: string
        sets: number
        reps: number
        weight_kg: number
        notes?: string
    },
): Promise<DbWorkoutLog | null> {
    const sb = createClient()
    const { data: row, error } = await sb
        .from('workout_logs')
        .insert({ user_id: userId, ...data, logged_at: new Date().toISOString() })
        .select()
        .single()
    if (error) { console.error('insertLog', error); return null }
    return row as DbWorkoutLog
}

export async function fetchLogs(userId: string, limit = 200): Promise<DbWorkoutLog[]> {
    const sb = createClient()
    const { data, error } = await sb
        .from('workout_logs')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: false })
        .limit(limit)
    if (error) { console.error('fetchLogs', error); return [] }
    return (data ?? []) as DbWorkoutLog[]
}

export async function deleteLog(id: string): Promise<boolean> {
    const sb = createClient()
    const { error } = await sb.from('workout_logs').delete().eq('id', id)
    if (error) { console.error('deleteLog', error); return false }
    return true
}

/** Volume (sets × reps × weight) summed per calendar day for the last N days */
export async function fetchDailyVolume(
    userId: string,
    days = 30,
): Promise<{ date: string; volume: number }[]> {
    const since = new Date()
    since.setDate(since.getDate() - days)

    const logs = await fetchLogs(userId, 2000)
    const map: Record<string, number> = {}

    logs.forEach((l) => {
        if (new Date(l.logged_at) < since) return
        const day = l.logged_at.slice(0, 10) // YYYY-MM-DD
        map[day] = (map[day] ?? 0) + l.sets * l.reps * (l.weight_kg || 1)
    })

    // Fill every day in range
    const result: { date: string; volume: number }[] = []
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const key = d.toISOString().slice(0, 10)
        result.push({ date: key, volume: Math.round(map[key] ?? 0) })
    }
    return result
}

/** Sets logged per muscle group — for radar / doughnut chart */
export async function fetchMuscleBreakdown(
    userId: string,
): Promise<{ muscle: string; sets: number }[]> {
    const logs = await fetchLogs(userId, 2000)
    const map: Record<string, number> = {}
    logs.forEach((l) => { map[l.muscle_group] = (map[l.muscle_group] ?? 0) + l.sets })
    return Object.entries(map)
        .map(([muscle, sets]) => ({ muscle, sets }))
        .sort((a, b) => b.sets - a.sets)
}

// ─────────────────────────────────────────────────────────────────────────────
// Personal Records
// ─────────────────────────────────────────────────────────────────────────────

const LIFTS = ['Barbell Bench Press', 'Squat', 'Deadlift', 'Overhead Press'] as const
export type LiftName = typeof LIFTS[number]

export interface PRSummary {
    bench: number
    squat: number
    dl: number
    ohp: number
}

export async function fetchPRs(userId: string): Promise<PRSummary> {
    const sb = createClient()
    const { data, error } = await sb
        .from('personal_records')
        .select('exercise_name, weight_kg')
        .eq('user_id', userId)
        .in('exercise_name', [...LIFTS])
        .order('weight_kg', { ascending: false })

    const defaults: PRSummary = { bench: 0, squat: 0, dl: 0, ohp: 0 }
    if (error || !data) return defaults

    const seen = new Set<string>()
    data.forEach((r) => {
        if (seen.has(r.exercise_name)) return
        seen.add(r.exercise_name)
        if (r.exercise_name === 'Barbell Bench Press') defaults.bench = r.weight_kg
        if (r.exercise_name === 'Squat') defaults.squat = r.weight_kg
        if (r.exercise_name === 'Deadlift') defaults.dl = r.weight_kg
        if (r.exercise_name === 'Overhead Press') defaults.ohp = r.weight_kg
    })
    return defaults
}

/** Returns full PR history for a lift (for line chart) */
export async function fetchPRHistory(
    userId: string,
    exerciseName: LiftName,
): Promise<{ date: string; weight: number }[]> {
    const sb = createClient()
    const { data, error } = await sb
        .from('personal_records')
        .select('weight_kg, recorded_at')
        .eq('user_id', userId)
        .eq('exercise_name', exerciseName)
        .order('recorded_at', { ascending: true })
    if (error || !data) return []
    return data.map((r) => ({ date: r.recorded_at.slice(0, 10), weight: r.weight_kg }))
}

export async function upsertPR(
    userId: string,
    exerciseName: LiftName,
    weightKg: number,
): Promise<boolean> {
    const sb = createClient()
    const { error } = await sb.from('personal_records').insert({
        user_id: userId,
        exercise_name: exerciseName,
        weight_kg: weightKg,
        recorded_at: new Date().toISOString(),
    })
    if (error) { console.error('upsertPR', error); return false }
    return true
}

// ─────────────────────────────────────────────────────────────────────────────
// Body Measurements
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchLatestMeasurement(userId: string): Promise<DbMeasurement | null> {
    const sb = createClient()
    const { data, error } = await sb
        .from('measurements')
        .select('*')
        .eq('user_id', userId)
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single()
    if (error) return null
    return data as DbMeasurement
}

export async function fetchMeasurementHistory(
    userId: string,
    field: 'weight_kg' | 'chest_cm' | 'waist_cm' | 'arms_cm',
    limit = 12,
): Promise<{ date: string; value: number }[]> {
    const sb = createClient()
    const { data, error } = await sb
        .from('measurements')
        .select(`recorded_at, ${field}`)
        .eq('user_id', userId)
        .not(field, 'is', null)
        .order('recorded_at', { ascending: true })
        .limit(limit)
    if (error || !data) return []
    return data.map((r) => ({ date: r.recorded_at.slice(0, 10), value: (r as Record<string, number>)[field] as number }))
}

export async function insertMeasurement(
    userId: string,
    data: {
        weight_kg?: number
        chest_cm?: number
        waist_cm?: number
        arms_cm?: number
    },
): Promise<boolean> {
    const sb = createClient()
    const { error } = await sb.from('measurements').insert({
        user_id: userId,
        ...data,
        recorded_at: new Date().toISOString(),
    })
    if (error) { console.error('insertMeasurement', error); return false }
    return true
}

// ─────────────────────────────────────────────────────────────────────────────
// Streak helpers (computed client-side from logs)
// ─────────────────────────────────────────────────────────────────────────────

export function computeStreak(logs: DbWorkoutLog[]): number {
    const days = new Set(logs.map((l) => l.logged_at.slice(0, 10)))
    let streak = 0
    for (let i = 0; i < 365; i++) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        if (days.has(d.toISOString().slice(0, 10))) streak++
        else break
    }
    return streak
}

export function computeWeeklyActivity(logs: DbWorkoutLog[]): boolean[] {
    const days = new Set(logs.map((l) => l.logged_at.slice(0, 10)))
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - 6 + i)
        return days.has(d.toISOString().slice(0, 10))
    })
}