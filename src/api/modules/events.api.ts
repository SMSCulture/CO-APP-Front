/**
 * Public events — mirrors publicEventsFeed / publicEvent from the web
 * frontend (lib/graphql/public-events.ts). Feed uses offset pagination and
 * supports city, lat/lng, and tagId filters.
 */
import { graphqlRequest } from '../client';
import { mapFeedEdgeToSummary, mapRawEventToDetail, type RawFeedEdge } from '../mappers/event.mapper';
import { USE_MOCK_DATA } from '../../config/env';
import { mockEvents, mockEventSummaries } from '../../mock/events.mock';
import type { OffsetPagination } from '../../types/api';
import type { EventDetail, EventSummary } from '../../types/event';

const EVENT_CARD_FIELDS = /* GraphQL */ `
  id
  title
  slug
  startDate
  city
  state
  venueName
  free
  virtual
  pricing
  mainImageUrl
  bigImageUrl
  nextEventDate {
    date
    startTime
    endTime
  }
  venue {
    id
    name
    city
  }
  eventTags {
    tag {
      id
      name
      type
    }
  }
`;

const PUBLIC_EVENTS_FEED = /* GraphQL */ `
  query PublicEventsFeed($input: EventsFeedInput) {
    publicEventsFeed(input: $input) {
      events {
        event {
          ${EVENT_CARD_FIELDS}
        }
        distanceMiles
        timeWindow
      }
      pagination {
        page
        limit
        total
        hasMore
      }
    }
  }
`;

const PUBLIC_EVENT = /* GraphQL */ `
  query PublicEvent($identifier: String!) {
    publicEvent(identifier: $identifier) {
      ${EVENT_CARD_FIELDS}
      description
      eventDates {
        date
        startTime
        endTime
      }
    }
  }
`;

export interface EventsFeedInput {
  city?: string;
  latitude?: number;
  longitude?: number;
  tagId?: string;
  page?: number;
  limit?: number;
}

export interface EventsFeedResult {
  events: EventSummary[];
  pagination: OffsetPagination;
}

export async function fetchEventsFeed(input: EventsFeedInput = {}): Promise<EventsFeedResult> {
  if (USE_MOCK_DATA) {
    const filtered = input.tagId
      ? mockEventSummaries.filter((e) => e.tags.some((t) => t.id === input.tagId))
      : mockEventSummaries;
    return {
      events: filtered,
      pagination: { page: 1, limit: 20, total: filtered.length, hasMore: false },
    };
  }
  const data = await graphqlRequest<{
    publicEventsFeed: { events: RawFeedEdge[]; pagination: OffsetPagination };
  }>(PUBLIC_EVENTS_FEED, { input });
  return {
    events: data.publicEventsFeed.events.map(mapFeedEdgeToSummary),
    pagination: data.publicEventsFeed.pagination,
  };
}

export async function fetchEvent(identifier: string): Promise<EventDetail> {
  if (USE_MOCK_DATA) {
    const event = mockEvents.find((e) => e.id === identifier || e.slug === identifier);
    if (!event) throw new Error(`Event not found: ${identifier}`);
    return event;
  }
  const data = await graphqlRequest<{ publicEvent: Parameters<typeof mapRawEventToDetail>[0] }>(
    PUBLIC_EVENT,
    { identifier },
  );
  return mapRawEventToDetail(data.publicEvent);
}
