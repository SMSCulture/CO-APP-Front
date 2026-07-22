import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchOrganization, fetchOrganizationsPage } from '../api/modules/organizations.api';

export function useOrganizationsInfinite() {
  return useInfiniteQuery({
    queryKey: ['organizations', 'list'] as const,
    queryFn: ({ pageParam }) => fetchOrganizationsPage(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.endCursor ?? undefined : undefined),
  });
}

export function useOrganization(identifier: string) {
  return useQuery({
    queryKey: ['organizations', 'detail', identifier] as const,
    queryFn: () => fetchOrganization(identifier),
    enabled: Boolean(identifier),
  });
}
