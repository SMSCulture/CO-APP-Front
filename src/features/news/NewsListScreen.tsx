import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { NewsCard } from '../../components/news/NewsCard';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Chip, EmptyState, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useNews } from '../../queries/news.queries';

type NewsLane = 'all' | 'culture' | 'industry';

/** Editorial discovery is a first-class feed, not filler at the bottom of Events. */
export function NewsListScreen() {
  const { data: articles, isLoading, isError, refetch } = useNews();
  const [lane, setLane] = useState<NewsLane>('all');
  const visible = useMemo(() => (articles ?? []).filter((article) => {
    if (lane === 'all') return true;
    const category = article.category?.toLowerCase() ?? '';
    return lane === 'industry' ? /industry|business|funding|jobs|policy/.test(category) : !/industry|business|funding|jobs|policy/.test(category);
  }), [articles, lane]);

  return (
    <Screen>
      <DetailScreenHeader title="Stories" subtitle="Culture and the people building it" />
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }}>
        <Chip label="All stories" active={lane === 'all'} onPress={() => setLane('all')} />
        <Chip label="Culture news" active={lane === 'culture'} onPress={() => setLane('culture')} />
        <Chip label="Industry" active={lane === 'industry'} onPress={() => setLane('industry')} />
      </View>
      {lane === 'industry' && visible.length === 0 ? (
        <View style={{ gap: spacing.sm, marginBottom: spacing.xl }}>
          <Text variant="heading">Industry desk</Text>
          <Text muted>Reporting on openings, grants, jobs, leadership and the business of culture will appear here as coverage grows.</Text>
        </View>
      ) : null}
      {isLoading ? <LoadingState /> : isError ? <ErrorState message="We couldn’t load stories." onRetry={() => refetch()} /> : (
        <FlatList data={visible} keyExtractor={(item) => item.id} contentContainerStyle={{ gap: spacing.xl, paddingBottom: 120 }} renderItem={({ item }) => <NewsCard article={item} />} ListEmptyComponent={<EmptyState title="More reporting is coming" message="Explore culture news while the local industry desk fills in." />} showsVerticalScrollIndicator={false} />
      )}
    </Screen>
  );
}
