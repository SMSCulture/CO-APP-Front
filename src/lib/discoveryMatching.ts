import type { DiscoveryTags } from '../types/discovery';
import type { EventSummary } from '../types/event';
import type { NewsArticle } from '../types/news';

const clean = (value: string) => value.trim().toLowerCase().replace(/\s*&\s*/g, '-and-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const values = (items: string[]) => new Set(items.map(clean).filter(Boolean));

export function eventDiscoveryTags(event: EventSummary): DiscoveryTags {
  const typed = (kind: string) => event.tags.filter((tag) => tag.type?.toLowerCase() === kind).flatMap((tag) => [tag.id, tag.name]);
  return {
    category: [...event.tags.flatMap((tag) => [tag.id, tag.name]), ...typed('category'), ...typed('genre')],
    neighborhood: [...typed('neighborhood'), event.venueName ?? '', event.city],
    vibe: typed('vibe'),
  };
}

export function taxonomyMatchScore(left: DiscoveryTags, right: DiscoveryTags): number {
  return (['category', 'neighborhood', 'vibe'] as const).reduce((score, kind) => {
    const leftTags = values(left[kind]);
    return score + right[kind].reduce((sum, tag) => sum + (leftTags.has(clean(tag)) ? 1 : 0), 0);
  }, 0);
}

export function matchingArticles(tags: DiscoveryTags, articles: NewsArticle[], limit = 2): NewsArticle[] {
  return articles
    .map((article) => ({ article, score: taxonomyMatchScore(tags, article.discoveryTags) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || Date.parse(b.article.publishedAt) - Date.parse(a.article.publishedAt))
    .slice(0, limit)
    .map(({ article }) => article);
}

export function matchingEvents(article: NewsArticle, events: EventSummary[], limit = 4): EventSummary[] {
  return events
    .map((event) => ({ event, score: taxonomyMatchScore(article.discoveryTags, eventDiscoveryTags(event)) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ event }) => event);
}
