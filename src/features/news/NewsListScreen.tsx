import { FlatList } from 'react-native';

import { NewsCard } from '../../components/news/NewsCard';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useNews } from '../../queries/news.queries';

/** Mirrors app/news/page.tsx on web — single column here (web's grid-cols-1/2/3 doesn't translate directly to phone width). */
export function NewsListScreen() {
  const { data: articles, isLoading, isError, refetch } = useNews();

  return (
    <Screen>
      <DetailScreenHeader title="Culture News" />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load news." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={articles ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.xl, paddingBottom: 120 }}
          renderItem={({ item }) => <NewsCard article={item} />}
          ListEmptyComponent={<EmptyState title="No articles yet" message="Check back soon." />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
