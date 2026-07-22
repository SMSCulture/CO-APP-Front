import type { Restaurant } from '../types/restaurant';

export const mockRestaurants: Restaurant[] = [
  {
    id: 'res-1',
    name: 'Bella... A Baltimore Crab & Seafood Co.',
    slug: 'bella-baltimore-crab-seafood',
    city: 'Atlanta',
    state: 'GA',
    imageUrl: 'https://picsum.photos/seed/crabseafood/800/800',
    description: 'Fresh crab and seafood in a lively waterfront setting.',
    cuisine: 'Seafood',
    priceLevel: '$$',
  },
  {
    id: 'res-2',
    name: 'Wynwood Kitchen & Bar',
    slug: 'wynwood-kitchen-bar',
    city: 'Miami',
    state: 'FL',
    imageUrl: 'https://picsum.photos/seed/wynwoodkitchen/800/800',
    description: 'Modern American plates surrounded by street art.',
    cuisine: 'American',
    priceLevel: '$$',
  },
  {
    id: 'res-3',
    name: 'Casa Toscana',
    slug: 'casa-toscana',
    city: 'Fort Lauderdale',
    state: 'FL',
    imageUrl: 'https://picsum.photos/seed/casatoscana/800/800',
    description: 'Handmade pasta and Tuscan classics.',
    cuisine: 'Italian',
    priceLevel: '$$$',
  },
];
