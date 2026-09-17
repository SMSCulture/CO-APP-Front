import { FlatList } from 'react-native';

import { NewsCard } from '../../components/news/NewsCard';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useNews } from '../../queries/news.queries';

/** Consumer app intentionally carries Culture News only. */
export function NewsListScreen() {
  const { data: articles, isLoading, isError, refetch } = useNews();
  return (
    <Screen>
      <DetailScreenHeader title="Culture News" />
      {isLoading ? <LoadingState /> : isError ? <ErrorState message="We couldn’t load Culture News." onRetry={() => refetch()} /> : (
        <FlatList
          data={articles ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NewsCard article={item} />}
          contentContainerStyle={{ gap: spacing.xl, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState title="No Stories Yet" message="Check back soon for local culture stories." />}
        />
      )}
    </Screen>
  );
}
