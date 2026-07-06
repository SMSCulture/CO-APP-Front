import { useQuery } from '@tanstack/react-query';

import { fetchVenue, fetchVenues } from '../api/modules/venues.api';

export function useVenues(city?: string) {
  return useQuery({
    queryKey: ['venues', 'list', city] as const,
    queryFn: () => fetchVenues(city),
  });
}

export function useVenue(identifier: string) {
  return useQuery({
    queryKey: ['venues', 'detail', identifier] as const,
    queryFn: () => fetchVenue(identifier),
    enabled: Boolean(identifier),
  });
}
