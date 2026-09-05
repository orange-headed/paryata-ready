'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

import {
  initialJourney,
  initialTravelPreferences,
} from './data'

import type {
  JourneyDay,
  RoboState,
  ScreenId,
} from './types'

interface AppState {
  screen: ScreenId
  setScreen: (screen: ScreenId) => void

  selectedDestinationId: string | null
  openDestination: (id: string) => void
  closeDestination: () => void

  savedIds: string[]
  toggleSaved: (id: string) => void
  isSaved: (id: string) => boolean

  journey: JourneyDay[]
  addToJourney: (place: string) => void

  travelPreferences: typeof initialTravelPreferences

  setTravelPreferences: Dispatch<
    SetStateAction<typeof initialTravelPreferences>
  >

  updateTravelDNA: (
    category: keyof typeof initialTravelPreferences,
    amount: number,
  ) => void

  roboState: RoboState
  setRoboState: (state: RoboState) => void

  roboMessage: string | null

  sayRobo: (
    message: string,
    state?: RoboState,
  ) => void

  clearRobo: () => void
}

const AppContext =
  createContext<AppState | null>(null)

export function AppProvider({
  children,
}: {
  children: ReactNode
}) {
  const [screen, setScreenState] =
    useState<ScreenId>('explore')

  const [
    selectedDestinationId,
    setSelectedDestinationId,
  ] = useState<string | null>(null)

  const [savedIds, setSavedIds] =
    useState<string[]>([])

  const [journey, setJourney] =
    useState<JourneyDay[]>(
      initialJourney,
    )

  const [
    travelPreferences,
    setTravelPreferences,
  ] = useState<typeof initialTravelPreferences>(
    initialTravelPreferences,
  )

  const [roboState, setRoboState] =
    useState<RoboState>('idle')

  const [roboMessage, setRoboMessage] =
    useState<string | null>(null)

  // ================================================
  // PARYATA BUDDY
  // ================================================

  const sayRobo = useCallback(
    (
      message: string,
      state: RoboState = 'speaking',
    ) => {
      setRoboState(state)
      setRoboMessage(message)
    },
    [],
  )

  const clearRobo =
    useCallback(() => {
      setRoboMessage(null)
      setRoboState('idle')
    }, [])

  // ================================================
  // LOAD SAVED DATA
  // ================================================

  useEffect(() => {
    try {
      const saved =
        window.localStorage.getItem(
          'paryata-saved',
        )

      if (saved) {
        const parsed =
          JSON.parse(saved)

        if (Array.isArray(parsed)) {
          setSavedIds(parsed)
        }
      }

      const savedJourney =
        window.localStorage.getItem(
          'paryata-journey',
        )

      if (savedJourney) {
        const parsed =
          JSON.parse(savedJourney)

        if (Array.isArray(parsed)) {
          setJourney(parsed)
        }
      }

      const savedDNA =
        window.localStorage.getItem(
          'paryata-travel-dna',
        )

      if (savedDNA) {
        const parsed =
          JSON.parse(savedDNA)

        if (
          parsed &&
          typeof parsed === 'object'
        ) {
          setTravelPreferences({
            ...initialTravelPreferences,
            ...parsed,
          })
        }
      }
    } catch {
      // Keep default values if localStorage is invalid.
    }
  }, [])

  // ================================================
  // SAVE DATA TO LOCAL STORAGE
  // ================================================

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'paryata-saved',
        JSON.stringify(savedIds),
      )
    } catch {}
  }, [savedIds])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'paryata-journey',
        JSON.stringify(journey),
      )
    } catch {}
  }, [journey])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'paryata-travel-dna',
        JSON.stringify(
          travelPreferences,
        ),
      )
    } catch {}
  }, [travelPreferences])

  // ================================================
  // NAVIGATION
  // ================================================

  const setScreen = useCallback(
    (nextScreen: ScreenId) => {
      setSelectedDestinationId(null)
      setScreenState(nextScreen)

      if (
        typeof window !== 'undefined'
      ) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    },
    [],
  )

  // ================================================
  // DESTINATION
  // ================================================

  const openDestination =
    useCallback(
      (id: string) => {
        setSelectedDestinationId(id)

        if (
          typeof window !== 'undefined'
        ) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      },
      [],
    )

  const closeDestination =
    useCallback(() => {
      setSelectedDestinationId(null)
    }, [])

  // ================================================
  // TRAVEL DNA MANUAL UPDATE
  // ================================================

  const updateTravelDNA =
    useCallback(
      (
        category: keyof typeof initialTravelPreferences,
        amount: number,
      ) => {
        setTravelPreferences(
          (previous) => ({
            ...previous,
            [category]: clamp(
              previous[category] +
                amount,
            ),
          }),
        )
      },
      [],
    )

  // ================================================
  // SAVE / UNSAVE
  // ================================================

  const toggleSaved =
    useCallback(
      (id: string) => {
        const alreadySaved =
          savedIds.includes(id)

        // --------------------------------------------
        // UNSAVE
        // --------------------------------------------

        if (alreadySaved) {
          setSavedIds(
            (previous) =>
              previous.filter(
                (itemId) =>
                  itemId !== id,
              ),
          )

          setTravelPreferences(
            (previous) => {
              const next = {
                ...previous,
              }

              applyDestinationDNA(
                next,
                id,
                -1,
              )

              return clampDNA(next)
            },
          )

          sayRobo(
            getUnsaveMessage(id),
            'thinking',
          )

          return
        }

        // --------------------------------------------
        // SAVE
        // --------------------------------------------

        setSavedIds(
          (previous) => {
            if (
              previous.includes(id)
            ) {
              return previous
            }

            return [
              ...previous,
              id,
            ]
          },
        )

        // --------------------------------------------
        // UPDATE TRAVEL DNA
        // --------------------------------------------

        setTravelPreferences(
          (previous) => {
            const next = {
              ...previous,
            }

            applyDestinationDNA(
              next,
              id,
              1,
            )

            return clampDNA(next)
          },
        )

        // --------------------------------------------
        // BUDDY REACTION
        // --------------------------------------------

        sayRobo(
          getSaveMessage(id),
          'happy',
        )
      },
      [
        savedIds,
        sayRobo,
      ],
    )

  // ================================================
  // SAVED CHECK
  // ================================================

  const isSaved =
    useCallback(
      (id: string) =>
        savedIds.includes(id),
      [savedIds],
    )

  // ================================================
  // JOURNEY
  // ================================================

  const addToJourney =
    useCallback(
      (place: string) => {
        setJourney(
          (previous) => [
            ...previous,
            {
              day:
                previous.length + 1,

              place,

              stops: [
                {
                  kind: 'experience',

                  title:
                    `Discover ${place}`,

                  detail:
                    'Added from your saved gems',
                },
              ],
            },
          ],
        )

        sayRobo(
          `${place} is going into your Journey. I'll keep that in mind when helping you plan.`,
          'happy',
        )
      },
      [sayRobo],
    )

  // ================================================
  // CONTEXT VALUE
  // ================================================

  const value =
    useMemo<AppState>(
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

        travelPreferences,
        setTravelPreferences,
        updateTravelDNA,

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

        travelPreferences,
        setTravelPreferences,
        updateTravelDNA,

        roboState,
        roboMessage,
        sayRobo,
        clearRobo,
      ],
    )

  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  )
}

