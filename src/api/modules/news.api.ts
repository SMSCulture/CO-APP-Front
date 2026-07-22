/**
 * News — mirrors the web frontend's `news(filter: NewsFilterInput)` /
 * `newsBySlug` queries (lib/graphql/news.ts). Consumer-facing only
 * (articleType: EDITORIAL) — industry-news is a separate B2B vertical not
 * in scope for this app.
 */
import { graphqlRequest } from '../client';
import { USE_MOCK_DATA } from '../../config/env';
import { mockNews, mockNewsDetails } from '../../mock/news.mock';
import type { NewsArticle, NewsArticleDetail } from '../../types/news';

const LIST_NEWS = /* GraphQL */ `
  query News($filter: NewsFilterInput) {
    news(filter: $filter) {
      id
      title
      slug
      authorName
      heroImageUrl
      heroImageAlt
      publishedAt
      categories { name }
    }
  }
`;

const GET_NEWS_BY_SLUG = /* GraphQL */ `
  query NewsBySlug($slug: String!) {
    newsBySlug(slug: $slug) {
      id
      title
      slug
      body
      authorName
      heroImageUrl
      heroImageAlt
      publishedAt
      categories { name }
    }
  }
`;

interface RawNewsNode {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  publishedAt: string;
  categories?: { name: string }[];
}

function mapNewsNode(node: RawNewsNode): NewsArticle {
  return {
    id: node.id,
    title: node.title,
    slug: node.slug,
    authorName: node.authorName,
    heroImageUrl: node.heroImageUrl,
    heroImageAlt: node.heroImageAlt,
    publishedAt: node.publishedAt,
    excerpt: null,
    category: node.categories?.[0]?.name ?? null,
  };
}

export async function fetchNews(): Promise<NewsArticle[]> {
  if (USE_MOCK_DATA) return mockNews;
  const data = await graphqlRequest<{ news: RawNewsNode[] }>(LIST_NEWS, {
    filter: { status: 'APPROVED', articleType: 'EDITORIAL' },
  });
  return data.news.map(mapNewsNode);
}

export async function fetchNewsArticle(slug: string): Promise<NewsArticleDetail> {
  if (USE_MOCK_DATA) {
    const article = mockNewsDetails[slug];
    if (!article) throw new Error(`Article not found: ${slug}`);
    return article;
  }
  const data = await graphqlRequest<{ newsBySlug: RawNewsNode & { body: string } }>(GET_NEWS_BY_SLUG, { slug });
  return { ...mapNewsNode(data.newsBySlug), body: data.newsBySlug.body };
}
