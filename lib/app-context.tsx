'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { initialJourney, savedItems } from './data'
import type { JourneyDay, RoboState, ScreenId } from './types'

interface AppState {
  screen: ScreenId
  setScreen: (s: ScreenId) => void

  selectedDestinationId: string | null
  openDestination: (id: string) => void
  closeDestination: () => void

  savedIds: string[]
  toggleSaved: (id: string) => void
  isSaved: (id: string) => boolean

  journey: JourneyDay[]
  addToJourney: (place: string) => void

  roboState: RoboState
  setRoboState: (s: RoboState) => void
  roboMessage: string | null
  sayRobo: (message: string, state?: RoboState) => void
  clearRobo: () => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreenState] = useState<ScreenId>('explore')
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    string | null
  >(null)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return savedItems.map((item) => item.id)
    try {
      const stored = window.localStorage.getItem('paryata-saved')
      return stored ? JSON.parse(stored) : savedItems.map((item) => item.id)
    } catch {
      return savedItems.map((item) => item.id)
    }
  })
  const [journey, setJourney] = useState<JourneyDay[]>(() => {
    if (typeof window === 'undefined') return initialJourney
    try {
      const stored = window.localStorage.getItem('paryata-journey')
      return stored ? JSON.parse(stored) : initialJourney
    } catch {
      return initialJourney
    }
  })
  const [roboState, setRoboState] = useState<RoboState>('idle')
  const [roboMessage, setRoboMessage] = useState<string | null>(null)

  // Keep the demo state alive across refreshes without needing a backend.
  // This makes Save and Journey feel like real app features during the hackathon.
  useEffect(() => {
    try {
      window.localStorage.setItem('paryata-saved', JSON.stringify(savedIds))
    } catch {}
  }, [savedIds])

  useEffect(() => {
    try {
      window.localStorage.setItem('paryata-journey', JSON.stringify(journey))
    } catch {}
  }, [journey])

  const setScreen = useCallback((s: ScreenId) => {
    setSelectedDestinationId(null)
    setScreenState(s)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 })
    }
  }, [])

  const openDestination = useCallback((id: string) => {
    setSelectedDestinationId(id)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 })
    }
  }, [])

  const closeDestination = useCallback(() => setSelectedDestinationId(null), [])

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds])

  const addToJourney = useCallback((place: string) => {
    setJourney((prev) => [
      ...prev,
      {
        day: prev.length + 1,
        place,
        stops: [
          {
            kind: 'experience',
            title: `Discover ${place}`,
            detail: 'Added from your saved gems',
          },
        ],
      },
    ])
  }, [])

  const sayRobo = useCallback((message: string, state: RoboState = 'speaking') => {
    setRoboState(state)
    setRoboMessage(message)
  }, [])

  const clearRobo = useCallback(() => {
    setRoboMessage(null)
    setRoboState('idle')
  }, [])

  const value = useMemo<AppState>(
    () => ({
      screen,
      setScreen,
      selectedDestinationId,
      openDestination,
      closeDestination,
      savedIds,
      toggleSaved,
      isSaved,
      journey,
      addToJourney,
      roboState,
      setRoboState,
      roboMessage,
      sayRobo,
      clearRobo,
    }),
    [
      screen,
      setScreen,
      selectedDestinationId,
      openDestination,
      closeDestination,
      savedIds,
      toggleSaved,
      isSaved,
      journey,
      addToJourney,
      roboState,
      roboMessage,
      sayRobo,
      clearRobo,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
