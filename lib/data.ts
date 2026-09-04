import type {
  Destination,
  FoodItem,
  JourneyDay,
  SavedItem,
} from './types'

export const CURRENT_LOCATION = {
  city: 'Madurai',
  state: 'Tamil Nadu',
}

export const destinations: Destination[] = [
  {
    id: 'bundi',
    name: 'Bundi',
    state: 'Rajasthan',
    image: '/images/bundi.png',
    distanceKm: 28,
    crowdLevel: 'Very low',
    budget: '₹1,800 / day',
    tags: ['Heritage', 'Culture', 'History'],
    hiddenGem: true,
    shortDescription:
      'A blue-washed old town beneath a sprawling hilltop fort — Rajasthan without the crowds of Jaipur or Udaipur.',
    whyRecommended:
      'While tourists flock to Jaipur, Bundi holds the same royal grandeur with a fraction of the footfall. Your visit directly supports family-run havelis and local artisans keeping step-well traditions alive.',
    impact: 'Supports 12 local family-run stays & guides',
    experiences: [
      {
        title: 'Taragarh Fort at sunrise',
        description: 'Beat the heat and the crowds with a quiet climb.',
      },
      {
        title: 'Step-well (Baori) heritage walk',
        description: 'Explore Bundi’s legendary 16th-century stepwells.',
      },
      {
        title: 'Miniature painting workshop',
        description: 'Learn the Bundi school of art from a local master.',
      },
    ],
    nearbyFood: ['Bundi ki Kachori', 'Dal Baati Churma', 'Malpua'],
    nearbyStays: [
      { name: 'Haveli Katkoun', type: 'Heritage homestay', price: '₹1,600' },
      { name: 'Bundi Vilas', type: 'Boutique haveli', price: '₹2,400' },
    ],
    guides: [
      { name: 'Rakesh Meena', expertise: 'Heritage & forts', rating: 4.9 },
      { name: 'Suman Devi', expertise: 'Art & crafts', rating: 4.8 },
    ],
    vibeMatch: 94,
  },
  {
    id: 'chettinad',
    name: 'Chettinad',
    state: 'Tamil Nadu',
    image: '/images/chettinad.png',
    distanceKm: 82,
    crowdLevel: 'Low',
    budget: '₹1,500 / day',
    tags: ['Heritage', 'Food', 'Culture'],
    hiddenGem: true,
    shortDescription:
      'Grand mansions, hand-made tiles and legendary cuisine in a quiet cluster of Tamil villages.',
    whyRecommended:
      'Chettinad’s palatial mansions rival any palace, yet remain wonderfully uncrowded. Staying here keeps heritage restoration and local kitchens thriving.',
    impact: 'Keeps 8 heritage mansions & kitchens in business',
    experiences: [
      {
        title: 'Mansion & antique trail',
        description: 'Walk through century-old Nagarathar homes.',
      },
      {
        title: 'Athangudi tile making',
        description: 'Watch handmade tiles crafted the traditional way.',
      },
    ],
    nearbyFood: ['Chettinad Chicken', 'Kandarappam', 'Paal Paniyaram'],
    nearbyStays: [
      { name: 'Visalam', type: 'Heritage mansion', price: '₹3,200' },
      { name: 'Saratha Vilas', type: 'Restored villa', price: '₹2,900' },
    ],
    guides: [
      { name: 'Meenakshi R.', expertise: 'Cuisine & culture', rating: 4.9 },
    ],
    vibeMatch: 89,
  },
  {
    id: 'dhanushkodi',
    name: 'Dhanushkodi',
    state: 'Tamil Nadu',
    image: '/images/dhanushkodi.png',
    distanceKm: 168,
    crowdLevel: 'Low',
    budget: '₹1,200 / day',
    tags: ['Nature', 'Beach', 'Offbeat'],
    hiddenGem: true,
    shortDescription:
      'A hauntingly beautiful ghost town at land’s end, where two seas meet on a thin ribbon of sand.',
    whyRecommended:
      'Most travellers only see Rameswaram’s temple and leave. Dhanushkodi’s fishing hamlet earns from the few who venture further — your trip helps them.',
    impact: 'Supports a small coastal fishing community',
    experiences: [
      {
        title: 'Arichal Munai land’s end',
        description: 'Stand where the Bay of Bengal meets the Indian Ocean.',
      },
      {
        title: 'Ghost town ruins walk',
        description: 'Explore the 1964 cyclone-swept old town.',
      },
    ],
    nearbyFood: ['Fresh grilled fish', 'Prawn fry', 'Nannari sharbat'],
    nearbyStays: [
      { name: 'Rameswaram homestays', type: 'Sea-view rooms', price: '₹1,400' },
    ],
    guides: [{ name: 'Arul Selvan', expertise: 'Coastal & fishing life', rating: 4.7 }],
    vibeMatch: 82,
  },
  {
    id: 'ziro',
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    image: '/images/ziro.png',
    distanceKm: 210,
    crowdLevel: 'Very low',
    budget: '₹1,700 / day',
    tags: ['Nature', 'Culture', 'Adventure'],
    hiddenGem: true,
    shortDescription:
      'Emerald rice terraces and the Apatani tribe’s living traditions in a untouched Himalayan valley.',
    whyRecommended:
      'A UNESCO tentative site far from mass tourism. Community homestays here let the Apatani share their culture on their own terms.',
    impact: 'Directly funds Apatani community homestays',
    experiences: [
      {
        title: 'Apatani village immersion',
        description: 'Stay with a family and learn wet-rice farming.',
      },
      {
        title: 'Pine grove & paddy trek',
        description: 'Gentle walks through terraced valleys.',
      },
    ],
    nearbyFood: ['Pika Pila', 'Bamboo-shoot curry', 'Apong rice beer'],
    nearbyStays: [
      { name: 'Siiro Resort', type: 'Eco cottages', price: '₹2,600' },
      { name: 'Ziro Valley Homestay', type: 'Family stay', price: '₹1,500' },
    ],
    guides: [{ name: 'Hibu Tara', expertise: 'Tribal culture', rating: 5.0 }],
    vibeMatch: 91,
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    state: 'Karnataka',
    image: '/images/gokarna.png',
    distanceKm: 145,
    crowdLevel: 'Low',
    budget: '₹1,300 / day',
    tags: ['Beach', 'Nature', 'Spiritual'],
    hiddenGem: true,
    shortDescription:
      'A laid-back temple town with unspoiled crescent beaches — the quiet answer to crowded Goa.',
    whyRecommended:
      'Gokarna offers Goa’s coastline without the concrete. Small shacks and family guesthouses depend on mindful travellers, not mass resorts.',
    impact: 'Sustains small beach-shack families',
    experiences: [
      {
        title: 'Beach-to-beach coastal trek',
        description: 'Walk from Kudle to Om, Half-moon & Paradise beaches.',
      },
      {
        title: 'Sunset at Om Beach',
        description: 'The signature crescent shoreline at golden hour.',
      },
    ],
    nearbyFood: ['Coastal thali', 'Fresh seafood', 'Filter coffee'],
    nearbyStays: [
      { name: 'Kudle Beach huts', type: 'Beach cottage', price: '₹1,200' },
    ],
    guides: [{ name: 'Prakash Naik', expertise: 'Coastal treks', rating: 4.8 }],
    vibeMatch: 85,
  },
  {
    id: 'majuli',
    name: 'Majuli',
    state: 'Assam',
    image: '/images/majuli.png',
    distanceKm: 260,
    crowdLevel: 'Very low',
    budget: '₹1,400 / day',
    tags: ['Nature', 'Culture', 'Offbeat'],
    hiddenGem: true,
    shortDescription:
      'The world’s largest river island — mask-making monasteries, mustard fields and slow river life.',
    whyRecommended:
      'Majuli is shrinking and rarely visited. Responsible tourism helps preserve its Satras (monasteries) and traditional crafts.',
    impact: 'Helps preserve Satra monastery crafts',
    experiences: [
      {
        title: 'Satra monastery visit',
        description: 'Meet monks keeping Neo-Vaishnavite arts alive.',
      },
      {
        title: 'Mask-making workshop',
        description: 'Craft a traditional bamboo-and-clay mask.',
      },
    ],
    nearbyFood: ['Apong', 'Fish tenga', 'Rice cakes'],
    nearbyStays: [
      { name: 'La Maison de Ananda', type: 'Bamboo cottage', price: '₹1,600' },
    ],
    guides: [{ name: 'Bhupen Das', expertise: 'River island life', rating: 4.9 }],
    vibeMatch: 88,
  },
]

