export type ScreenId =
  | 'explore'
  | 'journey'
  | 'eat'
  | 'travel-dna'
  | 'profile'
  | 'saved'

export type RoboState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'happy'
  | 'excited'
  | 'pointing'
  | 'concerned'

export type SavedCategory =
  | 'Destination'
  | 'Food'
  | 'Stay'
  | 'Experience'
  | 'Guide'

export interface TravelPreferences {
  nature: number
  peace: number
  rural: number
  culture: number
  food: number
  adventure: number
  beaches: number
  arts: number
}

export interface DestinationExperience {
  title: string
  description: string
}

export interface DestinationStay {
  name: string
  type: string
  price: string
}

export interface DestinationGuide {
  name: string
  expertise: string
  rating: number
}

export interface Destination {
  id: string
  name: string
  state: string
  image: string
  distanceKm: number
  crowdLevel:
    | 'Very low'
    | 'Low'
    | 'Medium'
    | 'High'
  budget: string
  tags: string[]
  hiddenGem: boolean
  shortDescription: string
  whyRecommended: string
  impact: string
  experiences: DestinationExperience[]
  nearbyFood: string[]
  nearbyStays: DestinationStay[]
  guides: DestinationGuide[]
  vibeMatch: number
  dnaWeights: TravelPreferences
  tourismOpportunity: number
  localBenefit: number
}

export interface FoodItem {
  id: string
  name: string
  location: string
  image: string
  price: string
  distanceKm: number
  category: string
  description: string
}

export interface JourneyStop {
  kind: 'experience' | 'food' | 'stay' | 'guide'
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
  type: SavedCategory
}