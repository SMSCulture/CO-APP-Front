import type { EventSummary } from '../types/event';

/** "Bayfront Park Amphitheater · Miami" */
export function formatEventLocation(
  event: Pick<EventSummary, 'venueName' | 'city' | 'virtual'>,
): string {
  if (event.virtual) return 'Virtual event';
  const parts = [event.venueName, event.city].filter(Boolean);
  return parts.join(' · ');
}

/** "2.1 mi away" */
export function formatDistance(miles: number | null): string | null {
  if (miles == null) return null;
  return `${miles.toFixed(1)} mi away`;
}
