/**
 * Location/city search — mirrors lib/graphql/search-cities.ts and
 * lib/graphql/suggested-cities.ts on the web frontend. Same queries, same
 * backend, called directly (no BFF) per src/api/client.ts's convention.
 */
import { graphqlRequest } from '../client';
import { USE_MOCK_DATA } from '../../config/env';
import { CITIES } from '../../config/constants';
import type { CityData } from '../../types/location';

const SEARCH_EVENT_CITIES = /* GraphQL */ `
  query SearchEventCities($query: String!, $maxResults: Int) {
    searchEventCities(input: { query: $query, maxResults: $maxResults }) {
      cities {
        city
        state
        eventCount
        latitude
        longitude
      }
    }
  }
`;

const SUGGESTED_CITIES = /* GraphQL */ `
  query SuggestedCities($input: SuggestedCitiesInput) {
    suggestedCities(input: $input) {
      topCities {
        city
        state
        eventCount
        latitude
        longitude
      }
      nearbyCities {
        city
        state
        eventCount
        latitude
        longitude
        distanceMiles
      }
    }
  }
`;

interface SearchEventCitiesResponse {
  searchEventCities: { cities: CityData[] };
}

interface SuggestedCitiesResponse {
  suggestedCities: { topCities: CityData[]; nearbyCities: (CityData & { distanceMiles: number })[] };
}

const MOCK_CITIES: CityData[] = CITIES.map((city) => ({ city, state: 'FL' }));

export async function searchCities(query: string): Promise<CityData[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  if (USE_MOCK_DATA) {
    const lower = trimmed.toLowerCase();
    return MOCK_CITIES.filter((c) => c.city.toLowerCase().includes(lower));
  }

  const data = await graphqlRequest<SearchEventCitiesResponse>(SEARCH_EVENT_CITIES, {
    query: trimmed,
    maxResults: 20,
  });
  return data.searchEventCities.cities;
}

export async function getSuggestedCities(options?: {
  latitude?: number;
  longitude?: number;
  maxTopCities?: number;
  maxNearbyCities?: number;
  nearbyRadiusMiles?: number;
}): Promise<{ topCities: CityData[]; nearbyCities: (CityData & { distanceMiles: number })[] }> {
  if (USE_MOCK_DATA) {
    return { topCities: MOCK_CITIES, nearbyCities: [] };
  }

  const hasLocation = options?.latitude !== undefined && options?.longitude !== undefined;
  const data = await graphqlRequest<SuggestedCitiesResponse>(SUGGESTED_CITIES, {
    input: {
      ...(hasLocation && { latitude: options!.latitude, longitude: options!.longitude }),
      maxTopCities: options?.maxTopCities ?? 8,
      ...(hasLocation && {
        maxNearbyCities: options?.maxNearbyCities ?? 5,
        nearbyRadiusMiles: options?.nearbyRadiusMiles ?? 60,
      }),
    },
  });
  return data.suggestedCities;
}
