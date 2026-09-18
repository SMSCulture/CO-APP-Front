import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useNews, useNewsArticle } from '../../queries/news.queries';
import { useEventsFeed } from '../../queries/events.queries';
import { EventCarousel } from '../../components/discovery/EventCarousel';
import { matchingEvents } from '../../lib/discoveryMatching';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function bodyParagraphs(html: string) {
  const withBreaks = html.replace(/<\/(p|h[1-6]|li)>/gi, '\n\n').replace(/<br\s*\/?>/gi, '\n');
  const decoded = withBreaks
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
  return decoded.split(/\n\s*\n/).map((part) => part.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

/** A focused editorial reading room with a single article and quiet onward reading. */
export function NewsArticleScreen({ slug }: { slug: string }) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: article, isLoading, isError, refetch } = useNewsArticle(slug);
  const { data: articles } = useNews();
  const { data: eventFeed } = useEventsFeed({ limit: 20 });

  if (isLoading) return <Screen><LoadingState rows={1} /></Screen>;
  if (isError || !article) return <Screen><ErrorState message="We couldn’t load this article." onRetry={() => refetch()} /></Screen>;

  const related = (articles ?? []).filter((item) => item.slug !== slug).slice(0, 2);
  const paragraphs = bodyParagraphs(article.body);
  const matchedEvents = matchingEvents(article, eventFeed?.events ?? []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ paddingHorizontal: spacing.screenX, paddingTop: insets.top + 64, gap: spacing.md }}>
          {article.category ? <Text variant="label" color={theme.colors.primary}>{article.category}</Text> : null}
          <Text style={{ fontFamily: fontFamily.bold, fontSize: 34, lineHeight: 39, fontWeight: '700' }}>{article.title}</Text>
          {article.excerpt ? <Text muted style={{ fontFamily: fontFamily.regular, fontSize: 18, lineHeight: 27 }}>{article.excerpt}</Text> : null}
          <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border, paddingBottom: spacing.md }}>
            <Text variant="caption">By {article.authorName}</Text>
            <Text variant="caption" muted>{formatDate(article.publishedAt)}</Text>
          </View>
          <Image
            source={{ uri: article.heroImageUrl ?? undefined }}
            style={{ width: '100%', aspectRatio: 1200 / 628, borderRadius: radius.xl, backgroundColor: theme.colors.skeleton }}
            contentFit="cover"
            accessibilityLabel={article.heroImageAlt ?? article.title}
          />
          {article.heroImageAlt ? <Text variant="caption" muted>{article.heroImageAlt}</Text> : null}

          <View style={{ gap: spacing.lg, paddingTop: spacing.sm }}>
            {paragraphs.map((paragraph, index) => (
              <Text key={`${index}-${paragraph.slice(0, 20)}`} style={{ fontFamily: fontFamily.regular, fontSize: 17, lineHeight: 28 }}>
                {paragraph}
              </Text>
            ))}
          </View>

          {matchedEvents.length > 0 ? (
            <View style={{ borderTopWidth: 1, borderTopColor: theme.colors.text, marginTop: spacing.xl, paddingTop: spacing.lg, gap: spacing.lg }}>
              <Text variant="heading">Go from reading to doing</Text>
              <Text variant="caption" muted>Experiences matched by category, neighborhood and vibe.</Text>
              <EventCarousel events={matchedEvents} />
            </View>
          ) : null}

          {related.length ? (
            <View style={{ borderTopWidth: 1, borderTopColor: theme.colors.text, marginTop: spacing.xl, paddingTop: spacing.lg, gap: spacing.lg }}>
              <Text variant="heading" style={{ fontFamily: fontFamily.bold }}>More Culture News</Text>
              {related.map((item) => (
                <Pressable key={item.id} onPress={() => router.push(`/news/${item.slug}`)} style={({ pressed }) => ({ flexDirection: 'row', gap: spacing.md, opacity: pressed ? 0.82 : 1 })}>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text variant="label" color={theme.colors.primary}>{item.category ?? 'CULTURE'}</Text>
                    <Text numberOfLines={3} style={{ fontFamily: fontFamily.bold, fontSize: 18, lineHeight: 22, fontWeight: '700' }}>{item.title}</Text>
                  </View>
                  <Image source={{ uri: item.heroImageUrl ?? undefined }} contentFit="cover" style={{ width: 108, aspectRatio: 1200 / 628, borderRadius: radius.lg, backgroundColor: theme.colors.skeleton }} />
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

    </View>
  );
}
