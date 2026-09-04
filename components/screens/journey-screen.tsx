'use client'

import { useApp } from '@/lib/app-context'
import type { JourneyStop } from '@/lib/types'
import { MapPin, Plus, Sparkles, Utensils } from 'lucide-react'

const stopIcon = {
  destination: MapPin,
  experience: Sparkles,
  food: Utensils,
} as const

export function JourneyScreen() {
  const { journey, setScreen, sayRobo } = useApp()

  return (
    <div className="animate-screen-in space-y-6 px-5 py-5 pb-4">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Your itinerary
        </p>
        <h1 className="font-display text-2xl font-extrabold leading-tight text-foreground">
          Madurai Slow Loop
        </h1>
        <p className="text-sm text-muted-foreground">
          {journey.length}-day journey · balanced for low crowds & local impact
        </p>
      </header>

      {/* AI recommendation card */}
      <div className="rounded-3xl bg-navy p-5 text-navy-foreground">
        <div className="mb-2 flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-primary/20">
            <Sparkles className="size-4 text-primary" />
          </span>
          <h2 className="font-display text-sm font-bold">Paryata AI suggests</h2>
        </div>
        <p className="text-pretty text-sm leading-relaxed text-navy-foreground/85">
          Swap the busy afternoon temple visit for a{' '}
          <span className="font-semibold text-primary">sunrise slot</span> and
          detour to Chettinad on Day 2 — you&apos;ll dodge crowds and support two
          more local kitchens.
        </p>
        <button
          onClick={() => sayRobo('Great — I re-routed your loop to hit the quiet hours!', 'excited')}
          className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-transform active:scale-95"
        >
          Apply smart route
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-5">
        {journey.map((day) => (
          <div key={day.day} className="relative pl-10">
            {/* rail */}
            <span className="absolute left-3 top-2 bottom-0 w-px bg-border" />
            <span className="absolute left-0 top-0 grid size-7 place-items-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground">
              {day.day}
            </span>

            <div className="mb-3">
              <h3 className="font-display text-base font-bold text-foreground">
                Day {day.day} · {day.place}
              </h3>
            </div>

            <div className="space-y-2.5">
              {day.stops.map((stop, i) => (
                <StopRow key={i} stop={stop} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add destination */}
      <button
        onClick={() => setScreen('saved')}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-4 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Plus className="size-4" />
        Add a destination from your saved gems
      </button>
    </div>
  )
}

function StopRow({ stop }: { stop: JourneyStop }) {
  const Icon = stopIcon[stop.kind]
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-card p-3.5 shadow-sm ring-1 ring-border/60">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </span>
      <div>
        <h4 className="text-sm font-semibold text-foreground">{stop.title}</h4>
        <p className="text-xs text-muted-foreground">{stop.detail}</p>
      </div>
    </div>
  )
}
