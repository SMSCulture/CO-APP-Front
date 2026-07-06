/**
 * News — mirrors the web frontend's `news(filter: NewsFilterInput)` query
 * (plain array, no pagination; use heroImageUrl for display).
 */
import { USE_MOCK_DATA } from '../../config/env';
import { mockNews } from '../../mock/news.mock';
import type { NewsArticle } from '../../types/news';

export async function fetchNews(): Promise<NewsArticle[]> {
  if (USE_MOCK_DATA) return mockNews;
  // TODO(backend): wire `news(filter: { status: APPROVED, articleType: EDITORIAL })`
  // via graphqlRequest — fields: id, title, slug, authorName, heroImageUrl, publishedAt.
  return [];
}
