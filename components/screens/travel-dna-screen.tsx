'use client'

import { useApp } from '@/lib/app-context'

import {
  travelDna,
  getPersonalizedDestination,
} from '@/lib/data'

import {
  Dna,
  Gem,
  Sparkles,
  MapPin,
  Users,
  Leaf,
  IndianRupee,
  ArrowRight,
} from 'lucide-react'

export function TravelDnaScreen() {
  const {
    setScreen,
    openDestination,
    travelPreferences,
    travelDNAProgress,
    savedIds,
  } = useApp()

  // ============================================
  // PERSONALIZED RECOMMENDATION
  // ============================================

  const recommendation =
    getPersonalizedDestination(
      travelPreferences,
    )

  const recommendedDestination =
    recommendation.destination

  // ============================================
  // LIVE TRAVEL DNA
  // ============================================

  const traits = [
    {
      label: 'Nature',
      value: travelPreferences.nature,
    },
    {
      label: 'Peace & Slow Travel',
      value: travelPreferences.peace,
    },
    {
      label: 'Rural & Farms',
      value: travelPreferences.rural,
    },
    {
      label: 'Culture & Heritage',
      value: travelPreferences.culture,
    },
    {
      label: 'Local Food',
      value: travelPreferences.food,
    },
    {
      label: 'Adventure',
      value: travelPreferences.adventure,
    },
    {
      label: 'Beaches',
      value: travelPreferences.beaches,
    },
    {
      label: 'Arts & Crafts',
      value: travelPreferences.arts,
    },
  ]

  // ============================================
  // STRONGEST PREFERENCE
  // ============================================

  const preferenceLabels: Record<
    keyof typeof travelPreferences,
    string
  > = {
    nature: 'Nature',
    peace: 'Peace & Slow Travel',
    rural: 'Rural & Farms',
    culture: 'Culture & Heritage',
    food: 'Local Food',
    adventure: 'Adventure',
    beaches: 'Beaches',
    arts: 'Arts & Crafts',
  }

  const strongestPreference =
    preferenceLabels[
      recommendation.strongestMatch
    ]

  const hasLearned =
    savedIds.length > 0

  return (
    <div className="animate-screen-in space-y-7 px-5 py-5 pb-4">

      {/* ============================================
          HEADER
          ============================================ */}

      <header className="flex items-center gap-3">

        <span className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary">

          <Dna className="size-5" />

        </span>

        <div>

          <h1 className="font-display text-2xl font-extrabold text-foreground">
            Your Travel DNA
          </h1>

          <p className="text-xs text-muted-foreground">
            Paryata learns from what you choose
          </p>

        </div>

      </header>


      {/* ============================================
          DNA LEARNING PROGRESS
          ============================================ */}

      <section className="rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Dna className="size-4 text-primary" />

            <h3 className="font-display text-base font-bold text-foreground">
              DNA learning progress
            </h3>

          </div>

          <span className="font-display text-xl font-extrabold text-primary">
            {travelDNAProgress}%
          </span>

        </div>


        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">

          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${travelDNAProgress}%`,
            }}
          />

        </div>


        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">

          {savedIds.length === 0
            ? 'Save places you like and I’ll start learning what kind of traveller you are.'
            : `I’ve learned from ${savedIds.length} saved ${
                savedIds.length === 1
                  ? 'place'
                  : 'places'
              }. Keep exploring to make your recommendations smarter.`}

        </p>

      </section>


      {/* ============================================
          ZERO-STATE MESSAGE
          ============================================ */}

      {!hasLearned && (
        <section className="rounded-3xl bg-primary/10 p-5 ring-1 ring-primary/20">

          <div className="flex items-start gap-3">

            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">

              <Sparkles className="size-5" />

            </span>

            <div>

              <h3 className="font-display text-base font-bold text-foreground">
                Your DNA is still forming
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Save destinations, food and experiences you like.
                Paryata will use those choices to understand your
                travel style and improve future recommendations.
              </p>

              <button
                type="button"
                onClick={() => setScreen('explore')}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary"
              >
                Start exploring
                <ArrowRight className="size-3.5" />
              </button>

            </div>

          </div>

        </section>
      )}


      {/* ============================================
          ARCHETYPE
          ============================================ */}

      <section className="overflow-hidden rounded-3xl bg-navy p-6 text-navy-foreground">

        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">

          <Gem className="size-3.5" />

          Your archetype

        </div>


        <h2 className="text-balance font-display text-2xl font-extrabold leading-tight">

          {hasLearned ? (
            <>
              You&apos;re a{' '}

              <span className="text-primary">
                {travelDna.archetype}.
              </span>
            </>
          ) : (
            <>
              Your travel style is{' '}

              <span className="text-primary">
                still forming.
              </span>
            </>
          )}

        </h2>


        <p className="mt-3 text-pretty text-sm leading-relaxed text-navy-foreground/85">

          {hasLearned
            ? travelDna.blurb
            : 'Keep saving places that catch your eye. As Paryata learns more about you, your travel archetype will become more meaningful.'}

        </p>

      </section>


      {/* ============================================
          LIVE TRAVEL DNA
          ============================================ */}

      <section className="space-y-4">

        <div>

          <h3 className="font-display text-base font-bold text-foreground">
            What drives your trips
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            These preferences evolve from your choices.
          </p>

        </div>


        <div className="space-y-4 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">

          {traits.map((trait) => (
            <div key={trait.label}>

              <div className="mb-1.5 flex items-center justify-between text-sm">

                <span className="font-medium text-foreground">
                  {trait.label}
                </span>

                <span className="font-bold text-foreground">
                  {trait.value}%
                </span>

              </div>


              <div className="h-2.5 overflow-hidden rounded-full bg-muted">

                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{
                    width: `${trait.value}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* ============================================
          PARYATA RECOMMENDATION
          ============================================ */}

      <section className="overflow-hidden rounded-3xl bg-accent">

        <div className="p-5">

          <div className="mb-3 flex items-center gap-2">

            <Sparkles className="size-4 text-clay" />

            <h3 className="font-display text-base font-bold text-accent-foreground">
              {hasLearned
                ? 'Paryata found a match'
                : 'Your first recommendation'}
            </h3>

          </div>


          <h2 className="font-display text-2xl font-extrabold text-accent-foreground">
            {recommendedDestination.name}
          </h2>


          <p className="mt-1 flex items-center gap-1 text-sm text-accent-foreground/70">

            <MapPin className="size-3.5" />

            {recommendedDestination.state}

          </p>


          <p className="mt-3 text-sm leading-relaxed text-accent-foreground/80">

            {hasLearned ? (
              <>
                Your strongest preference is{' '}

                <span className="font-semibold">
                  {strongestPreference}
                </span>
                . Paryata matched it with a destination
                that also has strong tourism opportunity
                and local community benefit.
              </>
            ) : (
              <>
                This is a starting recommendation.
                As you save places, Paryata will learn
                your preferences and make this recommendation
                more personal.
              </>
            )}

          </p>


          {/* ============================================
              PARYATA MATCH SCORE
              ============================================ */}

          <div className="mt-5 rounded-2xl bg-card/70 p-4">

            <div className="flex items-center justify-between">

              <span className="text-sm font-semibold text-foreground">
                Paryata Match
              </span>

              <span className="text-2xl font-extrabold text-primary">
                {recommendation.score}%
              </span>

            </div>


            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">

              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{
                  width: `${recommendation.score}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* ============================================
            SCORE BREAKDOWN
            ============================================ */}

        <div className="grid grid-cols-2 gap-px bg-border">

          <div className="bg-card p-4">

            <div className="mb-1 flex items-center gap-2">

              <Dna className="size-4 text-primary" />

              <span className="text-xs font-semibold text-muted-foreground">
                DNA match
              </span>

            </div>

            <p className="font-display text-xl font-extrabold text-foreground">
              {recommendation.dnaMatch}%
            </p>

          </div>


          <div className="bg-card p-4">

            <div className="mb-1 flex items-center gap-2">

              <Leaf className="size-4 text-leaf" />

              <span className="text-xs font-semibold text-muted-foreground">
                Tourism opportunity
              </span>

            </div>

            <p className="font-display text-xl font-extrabold text-foreground">
              {recommendation.tourismOpportunity}%
            </p>

          </div>


          <div className="bg-card p-4">

            <div className="mb-1 flex items-center gap-2">

              <Users className="size-4 text-clay" />

              <span className="text-xs font-semibold text-muted-foreground">
                Local benefit
              </span>

            </div>

            <p className="font-display text-xl font-extrabold text-foreground">
              {recommendation.localBenefit}%
            </p>

          </div>


          <div className="bg-card p-4">

            <div className="mb-1 flex items-center gap-2">

              <IndianRupee className="size-4 text-primary" />

              <span className="text-xs font-semibold text-muted-foreground">
                Budget score
              </span>

            </div>

            <p className="font-display text-xl font-extrabold text-foreground">
              {recommendation.budgetScore}%
            </p>

          </div>

        </div>


        {/* ============================================
            DISCOVER BUTTON
            ============================================ */}

        <div className="p-5">

          <button
            type="button"
            onClick={() => {

              setScreen('explore')

              setTimeout(() => {

                openDestination(
                  recommendedDestination.id,
                )

              }, 60)

            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-clay px-4 py-3 text-sm font-bold text-white transition-transform active:scale-95"
          >

            Discover{' '}

            {recommendedDestination.name}

            <ArrowRight className="size-4" />

          </button>

        </div>

      </section>

    </div>
  )
}