import { useQuery } from '@tanstack/react-query';

import { fetchEvent, fetchEventsFeed, type EventsFeedInput } from '../api/modules/events.api';

export const eventsKeys = {
  feed: (input: EventsFeedInput) => ['events', 'feed', input] as const,
  detail: (identifier: string) => ['events', 'detail', identifier] as const,
};

export function useEventsFeed(input: EventsFeedInput = {}) {
  return useQuery({
    queryKey: eventsKeys.feed(input),
    queryFn: () => fetchEventsFeed(input),
  });
}

export function useEvent(identifier: string) {
  return useQuery({
    queryKey: eventsKeys.detail(identifier),
    queryFn: () => fetchEvent(identifier),
    enabled: Boolean(identifier),
  });
}
