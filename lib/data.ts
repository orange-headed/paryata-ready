import type {
  Destination,
  FoodItem,
  JourneyDay,
  SavedItem,
  TravelPreferences,
} from './types'

// ==================================================
// CURRENT LOCATION
// ==================================================

export const CURRENT_LOCATION = {
  city: 'Nagercoil',
  state: 'Tamil Nadu',
}

// ==================================================
// DESTINATIONS
// ==================================================

export const destinations: Destination[] = [
  {
    id: 'bundi',
    name: 'Bundi',
    state: 'Rajasthan',
    image: '/images/bundi.png',
    distanceKm: 28,
    crowdLevel: 'Very low',
    budget: '₹1,800 / day',
    tags: [
      'Heritage',
      'Culture',
      'History',
    ],
    hiddenGem: true,
    shortDescription:
      'A blue-washed old town beneath a sprawling hilltop fort — Rajasthan without the crowds of Jaipur or Udaipur.',
    whyRecommended:
      'While tourists flock to Jaipur, Bundi holds the same royal grandeur with a fraction of the footfall. Your visit directly supports family-run havelis and local artisans keeping step-well traditions alive.',
    impact:
      'Supports 12 local family-run stays & guides',
    experiences: [
      {
        title: 'Taragarh Fort at sunrise',
        description:
          'Beat the heat and the crowds with a quiet climb.',
      },
      {
        title:
          'Step-well (Baori) heritage walk',
        description:
          'Explore Bundi’s legendary 16th-century stepwells.',
      },
      {
        title:
          'Miniature painting workshop',
        description:
          'Learn the Bundi school of art from a local master.',
      },
    ],
    nearbyFood: [
      'Bundi ki Kachori',
      'Dal Baati Churma',
      'Malpua',
    ],
    nearbyStays: [
      {
        name: 'Haveli Katkoun',
        type: 'Heritage homestay',
        price: '₹1,600',
      },
      {
        name: 'Bundi Vilas',
        type: 'Boutique haveli',
        price: '₹2,400',
      },
    ],
    guides: [
      {
        name: 'Rakesh Meena',
        expertise: 'Heritage & forts',
        rating: 4.9,
      },
      {
        name: 'Suman Devi',
        expertise: 'Art & crafts',
        rating: 4.8,
      },
    ],
    vibeMatch: 94,
    dnaWeights: {
      nature: 40,
      peace: 75,
      rural: 30,
      culture: 95,
      food: 70,
      adventure: 45,
      beaches: 0,
      arts: 80,
    },
    tourismOpportunity: 82,
    localBenefit: 88,
  },

  {
    id: 'chettinad',
    name: 'Chettinad',
    state: 'Tamil Nadu',
    image: '/images/chettinad.png',
    distanceKm: 82,
    crowdLevel: 'Low',
    budget: '₹1,500 / day',
    tags: [
      'Heritage',
      'Food',
      'Culture',
    ],
    hiddenGem: true,
    shortDescription:
      'Grand mansions, hand-made tiles and legendary cuisine in a quiet cluster of Tamil villages.',
    whyRecommended:
      'Chettinad’s palatial mansions rival any palace, yet remain wonderfully uncrowded. Staying here keeps heritage restoration and local kitchens thriving.',
    impact:
      'Keeps 8 heritage mansions & kitchens in business',
    experiences: [
      {
        title: 'Mansion & antique trail',
        description:
          'Walk through century-old Nagarathar homes.',
      },
      {
        title: 'Athangudi tile making',
        description:
          'Watch handmade tiles crafted the traditional way.',
      },
    ],
    nearbyFood: [
      'Chettinad Chicken',
      'Kandarappam',
      'Paal Paniyaram',
    ],
    nearbyStays: [
      {
        name: 'Visalam',
        type: 'Heritage mansion',
        price: '₹3,200',
      },
      {
        name: 'Saratha Vilas',
        type: 'Restored villa',
        price: '₹2,900',
      },
    ],
    guides: [
      {
        name: 'Meenakshi R.',
        expertise: 'Cuisine & culture',
        rating: 4.9,
      },
    ],
    vibeMatch: 89,
    dnaWeights: {
      nature: 25,
      peace: 65,
      rural: 50,
      culture: 92,
      food: 98,
      adventure: 30,
      beaches: 0,
      arts: 85,
    },
    tourismOpportunity: 86,
    localBenefit: 91,
  },

  {
    id: 'dhanushkodi',
    name: 'Dhanushkodi',
    state: 'Tamil Nadu',
    image: '/images/dhanushkodi.png',
    distanceKm: 168,
    crowdLevel: 'Low',
    budget: '₹1,200 / day',
    tags: [
      'Nature',
      'Beach',
      'Offbeat',
    ],
    hiddenGem: true,
    shortDescription:
      'A hauntingly beautiful ghost town at land’s end, where two seas meet on a thin ribbon of sand.',
    whyRecommended:
      'Most travellers only see Rameswaram’s temple and leave. Dhanushkodi’s fishing hamlet earns from the few who venture further — your trip helps them.',
    impact:
      'Supports a small coastal fishing community',
    experiences: [
      {
        title:
          'Arichal Munai land’s end',
        description:
          'Stand where the Bay of Bengal meets the Indian Ocean.',
      },
      {
        title:
          'Ghost town ruins walk',
        description:
          'Explore the 1964 cyclone-swept old town.',
      },
    ],
    nearbyFood: [
      'Fresh grilled fish',
      'Prawn fry',
      'Nannari sharbat',
    ],
    nearbyStays: [
      {
        name: 'Rameswaram homestays',
        type: 'Sea-view rooms',
        price: '₹1,400',
      },
    ],
    guides: [
      {
        name: 'Arul Selvan',
        expertise: 'Coastal & fishing life',
        rating: 4.7,
      },
    ],
    vibeMatch: 82,
    dnaWeights: {
      nature: 92,
      peace: 75,
      rural: 25,
      culture: 45,
      food: 55,
      adventure: 80,
      beaches: 98,
      arts: 15,
    },
    tourismOpportunity: 90,
    localBenefit: 84,
  },

  {
    id: 'ziro',
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    image: '/images/ziro.png',
    distanceKm: 210,
    crowdLevel: 'Very low',
    budget: '₹1,700 / day',
    tags: [
      'Nature',
      'Culture',
      'Adventure',
    ],
    hiddenGem: true,
    shortDescription:
      'Emerald rice terraces and the Apatani tribe’s living traditions in a untouched Himalayan valley.',
    whyRecommended:
      'A UNESCO tentative site far from mass tourism. Community homestays here let the Apatani share their culture on their own terms.',
    impact:
      'Directly funds Apatani community homestays',
    experiences: [
      {
        title:
          'Apatani village immersion',
        description:
          'Stay with a family and learn wet-rice farming.',
      },
      {
        title:
          'Pine grove & paddy trek',
        description:
          'Gentle walks through terraced valleys.',
      },
    ],
    nearbyFood: [
      'Pika Pila',
      'Bamboo-shoot curry',
      'Apong rice beer',
    ],
    nearbyStays: [
      {
        name: 'Siiro Resort',
        type: 'Eco cottages',
        price: '₹2,600',
      },
      {
        name: 'Ziro Valley Homestay',
        type: 'Family stay',
        price: '₹1,500',
      },
    ],
    guides: [
      {
        name: 'Hibu Tara',
        expertise: 'Tribal culture',
        rating: 5.0,
      },
    ],
    vibeMatch: 91,
    dnaWeights: {
      nature: 98,
      peace: 90,
      rural: 88,
      culture: 82,
      food: 60,
      adventure: 78,
      beaches: 0,
      arts: 55,
    },
    tourismOpportunity: 95,
    localBenefit: 94,
  },

  {
    id: 'gokarna',
    name: 'Gokarna',
    state: 'Karnataka',
    image: '/images/gokarna.png',
    distanceKm: 145,
    crowdLevel: 'Low',
    budget: '₹1,300 / day',
    tags: [
      'Beach',
      'Nature',
      'Spiritual',
    ],
    hiddenGem: true,
    shortDescription:
      'A laid-back temple town with unspoiled crescent beaches — the quiet answer to crowded Goa.',
    whyRecommended:
      'Gokarna offers Goa’s coastline without the concrete. Small shacks and family guesthouses depend on mindful travellers, not mass resorts.',
    impact:
      'Sustains small beach-shack families',
    experiences: [
      {
        title:
          'Beach-to-beach coastal trek',
        description:
          'Walk from Kudle to Om, Half-moon & Paradise beaches.',
      },
      {
        title:
          'Sunset at Om Beach',
        description:
          'The signature crescent shoreline at golden hour.',
      },
    ],
    nearbyFood: [
      'Coastal thali',
      'Fresh seafood',
      'Filter coffee',
    ],
    nearbyStays: [
      {
        name: 'Kudle Beach huts',
        type: 'Beach cottage',
        price: '₹1,200',
      },
    ],
    guides: [
      {
        name: 'Prakash Naik',
        expertise: 'Coastal treks',
        rating: 4.8,
      },
    ],
    vibeMatch: 85,
    dnaWeights: {
      nature: 88,
      peace: 72,
      rural: 20,
      culture: 55,
      food: 65,
      adventure: 70,
      beaches: 98,
      arts: 25,
    },
    tourismOpportunity: 62,
    localBenefit: 70,
  },

  {
    id: 'majuli',
    name: 'Majuli',
    state: 'Assam',
    image: '/images/majuli.png',
    distanceKm: 260,
    crowdLevel: 'Very low',
    budget: '₹1,400 / day',
    tags: [
      'Nature',
      'Culture',
      'Offbeat',
    ],
    hiddenGem: true,
    shortDescription:
      'The world’s largest river island — mask-making monasteries, mustard fields and slow river life.',
    whyRecommended:
      'Majuli is shrinking and rarely visited. Responsible tourism helps preserve its Satras (monasteries) and traditional crafts.',
    impact:
      'Helps preserve Satra monastery crafts',
    experiences: [
      {
        title:
          'Satra monastery visit',
        description:
          'Meet monks keeping Neo-Vaishnavite arts alive.',
      },
      {
        title:
          'Mask-making workshop',
        description:
          'Craft a traditional bamboo-and-clay mask.',
      },
    ],
    nearbyFood: [
      'Apong',
      'Fish tenga',
      'Rice cakes',
    ],
    nearbyStays: [
      {
        name: 'La Maison de Ananda',
        type: 'Bamboo cottage',
        price: '₹1,600',
      },
    ],
    guides: [
      {
        name: 'Bhupen Das',
        expertise: 'River island life',
        rating: 4.9,
      },
    ],
    vibeMatch: 88,
    dnaWeights: {
      nature: 90,
      peace: 88,
      rural: 95,
      culture: 94,
      food: 72,
      adventure: 55,
      beaches: 0,
      arts: 98,
    },
    tourismOpportunity: 97,
    localBenefit: 96,
  },
]

