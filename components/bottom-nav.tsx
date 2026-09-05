'use client'

import { useEffect, useRef, useState } from 'react'
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

const items: {
  id: ScreenId
  label: string
  icon: LucideIcon
}[] = [
  {
    id: 'explore',
    label: 'Explore',
    icon: Compass,
  },
  {
    id: 'journey',
    label: 'Journey',
    icon: Route,
  },
  {
    id: 'eat',
    label: 'Eat',
    icon: UtensilsCrossed,
  },
  {
    id: 'saved',
    label: 'Saved',
    icon: Bookmark,
  },
  {
    id: 'travel-dna',
    label: 'Travel DNA',
    icon: Dna,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
  },
]

export function BottomNav() {
  const { screen, setScreen } = useApp()

  const [visible, setVisible] = useState(true)

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return

      ticking.current = true

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        // Always show the navigation near the top.
        if (currentScrollY < 20) {
          setVisible(true)
        } else {
          const difference =
            currentScrollY - lastScrollY.current

          // Scrolling down → hide
          if (difference > 6) {
            setVisible(false)
          }

          // Scrolling up → show
          if (difference < -6) {
            setVisible(true)
          }
        }

        lastScrollY.current = currentScrollY
        ticking.current = false
      })
    }

    lastScrollY.current = window.scrollY

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )
    }
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-50',
        'transition-transform duration-300 ease-out',
        visible
          ? 'translate-y-0'
          : 'translate-y-full',
      )}
    >
      <div className="mx-auto w-full max-w-md px-2 pb-2">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-[0_8px_30px_-8px_rgba(27,36,54,0.35)] backdrop-blur-xl">
          <ul className="flex items-stretch justify-between px-1.5 pb-[env(safe-area-inset-bottom)] pt-1.5">
            {items.map(
              ({
                id,
                label,
                icon: Icon,
              }) => {
                const active =
                  screen === id

                return (
                  <li
                    key={id}
                    className="flex-1"
                  >
                    <button
                      onClick={() =>
                        setScreen(id)
                      }
                      aria-current={
                        active
                          ? 'page'
                          : undefined
                      }
                      className="flex w-full flex-col items-center gap-1 rounded-xl px-1 py-1.5 transition-transform active:scale-95"
                    >
                      <span
                        className={cn(
                          'grid size-8 place-items-center rounded-full transition-all duration-200',
                          active
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground',
                        )}
                      >
                        <Icon className="size-[18px]" />
                      </span>

                      <span
                        className={cn(
                          'text-[0.6rem] font-medium leading-none transition-colors',
                          active
                            ? 'text-primary'
                            : 'text-muted-foreground',
                        )}
                      >
                        {label}
                      </span>
                    </button>
                  </li>
                )
              },
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}