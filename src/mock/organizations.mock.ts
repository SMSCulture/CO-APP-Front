import type { Organization } from '../types/organization';

export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Miami Symphony Orchestra',
    slug: 'miami-symphony-orchestra',
    city: 'Miami',
    imageUrl: 'https://picsum.photos/seed/orchestra/800/800',
    description: 'South Florida’s resident symphony orchestra.',
    genres: ['Music'],
  },
  {
    id: 'org-2',
    name: 'Wynwood Arts Collective',
    slug: 'wynwood-arts-collective',
    city: 'Miami',
    imageUrl: 'https://picsum.photos/seed/collective/800/800',
    description: 'Gallery walks, murals, and cultural tours across Wynwood.',
    genres: ['Visual Arts', 'Art & Dine'],
  },
  {
    id: 'org-4',
    name: 'Miami City Ballet',
    slug: 'miami-city-ballet',
    city: 'Miami',
    imageUrl: 'https://picsum.photos/seed/mcballet/800/800',
    description: 'One of the largest ballet companies in the United States.',
    genres: ['Dance'],
  },
];
