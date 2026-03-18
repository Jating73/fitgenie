'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const mobileLinks = [
  { href: '/',          label: 'Home',      icon: '🏠' },
  { href: '/exercises', label: 'Exercises', icon: '📚' },
  { href: '/splits',    label: 'Splits',    icon: '📅' },
  { href: '/tracker',   label: 'Tracker',   icon: '📊' },
  { href: '/ai',        label: 'AI Plan',   icon: '⚡' },
]

export function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50
                    bg-dark-800/97 backdrop-blur-xl border-t border-dark-400
                    pb-safe">
      <div className="flex justify-around py-2">
        {mobileLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors duration-150',
              pathname === href ? 'text-brand-red2' : 'text-gray-600'
            )}
          >
            <span className="text-xl leading-none">{icon}</span>
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
