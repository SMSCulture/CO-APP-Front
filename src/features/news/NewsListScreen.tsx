import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { useState } from 'react';

import { HorizontalCarousel } from '../../components/layout/HorizontalCarousel';
import { NewsCard } from '../../components/news/NewsCard';
import { EmptyState, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useNews } from '../../queries/news.queries';
import type { NewsArticle } from '../../types/news';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function HeroSwitcher({ articles }: { articles: NewsArticle[] }) {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = width - spacing.screenX * 2;

  return (
    <View style={{ gap: spacing.md }}>
      <View style={{ paddingHorizontal: spacing.screenX, gap: 4 }}>
        <Text variant="label" color={theme.colors.primary}>
          CULTURE NEWS
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 22 }} muted>
          Stories, criticism and ideas shaping the city.
        </Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) =>
          setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / width))
        }
      >
        {articles.map((article) => (
          <View key={article.id} style={{ width, paddingHorizontal: spacing.screenX }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={article.title}
              onPress={() => router.push(`/news/${article.slug}`)}
              style={({ pressed }) => ({
                width: cardWidth,
                height: 390,
                borderRadius: 24,
                overflow: 'hidden',
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Image
                source={{ uri: article.heroImageUrl ?? undefined }}
                contentFit="cover"
                style={{ position: 'absolute', inset: 0, backgroundColor: theme.colors.skeleton }}
              />
              <View
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(3,8,13,.14)',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '72%',
                  backgroundColor: 'rgba(6,13,21,.62)',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: spacing.lg,
                  right: spacing.lg,
                  bottom: spacing.xl,
                  gap: spacing.sm,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                  <View
                    style={{
                      borderRadius: 999,
                      paddingHorizontal: spacing.sm,
                      paddingVertical: 5,
                      backgroundColor: theme.colors.primary,
                    }}
                  >
                    <Text variant="caption" color="#fff">
                      {article.category ?? 'Culture'}
                    </Text>
                  </View>
                  <Text variant="caption" color="rgba(255,255,255,.78)">
                    {formatDate(article.publishedAt)}
                  </Text>
                </View>
                <Text
                  color="#fff"
                  style={{
                    fontFamily: fontFamily.bold,
                    fontSize: 30,
                    lineHeight: 35,
                    fontWeight: '700',
                  }}
                  numberOfLines={3}
                >
                  {article.title}
                </Text>
                {article.excerpt ? (
                  <Text color="rgba(255,255,255,.84)" numberOfLines={2} style={{ lineHeight: 20 }}>
                    {article.excerpt}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 7 }}>
        {articles.map((article, index) => (
          <View
            key={`dot-${article.id}`}
            style={{
              width: activeIndex === index ? 20 : 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: activeIndex === index ? theme.colors.primary : theme.colors.border,
            }}
          />
        ))}
      </View>
    </View>
  );
}

function RefreshedArticlesGrid({ articles }: { articles: NewsArticle[] }) {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const gap = spacing.sm;
  const tileSize = (width - spacing.screenX * 2 - gap) / 2;
  const refreshed = articles.slice(0, 4);

  if (!refreshed.length) return null;

  return (
    <View style={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}>
      <View style={{ gap: 3 }}>
        <Text variant="label" color={theme.colors.primary}>
          FRESH THIS WEEK
        </Text>
        <Text variant="heading">Top articles to read</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap }}>
        {refreshed.map((article) => (
          <Pressable
            key={`refreshed-${article.id}`}
            accessibilityRole="button"
            accessibilityLabel={article.title}
            onPress={() => router.push(`/news/${article.slug}`)}
            style={({ pressed }) => ({
              width: tileSize,
              height: tileSize,
              borderRadius: radius.lg,
              overflow: 'hidden',
              opacity: pressed ? 0.9 : 1,
              backgroundColor: theme.colors.skeleton,
            })}
          >
            <Image
              source={{ uri: article.heroImageUrl ?? undefined }}
              contentFit="cover"
              transition={200}
              accessibilityLabel={article.heroImageAlt ?? article.title}
              style={{ position: 'absolute', inset: 0 }}
            />
            <View
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(3,8,13,.22)',
              }}
            />
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '78%',
                backgroundColor: 'rgba(5,11,18,.68)',
              }}
            />
            <View
              style={{
                position: 'absolute',
                left: spacing.md,
                right: spacing.md,
                bottom: spacing.md,
                gap: 5,
              }}
            >
              <Text variant="caption" color="rgba(255,255,255,.78)" numberOfLines={1}>
                {(article.category ?? 'Culture').toUpperCase()}
              </Text>
              <Text
                color="#fff"
                numberOfLines={3}
                style={{
                  fontFamily: fontFamily.bold,
                  fontSize: 17,
                  lineHeight: 20,
                  fontWeight: '700',
                }}
              >
                {article.title}
              </Text>
              <Text variant="caption" color="rgba(255,255,255,.72)" numberOfLines={1}>
                {article.authorName} · {formatDate(article.publishedAt)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function ArticleRail({ title, articles }: { title: string; articles: NewsArticle[] }) {
  if (!articles.length) return null;
  return (
    <View style={{ gap: spacing.md }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.screenX,
        }}
      >
        <Text variant="heading" color="#3499d5">
          {title}
        </Text>
        <Text variant="bodyBold">View All</Text>
      </View>
      <HorizontalCarousel>
        {articles.map((article) => (
          <NewsCard key={`${title}-${article.id}`} article={article} width={280} />
        ))}
      </HorizontalCarousel>
    </View>
  );
}

/** Culture News keeps the approved feature treatment over the site's familiar article rails. */
export function NewsListScreen() {
  const { data: articles, isLoading, isError, refetch } = useNews();
  const featured = (articles ?? []).slice(0, 3);
  const rest = (articles ?? []).slice(3);
  const groups = [...new Set((articles ?? []).map((article) => article.category ?? 'Culture'))].map(
    (category) => ({
      category,
      articles: (articles ?? []).filter(
        (article) => (article.category ?? 'Culture') === category,
      ),
    }),
  );

  return (
    <Screen padded={false}>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load Culture News." onRetry={() => refetch()} />
      ) : !featured.length ? (
        <EmptyState
          title="The next story is taking shape"
          message="Fresh eyes on the local scene are coming soon."
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110, gap: spacing.xl }}
        >
          <HeroSwitcher articles={featured} />

          <RefreshedArticlesGrid articles={rest.length ? rest : featured} />

          {groups.map(({ category, articles: groupArticles }) => (
            <ArticleRail key={category} title={category} articles={groupArticles} />
          ))}
        </ScrollView>
      )}
    </Screen>
  );
}
