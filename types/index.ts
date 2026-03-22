export interface Exercise {
  name: string
  muscle: string
  secondary: string[]
  diff: 'Beginner' | 'Intermediate' | 'Advanced'
  eq: string
  emoji: string
  calories: number
  instructions: string[]
  mistakes: string[]
  tips: string[]
  gifUrl?: string
  primaryMuscle?: string,
  youtubeUrl?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth & per-user data
// ─────────────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  avatar?: string
}

/** One logged exercise set stored per-user in localStorage */
export interface UserWorkoutLog {
  id: string
  userId: string
  ex: string
  muscle: string
  sets: number
  reps: number
  weight: number
  date: string
}

/** Strength personal records stored per-user */
export interface UserPRData {
  userId: string
  bench: number
  squat: number
  dl: number
  ohp: number
}

/** Body measurements stored per-user */
export interface UserMeasurements {
  userId: string
  weight: number
  chest: number
  waist: number
  arms: number
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}


// --------------- Muscle Map hierarchy ---------------
export interface SubMuscle {
  name: string
  desc: string
  color: string
}

export interface MuscleDetail {
  key: string
  label: string
  subMuscles: SubMuscle[]
  accentColor: string
}

export interface SplitDay {
  day: number
  name: string
  muscles: string
}

export interface Split {
  name: string
  days: string
  desc: string
  schedule: SplitDay[]
}

export interface MuscleGroup {
  name: string
  icon: string
  count: number
  tag: 'upper' | 'lower' | 'core' | 'cardio'
  tagLabel: string
}

export interface WorkoutLog {
  id: string
  ex: string
  sets: number
  reps: number
  weight: number
  date: string
}

export interface PRData {
  bench: number
  squat: number
  dl: number
  ohp: number
}

export interface Measurements {
  weight: number
  chest: number
  waist: number
  arms: number
}

export interface Challenge {
  id: string
  title: string
  emoji: string
  category: string
  difficulty: string
  steps: { num: number | string; lbl: string }[]
}

export interface BuilderExercise extends Exercise {
  sets: number
  reps: string
}

export interface Routine {
  name: string
  exercises: BuilderExercise[]
  date: string
}
