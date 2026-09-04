'use client'

import { CrowdBadge, HiddenGemBadge, ImpactChip, TagPill } from '@/components/badges'
import { useApp } from '@/lib/app-context'
import { destinations } from '@/lib/data'
import {
  ArrowLeft,
  Bed,
  ChevronRight,
  Compass,
  Heart,
  IndianRupee,
  MapPin,
  Sparkles,
  UserRound,
  Utensils,
} from 'lucide-react'

export function DestinationScreen({ id }: { id: string }) {
  const { closeDestination, toggleSaved, isSaved, addToJourney, setScreen, sayRobo } =
    useApp()
  const dest = destinations.find((d) => d.id === id)

  if (!dest) return null
  const saved = isSaved(dest.id)

  return (
    <div className="animate-screen-in pb-28">
      {/* Hero */}
      <div className="relative">
        <img
          src={dest.image || '/placeholder.svg'}
          alt={`${dest.name}, ${dest.state}`}
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/30" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 pt-5">
          <button
            onClick={closeDestination}
            aria-label="Go back"
            className="grid size-10 place-items-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-transform active:scale-90"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            onClick={() => toggleSaved(dest.id)}
            aria-label={saved ? 'Remove from saved' : 'Save destination'}
            className="grid size-10 place-items-center rounded-full bg-card/90 shadow-sm backdrop-blur transition-transform active:scale-90"
          >
            <Heart className={`size-5 ${saved ? 'fill-primary text-primary' : 'text-foreground'}`} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {dest.hiddenGem && <HiddenGemBadge />}
            <CrowdBadge level={dest.crowdLevel} className="bg-card/90 backdrop-blur" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-navy-foreground">
              {dest.name}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-navy-foreground/85">
              <MapPin className="size-4" />
              {dest.state} · {dest.distanceKm} km away
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 px-5 pt-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {dest.tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>

        {/* Description */}
        <p className="text-pretty text-[0.95rem] leading-relaxed text-foreground/90">
          {dest.shortDescription}
        </p>

        {/* Why Paryata recommends */}
        <section className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h2 className="font-display text-base font-bold">
              Why Paryata recommends it
            </h2>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-navy-foreground/85">
            {dest.whyRecommended}
          </p>
          <div className="mt-4">
            <ImpactChip label={`Tourism impact: ${dest.impact}`} className="bg-primary/15 text-primary" />
          </div>
        </section>

        {/* Local experiences */}
        <Section title="Local experiences" icon={Compass}>
          <div className="space-y-3">
            {dest.experiences.map((exp) => (
              <div
                key={exp.title}
                className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border/60"
              >
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-xs text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Nearby food */}
        <Section title="Nearby food" icon={Utensils}>
          <div className="flex flex-wrap gap-2">
            {dest.nearbyFood.map((f) => (
              <span
                key={f}
                className="rounded-full bg-clay/12 px-3 py-1.5 text-sm font-medium text-clay"
              >
                {f}
              </span>
            ))}
          </div>
        </Section>

        {/* Nearby stays */}
        <Section title="Nearby stays" icon={Bed}>
          <div className="space-y-3">
            {dest.nearbyStays.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border/60"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.type}</p>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {s.price}
                  <span className="text-xs font-normal text-muted-foreground">/night</span>
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Local guides */}
        <Section title="Local guides" icon={UserRound}>
          <div className="space-y-3">
            {dest.guides.map((g) => (
              <div
                key={g.name}
                className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border/60"
              >
                <span className="grid size-10 place-items-center rounded-full bg-leaf/15 font-display text-sm font-bold text-leaf">
                  {g.name.charAt(0)}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{g.name}</h3>
                  <p className="text-xs text-muted-foreground">{g.expertise}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                  ★ {g.rating}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Estimated budget */}
        <section className="flex items-center justify-between rounded-3xl bg-accent p-5">
          <div>
            <p className="text-xs font-medium text-accent-foreground/70">
              Estimated budget
            </p>
            <p className="flex items-center gap-0.5 font-display text-2xl font-extrabold text-accent-foreground">
              <IndianRupee className="size-5" />
              {dest.budget.replace('₹', '').replace(' / day', '')}
            </p>
            <p className="text-xs text-accent-foreground/70">per day, all-in</p>
          </div>
          <button
            onClick={() => setScreen('eat')}
            className="inline-flex items-center gap-1 text-sm font-semibold text-clay"
          >
            Explore nearby <ChevronRight className="size-4" />
          </button>
        </section>
      </div>

      {/* Sticky action bar */}
      <div className="absolute inset-x-0 bottom-16 z-30 px-5">
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/95 p-3 shadow-[0_-6px_24px_-10px_rgba(27,36,54,0.35)] backdrop-blur">
          <button
            onClick={() => toggleSaved(dest.id)}
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-muted text-foreground transition-transform active:scale-95"
            aria-label={saved ? 'Remove from saved' : 'Save'}
          >
            <Heart className={`size-5 ${saved ? 'fill-primary text-primary' : ''}`} />
          </button>
          <button
            onClick={() => {
              addToJourney(dest.name)
              sayRobo(`Nice pick! I added ${dest.name} to your journey.`, 'excited')
              setScreen('journey')
            }}
            className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
          >
            Add to Journey
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
        <Icon className="size-4 text-primary" />
        {title}
      </h2>
      {children}
    </section>
  )
}