// ==================================================
// HELPERS
// ==================================================

function clamp(
  value: number,
): number {
  return Math.min(
    100,
    Math.max(0, value),
  )
}

function clampDNA(
  preferences: typeof initialTravelPreferences,
) {
  return {
    nature: clamp(
      preferences.nature,
    ),

    peace: clamp(
      preferences.peace,
    ),

    rural: clamp(
      preferences.rural,
    ),

    culture: clamp(
      preferences.culture,
    ),

    food: clamp(
      preferences.food,
    ),

    adventure: clamp(
      preferences.adventure,
    ),

    beaches: clamp(
      preferences.beaches,
    ),

    arts: clamp(
      preferences.arts,
    ),
  }
}

// ==================================================
// DESTINATION → TRAVEL DNA
// ==================================================

function applyDestinationDNA(
  preferences: typeof initialTravelPreferences,
  id: string,
  direction: 1 | -1,
) {
  if (id === 'bundi') {
    preferences.culture +=
      5 * direction

    preferences.arts +=
      3 * direction

    return
  }

  if (id === 'chettinad') {
    preferences.culture +=
      5 * direction

    preferences.food +=
      5 * direction

    return
  }

  if (id === 'dhanushkodi') {
    preferences.nature +=
      5 * direction

    preferences.beaches +=
      5 * direction

    return
  }

  if (id === 'ziro') {
    preferences.nature +=
      5 * direction

    preferences.rural +=
      5 * direction

    preferences.culture +=
      3 * direction

    return
  }

  if (id === 'gokarna') {
    preferences.beaches +=
      5 * direction

    preferences.nature +=
      5 * direction

    return
  }

  if (id === 'majuli') {
    preferences.nature +=
      5 * direction

    preferences.rural +=
      5 * direction

    preferences.culture +=
      5 * direction

    preferences.arts +=
      3 * direction
  }
}

