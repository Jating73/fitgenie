'use client'
import { useState } from 'react'
import { SectionHeading } from '@/components/ui'
import { cn } from '@/lib/utils'

type GuideTab = 'start' | 'form' | 'warmup' | 'recovery'

const STEPS: Record<GuideTab, { title: string; desc: string }[]> = {
  start: [
    { title: 'Set Your Goal',           desc: 'Define whether you want to build muscle, lose fat, improve endurance, or increase strength. This determines your training program and diet approach.' },
    { title: 'Choose a Program',        desc: 'Beginners should start with a full-body program 3x/week. Try our AI generator or explore the Splits section for a structured program.' },
    { title: 'Learn the Big Lifts',     desc: 'Focus on compound movements: Squat, Deadlift, Bench Press, Overhead Press, and Rows. These build the most muscle in the least time.' },
    { title: 'Progressive Overload',    desc: 'Add a small amount of weight or an extra rep each week. This is the fundamental key to continuous progress. Track everything in the Workout Tracker.' },
    { title: 'Rest and Nutrition',      desc: 'Muscles grow during rest, not during training. Sleep 7–9 hours, eat adequate protein (0.8–1g per lb bodyweight), and stay well hydrated.' },
  ],
  form: [
    { title: 'Start Light',             desc: 'Always start with a weight that allows perfect form. Ego lifting leads to injuries that set you back months of progress.' },
    { title: 'Controlled Tempo',        desc: 'Use a 2-1-2 tempo: 2 seconds lowering, 1 second pause, 2 seconds lifting. This maximizes muscle tension and time under tension.' },
    { title: 'Brace Your Core',         desc: 'Tighten your core like you\'re about to be punched. This protects your spine on all compound movements.' },
    { title: 'Full Range of Motion',    desc: 'Move through the complete range of motion to maximize muscle activation. Half reps build half the muscle — and reinforce bad habits.' },
    { title: 'Record Yourself',         desc: 'Film your sets periodically to check your form. What feels correct often looks very different on video — it\'s eye-opening.' },
  ],
  warmup: [
    { title: 'Light Cardio (5 min)',    desc: '5 minutes of light jogging, cycling, or jump rope to raise your heart rate and body temperature. Never skip this step.' },
    { title: 'Dynamic Stretching (5 min)', desc: 'Leg swings, arm circles, hip circles, and torso twists. Never perform static stretching on cold muscles — you\'ll reduce force output.' },
    { title: 'Activation Sets (3–5 min)', desc: '2–3 sets of the main lift at 40–50% of your working weight to prepare the specific muscles and prime the nervous system.' },
  ],
  recovery: [
    { title: 'Post-Workout Nutrition', desc: 'Consume 20–40g of protein and fast-digesting carbs within 45 minutes after training to maximize the anabolic window.' },
    { title: 'Static Stretching',      desc: 'Hold each stretch for 30–60 seconds after training. Target the muscles you worked. This reduces soreness and improves flexibility.' },
    { title: 'Deload Weeks',           desc: 'Every 4–6 weeks, take a deload week at 50–60% intensity. This prevents overtraining and typically leads to performance improvements afterwards.' },
    { title: 'Sleep Quality',          desc: 'Most muscle repair happens during deep sleep. 7–9 hours is optimal. Poor sleep equals poor gains regardless of how hard you train.' },
  ],
}

const TABS: { key: GuideTab; label: string; icon: string }[] = [
  { key: 'start',    label: 'Getting Started', icon: '🏁' },
  { key: 'form',     label: 'Proper Form',     icon: '✅' },
  { key: 'warmup',   label: 'Warm-Up',         icon: '🔥' },
  { key: 'recovery', label: 'Recovery',        icon: '🛌' },
]

export default function GuidePage() {
  const [tab, setTab] = useState<GuideTab>('start')

  return (
    <div className="page-enter">
      <SectionHeading title="BEGINNER'S GUIDE" sub="Everything you need to start your fitness journey" />

      {/* Tab row */}
      <div className="flex gap-1 bg-dark-800 border border-dark-400 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'flex-1 whitespace-nowrap py-2 px-3 rounded-lg text-[13px] font-medium transition-all duration-150',
              tab === key ? 'bg-dark-700 text-white shadow' : 'text-gray-600 hover:text-gray-400'
            )}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="card p-5">
        <div className="flex flex-col gap-3">
          {STEPS[tab].map((step, i) => (
            <div key={i} className="flex gap-4 bg-dark-700 rounded-xl p-4">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center
                              text-sm font-bold text-white flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <div className="font-semibold text-[15px] text-white mb-1">{step.title}</div>
                <div className="text-sm text-gray-400 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { emoji: '⚡', title: 'Generate a Plan', sub: 'Let AI create a custom workout plan for your goals', href: '/ai' },
          { emoji: '🏋️', title: 'Browse Exercises', sub: 'Explore 250+ exercises with full instructions', href: '/exercises' },
          { emoji: '📊', title: 'Start Tracking', sub: 'Log your workouts and track your progress', href: '/tracker' },
        ].map(({ emoji, title, sub, href }) => (
          <a
            key={href}
            href={href}
            className="card-hover p-5 block group"
          >
            <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-200">{emoji}</span>
            <div className="font-semibold text-[15px] text-white">{title}</div>
            <div className="text-xs text-gray-600 mt-1 leading-relaxed">{sub}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
