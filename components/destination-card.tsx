'use client'

import { useApp } from '@/lib/app-context'
import type { Destination } from '@/lib/types'
import { ArrowRight, Heart, IndianRupee, MapPin } from 'lucide-react'
import { CrowdBadge, HiddenGemBadge } from './badges'

export function DestinationCard({ destination }: { destination: Destination }) {
  const { openDestination, toggleSaved, isSaved } = useApp()
  const saved = isSaved(destination.id)

  return (
    <article className="overflow-hidden rounded-3xl bg-card shadow-[0_10px_30px_-12px_rgba(27,36,54,0.25)] ring-1 ring-border/60">
      <div className="relative">
        <img
          src={destination.image || '/placeholder.svg'}
          alt={`${destination.name}, ${destination.state}`}
          className="h-52 w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {destination.hiddenGem && <HiddenGemBadge />}
          <button
            onClick={() => toggleSaved(destination.id)}
            aria-label={saved ? 'Remove from saved' : 'Save destination'}
            className="grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-transform active:scale-90"
          >
            <Heart
              className={`size-4 ${saved ? 'fill-primary text-primary' : 'text-foreground'}`}
            />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-navy/80 to-transparent p-3">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight text-navy-foreground">
              {destination.name}
            </h3>
            <p className="flex items-center gap-1 text-xs text-navy-foreground/80">
              <MapPin className="size-3" />
              {destination.state}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <CrowdBadge level={destination.crowdLevel} />
          <span className="text-xs font-medium text-muted-foreground">
            {destination.distanceKm} km away
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {destination.shortDescription}
        </p>

        <div className="flex items-center justify-between border-t border-border/60 pt-3">
          <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-foreground">
            <IndianRupee className="size-3.5" />
            {destination.budget.replace('₹', '')}
          </span>
          <button
            onClick={() => openDestination(destination.id)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform active:scale-95"
          >
            Discover this place
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

/** Compact horizontal card for the "Near You" carousel */
export function NearYouCard({ destination }: { destination: Destination }) {
  const { openDestination } = useApp()
  return (
    <button
      onClick={() => openDestination(destination.id)}
      className="group w-44 shrink-0 overflow-hidden rounded-2xl bg-card text-left shadow-[0_8px_20px_-12px_rgba(27,36,54,0.3)] ring-1 ring-border/60"
    >
      <div className="relative">
        <img
          src={destination.image || '/placeholder.svg'}
          alt={`${destination.name}, ${destination.state}`}
          className="h-28 w-full object-cover transition-transform duration-300 group-active:scale-105"
        />
        {destination.hiddenGem && (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-semibold uppercase text-primary-foreground">
            Gem
          </span>
        )}
      </div>
      <div className="space-y-1 p-3">
        <h3 className="text-sm font-semibold leading-tight text-foreground">
          {destination.name}
        </h3>
        <p className="text-[0.7rem] text-muted-foreground">
          {destination.state} · {destination.distanceKm} km
        </p>
        <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-leaf">
          {destination.crowdLevel} crowd
        </span>
      </div>
    </button>
  )
}