// ==================================================
// NEAR YOU
// ==================================================

export const nearYou: Destination[] = [
  destinations[1],
  destinations[2],
  destinations[4],
]

// ==================================================
// HIDDEN INDIA
// ==================================================

export const hiddenIndia: Destination[] =
  destinations

// ==================================================
// FOOD
// ==================================================

export const foodItems: FoodItem[] = [
  {
    id: 'kari-dosa',
    name: 'Kari Dosa',
    location: 'Simmakkal, Madurai',
    image: '/images/kari-dosa.png',
    price: '₹90',
    distanceKm: 2.1,
    category: 'Local dish',
    description:
      'Madurai’s midnight legend — a crisp dosa layered with peppery minced mutton and egg.',
  },

  {
    id: 'jigarthanda',
    name: 'Jigarthanda',
    location:
      'East Marret St, Madurai',
    image:
      '/images/jigarthanda.png',
    price: '₹70',
    distanceKm: 1.4,
    category: 'Street food',
    description:
      'A cooling Madurai icon of milk, almond gum, basundi and nannari — literally “heart-cooler”.',
  },

  {
    id: 'kuzhi-paniyaram',
    name: 'Kuzhi Paniyaram',
    location:
      'Villapuram, Madurai',
    image:
      '/images/kuzhi-paniyaram.png',
    price: '₹60',
    distanceKm: 3.6,
    category: 'Street food',
    description:
      'Golden, crisp-edged rice dumplings served hot with fiery coconut chutney.',
  },

  {
    id: 'chettinad-meal',
    name:
      'Chettinad Banana-Leaf Meal',
    location:
      'Karaikudi (Chettinad)',
    image:
      '/images/chettinad-meal.png',
    price: '₹220',
    distanceKm: 82,
    category: 'Experience',
    description:
      'A full spread of Chettinad curries and rice eaten the traditional way, in a heritage home.',
  },
]

