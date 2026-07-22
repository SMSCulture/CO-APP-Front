/** Route params for dynamic routes (expo-router file routes). */
export interface EventRouteParams {
  eventId: string;
  [key: string]: string;
}

export interface OrganizationRouteParams {
  organizationId: string;
  [key: string]: string;
}

export interface VenueRouteParams {
  venueId: string;
  [key: string]: string;
}

export interface RestaurantRouteParams {
  restaurantId: string;
  [key: string]: string;
}

/** Optional initial filters passed from HomeHeader's filter popup — see HomeScreen.tsx. */
export interface SearchRouteParams {
  dateFilter: string;
  tagIds: string;
  virtual: string;
  [key: string]: string;
}
