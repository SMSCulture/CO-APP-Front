import { NewsCard } from '../../../components/news/NewsCard';
import { HorizontalCarousel } from '../../../components/layout/HorizontalCarousel';
import { useNews } from '../../../queries/news.queries';

/** Cultural news rail (web parity: cultural-news). Reuses the real NewsCard now that /news/[slug] exists. */
export function CultureNewsSection() {
  const { data: articles } = useNews();

  if (!articles || articles.length === 0) return null;

  return (
    <HorizontalCarousel>
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} width={260} />
      ))}
    </HorizontalCarousel>
  );
}
