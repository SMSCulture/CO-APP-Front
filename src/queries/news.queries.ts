import { useQuery } from '@tanstack/react-query';

import { fetchNews, fetchNewsArticle } from '../api/modules/news.api';

export function useNews() {
  return useQuery({
    queryKey: ['news', 'list'] as const,
    queryFn: fetchNews,
  });
}

export function useNewsArticle(slug: string) {
  return useQuery({
    queryKey: ['news', 'detail', slug] as const,
    queryFn: () => fetchNewsArticle(slug),
    enabled: Boolean(slug),
  });
}
