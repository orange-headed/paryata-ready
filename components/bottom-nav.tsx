'use client'

import { useApp } from '@/lib/app-context'
import type { ScreenId } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  Bookmark,
  Compass,
  Dna,
  Route,
  User,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

const items: { id: ScreenId; label: string; icon: LucideIcon }[] = [
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'journey', label: 'Journey', icon: Route },
  { id: 'eat', label: 'Eat', icon: UtensilsCrossed },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'travel-dna', label: 'Travel DNA', icon: Dna },
  { id: 'profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const { screen, setScreen } = useApp()

  return (
    <nav className="absolute inset-x-0 bottom-0 z-50 border-t border-border/70 bg-card/95 backdrop-blur-lg">
      <ul className="flex items-stretch justify-between px-1.5 pb-[env(safe-area-inset-bottom)] pt-1.5">
        {items.map(({ id, label, icon: Icon }) => {
          const active = screen === id
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => setScreen(id)}
                aria-current={active ? 'page' : undefined}
                className="flex w-full flex-col items-center gap-1 rounded-xl px-1 py-1.5"
              >
                <span
                  className={cn(
                    'grid size-8 place-items-center rounded-full transition-colors',
                    active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>
                <span
                  className={cn(
                    'text-[0.6rem] font-medium leading-none transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
