'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth'

const links = [
  { href: '/', label: 'Home' },
  { href: '/exercises', label: 'Exercises' },
  { href: '/splits', label: 'Splits' },
  { href: '/builder', label: 'Builder' },
  { href: '/tracker', label: 'Tracker' },
  { href: '/progress', label: 'Progress' },
  { href: '/musclemap', label: 'Muscle Map' },
  { href: '/timer', label: 'Timer' },
  { href: '/ai', label: 'AI Plan' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/guide', label: 'Guide' },
]

export function Navbar() {
  const pathname = usePathname()

  const { user, signOut, openAuthModal, isLoading } = useAuth()
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-xl border-b border-dark-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between gap-4">
        <Link href="/" className="flex-shrink-0">
          <div className="font-display text-2xl text-brand-red2 tracking-widest leading-none">
            FITGENIE
          </div>
          <div className="text-[10px] text-gray-600 tracking-[3px] font-light -mt-1">
            PREMIUM TRAINING
          </div>
        </Link>

        {/* Desktop nav — scrollable */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 justify-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-[13px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150',
                pathname === href
                  ? 'text-brand-red2 bg-brand-red/10 border border-brand-red/20'
                  : 'text-gray-500 hover:text-white hover:bg-dark-700'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-dark-700 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen((v) => !v)}
                className="flex items-center gap-2 bg-dark-700 border border-dark-300
                           hover:border-dark-200 rounded-xl px-3 py-1.5 transition-colors group"
              >
                {/* Avatar circle */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-red to-brand-accent
                                flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                  {user.avatar ?? user.name[0].toUpperCase()}
                </div>
                <span className="text-[13px] font-medium text-white max-w-[100px] truncate">{user.name}</span>
                <span className={cn('text-gray-600 text-xs transition-transform duration-150', dropOpen && 'rotate-180')}>▾</span>
              </button>

              {/* Dropdown */}
              {dropOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-dark-800 border border-dark-300
                                rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50 animate-fade-up">
                  <div className="px-4 py-3 border-b border-dark-400">
                    <div className="text-sm font-semibold text-white truncate">{user.name}</div>
                    <div className="text-xs text-gray-600 truncate">{user.email}</div>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/progress"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400
                                 hover:bg-dark-700 hover:text-white transition-colors"
                    >
                      📊 My Dashboard
                    </Link>
                    <Link
                      href="/tracker"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400
                                 hover:bg-dark-700 hover:text-white transition-colors"
                    >
                      ➕ Log Workout
                    </Link>
                    <button
                      onClick={() => { signOut(); setDropOpen(false) }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                                 text-red-400 hover:bg-brand-red/10 transition-colors mt-1 border-t border-dark-400 pt-2"
                    >
                      ↩ Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="text-[13px] font-medium text-gray-400 hover:text-white px-3 py-1.5
                           rounded-lg hover:bg-dark-700 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="text-[13px] font-semibold bg-brand-red text-white px-4 py-2 rounded-lg
                           hover:bg-brand-red2 transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