export const nearYou: Destination[] = [
  destinations[1], // Chettinad
  destinations[2], // Dhanushkodi
  destinations[4], // Gokarna
]

export const hiddenIndia: Destination[] = destinations

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
    location: 'East Marret St, Madurai',
    image: '/images/jigarthanda.png',
    price: '₹70',
    distanceKm: 1.4,
    category: 'Street food',
    description:
      'A cooling Madurai icon of milk, almond gum, basundi and nannari — literally “heart-cooler”.',
  },
  {
    id: 'kuzhi-paniyaram',
    name: 'Kuzhi Paniyaram',
    location: 'Villapuram, Madurai',
    image: '/images/kuzhi-paniyaram.png',
    price: '₹60',
    distanceKm: 3.6,
    category: 'Street food',
    description:
      'Golden, crisp-edged rice dumplings served hot with fiery coconut chutney.',
  },
  {
    id: 'chettinad-meal',
    name: 'Chettinad Banana-Leaf Meal',
    location: 'Karaikudi (Chettinad)',
    image: '/images/chettinad-meal.png',
    price: '₹220',
    distanceKm: 82,
    category: 'Experience',
    description:
      'A full spread of Chettinad curries and rice eaten the traditional way, in a heritage home.',
  },
]

export const initialJourney: JourneyDay[] = [
  {
    day: 1,
    place: 'Madurai',
    stops: [
      {
        kind: 'experience',
        title: 'Meenakshi Temple at dawn',
        detail: 'Beat the crowds with an early quiet visit',
      },
      {
        kind: 'food',
        title: 'Kari Dosa at Simmakkal',
        detail: 'Local late-night specialty · ₹90',
      },
    ],
  },
  {
    day: 2,
    place: 'Bundi',
    stops: [
      {
        kind: 'experience',
        title: 'Taragarh Fort sunrise climb',
        detail: 'Hidden gem · very low crowd',
      },
      {
        kind: 'food',
        title: 'Bundi ki Kachori',
        detail: 'Family-run stall · ₹40',
      },
    ],
  },
]

