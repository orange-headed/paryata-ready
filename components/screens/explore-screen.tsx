'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

import {
  CrowdBadge,
} from '@/components/badges'

import {
  DestinationCard,
  NearYouCard,
} from '@/components/destination-card'

import { useApp } from '@/lib/app-context'

import {
  CURRENT_LOCATION,
  getRecommendedDestinations,
  nearYou,
} from '@/lib/data'

import {
  Bell,
  MapPin,
  Search,
  Sparkles,
  X,
  ArrowRight,
  Dna,
  Leaf,
  Users,
} from 'lucide-react'

// ============================================
// LEAFLET MAP
// Loaded only on the client because Leaflet
// requires the browser's window object.
// ============================================

const DiscoveryMap = dynamic(
  () =>
    import('@/components/discovery-map').then(
      (mod) => mod.DiscoveryMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] w-full animate-pulse rounded-3xl bg-muted" />
    ),
  },
)

export function ExploreScreen() {
  const {
    sayRobo,
    setScreen,
    travelPreferences,
    travelDNAProgress,
  } = useApp()

  const [
    query,
    setQuery,
  ] = useState('')

  const normalized =
    query.trim().toLowerCase()

  // ============================================
  // PERSONALIZED DESTINATIONS
  // ============================================

  const recommendedResults =
    useMemo(
      () =>
        getRecommendedDestinations(
          travelPreferences,
        ),
      [travelPreferences],
    )

  // ============================================
  // SEARCH
  // ============================================

  const filteredDestinations =
    useMemo(() => {
      if (!normalized) {
        return recommendedResults
      }

      return recommendedResults.filter(
        (result) => {
          const destination =
            result.destination

          return [
            destination.name,
            destination.state,
            ...destination.tags,
            destination.shortDescription,
          ].some((value) =>
            value
              .toLowerCase()
              .includes(normalized),
          )
        },
      )
    }, [
      normalized,
      recommendedResults,
    ])

  const filteredNear =
    useMemo(() => {
      if (!normalized) {
        return nearYou
      }

      return nearYou.filter(
        (destination) =>
          [
            destination.name,
            destination.state,
            ...destination.tags,
          ].some((value) =>
            value
              .toLowerCase()
              .includes(normalized),
          ),
      )
    }, [normalized])

  // ============================================
  // SEARCH HANDLER
  // ============================================

  const handleSearch = (
    value: string,
  ) => {
    setQuery(value)

    if (
      value.trim().length >= 2
    ) {
      sayRobo(
        `I'm looking beyond the usual spots for “${value.trim()}”. Try a hidden gem below.`,
        'thinking',
      )
    }
  }

  // ============================================
  // TOP RECOMMENDATION
  // ============================================

  const topRecommendation =
    recommendedResults[0]

  return (
    <div className="animate-screen-in space-y-7 pb-4">

      {/* HEADER */}

      <header className="flex items-start justify-between px-5 pt-5">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Discover India differently
          </p>

          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground">
            Explore
          </h1>

          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            Near {CURRENT_LOCATION.city}
          </p>

        </div>

        <button
          onClick={() => {
            sayRobo(
              'I am watching for places that fit your Travel DNA.',
              'happy',
            )
          }}
          aria-label="Paryata notifications"
          className="grid size-10 place-items-center rounded-full bg-card text-foreground shadow-sm ring-1 ring-border/60"
        >
          <Bell className="size-4" />
        </button>

      </header>

      {/* SEARCH */}

      <div className="px-5">

        <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm ring-1 ring-border/60">

          <Search className="size-5 shrink-0 text-muted-foreground" />

          <input
            value={query}
            onChange={(event) =>
              handleSearch(
                event.target.value,
              )
            }
            placeholder="Search places, food or experiences..."
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />

          {query && (
            <button
              onClick={() =>
                handleSearch('')
              }
              aria-label="Clear search"
              className="text-muted-foreground"
            >
              <X className="size-4" />
            </button>
          )}

        </div>

      </div>

      {/* PERSONALIZED MATCH */}

      {!normalized &&
        topRecommendation && (
          <section className="px-5">

            <div className="overflow-hidden rounded-3xl bg-navy p-5 text-navy-foreground">

              <div className="flex items-center gap-2">

                <span className="grid size-9 place-items-center rounded-xl bg-primary/20 text-primary">

                  <Sparkles className="size-4" />

                </span>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Picked for you
                  </p>

                  <h2 className="font-display text-lg font-extrabold">
                    Your best match
                  </h2>

                </div>

              </div>

              <div className="mt-5">

                <p className="text-2xl font-extrabold">
                  {topRecommendation.destination.name}
                </p>

                <p className="mt-1 flex items-center gap-1 text-sm text-navy-foreground/70">

                  <MapPin className="size-3.5" />

                  {topRecommendation.destination.state}

                </p>

              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">

                {/* LIVE DNA LEARNING */}

                <div className="rounded-2xl bg-white/10 p-3">

                  <Dna className="mb-2 size-4 text-primary" />

                  <p className="text-[0.65rem] text-navy-foreground/60">
                    DNA learned
                  </p>

                  <p className="mt-0.5 text-sm font-bold">
                    {travelDNAProgress}%
                  </p>

                </div>

                <div className="rounded-2xl bg-white/10 p-3">

                  <Leaf className="mb-2 size-4 text-primary" />

                  <p className="text-[0.65rem] text-navy-foreground/60">
                    Opportunity
                  </p>

                  <p className="mt-0.5 text-sm font-bold">
                    {topRecommendation.tourismOpportunity}%
                  </p>

                </div>

                <div className="rounded-2xl bg-white/10 p-3">

                  <Users className="mb-2 size-4 text-primary" />

                  <p className="text-[0.65rem] text-navy-foreground/60">
                    Local benefit
                  </p>

                  <p className="mt-0.5 text-sm font-bold">
                    {topRecommendation.localBenefit}%
                  </p>

                </div>

              </div>

              <button
                onClick={() => {
                  setScreen('travel-dna')

                  sayRobo(
                    `I found ${topRecommendation.destination.name} because it matches your Travel DNA and has strong potential to benefit the local community.`,
                    'happy',
                  )
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
              >

                See your Travel DNA

                <ArrowRight className="size-4" />

              </button>

            </div>

          </section>
        )}

      {/* MAP */}

      <section className="px-5">

        <div className="mb-3 flex items-center justify-between">

          <div>

            <h2 className="font-display text-lg font-bold text-foreground">
              Discover around India
            </h2>

            <p className="text-xs text-muted-foreground">
              Hidden places worth the journey
            </p>

          </div>

        </div>

        <DiscoveryMap />

      </section>

      {/* NEAR YOU */}

      {!normalized &&
        filteredNear.length > 0 && (
          <section>

            <div className="mb-3 flex items-end justify-between px-5">

              <div>

                <h2 className="font-display text-lg font-bold text-foreground">
                  Near you
                </h2>

                <p className="text-xs text-muted-foreground">
                  Places you can reach without going too far
                </p>

              </div>

            </div>

            <div className="flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

              {filteredNear.map(
                (destination) => (
                  <NearYouCard
                    key={
                      destination.id
                    }
                    destination={
                      destination
                    }
                  />
                ),
              )}

            </div>

          </section>
        )}

      {/* PERSONALIZED DISCOVERY */}

      <section className="space-y-4 px-5">

        <div>

          <div className="flex items-center gap-2">

            <Sparkles className="size-4 text-primary" />

            <h2 className="font-display text-lg font-bold text-foreground">
              {normalized
                ? 'Search results'
                : 'Recommended for you'}
            </h2>

          </div>

          <p className="mt-1 text-xs text-muted-foreground">

            {normalized
              ? `Places matching “${query.trim()}”`
              : 'Ranked using your Travel DNA, crowd levels and local tourism opportunity.'}

          </p>

        </div>

        {filteredDestinations.length ===
        0 ? (
          <div className="rounded-3xl bg-card p-6 text-center ring-1 ring-border/60">

            <Search className="mx-auto size-7 text-muted-foreground" />

            <p className="mt-3 font-semibold text-foreground">
              No matching hidden gems yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try another place, state or experience.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {filteredDestinations.map(
              (result, index) => (
                <div
                  key={
                    result.destination.id
                  }
                  className="relative"
                >

                  <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 text-[0.65rem] font-bold text-navy-foreground shadow-md">

                    <Sparkles className="size-3 text-primary" />

                    #{index + 1} match ·{' '}
                    {result.score}%

                  </div>

                  <DestinationCard
                    destination={
                      result.destination
                    }
                  />

                </div>
              ),
            )}

          </div>
        )}

      </section>

      {/* WHY PARYATA */}

      {!normalized && (
        <section className="px-5">

          <div className="rounded-3xl bg-primary/10 p-5 ring-1 ring-primary/10">

            <div className="flex items-start gap-3">

              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">

                <Leaf className="size-5" />

              </span>

              <div>

                <h3 className="font-display text-base font-bold text-foreground">
                  Travel where your trip matters
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Paryata doesn&apos;t just find
                  popular places. It looks for
                  destinations that fit you while
                  helping spread tourist footfall
                  and spending to communities that
                  need it.
                </p>

              </div>

            </div>

          </div>

        </section>
      )}

    </div>
  )
}