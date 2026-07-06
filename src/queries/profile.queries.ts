import { useQuery } from '@tanstack/react-query';

import { fetchMe } from '../api/modules/profile.api';

export function useProfile(enabled: boolean) {
  return useQuery({
    queryKey: ['profile', 'me'] as const,
    queryFn: fetchMe,
    enabled,
  });
}
