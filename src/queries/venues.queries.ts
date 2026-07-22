import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchVenue, fetchVenuesPage } from '../api/modules/venues.api';

export function useVenuesInfinite(city?: string) {
  return useInfiniteQuery({
    queryKey: ['venues', 'list', city] as const,
    queryFn: ({ pageParam }) => fetchVenuesPage(city, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.endCursor ?? undefined : undefined),
  });
}

export function useVenue(identifier: string) {
  return useQuery({
    queryKey: ['venues', 'detail', identifier] as const,
    queryFn: () => fetchVenue(identifier),
    enabled: Boolean(identifier),
  });
}
