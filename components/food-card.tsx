'use client'

import { useApp } from '@/lib/app-context'
import type { FoodItem } from '@/lib/types'
import { Heart, MapPin } from 'lucide-react'

export function FoodCard({ item }: { item: FoodItem }) {
  const { toggleSaved, isSaved } = useApp()
  const saved = isSaved(item.id)

  return (
    <article className="overflow-hidden rounded-3xl bg-card shadow-[0_10px_28px_-14px_rgba(27,36,54,0.3)] ring-1 ring-border/60">
      <div className="relative">
        <img
          src={item.image || '/placeholder.svg'}
          alt={item.name}
          className="h-40 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[0.65rem] font-semibold text-clay backdrop-blur">
          {item.category}
        </span>
        <button
          onClick={() => toggleSaved(item.id)}
          aria-label={saved ? 'Remove from saved' : 'Save food'}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 shadow-sm backdrop-blur transition-transform active:scale-90"
        >
          <Heart className={`size-4 ${saved ? 'fill-primary text-primary' : 'text-foreground'}`} />
        </button>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-bold leading-tight text-foreground">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
            {item.price}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5 text-clay" />
            {item.location}
          </span>
          <span className="font-medium">{item.distanceKm} km</span>
        </div>
      </div>
    </article>
  )
}
