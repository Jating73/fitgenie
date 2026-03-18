'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/',           label: 'Home'      },
  { href: '/exercises',  label: 'Exercises' },
  { href: '/splits',     label: 'Splits'    },
  { href: '/builder',    label: 'Builder'   },
  { href: '/tracker',    label: 'Tracker'   },
  { href: '/progress',   label: 'Progress'  },
  { href: '/musclemap',  label: 'Muscle Map'},
  { href: '/timer',      label: 'Timer'     },
  { href: '/ai',         label: 'AI Plan'   },
  { href: '/challenges', label: 'Challenges'},
  { href: '/guide',      label: 'Guide'     },
]

export function Navbar() {
  const pathname = usePathname()

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

        <Link
          href="/progress"
          className="hidden md:inline-flex flex-shrink-0 bg-brand-red text-white text-[13px] font-semibold
                     px-4 py-2 rounded-lg hover:bg-brand-red2 transition-colors duration-150 whitespace-nowrap"
        >
          Dashboard
        </Link>
      </div>
    </header>
  )
}
