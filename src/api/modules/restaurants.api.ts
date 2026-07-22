/**
 * Restaurants — no backend query exists yet on either web or mobile (there is
 * no app/restaurants module on web to mirror). Mock-data-only MVP shaped
 * like venues.api.ts so a real `publicRestaurantsPaginated` GraphQL query can
 * be dropped in later without touching callers.
 */
import { USE_MOCK_DATA } from '../../config/env';
import { mockRestaurants } from '../../mock/restaurants.mock';
import type { Restaurant } from '../../types/restaurant';

export interface RestaurantsPage {
  restaurants: Restaurant[];
  endCursor: string | null;
  hasNextPage: boolean;
}

export async function fetchRestaurantsPage(city?: string, _after?: string): Promise<RestaurantsPage> {
  if (!USE_MOCK_DATA) {
    // TODO: wire real publicRestaurantsPaginated query once backend supports it (see venues.api.ts for the shape to follow).
    return { restaurants: [], endCursor: null, hasNextPage: false };
  }
  const filtered = city ? mockRestaurants.filter((r) => r.city === city) : mockRestaurants;
  return { restaurants: filtered, endCursor: null, hasNextPage: false };
}

export async function fetchRestaurant(identifier: string): Promise<Restaurant> {
  const restaurant = mockRestaurants.find((r) => r.id === identifier || r.slug === identifier);
  if (!restaurant) throw new Error(`Restaurant not found: ${identifier}`);
  return restaurant;
}
