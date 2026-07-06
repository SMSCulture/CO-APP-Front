import { useQuery } from '@tanstack/react-query';

import { fetchOrganization, fetchOrganizations } from '../api/modules/organizations.api';

export function useOrganizations(city?: string) {
  return useQuery({
    queryKey: ['organizations', 'list', city] as const,
    queryFn: () => fetchOrganizations(city),
  });
}

export function useOrganization(identifier: string) {
  return useQuery({
    queryKey: ['organizations', 'detail', identifier] as const,
    queryFn: () => fetchOrganization(identifier),
    enabled: Boolean(identifier),
  });
}
