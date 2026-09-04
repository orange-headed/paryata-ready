'use client'

import { useApp } from '@/lib/app-context'
import { CURRENT_LOCATION, destinations } from '@/lib/data'
import { Navigation } from 'lucide-react'

// Hand-placed relative pins (percentages) over the stylized map texture.
const pins = [
  { id: 'chettinad', x: 68, y: 30 },
  { id: 'dhanushkodi', x: 82, y: 72 },
  { id: 'gokarna', x: 22, y: 24 },
  { id: 'bundi', x: 40, y: 60 },
]

export function DiscoveryMap() {
  const { openDestination } = useApp()

  return (
    <div className="relative overflow-hidden rounded-3xl ring-1 ring-border/60 shadow-[0_10px_30px_-14px_rgba(27,36,54,0.35)]">
      <img
        src="/images/map-bg.png"
        alt="Map of destinations near you"
        className="h-56 w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

      {/* Current location pin (center) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="relative flex size-4 items-center justify-center">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
          <span className="relative inline-flex size-3.5 rounded-full border-2 border-card bg-primary" />
        </span>
      </div>

      {/* Destination pins */}
      {pins.map((pin) => {
        const dest = destinations.find((d) => d.id === pin.id)
        if (!dest) return null
        return (
          <button
            key={pin.id}
            onClick={() => openDestination(pin.id)}
            aria-label={`Open ${dest.name}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform active:scale-90"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span className="flex flex-col items-center">
              <span className="grid size-8 place-items-center rounded-full border-2 border-card bg-navy text-navy-foreground shadow-md">
                <Navigation className="size-3.5 text-primary" />
              </span>
              <span className="mt-1 rounded-full bg-card/90 px-2 py-0.5 text-[0.6rem] font-semibold text-foreground shadow-sm backdrop-blur">
                {dest.name}
              </span>
            </span>
          </button>
        )
      })}

      {/* Location label */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
        <span className="size-2 rounded-full bg-primary" />
        You are in {CURRENT_LOCATION.city}
      </div>
    </div>
  )
}
