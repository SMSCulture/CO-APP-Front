/** Mirrors the web frontend's news module (lib/graphql/news.ts). */
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  heroImageUrl: string | null;
  publishedAt: string;
  excerpt: string | null;
}
