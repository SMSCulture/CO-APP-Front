import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchRestaurant, fetchRestaurantsPage } from '../api/modules/restaurants.api';

export function useRestaurantsInfinite(city?: string) {
  return useInfiniteQuery({
    queryKey: ['restaurants', 'list', city] as const,
    queryFn: ({ pageParam }) => fetchRestaurantsPage(city, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.endCursor ?? undefined : undefined),
  });
}

export function useRestaurant(identifier: string) {
  return useQuery({
    queryKey: ['restaurants', 'detail', identifier] as const,
    queryFn: () => fetchRestaurant(identifier),
    enabled: Boolean(identifier),
  });
}
