/** Mirrors the web frontend's news module (lib/graphql/news.ts). */
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  publishedAt: string;
  excerpt: string | null;
  category: string | null;
}

/** Article detail — adds body (HTML). */
export interface NewsArticleDetail extends NewsArticle {
  body: string;
}
