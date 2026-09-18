import { router } from 'expo-router';
import { Image } from 'expo-image';
import { FlatList, Pressable, View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EmptyState, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useNews } from '../../queries/news.queries';
import type { NewsArticle } from '../../types/news';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function StoryRow({ article, staffPick = false }: { article: NewsArticle; staffPick?: boolean }) {
  const theme = useAppTheme();
  return (
    <Pressable accessibilityRole="button" onPress={() => router.push(`/news/${article.slug}`)} style={({ pressed }) => ({ flexDirection: 'row', gap: spacing.md, opacity: pressed ? 0.82 : 1 })}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text variant="label" color={theme.colors.primary}>{staffPick ? `STAFF PICK · ${article.category ?? 'CULTURE'}` : article.category ?? 'CULTURE'}</Text>
        <Text numberOfLines={3} style={{ fontFamily: fontFamily.bold, fontSize: 19, lineHeight: 23, fontWeight: '700' }}>{article.title}</Text>
        {article.excerpt ? <Text variant="caption" muted numberOfLines={2}>{article.excerpt}</Text> : null}
        <Text variant="caption" muted>{article.authorName} · {formatDate(article.publishedAt)}</Text>
      </View>
      <Image source={{ uri: article.heroImageUrl ?? undefined }} contentFit="cover" style={{ width: 112, aspectRatio: 1200 / 628, borderRadius: radius.lg, backgroundColor: theme.colors.skeleton }} />
    </Pressable>
  );
}

/** CultureOwl Journal: feature-led editorial page, distinct from event/genre directories. */
export function NewsListScreen() {
  const theme = useAppTheme();
  const { data: articles, isLoading, isError, refetch } = useNews();
  const [lead, ...rest] = articles ?? [];

  return (
    <Screen>
      <DetailScreenHeader title="Culture News" />
      {isLoading ? <LoadingState /> : isError ? <ErrorState message="We couldn’t load Culture News." onRetry={() => refetch()} /> : !lead ? (
        <EmptyState title="The next story is taking shape" message="Fresh eyes on the local scene are coming soon." />
      ) : (
        <FlatList
          data={rest}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <StoryRow article={item} staffPick={index < 2} />}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.border, marginVertical: spacing.xl }} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ gap: spacing.xl, paddingBottom: spacing.xl }}>
              <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: theme.colors.text, paddingVertical: spacing.sm }}>
                <Text variant="label" style={{ textAlign: 'center', letterSpacing: 1.8 }}>THE CULTUREOWL JOURNAL</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={() => router.push(`/news/${lead.slug}`)} style={({ pressed }) => ({ gap: spacing.md, opacity: pressed ? 0.86 : 1 })}>
                <Image source={{ uri: lead.heroImageUrl ?? undefined }} contentFit="cover" style={{ width: '100%', aspectRatio: 1200 / 628, borderRadius: radius.xl, backgroundColor: theme.colors.skeleton }} />
                <Text variant="label" color={theme.colors.primary}>FEATURED · {lead.category ?? 'CULTURE'}</Text>
                <Text style={{ fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 33, fontWeight: '700' }}>{lead.title}</Text>
                {lead.excerpt ? <Text muted style={{ fontSize: 16, lineHeight: 23 }}>{lead.excerpt}</Text> : null}
                <Text variant="caption" muted>By {lead.authorName} · {formatDate(lead.publishedAt)}</Text>
              </Pressable>
              {rest.length ? <Text variant="heading" style={{ fontFamily: fontFamily.bold }}>Staff Picks</Text> : null}
            </View>
          }
        />
      )}
    </Screen>
  );
}