// ==================================================
// INITIAL JOURNEY
// ==================================================

export const initialJourney: JourneyDay[] = [
  {
    day: 1,
    place: 'Madurai',
    stops: [
      {
        kind: 'experience',
        title:
          'Meenakshi Temple at dawn',
        detail:
          'Beat the crowds with an early quiet visit',
      },
      {
        kind: 'food',
        title:
          'Kari Dosa at Simmakkal',
        detail:
          'Local late-night specialty · ₹90',
      },
    ],
  },

  {
    day: 2,
    place: 'Bundi',
    stops: [
      {
        kind: 'experience',
        title:
          'Taragarh Fort sunrise climb',
        detail:
          'Hidden gem · very low crowd',
      },
      {
        kind: 'food',
        title:
          'Bundi ki Kachori',
        detail:
          'Family-run stall · ₹40',
      },
    ],
  },
]

// ==================================================
// SAVED ITEMS
// ==================================================

export const savedItems: SavedItem[] = [
  {
    id: 'bundi',
    name: 'Bundi',
    subtitle:
      'Rajasthan · Hidden gem',
    image: '/images/bundi.png',
    type: 'Destination',
  },

  {
    id: 'ziro',
    name: 'Ziro Valley',
    subtitle:
      'Arunachal Pradesh · Very low crowd',
    image: '/images/ziro.png',
    type: 'Destination',
  },

  {
    id: 'jigarthanda',
    name: 'Jigarthanda',
    subtitle:
      'Madurai · Street food',
    image:
      '/images/jigarthanda.png',
    type: 'Food',
  },

  {
    id: 'haveli',
    name: 'Haveli Katkoun',
    subtitle:
      'Bundi · Heritage homestay',
    image: '/images/bundi.png',
    type: 'Stay',
  },

  {
    id: 'mask',
    name:
      'Mask-making workshop',
    subtitle:
      'Majuli · Local experience',
    image:
      '/images/majuli.png',
    type: 'Experience',
  },

  {
    id: 'chettinad-meal',
    name:
      'Chettinad Meal',
    subtitle:
      'Karaikudi · Food experience',
    image:
      '/images/chettinad-meal.png',
    type: 'Food',
  },
]

