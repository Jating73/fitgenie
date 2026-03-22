'use client'
/**
 * Real authentication backed by Supabase Auth.
 *
 * Provides:
 *  - AuthProvider  — wraps the app, manages session state
 *  - useAuth()     — hook for any component that needs auth
 *
 * Session is stored in a secure HTTP-only cookie managed by @supabase/ssr,
 * so it persists across page reloads, tabs, and server-side rendering.
 */

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

// ─────────────────────────────────────────────────────────────────────────────
// Public user shape (stripped from Supabase User)
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthUser {
    id: string
    email: string
    name: string
    avatar: string   // two-letter initials
    createdAt: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Context shape
// ─────────────────────────────────────────────────────────────────────────────

interface AuthCtx {
    user: AuthUser | null
    session: Session | null
    isLoading: boolean
    signUp: (name: string, email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    openAuthModal: (mode?: 'login' | 'signup') => void
    closeAuthModal: () => void
    authModalOpen: boolean
    authModalMode: 'login' | 'signup'
}

const Ctx = createContext<AuthCtx>({
    user: null, session: null, isLoading: true,
    signUp: async () => { }, signIn: async () => { }, signOut: async () => { },
    openAuthModal: () => { }, closeAuthModal: () => { },
    authModalOpen: false, authModalMode: 'login',
})

// ─────────────────────────────────────────────────────────────────────────────
// Convert Supabase User → AuthUser
// ─────────────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toAuthUser(user: any): AuthUser {
    const name: string =
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        user.email?.split('@')[0] ??
        'Athlete'
    const initials = name
        .split(' ')
        .map((w: string) => w[0] ?? '')
        .join('')
        .toUpperCase()
        .slice(0, 2)
    return {
        id: user.id,
        email: user.email ?? '',
        name,
        avatar: initials,
        createdAt: user.created_at,
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login')

    // Initialise once on mount
    useEffect(() => {
        const sb = createClient()

        sb.auth.getSession().then(({ data: { session: s } }) => {
            setSession(s)
            setUser(s?.user ? toAuthUser(s.user) : null)
            setIsLoading(false)
        })

        const { data: { subscription } } = sb.auth.onAuthStateChange((_event, s) => {
            setSession(s)
            setUser(s?.user ? toAuthUser(s.user) : null)
            setIsLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    // ── Sign Up ──
    const signUp = useCallback(async (name: string, email: string, password: string) => {
        const sb = createClient()
        const { error } = await sb.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } },
        })
        if (error) throw new Error(error.message)
        setAuthModalOpen(false)
    }, [])

    // ── Sign In ──
    const signIn = useCallback(async (email: string, password: string) => {
        const sb = createClient()
        const { error } = await sb.auth.signInWithPassword({ email, password })
        if (error) throw new Error(error.message)
        setAuthModalOpen(false)
    }, [])

    // ── Sign Out ──
    const signOut = useCallback(async () => {
        const sb = createClient()
        await sb.auth.signOut()
        setUser(null)
        setSession(null)
    }, [])

    // ── Modal ──
    const openAuthModal = useCallback((mode: 'login' | 'signup' = 'login') => {
        setAuthModalMode(mode)
        setAuthModalOpen(true)
    }, [])
    const closeAuthModal = useCallback(() => setAuthModalOpen(false), [])

    return (
        <Ctx.Provider value={{
            user, session, isLoading,
            signUp, signIn, signOut,
            openAuthModal, closeAuthModal,
            authModalOpen, authModalMode,
        }}>
            {children}
        </Ctx.Provider>
    )
}

export function useAuth() { return useContext(Ctx) }