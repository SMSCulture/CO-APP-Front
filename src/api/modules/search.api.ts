/**
 * Search — mirrors GlobalEventsSearch (lib/graphql/global-search.ts on web).
 * For the foundation, mock search filters the local dataset.
 */
import { fetchEventsFeed } from './events.api';
import { USE_MOCK_DATA } from '../../config/env';
import { mockEventSummaries } from '../../mock/events.mock';
import type { EventSummary } from '../../types/event';
import type { DateFilterType } from '../../types/filters';

export interface SearchEventsInput {
  searchTerm: string;
  city?: string;
  tagId?: string;
  /** Multi-select genre filter — mirrors EventFilters' tagNames on web. */
  tagIds?: string[];
  dateFilter?: DateFilterType;
  /** A specific picked calendar date, or range start when customDateEnd is set (ISO yyyy-mm-dd) — mirrors EventFiltersState.customDate. Takes precedence over dateFilter when set. */
  customDate?: string | null;
  /** Range end (ISO yyyy-mm-dd) — mirrors EventFiltersState.customDateEnd. */
  customDateEnd?: string | null;
  virtual?: boolean;
}

/**
 * Date-window check mirroring the API's DateFilterType semantics
 * (types/public-events.ts on web). Filtered client-side for now — the feed
 * endpoint doesn't accept a dateFilter param yet (see TODO below).
 */
function matchesDateFilter(
  event: EventSummary,
  dateFilter: DateFilterType | undefined,
  customDate?: string | null,
  customDateEnd?: string | null,
): boolean {
  const eventDate = new Date(event.nextEventDate?.date ?? event.startDate);

  if (customDate) {
    const [y, m, d] = customDate.split('-').map(Number);
    const start = new Date(y, m - 1, d);
    const end = customDateEnd
      ? (() => {
          const [ey, em, ed] = customDateEnd.split('-').map(Number);
          return new Date(new Date(ey, em - 1, ed).getTime() + 24 * 60 * 60 * 1000);
        })()
      : new Date(start.getTime() + 24 * 60 * 60 * 1000);
    return eventDate >= start && eventDate < end;
  }

  if (!dateFilter) return true;
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);

  switch (dateFilter) {
    case 'TODAY':
      return eventDate >= startOfToday && eventDate < endOfToday;
    case 'THIS_WEEKEND': {
      const day = startOfToday.getDay();
      const daysUntilSaturday = (6 - day + 7) % 7;
      const saturday = new Date(startOfToday.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000);
      const mondayAfter = new Date(saturday.getTime() + 2 * 24 * 60 * 60 * 1000);
      return eventDate >= saturday && eventDate < mondayAfter;
    }
    case 'THIS_WEEK': {
      const endOfWeek = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000);
      return eventDate >= startOfToday && eventDate < endOfWeek;
    }
    case 'THIS_MONTH': {
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return eventDate >= startOfToday && eventDate < endOfMonth;
    }
    default:
      return true;
  }
}

function matchesTagIds(event: EventSummary, tagIds: string[] | undefined): boolean {
  if (!tagIds || tagIds.length === 0) return true;
  return event.tags.some((t) => tagIds.includes(t.id));
}

export async function searchEvents(input: SearchEventsInput): Promise<EventSummary[]> {
  const term = input.searchTerm.trim().toLowerCase();

  const applyFilters = (events: EventSummary[]) =>
    events.filter((e) => {
      const matchesTerm =
        !term ||
        e.title.toLowerCase().includes(term) ||
        (e.venueName ?? '').toLowerCase().includes(term) ||
        e.city.toLowerCase().includes(term);
      const matchesTag = !input.tagId || e.tags.some((t) => t.id === input.tagId);
      return (
        matchesTerm &&
        matchesTag &&
        matchesTagIds(e, input.tagIds) &&
        matchesDateFilter(e, input.dateFilter, input.customDate, input.customDateEnd) &&
        (!input.virtual || e.virtual)
      );
    });

  if (USE_MOCK_DATA) {
    return applyFilters(mockEventSummaries);
  }
  // TODO(backend): switch to GlobalEventsSearch for term matching, and push
  // dateFilter/virtual/tagIds down to the query once the feed endpoint
  // supports them — filtered client-side for now, same as searchTerm below.
  const { events } = await fetchEventsFeed({ city: input.city, tagId: input.tagId });
  return applyFilters(events);
}