// ==================================================
// STATIC TRAVEL DNA INFORMATION
// ==================================================

export const travelDna = {
  archetype:
    'Hidden-Gem Explorer',

  blurb:
    'You seek the roads less travelled. You’d rather share chai with a local family in an unknown village than queue at a famous monument.',

  traits: [
    {
      label: 'Hidden gems',
      value: 92,
      color: 'var(--primary)',
    },
    {
      label: 'Food',
      value: 84,
      color: 'var(--clay)',
    },
    {
      label: 'Culture',
      value: 78,
      color: 'var(--leaf)',
    },
    {
      label: 'Nature',
      value: 71,
      color: 'var(--leaf)',
    },
    {
      label: 'History',
      value: 66,
      color: 'var(--clay)',
    },
    {
      label: 'Adventure',
      value: 54,
      color: 'var(--primary)',
    },
  ],
}

// ==================================================
// ROBO MESSAGES
// ==================================================

export const roboMessages = [
  'Hey! There’s a beautiful village only 28 km from here that most tourists miss 👀',

  'I found a local food place that matches your Travel DNA.',

  'You’re near Madurai — want to discover something beyond the usual spots?',

  'I found a hidden gem that fits your vibe perfectly.',
]

// ==================================================
// INITIAL TRAVEL DNA
// ==================================================

export const initialTravelPreferences: TravelPreferences = {
  nature: 50,
  peace: 50,
  rural: 50,
  culture: 50,
  food: 50,
  adventure: 50,
  beaches: 50,
  arts: 50,
}

// ==================================================
// PARYATA RECOMMENDATION ENGINE
// ==================================================

function calculateDNAMatch(
  preferences: TravelPreferences,
  destination: Destination,
) {
  const categories: Array<
    keyof TravelPreferences
  > = [
    'nature',
    'peace',
    'rural',
    'culture',
    'food',
    'adventure',
    'beaches',
    'arts',
  ]

  let weightedMatch = 0
  let totalWeight = 0

  for (const category of categories) {
    const userValue =
      preferences[category]

    const destinationValue =
      destination.dnaWeights[category]

    const weight =
      userValue / 100

    const difference =
      Math.abs(
        userValue -
          destinationValue,
      )

    const match =
      100 - difference

    weightedMatch +=
      match * weight

    totalWeight += weight
  }

  if (totalWeight === 0) {
    return 50
  }

  return (
    weightedMatch /
    totalWeight
  )
}

// ==================================================
// CROWD SCORE
// ==================================================

function calculateCrowdScore(
  destination: Destination,
) {
  switch (
    destination.crowdLevel
  ) {
    case 'Very low':
      return 100

    case 'Low':
      return 80

    case 'Medium':
      return 55

    case 'High':
      return 25

    default:
      return 50
  }
}

