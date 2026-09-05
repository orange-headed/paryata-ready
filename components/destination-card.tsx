'use client'

import { useEffect, useState } from 'react'

import { useApp } from '@/lib/app-context'

import type { Destination } from '@/lib/types'

import {
  ArrowRight,
  Heart,
  IndianRupee,
  MapPin,
} from 'lucide-react'

import {
  CrowdBadge,
  HiddenGemBadge,
} from './badges'

export function DestinationCard({
  destination,
}: {
  destination: Destination
}) {
  const {
    openDestination,
    toggleSaved,
    isSaved,
    sayRobo,
  } = useApp()

  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const saved = mounted
    ? isSaved(destination.id)
    : false

  const handleSave = () => {
    /*
     * Capture the state BEFORE changing it.
     * This makes both Save and Remove reliable.
     */
    const wasSaved = isSaved(
      destination.id,
    )

    toggleSaved(
      destination.id,
    )

    if (!wasSaved) {
      let message =
        `Ooooh, ${destination.name}! 👀 `

      switch (destination.id) {
        case 'ziro':
          message +=
            'Your Nature and Rural travel preferences just went up. I think I am starting to understand your vibe.'
          break

        case 'bundi':
          message +=
            'Your Culture & Heritage side is getting stronger. I am taking notes. 👀'
          break

        case 'chettinad':
          message +=
            'Your love for local food and culture just got stronger. That tells me a lot about your travel style.'
          break

        case 'dhanushkodi':
          message +=
            'Your Nature and Beach preferences just got a boost. I am learning what kind of escapes you like.'
          break

        case 'gokarna':
          message +=
            'Your Beach and Nature preferences just went up. I am beginning to see your travel pattern.'
          break

        case 'majuli':
          message +=
            'Your Nature, Rural and Culture preferences just got stronger. That is a very interesting Travel DNA.'
          break

        default:
          message +=
            'Your Travel DNA is getting clearer. I am learning what you like.'
      }

      sayRobo(
        message,
        'happy',
      )
    } else {
      /*
       * Removing a place should ALSO
       * trigger a Buddy reaction.
       */
      sayRobo(
        `Got it 👌 I removed ${destination.name} from your saved places. I'll remember that and adjust what I recommend to you.`,
        'thinking',
      )
    }
  }

  const handleDiscover = () => {
    openDestination(
      destination.id,
    )

    sayRobo(
      `Let's explore ${destination.name}. I'll show you why this place could be a good match for you.`,
      'pointing',
    )
  }

  return (
    <article className="overflow-hidden rounded-3xl bg-card shadow-[0_10px_30px_-12px_rgba(27,36,54,0.25)] ring-1 ring-border/60">
      <div className="relative">
        <img
          src={
            destination.image ||
            '/placeholder.svg'
          }
          alt={`${destination.name}, ${destination.state}`}
          className="h-52 w-full object-cover"
        />

        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-3">
          {destination.hiddenGem && (
            <HiddenGemBadge />
          )}

          <button
            onClick={handleSave}
            aria-label={
              saved
                ? 'Remove from saved'
                : 'Save destination'
            }
            className="relative z-30 grid size-9 place-items-center rounded-full bg-card/95 text-foreground shadow-md backdrop-blur transition-transform active:scale-90"
          >
            <Heart
              className={`size-4 ${
                saved
                  ? 'fill-primary text-primary'
                  : 'text-foreground'
              }`}
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
          <CrowdBadge
            level={
              destination.crowdLevel
            }
          />

          <span className="text-xs font-medium text-muted-foreground">
            {destination.distanceKm} km away
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {
            destination.shortDescription
          }
        </p>

        <div className="flex items-center justify-between border-t border-border/60 pt-3">
          <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-foreground">
            <IndianRupee className="size-3.5" />
            {destination.budget.replace(
              '₹',
              '',
            )}
          </span>

          <button
            onClick={handleDiscover}
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

export function NearYouCard({
  destination,
}: {
  destination: Destination
}) {
  const {
    openDestination,
    sayRobo,
  } = useApp()

  const handleOpen = () => {
    openDestination(
      destination.id,
    )

    sayRobo(
      `${destination.name} is nearby. Want to see what makes it worth the trip? 👀`,
      'happy',
    )
  }

  return (
    <button
      onClick={handleOpen}
      className="group w-44 shrink-0 overflow-hidden rounded-2xl bg-card text-left shadow-[0_8px_20px_-12px_rgba(27,36,54,0.3)] ring-1 ring-border/60"
    >
      <div className="relative">
        <img
          src={
            destination.image ||
            '/placeholder.svg'
          }
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
          {destination.state} ·{' '}
          {destination.distanceKm} km
        </p>

        <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-leaf">
          {destination.crowdLevel} crowd
        </span>
      </div>
    </button>
  )
}