/** Minimal port of app/venues/utils/venue-type-icons.ts's getVenueTypeDisplayName on web. */
const VENUE_TYPE_LABELS: Record<string, string> = {
  THEATER: 'Theater',
  ART_CENTER: 'Art Center',
  PERFORMING_ARTS_CENTER: 'Performing Arts Center',
  GALLERY: 'Gallery',
  MUSEUM: 'Museum',
  EVENT_SPACE: 'Event Space',
  AMPHITHEATRE: 'Amphitheatre',
  STUDIO: 'Studio',
  ARTIST_COMPLEX: 'Artist Complex',
  COMMUNITY_CENTER: 'Community Center',
  HISTORIC_HOMES: 'Historic Homes',
  ATTRACTION: 'Attraction',
  Z_OTHER: 'Other',
};

export function formatVenueType(venueType: string | null): string | null {
  if (!venueType) return null;
  return VENUE_TYPE_LABELS[venueType] ?? 'Unknown';
}
