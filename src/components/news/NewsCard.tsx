import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { NewsArticle } from '../../types/news';
import { Badge, Text } from '../ui';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface NewsCardProps {
  article: NewsArticle;
  /** Fixed width in horizontal carousels (e.g. home page rail); full-width when omitted (list screen). */
  width?: number;
}

/**
 * Mirrors app/news/components/news-card.tsx on web: fixed 1200:628 wide
 * image (not square — deliberately distinct from the event/venue card
 * shapes), category badge, title, date.
 */
export function NewsCard({ article, width }: NewsCardProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={article.title}
      onPress={() => router.push(`/news/${article.slug}`)}
      style={({ pressed }) => ({ width, opacity: pressed ? 0.92 : 1 })}
    >
      <Image
        source={{ uri: article.heroImageUrl ?? undefined }}
        style={{ width: '100%', aspectRatio: 1200 / 628, borderRadius: radius.lg, backgroundColor: theme.colors.skeleton }}
        contentFit="cover"
        transition={200}
        accessibilityLabel={article.heroImageAlt ?? article.title}
      />
      <View style={{ paddingTop: spacing.sm, gap: spacing.xs / 2 }}>
        {article.category ? <Badge label={article.category} color={theme.colors.primary} /> : null}
        <Text variant="subheading" numberOfLines={2}>
          {article.title}
        </Text>
        <Text variant="caption" muted>
          {formatDate(article.publishedAt)}
        </Text>
      </View>
    </Pressable>
  );
}
