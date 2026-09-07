'use client'

import { useApp } from '@/lib/app-context'
import type { ScreenId } from '@/lib/types'

import {
  Bookmark,
  ChevronRight,
  Dna,
  HandHeart,
  HelpCircle,
  Leaf,
  Map,
  Settings,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react'

interface Row {
  label: string
  icon: LucideIcon
  screen?: ScreenId
  hint?: string
}

export function ProfileScreen() {
  const {
    setScreen,
    savedIds,
    travelDNAProgress,
  } = useApp()

  const rows: Row[] = [
    {
      label: 'Travel DNA',
      icon: Dna,
      screen: 'travel-dna',
      hint: `${travelDNAProgress}% learned`,
    },

    {
      label: 'My Trips',
      icon: Map,
      hint: '3 journeys',
    },

    {
      label: 'Saved places',
      icon: Bookmark,
      screen: 'saved',
      hint: `${savedIds.length} ${
        savedIds.length === 1
          ? 'item'
          : 'items'
      }`,
    },

    {
      label: 'Preferences',
      icon: SlidersHorizontal,
    },

    {
      label: 'Settings',
      icon: Settings,
    },

    {
      label: 'Help & support',
      icon: HelpCircle,
    },
  ]

  return (
    <div className="animate-screen-in space-y-6 px-5 py-5 pb-4">

      {/* PROFILE HEADER */}

      <section className="flex items-center gap-4">

        <span className="grid size-16 place-items-center rounded-full bg-navy font-display text-2xl font-bold text-navy-foreground ring-4 ring-primary/25">
          A
        </span>

        <div>

          <h1 className="font-display text-xl font-extrabold text-foreground">
            Ananya Rao
          </h1>

          <p className="text-sm text-muted-foreground">
            Wandering across South India
          </p>

          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">

            <Dna className="size-3" />

            Hidden-Gem Explorer

          </span>

        </div>

      </section>

      {/* TRAVEL DNA SUMMARY */}

      <section className="rounded-3xl bg-navy p-5 text-navy-foreground">

        <div className="mb-3 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Dna className="size-4 text-primary" />

            <h2 className="font-display text-base font-bold">
              My Travel DNA
            </h2>

          </div>

          <span className="font-display text-lg font-extrabold text-primary">
            {travelDNAProgress}%
          </span>

        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${travelDNAProgress}%`,
            }}
          />

        </div>

        <p className="mt-3 text-xs leading-relaxed text-navy-foreground/75">

          {savedIds.length === 0
            ? 'Save a few places and Paryata will start learning your travel preferences.'
            : `Paryata is learning from the ${
                savedIds.length
              } places you’ve saved.`}

        </p>

      </section>

      {/* MY LOCAL IMPACT */}

      <section className="rounded-3xl bg-navy p-5 text-navy-foreground">

        <div className="mb-3 flex items-center gap-2">

          <HandHeart className="size-4 text-primary" />

          <h2 className="font-display text-base font-bold">
            My local impact
          </h2>

        </div>

        <div className="grid grid-cols-3 gap-3">

          <Impact
            value="7"
            label="Hidden gems visited"
          />

          <Impact
            value="₹14k"
            label="Spent locally"
          />

          <Impact
            value="12"
            label="Local families supported"
          />

        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary/10 p-3">

          <Leaf className="size-4 shrink-0 text-primary" />

          <p className="text-xs leading-relaxed text-navy-foreground/85">

            You direct{' '}

            <span className="font-semibold text-primary">
              86%
            </span>{' '}

            of your travel spend to lesser-known
            communities.

          </p>

        </div>

      </section>

      {/* MENU ROWS */}

      <section className="overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border/60">

        {rows.map((row, i) => (

          <button
            key={row.label}
            onClick={() =>
              row.screen &&
              setScreen(row.screen)
            }
            className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/60 ${
              i !== rows.length - 1
                ? 'border-b border-border/60'
                : ''
            }`}
          >

            <span className="grid size-9 place-items-center rounded-full bg-muted text-foreground">

              <row.icon className="size-[18px]" />

            </span>

            <span className="flex-1 text-sm font-medium text-foreground">
              {row.label}
            </span>

            {row.hint && (
              <span className="text-xs text-muted-foreground">
                {row.hint}
              </span>
            )}

            <ChevronRight className="size-4 text-muted-foreground" />

          </button>

        ))}

      </section>

      <p className="pt-2 text-center text-xs text-muted-foreground">
        PARYATA · Discover India beyond the obvious
      </p>

    </div>
  )
}

function Impact({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="rounded-2xl bg-navy-foreground/5 p-3 text-center">

      <p className="font-display text-xl font-extrabold text-primary">
        {value}
      </p>

      <p className="mt-0.5 text-[0.65rem] leading-tight text-navy-foreground/70">
        {label}
      </p>

    </div>
  )
}