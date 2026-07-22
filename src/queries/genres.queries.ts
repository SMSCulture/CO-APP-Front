import { useQuery } from '@tanstack/react-query';

import { fetchMainGenres } from '../api/modules/genres.api';

export function useMainGenres() {
  return useQuery({
    queryKey: ['genres', 'main'] as const,
    queryFn: fetchMainGenres,
    staleTime: 10 * 60 * 1000, // genres change rarely — 10min stale time
  });
}
