'use client'

import { useApp } from '@/lib/app-context'
import { savedItems } from '@/lib/data'
import type { SavedCategory } from '@/lib/types'
import { Bookmark, Heart } from 'lucide-react'
import { useState } from 'react'

const filters: (SavedCategory | 'All')[] = [
  'All',
  'Destination',
  'Food',
  'Stay',
  'Experience',
]

export function SavedScreen() {
  const { openDestination, savedIds } = useApp()
  const [active, setActive] = useState<(typeof filters)[number]>('All')

  const currentSaved = savedItems.filter((item) => savedIds.includes(item.id))
  const shown =
    active === 'All' ? currentSaved : currentSaved.filter((s) => s.type === active)

  return (
    <div className="animate-screen-in space-y-6 px-5 py-5 pb-4">
      <header className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Bookmark className="size-5" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-extrabold text-foreground">
            Saved Collection
          </h1>
          <p className="text-sm text-muted-foreground">
            {currentSaved.length} gems, dishes & stays you love
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === f
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground ring-1 ring-border/60'
            }`}
          >
            {f}
            {f !== 'All' && 's'}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {shown.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              item.type === 'Destination' ? openDestination(item.id) : undefined
            }
            className="overflow-hidden rounded-2xl bg-card text-left shadow-[0_8px_20px_-12px_rgba(27,36,54,0.3)] ring-1 ring-border/60"
          >
            <div className="relative">
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                className="h-28 w-full object-cover"
              />
              <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-card/90 backdrop-blur">
                <Heart className="size-3.5 fill-primary text-primary" />
              </span>
              <span className="absolute bottom-2 left-2 rounded-full bg-navy/85 px-2 py-0.5 text-[0.6rem] font-semibold text-navy-foreground backdrop-blur">
                {item.type}
              </span>
            </div>
            <div className="space-y-0.5 p-3">
              <h3 className="text-sm font-semibold leading-tight text-foreground">
                {item.name}
              </h3>
              <p className="text-[0.7rem] text-muted-foreground">{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Nothing here yet — start saving your favourite gems.
        </p>
      )}
    </div>
  )
}
