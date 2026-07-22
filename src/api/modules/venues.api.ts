/** Public venues — mirrors lib/graphql/public-venues.ts on web. */
import { graphqlRequest } from '../client';
import { USE_MOCK_DATA } from '../../config/env';
import { mockVenues } from '../../mock/venues.mock';
import type { Venue } from '../../types/venue';

const PUBLIC_VENUES_PAGINATED = /* GraphQL */ `
  query PublicVenuesPaginated($first: Int!, $after: String, $city: String) {
    publicVenuesPaginated(filter: { first: $first, after: $after, city: $city, sort: { field: "name", direction: "asc" } }) {
      edges {
        node { id name slug description address city state imageUrl venueType }
        cursor
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const PUBLIC_VENUE = /* GraphQL */ `
  query PublicVenue($identifier: String!) {
    publicVenue(identifier: $identifier) { id name slug description address city state imageUrl venueType }
  }
`;

interface VenueNode {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string;
  state: string;
  imageUrl: string | null;
  venueType: string | null;
}

function mapVenueNode(node: VenueNode): Venue {
  return { ...node, coordinates: null };
}

export interface VenuesPage {
  venues: Venue[];
  endCursor: string | null;
  hasNextPage: boolean;
}

export async function fetchVenuesPage(city?: string, after?: string): Promise<VenuesPage> {
  if (USE_MOCK_DATA) {
    const filtered = city ? mockVenues.filter((v) => v.city === city) : mockVenues;
    return { venues: filtered, endCursor: null, hasNextPage: false };
  }
  const data = await graphqlRequest<{
    publicVenuesPaginated: { edges: { node: VenueNode; cursor: string }[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } };
  }>(PUBLIC_VENUES_PAGINATED, { first: 20, after, city });
  return {
    venues: data.publicVenuesPaginated.edges.map((e) => mapVenueNode(e.node)),
    endCursor: data.publicVenuesPaginated.pageInfo.endCursor,
    hasNextPage: data.publicVenuesPaginated.pageInfo.hasNextPage,
  };
}

/** Kept for the existing venue detail route (src/app/venues/[venueId].tsx). */
export async function fetchVenues(city?: string): Promise<Venue[]> {
  return (await fetchVenuesPage(city)).venues;
}

export async function fetchVenue(identifier: string): Promise<Venue> {
  if (USE_MOCK_DATA) {
    const venue = mockVenues.find((v) => v.id === identifier || v.slug === identifier);
    if (!venue) throw new Error(`Venue not found: ${identifier}`);
    return venue;
  }
  const data = await graphqlRequest<{ publicVenue: VenueNode }>(PUBLIC_VENUE, { identifier });
  return mapVenueNode(data.publicVenue);
}
