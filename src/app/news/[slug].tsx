import { useLocalSearchParams } from 'expo-router';

import { NewsArticleScreen } from '../../features/news/NewsArticleScreen';

export default function NewsArticleRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return <NewsArticleScreen slug={slug} />;
}
