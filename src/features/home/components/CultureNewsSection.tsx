import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { HorizontalCarousel } from '../../../components/layout/HorizontalCarousel';
import { Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { trackEvent } from '../../../lib/analytics';
import { useNews } from '../../../queries/news.queries';

/** Cultural news rail (web parity: cultural-news). Article detail route TBD. */
export function CultureNewsSection() {
  const theme = useAppTheme();
  const { data: articles } = useNews();

  if (!articles || articles.length === 0) return null;

  return (
    <HorizontalCarousel>
      {articles.map((article) => (
        <Pressable
          key={article.id}
          accessibilityRole="button"
          accessibilityLabel={article.title}
          onPress={() => trackEvent('news_article_tap', { articleId: article.id })}
          style={({ pressed }) => ({ width: 260, opacity: pressed ? 0.9 : 1 })}
        >
          <Image
            source={{ uri: article.heroImageUrl ?? undefined }}
            style={{
              width: 260,
              height: 140,
              borderRadius: radius.lg,
              backgroundColor: theme.colors.skeleton,
            }}
            contentFit="cover"
            transition={200}
          />
          <View style={{ paddingTop: spacing.sm, gap: 2 }}>
            <Text variant="subheading" numberOfLines={2}>
              {article.title}
            </Text>
            <Text variant="caption" muted>
              {article.authorName}
            </Text>
          </View>
        </Pressable>
      ))}
    </HorizontalCarousel>
  );
}
