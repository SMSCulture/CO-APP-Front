import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';

import { CultureEnvironmentNav } from '../../components/layout/CultureEnvironmentNav';
import { NewsCard } from '../../components/news/NewsCard';
import { EmptyState, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useNews } from '../../queries/news.queries';
import type { NewsArticle } from '../../types/news';

function categoryFor(article: NewsArticle) {
  return article.category ?? 'Culture';
}

export function NewsCategoryScreen({ category }: { category: string }) {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const { data: articles, isLoading, isError, refetch } = useNews();
  const categories = [...new Set((articles ?? []).map(categoryFor))];
  const activeCategory = categories.includes(category) ? category : categories[0];
  const filtered = (articles ?? []).filter((article) => categoryFor(article) === activeCategory);
  const tileSize = Math.min(158, width * 0.38);

  return (
    <Screen padded={false}>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load this Culture News desk." onRetry={() => refetch()} />
      ) : !activeCategory ? (
        <EmptyState title="The next story is taking shape" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110, gap: spacing.xl }}
        >
          <View style={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to Culture News"
              onPress={() => router.back()}
              style={({ pressed }) => ({
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <Text style={{ fontSize: 24, lineHeight: 24 }}>‹</Text>
              <Text variant="bodyBold">Culture News</Text>
            </Pressable>
            <View style={{ gap: 3 }}>
              <Text variant="label" color={theme.colors.primary}>
                CULTURE NEWS DESK
              </Text>
              <Text variant="title">{activeCategory}</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.sm }}
          >
            {categories.map((item) => {
              const selected = item === activeCategory;
              return (
                <Pressable
                  key={`filter-${item}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => router.replace(`/news/category/${encodeURIComponent(item)}`)}
                  style={({ pressed }) => ({
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: selected ? theme.colors.primary : theme.colors.border,
                    backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm,
                    opacity: pressed ? 0.75 : 1,
                  })}
                >
                  <Text variant="bodyBold" color={selected ? '#fff' : theme.colors.text}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={{ gap: spacing.md }}>
            <View style={{ paddingHorizontal: spacing.screenX }}>
              <Text variant="heading">Switch desks</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.sm }}
            >
              {categories.map((item) => {
                const lead = (articles ?? []).find((article) => categoryFor(article) === item);
                if (!lead) return null;
                return (
                  <Pressable
                    key={`desk-${item}`}
                    accessibilityRole="button"
                    accessibilityLabel={`Open ${item}`}
                    onPress={() => router.replace(`/news/category/${encodeURIComponent(item)}`)}
                    style={({ pressed }) => ({
                      width: tileSize,
                      height: tileSize,
                      borderRadius: radius.lg,
                      overflow: 'hidden',
                      opacity: pressed ? 0.88 : 1,
                      backgroundColor: theme.colors.skeleton,
                    })}
                  >
                    <Image
                      source={{ uri: lead.heroImageUrl ?? undefined }}
                      contentFit="cover"
                      accessibilityLabel={lead.heroImageAlt ?? lead.title}
                      style={{ position: 'absolute', inset: 0 }}
                    />
                    <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(4,10,16,.38)' }} />
                    <View
                      style={{
                        position: 'absolute',
                        left: spacing.md,
                        right: spacing.md,
                        bottom: spacing.md,
                      }}
                    >
                      <Text
                        color="#fff"
                        style={{ fontFamily: fontFamily.bold, fontSize: 19, lineHeight: 22 }}
                      >
                        {item}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <View style={{ paddingHorizontal: spacing.screenX, gap: spacing.lg }}>
            <Text variant="heading">Latest in {activeCategory}</Text>
            {filtered.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </View>
        </ScrollView>
      )}
      <CultureEnvironmentNav />
    </Screen>
  );
}
