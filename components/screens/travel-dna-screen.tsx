'use client'

import { useApp } from '@/lib/app-context'
import { travelDna } from '@/lib/data'
import { Dna, Gem, Sparkles } from 'lucide-react'

export function TravelDnaScreen() {
  const { setScreen, openDestination } = useApp()

  return (
    <div className="animate-screen-in space-y-7 px-5 py-5 pb-4">
      <header className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Dna className="size-5" />
        </span>
        <h1 className="font-display text-2xl font-extrabold text-foreground">
          Your Travel DNA
        </h1>
      </header>

      {/* Archetype card */}
      <section className="overflow-hidden rounded-3xl bg-navy p-6 text-navy-foreground">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
          <Gem className="size-3.5" />
          Your archetype
        </div>
        <h2 className="text-balance font-display text-2xl font-extrabold leading-tight">
          You&apos;re a{' '}
          <span className="text-primary">{travelDna.archetype}.</span>
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-navy-foreground/85">
          {travelDna.blurb}
        </p>
      </section>

      {/* Trait bars */}
      <section className="space-y-4">
        <h3 className="font-display text-base font-bold text-foreground">
          What drives your trips
        </h3>
        <div className="space-y-4 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">
          {travelDna.traits.map((t) => (
            <div key={t.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{t.label}</span>
                <span className="font-bold text-foreground">{t.value}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${t.value}%`, backgroundColor: t.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personalized recommendation */}
      <section className="rounded-3xl bg-accent p-5">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="size-4 text-clay" />
          <h3 className="font-display text-base font-bold text-accent-foreground">
            Matched to your DNA
          </h3>
        </div>
        <p className="text-pretty text-sm leading-relaxed text-accent-foreground/80">
          Because you love <span className="font-semibold">hidden gems</span> and{' '}
          <span className="font-semibold">food</span>, Bundi in Rajasthan is a{' '}
          <span className="font-semibold">94% match</span> for your next escape.
        </p>
        <button
          onClick={() => {
            setScreen('explore')
            setTimeout(() => openDestination('bundi'), 60)
          }}
          className="mt-4 rounded-full bg-clay px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95"
        >
          See why Bundi fits you
        </button>
      </section>
    </div>
  )
}
