/**
 * Search — mirrors GlobalEventsSearch (lib/graphql/global-search.ts on web).
 * For the foundation, mock search filters the local dataset.
 */
import { fetchEventsFeed } from './events.api';
import { USE_MOCK_DATA } from '../../config/env';
import { mockEventSummaries } from '../../mock/events.mock';
import type { EventSummary } from '../../types/event';

export interface SearchEventsInput {
  searchTerm: string;
  city?: string;
  tagId?: string;
}

export async function searchEvents(input: SearchEventsInput): Promise<EventSummary[]> {
  if (USE_MOCK_DATA) {
    const term = input.searchTerm.trim().toLowerCase();
    return mockEventSummaries.filter((e) => {
      const matchesTerm =
        !term ||
        e.title.toLowerCase().includes(term) ||
        (e.venueName ?? '').toLowerCase().includes(term) ||
        e.city.toLowerCase().includes(term);
      const matchesTag = !input.tagId || e.tags.some((t) => t.id === input.tagId);
      return matchesTerm && matchesTag;
    });
  }
  // TODO(backend): switch to GlobalEventsSearch for term matching; the feed
  // endpoint covers city/tag filters today.
  const { events } = await fetchEventsFeed({ city: input.city, tagId: input.tagId });
  const term = input.searchTerm.trim().toLowerCase();
  return term ? events.filter((e) => e.title.toLowerCase().includes(term)) : events;
}
