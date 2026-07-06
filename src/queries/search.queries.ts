import { useQuery } from '@tanstack/react-query';

import { searchEvents, type SearchEventsInput } from '../api/modules/search.api';

export function useEventSearch(input: SearchEventsInput) {
  return useQuery({
    queryKey: ['search', 'events', input] as const,
    queryFn: () => searchEvents(input),
  });
}
