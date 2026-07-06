/**
 * Domain model for events, shaped after the web frontend's
 * `publicEventsFeed` / `publicEvent` GraphQL responses (lib/graphql/public-events.ts).
 */
export interface EventTag {
  id: string;
  name: string;
  type?: string;
}

export interface EventDateSlot {
  date: string; // ISO date
  startTime: string | null; // "HH:MM"
  endTime: string | null;
}

export interface EventVenueRef {
  id: string;
  name: string;
  city: string;
}

export interface EventSummary {
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
  nextEventDate: EventDateSlot | null;
  venue: EventVenueRef | null;
  tags: EventTag[];
  /** Provided by publicEventsFeed when lat/lng is sent. */
  distanceMiles: number | null;
  coordinates: { latitude: number; longitude: number } | null;
}

export interface EventDetail extends EventSummary {
  description: string;
  eventDates: EventDateSlot[];
  address: string | null;
  ticketUrl: string | null;
  organizerId: string | null;
  organizerName: string | null;
}
