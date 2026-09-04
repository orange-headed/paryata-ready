'use client'

import { FoodCard } from '@/components/food-card'
import { foodItems } from '@/lib/data'
import type { FoodItem } from '@/lib/types'
import { UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'

const filters: (FoodItem['category'] | 'All')[] = [
  'All',
  'Local dish',
  'Street food',
  'Hidden restaurant',
  'Experience',
]

export function EatScreen() {
  const [active, setActive] = useState<(typeof filters)[number]>('All')
  const shown =
    active === 'All' ? foodItems : foodItems.filter((f) => f.category === active)

  return (
    <div className="animate-screen-in space-y-6 px-5 py-5 pb-4">
      <header className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-clay/15 text-clay">
          <UtensilsCrossed className="size-5" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-extrabold leading-tight text-foreground">
            Taste the Local Side
          </h1>
          <p className="text-sm text-muted-foreground">
            Street stalls, family kitchens & dishes worth the detour
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
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {shown.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
