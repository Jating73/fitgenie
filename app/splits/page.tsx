import { SPLITS } from '@/lib/data'
import { DayDot, SectionHeading } from '@/components/ui'

export default function SplitsPage() {
  return (
    <div className="page-enter">
      <SectionHeading title="WORKOUT SPLITS" sub="Pre-built programs for every goal and schedule" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {SPLITS.map((split) => (
          <div
            key={split.name}
            className="card-hover p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-display text-2xl tracking-wide text-white">{split.name}</h3>
              <span className="text-xs font-bold text-brand-red2 bg-brand-red/15 px-3 py-1 rounded-md whitespace-nowrap ml-3">
                {split.days}
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-4">{split.desc}</p>

            <div className="flex flex-col gap-2">
              {split.schedule.map((day) => (
                <div key={day.day} className="flex items-center gap-3 bg-dark-700 rounded-lg px-3 py-2.5">
                  <DayDot day={day.day} />
                  <div>
                    <div className="text-sm font-semibold text-white leading-tight">{day.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{day.muscles}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
