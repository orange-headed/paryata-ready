'use client'

import { useMemo, useState } from 'react'
import { CrowdBadge } from '@/components/badges'
import { DestinationCard, NearYouCard } from '@/components/destination-card'
import { DiscoveryMap } from '@/components/discovery-map'
import { useApp } from '@/lib/app-context'
import { CURRENT_LOCATION, destinations, hiddenIndia, nearYou } from '@/lib/data'
import { Bell, ChevronRight, MapPin, Search, Sparkles, X } from 'lucide-react'

export function ExploreScreen() {
  const { sayRobo, setScreen } = useApp()
  const [query, setQuery] = useState('')

  const normalized = query.trim().toLowerCase()
  const filteredHidden = useMemo(() => {
    if (!normalized) return hiddenIndia
    return destinations.filter((d) =>
      [d.name, d.state, ...d.tags, d.shortDescription].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    )
  }, [normalized])

  const filteredNear = useMemo(() => {
    if (!normalized) return nearYou
    return nearYou.filter((d) =>
      [d.name, d.state, ...d.tags].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    )
  }, [normalized])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim().length >= 2) {
      sayRobo(
        `I'm looking beyond the usual spots for “${value.trim()}”. Try a hidden gem below.`,
        'thinking',
      )
    }
  }

  return (
    <div className="animate-screen-in space-y-7 pb-4">
      <header className="flex items-center justify-between px-5 pt-5">
        <button
          onClick={() => setScreen('explore')}
          className="text-left"
          aria-label="Paryata home"
        >
          <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
            PARYATA
          </span>
          <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3 text-primary" />
            {CURRENT_LOCATION.city}, {CURRENT_LOCATION.state}
          </p>
        </button>
        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            onClick={() => sayRobo('No urgent alerts — just a few beautiful places waiting for you.', 'speaking')}
            className="grid size-10 place-items-center rounded-full bg-card text-foreground shadow-sm ring-1 ring-border/60 transition-transform active:scale-90"
          >
            <Bell className="size-[18px]" />
          </button>
          <button
            aria-label="Your profile"
            onClick={() => setScreen('profile')}
            className="size-10 overflow-hidden rounded-full bg-navy text-navy-foreground shadow-sm ring-2 ring-primary/40 transition-transform active:scale-90"
          >
            <span className="grid size-full place-items-center font-display text-sm font-bold">A</span>
          </button>
        </div>
      </header>

      <section className="px-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Your local travel companion
        </p>
        <h1 className="text-balance font-display text-[1.75rem] font-extrabold leading-tight text-foreground">
          Where do you want to wander?
        </h1>
        <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
          Discover India beyond the obvious.
        </p>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-card px-4 py-3.5 shadow-sm ring-1 ring-border/60 focus-within:ring-2 focus-within:ring-primary/40">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search places, experiences, food..."
            aria-label="Search places, experiences and food"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search">
              <X className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </section>

      <section className="px-5">
        <div className="flex items-start gap-3 rounded-2xl bg-navy p-4 text-navy-foreground shadow-sm">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary/20">
            <Sparkles className="size-4 text-primary" />
          </span>
          <p className="text-pretty text-[0.82rem] leading-relaxed text-navy-foreground/90">
            Instead of crowding the same famous spots, Paryata spreads your journey toward{' '}
            <span className="font-semibold text-primary">lesser-known places</span> and the local communities who need it most.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-display text-lg font-bold text-foreground">Near You</h2>
          <span className="text-xs font-medium text-muted-foreground">{CURRENT_LOCATION.city}</span>
        </div>
        {filteredNear.length > 0 ? (
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">
            {filteredNear.map((d) => <NearYouCard key={d.id} destination={d} />)}
          </div>
        ) : (
          <p className="px-5 text-sm text-muted-foreground">No nearby matches yet. Try a broader search.</p>
        )}
      </section>

      <section className="space-y-3 px-5">
        <h2 className="font-display text-lg font-bold text-foreground">Discover around you</h2>
        <DiscoveryMap />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-5">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">Hidden India</h2>
            <p className="text-xs text-muted-foreground">
              Emerging gems the crowds haven&apos;t found yet
            </p>
          </div>
          <button
            onClick={() => sayRobo('These places see a fraction of the tourists — and your visit means the world to them.', 'excited')}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 transition-transform active:scale-95"
          >
            <CrowdBadge level="Low" className="bg-transparent px-0 py-0" />
          </button>
        </div>
        <div className="space-y-5 px-5">
          {filteredHidden.length > 0 ? filteredHidden.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          )) : (
            <div className="rounded-2xl bg-card p-5 text-center ring-1 ring-border/60">
              <p className="text-sm font-semibold text-foreground">No hidden gem found</p>
              <p className="mt-1 text-xs text-muted-foreground">Try another place, state or interest.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