// ==================================================
// DISTANCE SCORE
// ==================================================

function calculateDistanceScore(
  distanceKm: number,
) {
  if (distanceKm <= 50) {
    return 100
  }

  if (distanceKm <= 100) {
    return 90
  }

  if (distanceKm <= 200) {
    return 75
  }

  if (distanceKm <= 300) {
    return 65
  }

  if (distanceKm <= 600) {
    return 50
  }

  if (distanceKm <= 1000) {
    return 35
  }

  return 20
}

// ==================================================
// BUDGET SCORE
// ==================================================

function calculateBudgetScore(
  budget: string,
) {
  const numbers =
    budget.match(/\d+/g)

  if (!numbers?.length) {
    return 60
  }

  const values =
    numbers.map(Number)

  const average =
    values.reduce(
      (sum, value) =>
        sum + value,
      0,
    ) / values.length

  if (average <= 1500) {
    return 100
  }

  if (average <= 2000) {
    return 90
  }

  if (average <= 3000) {
    return 75
  }

  if (average <= 5000) {
    return 60
  }

  if (average <= 8000) {
    return 45
  }

  return 30
}

// ==================================================
// STRONGEST TRAVEL DNA CATEGORY
// ==================================================

function getStrongestPreference(
  preferences: TravelPreferences,
): keyof TravelPreferences {
  const categories: Array<
    keyof TravelPreferences
  > = [
    'nature',
    'peace',
    'rural',
    'culture',
    'food',
    'adventure',
    'beaches',
    'arts',
  ]

  return categories.reduce(
    (best, current) =>
      preferences[current] >
      preferences[best]
        ? current
        : best,
  )
}

// ==================================================
// RECOMMENDATION RESULT
// ==================================================

export interface RecommendationResult {
  destination: Destination

  score: number

  dnaMatch: number

  tourismOpportunity: number

  localBenefit: number

  crowdScore: number

  distanceScore: number

  budgetScore: number

  strongestMatch:
    keyof TravelPreferences
}

// ==================================================
// CALCULATE ONE DESTINATION
// ==================================================

export function calculateDestinationScore(
  preferences: TravelPreferences,
  destination: Destination,
): RecommendationResult {
  const dnaMatch =
    calculateDNAMatch(
      preferences,
      destination,
    )

  const tourismOpportunity =
    destination.tourismOpportunity

  const localBenefit =
    destination.localBenefit

  const crowdScore =
    calculateCrowdScore(
      destination,
    )

  const distanceScore =
    calculateDistanceScore(
      destination.distanceKm,
    )

  const budgetScore =
    calculateBudgetScore(
      destination.budget,
    )

  /*
   * PARYATA SCORE
   *
   * 40%  → Personal Travel DNA
   * 25%  → Tourism opportunity
   * 10%  → Local community benefit
   * 15%  → Crowd pressure
   * 5%   → Distance
   * 5%   → Budget
   */

  const score =
    dnaMatch * 0.40 +
    tourismOpportunity * 0.25 +
    localBenefit * 0.10 +
    crowdScore * 0.15 +
    distanceScore * 0.05 +
    budgetScore * 0.05

  return {
    destination,

    score: Math.round(score),

    dnaMatch:
      Math.round(dnaMatch),

    tourismOpportunity:
      Math.round(
        tourismOpportunity,
      ),

    localBenefit:
      Math.round(
        localBenefit,
      ),

    crowdScore:
      Math.round(crowdScore),

    distanceScore:
      Math.round(
        distanceScore,
      ),

    budgetScore:
      Math.round(
        budgetScore,
      ),

    strongestMatch:
      getStrongestPreference(
        preferences,
      ),
  }
}

// ==================================================
// GET BEST PERSONALIZED DESTINATION
// ==================================================

export function getPersonalizedDestination(
  preferences: TravelPreferences,
) {
  const ranked =
    destinations
      .map(
        (destination) =>
          calculateDestinationScore(
            preferences,
            destination,
          ),
      )
      .sort(
        (a, b) =>
          b.score - a.score,
      )

  return ranked[0]
}

// ==================================================
// GET ALL DESTINATIONS RANKED
// ==================================================

export function getRecommendedDestinations(
  preferences: TravelPreferences,
): RecommendationResult[] {
  return destinations
    .map(
      (destination) =>
        calculateDestinationScore(
          preferences,
          destination,
        ),
    )
    .sort(
      (a, b) =>
        b.score - a.score,
    )
}