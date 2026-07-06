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