// ==================================================
// SAVE MESSAGE
// ==================================================

function getSaveMessage(
  id: string,
): string {
  switch (id) {
    case 'bundi':
      return 'Ooooh, Bundi! 👀 Your Culture & Heritage preferences just got stronger. I am learning your Travel DNA, so your recommendations will adapt too.'

    case 'chettinad':
      return 'Chettinad! 🍛 Your Local Food and Culture preferences just went up. I am learning your Travel DNA, so I can make better recommendations for you.'

    case 'dhanushkodi':
      return 'Dhanushkodi! 🌊 Your Nature and Beach preferences just got a boost. I am learning what kind of escapes you like, and your recommendations will adapt.'

    case 'ziro':
      return 'Ooooh, Ziro! 🌿 Your Nature and Rural preferences just went up. I am learning your Travel DNA, so your recommendations will adapt too. 👀'

    case 'gokarna':
      return 'Gokarna! 🏝️ Your Beach and Nature preferences just went up. I am starting to understand your travel pattern, so I will adjust what I recommend.'

    case 'majuli':
      return 'Majuli! 🎨 Your Nature, Rural, Culture and Arts preferences just got stronger. I am learning your Travel DNA, so your recommendations will keep evolving.'

    default:
      return 'Interesting choice! 👀 Your Travel DNA is getting clearer. I am learning what you like, and your recommendations will adapt.'
  }
}

// ==================================================
// UNSAVE MESSAGE
// ==================================================

function getUnsaveMessage(
  id: string,
): string {
  switch (id) {
    case 'bundi':
      return 'Got it 👌 Bundi is out of your saved places. I will remember that when adjusting your recommendations.'

    case 'chettinad':
      return 'Got it 👌 Chettinad is out. I will remember that when choosing your food and culture recommendations.'

    case 'dhanushkodi':
      return 'Got it 👌 Dhanushkodi is out. I will keep refining your recommendations.'

    case 'ziro':
      return 'Got it 👌 Ziro is out of your saved places. I will remember that and adjust what I recommend to you.'

    case 'gokarna':
      return 'Got it 👌 Gokarna is out. I will keep learning from what you choose.'

    case 'majuli':
      return 'Got it 👌 Majuli is out of your saved places. I will keep refining your Travel DNA.'

    default:
      return 'Got it 👌 I removed that from your saved places. I will keep learning from what you choose.'
  }
}

// ==================================================
// USE APP
// ==================================================

export function useApp() {
  const context =
    useContext(AppContext)

  if (!context) {
    throw new Error(
      'useApp must be used within AppProvider',
    )
  }

  return context
}