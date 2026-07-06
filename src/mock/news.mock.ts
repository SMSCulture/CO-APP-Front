import type { NewsArticle } from '../types/news';

export const mockNews: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'The New Wave of Immersive Art Coming to Wynwood This Fall',
    slug: 'immersive-art-wynwood-fall',
    authorName: 'CultureOwl Staff',
    heroImageUrl: 'https://picsum.photos/seed/newsart/1200/628',
    publishedAt: '2026-07-01',
    excerpt: 'Three new installations are transforming warehouse spaces into walk-through worlds.',
  },
  {
    id: 'news-2',
    title: 'Miami City Ballet Announces Its 2026–27 Season',
    slug: 'mcb-2026-27-season',
    authorName: 'CultureOwl Staff',
    heroImageUrl: 'https://picsum.photos/seed/newsballet/1200/628',
    publishedAt: '2026-06-28',
    excerpt: 'Swan Lake returns alongside two world premieres from resident choreographers.',
  },
  {
    id: 'news-3',
    title: 'Five Free Museum Nights You Shouldn’t Miss This Summer',
    slug: 'free-museum-nights-summer',
    authorName: 'CultureOwl Staff',
    heroImageUrl: 'https://picsum.photos/seed/newsmuseum/1200/628',
    publishedAt: '2026-06-20',
    excerpt: 'From Frost Science after-dark to PAMM free Fridays — plan your month.',
  },
];
