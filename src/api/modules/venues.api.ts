/** Public venues — mirrors lib/graphql/public-venues.ts on web. */
import { USE_MOCK_DATA } from '../../config/env';
import { mockVenues } from '../../mock/venues.mock';
import type { Venue } from '../../types/venue';

export async function fetchVenues(city?: string): Promise<Venue[]> {
  if (USE_MOCK_DATA) {
    return city ? mockVenues.filter((v) => v.city === city) : mockVenues;
  }
  // TODO(backend): wire PublicVenuesPaginated query via graphqlRequest + mapRawVenue.
  return [];
}

export async function fetchVenue(identifier: string): Promise<Venue> {
  if (USE_MOCK_DATA) {
    const venue = mockVenues.find((v) => v.id === identifier || v.slug === identifier);
    if (!venue) throw new Error(`Venue not found: ${identifier}`);
    return venue;
  }
  // TODO(backend): wire PublicVenue query.
  throw new Error('Not implemented');
}
