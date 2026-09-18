import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';

import { HorizontalCarousel } from '../../components/layout/HorizontalCarousel';
import { NewsCard } from '../../components/news/NewsCard';
import { EmptyState, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { fontFamily, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useNews } from '../../queries/news.queries';
import type { NewsArticle } from '../../types/news';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function ArticleRail({ title, articles }: { title: string; articles: NewsArticle[] }) {
  if (!articles.length) return null;
  return (
    <View style={{ gap: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.screenX }}>
        <Text variant="heading" color="#3499d5">{title}</Text>
        <Text variant="bodyBold">View All</Text>
      </View>
      <HorizontalCarousel>
        {articles.map((article) => <NewsCard key={`${title}-${article.id}`} article={article} width={280} />)}
      </HorizontalCarousel>
    </View>
  );
}

/** Culture News keeps the approved feature treatment over the site's familiar article rails. */
export function NewsListScreen() {
  const theme = useAppTheme();
  const { data: articles, isLoading, isError, refetch } = useNews();
  const [lead, ...rest] = articles ?? [];
  const groups = [...new Set(rest.map((article) => article.category ?? 'Culture'))]
    .map((category) => ({ category, articles: rest.filter((article) => (article.category ?? 'Culture') === category) }));

  return (
    <Screen padded={false}>
      {isLoading ? <LoadingState /> : isError ? <ErrorState message="We couldn’t load Culture News." onRetry={() => refetch()} /> : !lead ? (
        <EmptyState title="The next story is taking shape" message="Fresh eyes on the local scene are coming soon." />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110, gap: spacing.xl }}>
          <Pressable accessibilityRole="button" onPress={() => router.push(`/news/${lead.slug}`)} style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}>
            <View style={{ height: 318 }}>
              <Image source={{ uri: lead.heroImageUrl ?? undefined }} contentFit="cover" style={{ position: 'absolute', inset: 0, backgroundColor: theme.colors.skeleton }} />
              <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(4,8,12,.18)' }} />
            </View>
            <View style={{ marginTop: -38, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: theme.colors.background, paddingHorizontal: spacing.screenX, paddingTop: spacing.xl, paddingBottom: spacing.md, gap: spacing.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                <View style={{ borderRadius: 999, paddingHorizontal: spacing.sm, paddingVertical: 4, backgroundColor: theme.colors.primary }}>
                  <Text variant="caption" color="#fff">{lead.category ?? 'Culture'}</Text>
                </View>
                <Text variant="caption" muted>{formatDate(lead.publishedAt)}</Text>
              </View>
              <Text style={{ fontFamily: fontFamily.bold, fontSize: 29, lineHeight: 35, fontWeight: '700' }}>{lead.title}</Text>
              {lead.excerpt ? <Text muted style={{ fontSize: 16, lineHeight: 23 }}>{lead.excerpt}</Text> : null}
              <Text variant="caption" muted>By {lead.authorName}</Text>
            </View>
          </Pressable>

          {rest.length ? <ArticleRail title="Latest Culture News" articles={rest} /> : null}
          {groups.map(({ category, articles: groupArticles }) => <ArticleRail key={category} title={category} articles={groupArticles} />)}
        </ScrollView>
      )}
    </Screen>
  );
}
