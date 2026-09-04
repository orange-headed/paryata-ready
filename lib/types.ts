export type ScreenId =
  | 'explore'
  | 'journey'
  | 'eat'
  | 'saved'
  | 'travel-dna'
  | 'profile'

export type CrowdLevel = 'Very low' | 'Low' | 'Moderate'

export type RoboState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'excited'
  | 'pointing'
  | 'concerned'
  | 'speaking'

export interface Experience {
  title: string
  description: string
}

export interface Destination {
  id: string
  name: string
  state: string
  image: string
  distanceKm: number
  crowdLevel: CrowdLevel
  budget: string
  tags: string[]
  hiddenGem: boolean
  shortDescription: string
  whyRecommended: string
  impact: string
  experiences: Experience[]
  nearbyFood: string[]
  nearbyStays: { name: string; type: string; price: string }[]
  guides: { name: string; expertise: string; rating: number }[]
  vibeMatch: number
}

export interface FoodItem {
  id: string
  name: string
  location: string
  image: string
  price: string
  distanceKm: number
  category: 'Local dish' | 'Street food' | 'Hidden restaurant' | 'Experience'
  description: string
}

export interface JourneyStop {
  kind: 'destination' | 'experience' | 'food'
  title: string
  detail: string
}

export interface JourneyDay {
  day: number
  place: string
  stops: JourneyStop[]
}

export interface SavedItem {
  id: string
  name: string
  subtitle: string
  image: string
  type: 'Destination' | 'Food' | 'Stay' | 'Experience'
}

export type SavedCategory = SavedItem['type']
