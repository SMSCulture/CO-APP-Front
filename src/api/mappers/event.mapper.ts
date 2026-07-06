/**
 * Maps backend publicEventsFeed / publicEvent payloads to domain models.
 * Field names match lib/graphql/public-events.ts in the web frontend.
 */
import type { EventDetail, EventSummary } from '../../types/event';

interface RawFeedEvent {
  id: string;
  title: string;
  slug: string;
  startDate: string;
  city: string;
  state: string;
  venueName: string | null;
  free: boolean;
  virtual: boolean;
  pricing: string | null;
  mainImageUrl: string | null;
  bigImageUrl: string | null;
  nextEventDate: { date: string; startTime: string | null; endTime: string | null } | null;
  venue: { id: string; name: string; city: string } | null;
  eventTags: { tag: { id: string; name: string; type?: string } }[];
  latitude?: number | null;
  longitude?: number | null;
}

export interface RawFeedEdge {
  event: RawFeedEvent;
  distanceMiles: number | null;
}

export function mapFeedEdgeToSummary({ event, distanceMiles }: RawFeedEdge): EventSummary {
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    startDate: event.startDate,
    city: event.city,
    state: event.state,
    venueName: event.venueName,
    free: event.free,
    virtual: event.virtual,
    pricing: event.pricing,
    mainImageUrl: event.mainImageUrl,
    bigImageUrl: event.bigImageUrl,
    nextEventDate: event.nextEventDate,
    venue: event.venue,
    tags: (event.eventTags ?? []).map((t) => t.tag),
    distanceMiles,
    coordinates:
      event.latitude != null && event.longitude != null
        ? { latitude: event.latitude, longitude: event.longitude }
        : null,
  };
}

export function mapRawEventToDetail(
  raw: RawFeedEvent & {
    description?: string;
    eventDates?: { date: string; startTime: string | null; endTime: string | null }[];
    address?: string | null;
    ticketUrl?: string | null;
    company?: { id: string; name: string } | null;
  },
): EventDetail {
  return {
    ...mapFeedEdgeToSummary({ event: raw, distanceMiles: null }),
    description: raw.description ?? '',
    eventDates: raw.eventDates ?? [],
    address: raw.address ?? null,
    ticketUrl: raw.ticketUrl ?? null,
    organizerId: raw.company?.id ?? null,
    organizerName: raw.company?.name ?? null,
  };
}
