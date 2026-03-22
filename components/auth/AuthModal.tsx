'use client'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'

// Fitness motivational quotes shown on the art panel
const QUOTES = [
    { text: 'The only bad workout is the one that didn\'t happen.', author: 'Unknown' },
    { text: 'Train insane or remain the same.', author: 'Jillian Michaels' },
    { text: 'Your body can stand almost anything. It\'s your mind you have to convince.', author: 'Unknown' },
    { text: 'Strength does not come from the body. It comes from the will of the soul.', author: 'Gandhi' },
    { text: 'No pain, no gain. Shut up and train.', author: 'Unknown' },
]

const MUSCLES = ['Chest', 'Back', 'Arms', 'Legs', 'Core', 'Shoulders', 'Glutes', 'Calves']

export function AuthModal() {
    const { authModalOpen, authModalMode, closeAuthModal, signIn, signUp } = useAuth()

    const [mode, setMode] = useState(authModalMode)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [confirmPw, setConfirmPw] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPw, setShowPw] = useState(false)
    const [quoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length))
    const emailRef = useRef<HTMLInputElement>(null)

    // Sync internal mode with prop
    useEffect(() => { setMode(authModalMode) }, [authModalMode])

    // Focus email on open
    useEffect(() => {
        if (authModalOpen) {
            setTimeout(() => emailRef.current?.focus(), 80)
            setError('')
        }
    }, [authModalOpen])

    // Esc to close
    useEffect(() => {
        if (!authModalOpen) return
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAuthModal() }
        document.addEventListener('keydown', h)
        document.body.style.overflow = 'hidden'
        return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
    }, [authModalOpen, closeAuthModal])

    if (!authModalOpen) return null

    function switchMode(m: 'login' | 'signup') {
        setMode(m); setError(''); setName(''); setPw(''); setConfirmPw('')
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        if (!email || !pw) { setError('Please fill in all fields.'); return }
        if (mode === 'signup') {
            if (!name.trim()) { setError('Please enter your name.'); return }
            if (pw.length < 6) { setError('Password must be at least 6 characters.'); return }
            if (pw !== confirmPw) { setError('Passwords do not match.'); return }
        }
        setLoading(true)
        try {
            if (mode === 'signup') await signUp(name, email, pw)
            else await signIn(email, pw)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    const quote = QUOTES[quoteIdx]

    return (
        <div
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) closeAuthModal() }}
        >
            <div className="w-full max-w-3xl bg-dark-800 border border-dark-300 rounded-2xl overflow-hidden
                      shadow-2xl shadow-black flex flex-col md:flex-row animate-fade-up">

                {/* ── Left art panel ── */}
                <div className="hidden md:flex flex-col justify-between w-72 flex-shrink-0 relative overflow-hidden
                        bg-gradient-to-br from-[#1a0505] via-dark-900 to-[#050a1a] p-8">
                    {/* Grid texture */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(230,57,70,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.4) 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />
                    {/* Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full
                          bg-brand-red/10 blur-3xl pointer-events-none" />

                    {/* Logo */}
                    <div className="relative z-10">
                        <div className="font-display text-3xl text-brand-red2 tracking-widest leading-none">FITGENIE</div>
                        <div className="text-[10px] text-gray-600 tracking-[4px] mt-0.5">PREMIUM TRAINING</div>
                    </div>

                    {/* Floating muscle tags */}
                    <div className="relative z-10 flex flex-wrap gap-2 my-6">
                        {MUSCLES.map((m, i) => (
                            <span
                                key={m}
                                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                                style={{
                                    borderColor: `hsl(${(i * 45) % 360}, 60%, 50%, 0.4)`,
                                    color: `hsl(${(i * 45) % 360}, 70%, 65%)`,
                                    background: `hsl(${(i * 45) % 360}, 60%, 15%)`,
                                }}
                            >
                                {m}
                            </span>
                        ))}
                    </div>

                    {/* Quote */}
                    <div className="relative z-10">
                        <blockquote className="text-sm text-gray-400 leading-relaxed italic">
                            &ldquo;{quote.text}&rdquo;
                        </blockquote>
                        <p className="text-xs text-gray-600 mt-2">— {quote.author}</p>
                    </div>
                </div>

                {/* ── Right form panel ── */}
                <div className="flex-1 p-8 flex flex-col">
                    {/* Close button */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="font-display text-2xl tracking-wide text-white">
                                {mode === 'login' ? 'WELCOME BACK' : 'JOIN FITGENIE'}
                            </h2>
                            <p className="text-xs text-gray-600 mt-0.5">
                                {mode === 'login' ? 'Sign in to your account' : 'Create your free account'}
                            </p>
                        </div>
                        <button
                            onClick={closeAuthModal}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-700 text-gray-500
                         hover:text-white hover:bg-dark-600 transition-colors text-lg"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Mode tabs */}
                    <div className="flex gap-1 bg-dark-700 rounded-xl p-1 mb-6">
                        {(['login', 'signup'] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => switchMode(m)}
                                className={cn(
                                    'flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-150',
                                    mode === m ? 'bg-brand-red text-white shadow' : 'text-gray-500 hover:text-gray-300',
                                )}
                            >
                                {m === 'login' ? 'Sign In' : 'Sign Up'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="flex flex-col gap-3 flex-1">
                        {/* Name — signup only */}
                        {mode === 'signup' && (
                            <div>
                                <label className="text-xs text-gray-500 font-semibold tracking-wider uppercase block mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    className="input-field w-full"
                                    placeholder="Alex Johnson"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="text-xs text-gray-500 font-semibold tracking-wider uppercase block mb-1.5">
                                Email
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                className="input-field w-full"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs text-gray-500 font-semibold tracking-wider uppercase block mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    className="input-field w-full pr-10"
                                    placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                                    value={pw}
                                    onChange={(e) => setPw(e.target.value)}
                                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 text-xs"
                                >
                                    {showPw ? 'HIDE' : 'SHOW'}
                                </button>
                            </div>
                        </div>

                        {/* Confirm password — signup only */}
                        {mode === 'signup' && (
                            <div>
                                <label className="text-xs text-gray-500 font-semibold tracking-wider uppercase block mb-1.5">
                                    Confirm Password
                                </label>
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    className="input-field w-full"
                                    placeholder="Re-enter password"
                                    value={confirmPw}
                                    onChange={(e) => setConfirmPw(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="bg-brand-red/10 border border-brand-red/30 rounded-lg px-4 py-2.5
                              text-sm text-brand-red2 flex items-center gap-2">
                                <span>⚠</span> {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                'btn-primary w-full justify-center mt-2 py-3.5',
                                loading && 'opacity-60 cursor-not-allowed',
                            )}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                    </svg>
                                    {mode === 'login' ? 'Signing in…' : 'Creating account…'}
                                </span>
                            ) : mode === 'login' ? '→ Sign In' : '→ Create Account'}
                        </button>

                        {/* Switch mode link */}
                        <p className="text-center text-xs text-gray-600 mt-1">
                            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                            <button
                                type="button"
                                onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                                className="text-brand-red2 hover:underline font-semibold"
                            >
                                {mode === 'login' ? 'Sign up free' : 'Sign in'}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}