'use client'

import { BottomNav } from '@/components/bottom-nav'
import { RoboBuddy } from '@/components/robo-buddy'
import { DestinationScreen } from '@/components/screens/destination-screen'
import { EatScreen } from '@/components/screens/eat-screen'
import { ExploreScreen } from '@/components/screens/explore-screen'
import { JourneyScreen } from '@/components/screens/journey-screen'
import { ProfileScreen } from '@/components/screens/profile-screen'
import { SavedScreen } from '@/components/screens/saved-screen'
import { TravelDnaScreen } from '@/components/screens/travel-dna-screen'
import { AppProvider, useApp } from '@/lib/app-context'

function CurrentScreen() {
  const { screen, selectedDestinationId } = useApp()

  if (selectedDestinationId) {
    return <DestinationScreen key={selectedDestinationId} id={selectedDestinationId} />
  }

  switch (screen) {
    case 'explore':
      return <ExploreScreen />
    case 'journey':
      return <JourneyScreen />
    case 'eat':
      return <EatScreen />
    case 'saved':
      return <SavedScreen />
    case 'travel-dna':
      return <TravelDnaScreen />
    case 'profile':
      return <ProfileScreen />
    default:
      return <ExploreScreen />
  }
}

export function ParyataApp() {
  return (
    <AppProvider>
      {/* Desktop backdrop */}
      <div className="flex min-h-dvh justify-center bg-navy/95 sm:py-6">
        {/* Phone frame */}
        <div className="relative flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-background shadow-2xl sm:min-h-[calc(100dvh-3rem)] sm:rounded-[2.5rem] sm:ring-8 sm:ring-navy">
          <main className="no-scrollbar flex-1 overflow-y-auto pb-20">
            <CurrentScreen />
          </main>
          <RoboBuddy />
          <BottomNav />
        </div>
      </div>
    </AppProvider>
  )
}
