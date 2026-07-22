import { router } from 'expo-router';
import { Image } from 'expo-image';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChevronLeftIcon } from '../../components/layout/icons/MenuIcons';
import { ErrorState, IconButton, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useNewsArticle } from '../../queries/news.queries';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Mirrors app/news/[slug]/page.tsx + news-article-content.tsx on web.
 * Body is rendered as plain text (HTML tags stripped) — no HTML-render
 * library (react-native-render-html or similar) is installed yet; adding
 * one is a real dependency decision, not made here. Swap this for real
 * rich-text rendering once that's decided.
 */
export function NewsArticleScreen({ slug }: { slug: string }) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: article, isLoading, isError, refetch } = useNewsArticle(slug);

  if (isLoading) {
    return (
      <Screen>
        <LoadingState rows={1} />
      </Screen>
    );
  }
  if (isError || !article) {
    return (
      <Screen>
        <ErrorState message="We couldn’t load this article." onRetry={() => refetch()} />
      </Screen>
    );
  }

  const plainBody = article.body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <Image
          source={{ uri: article.heroImageUrl ?? undefined }}
          style={{ width: '100%', aspectRatio: 1200 / 628, backgroundColor: theme.colors.skeleton }}
          contentFit="cover"
          accessibilityLabel={article.heroImageAlt ?? article.title}
        />
        <View style={{ paddingHorizontal: spacing.screenX, gap: spacing.md, marginTop: spacing.lg }}>
          {article.category ? (
            <Text variant="label" color={theme.colors.primary}>
              {article.category.toUpperCase()}
            </Text>
          ) : null}
          <Text variant="title">{article.title}</Text>
          <Text variant="caption" muted>
            {article.authorName} · {formatDate(article.publishedAt)}
          </Text>
          <Text style={{ lineHeight: 24 }}>{plainBody}</Text>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', top: insets.top + spacing.sm, left: spacing.lg }}>
        <IconButton accessibilityLabel="Go back" onPress={() => router.back()}>
          <ChevronLeftIcon color="#ffffff" size={20} />
        </IconButton>
      </View>
    </View>
  );
}
