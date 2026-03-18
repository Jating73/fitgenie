import Link from 'next/link'
import { MUSCLES } from '@/lib/data'
import { MuscleTag } from '@/components/ui'

export default function HomePage() {
  const quickLinks = [
    { href: '/exercises',  icon: '🏋️', label: 'Exercise Library', sub: '250+ exercises'  },
    { href: '/splits',     icon: '📅', label: 'Workout Splits',   sub: '9 programs'       },
    { href: '/tracker',    icon: '📊', label: 'Workout Tracker',  sub: 'Log & track'      },
    { href: '/challenges', icon: '🔥', label: 'Daily Challenges', sub: 'New each day'     },
  ]

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-[#1a0505] to-dark-900
                           border border-dark-400 rounded-2xl px-8 md:px-12 py-14 mb-10">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30
                          text-brand-green rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse-dot" />
            250+ Exercises · 15 Muscle Groups
          </div>

          <h1 className="font-display text-[clamp(52px,10vw,100px)] leading-[0.92] tracking-wider mb-4">
            TRAIN LIKE
            <br />
            <span className="text-brand-red2">A BEAST</span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed mb-8">
            Professional workout programs, exercise library, AI-powered planning,
            and progress tracking — all in one platform.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link href="/ai" className="btn-primary text-base py-3.5 px-7">
              ⚡ Generate My Plan
            </Link>
            <Link href="/exercises" className="btn-secondary text-base py-3.5 px-7">
              Browse Exercises →
            </Link>
          </div>

          <div className="flex gap-10 mt-10 pt-8 border-t border-dark-400 flex-wrap">
            {[['250+', 'Exercises'], ['9', 'Splits'], ['15', 'Muscle Groups'], ['100%', 'Free']].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="font-display text-4xl text-brand-red2 leading-none">{val}</div>
                <div className="text-xs text-gray-600 font-medium tracking-widest uppercase mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick access */}
      <div className="mb-10">
        <h2 className="section-title">QUICK ACCESS</h2>
        <p className="section-sub">Jump into your training</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map(({ href, icon, label, sub }) => (
            <Link
              key={href}
              href={href}
              className="card-hover p-5 group block"
            >
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-200">
                {icon}
              </span>
              <div className="font-semibold text-[15px] text-white">{label}</div>
              <div className="text-xs text-gray-600 mt-1">{sub}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Muscle groups */}
      <div className="mb-10">
        <h2 className="section-title">BY MUSCLE GROUP</h2>
        <p className="section-sub">Select a muscle to explore exercises</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {MUSCLES.map((m) => (
            <Link
              key={m.name}
              href={`/exercises?muscle=${encodeURIComponent(m.name)}`}
              className="card-hover p-4 group block"
            >
              <span className="text-3xl mb-2.5 block group-hover:scale-110 transition-transform duration-200">
                {m.icon}
              </span>
              <div className="font-semibold text-[14px] text-white">{m.name}</div>
              <div className="text-xs text-gray-600 mt-0.5">{m.count} exercises</div>
              <MuscleTag tag={m.tag} label={m.tagLabel} />
            </Link>
          ))}
        </div>
      </div>

      {/* Today's challenge teaser */}
      <div>
        <h2 className="section-title">TODAY'S CHALLENGE</h2>
        <p className="section-sub">Daily push</p>
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-r from-brand-red/20 to-transparent px-6 py-4
                          flex justify-between items-center border-b border-dark-400">
            <div className="font-display text-2xl tracking-wide">💪 100 PUSH-UP CHALLENGE</div>
            <span className="text-xs text-gray-500 bg-dark-700 px-3 py-1 rounded-md">DAILY · BEGINNER</span>
          </div>
          <div className="p-6">
            <div className="flex gap-3 mb-4">
              {[25, 25, 25, 25].map((n, i) => (
                <div key={i} className="flex-1 bg-dark-700 rounded-lg p-3 text-center">
                  <div className="font-display text-2xl text-brand-red2">{n}</div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest">Set {i + 1}</div>
                </div>
              ))}
            </div>
            <Link
              href="/challenges"
              className="block w-full text-center bg-dark-700 border border-dark-300 text-gray-400
                         py-3 rounded-lg hover:border-brand-red/40 hover:text-white transition-all duration-200
                         font-semibold text-sm"
            >
              View All Challenges →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