export const savedItems: SavedItem[] = [
  {
    id: 'bundi',
    name: 'Bundi',
    subtitle: 'Rajasthan · Hidden gem',
    image: '/images/bundi.png',
    type: 'Destination',
  },
  {
    id: 'ziro',
    name: 'Ziro Valley',
    subtitle: 'Arunachal Pradesh · Very low crowd',
    image: '/images/ziro.png',
    type: 'Destination',
  },
  {
    id: 'jigarthanda',
    name: 'Jigarthanda',
    subtitle: 'Madurai · Street food',
    image: '/images/jigarthanda.png',
    type: 'Food',
  },
  {
    id: 'haveli',
    name: 'Haveli Katkoun',
    subtitle: 'Bundi · Heritage homestay',
    image: '/images/bundi.png',
    type: 'Stay',
  },
  {
    id: 'mask',
    name: 'Mask-making workshop',
    subtitle: 'Majuli · Local experience',
    image: '/images/majuli.png',
    type: 'Experience',
  },
  {
    id: 'chettinad-meal',
    name: 'Chettinad Meal',
    subtitle: 'Karaikudi · Food experience',
    image: '/images/chettinad-meal.png',
    type: 'Food',
  },
]

export const travelDna = {
  archetype: 'Hidden-Gem Explorer',
  blurb:
    'You seek the roads less travelled. You’d rather share chai with a local family in an unknown village than queue at a famous monument.',
  traits: [
    { label: 'Hidden gems', value: 92, color: 'var(--primary)' },
    { label: 'Food', value: 84, color: 'var(--clay)' },
    { label: 'Culture', value: 78, color: 'var(--leaf)' },
    { label: 'Nature', value: 71, color: 'var(--leaf)' },
    { label: 'History', value: 66, color: 'var(--clay)' },
    { label: 'Adventure', value: 54, color: 'var(--primary)' },
  ],
}

export const roboMessages = [
  'Hey! There’s a beautiful village only 28 km from here that most tourists miss 👀',
  'I found a local food place that matches your Travel DNA.',
  'You’re near Madurai — want to discover something beyond the usual spots?',
  'I found a hidden gem that fits your vibe perfectly.',
]
