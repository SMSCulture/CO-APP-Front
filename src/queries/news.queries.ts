import { useQuery } from '@tanstack/react-query';

import { fetchNews } from '../api/modules/news.api';

export function useNews() {
  return useQuery({
    queryKey: ['news', 'list'] as const,
    queryFn: fetchNews,
  });
}
