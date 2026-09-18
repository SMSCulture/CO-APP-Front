import { router } from 'expo-router';

import { AppHeader } from '../../components/layout/AppHeader';
import { SectionHeader } from '../../components/layout/SectionHeader';
import {
  BuildingIcon,
  MapIcon,
  NewspaperIcon,
  RestaurantIcon,
} from '../../components/layout/icons/MenuIcons';
import { CategoryRectangleRow } from '../../components/discovery/CategoryRectangleRow';
import { Screen, Text } from '../../components/ui';
import { CitySignalStories } from '../home/components/CitySignalStories';
import { useAppTheme } from '../../design/useAppTheme';
import { DEFAULT_CITY } from '../../config/constants';
import { useEventsFeed } from '../../queries/events.queries';
import { useNews } from '../../queries/news.queries';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { radius, spacing } from '../../design/tokens';
import { useLocationStore } from '../../store/locationStore';
import { matchingArticles } from '../../lib/discoveryMatching';
import { CultureNewsSection } from '../home/components/CultureNewsSection';
import { IconMenuRow } from '../profile/components/IconMenuRow';

/** A browse-first discovery hub: timely events, Culture News, directories, genres and map. */
export function DiscoverScreen() {
  const theme = useAppTheme();
  const iconColor = String(theme.colors.text);
  const { selectedCity } = useLocationStore();
  const city = selectedCity?.city ?? DEFAULT_CITY;
  const { data } = useEventsFeed({ city, limit: 9 });
  const { data: articles } = useNews();
  const immersiveArticles = matchingArticles(
    { category: ['immersive', 'art'], neighborhood: [], vibe: ['immersive'] },
    articles ?? [],
  );

  return (
    <Screen scroll>
      <AppHeader title="Discover" />

      <CitySignalStories events={data?.events ?? []} />

      <SectionHeader title="Explore Categories" spacious />
      <CategoryRectangleRow onSelect={(genreId) => genreId && router.push(`/genres/${genreId}`)} />


      {immersiveArticles.length ? (
        <>
          <SectionHeader title="Inside immersive culture" spacious actionLabel="View All" onAction={() => router.push('/news')} />
          <View style={{ gap: spacing.md }}>
            {immersiveArticles.map((article) => (
              <Pressable key={article.id} onPress={() => router.push(`/news/${article.slug}`)} style={({ pressed }) => ({ flexDirection: 'row', gap: spacing.md, opacity: pressed ? .82 : 1 })}>
                <Image source={{ uri: article.heroImageUrl ?? undefined }} contentFit="cover" style={{ width: 112, aspectRatio: 1, borderRadius: radius.lg }} />
                <View style={{ flex: 1, justifyContent: 'center', gap: 5 }}>
                  <Text variant="label" color={theme.colors.primary}>MATCHED TO THIS WORLD</Text>
                  <Text variant="subheading" numberOfLines={3}>{article.title}</Text>
                  <Text variant="caption" muted numberOfLines={2}>{article.excerpt}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      <SectionHeader
        title="Culture News"
        spacious
        actionLabel="View All"
        onAction={() => router.push('/news')}
      />
      <CultureNewsSection />

      <SectionHeader title="Explore CultureOwl" spacious />
      <IconMenuRow
        icon={<BuildingIcon color={iconColor} />}
        label="Art Organizations"
        onPress={() => router.push('/organizations')}
      />
      <IconMenuRow
        icon={<RestaurantIcon color={iconColor} />}
        label="Art & Dine"
        onPress={() => router.push('/art-and-dine')}
      />
      <IconMenuRow
        icon={<NewspaperIcon color={iconColor} />}
        label="Culture News"
        onPress={() => router.push('/news')}
      />
      <IconMenuRow
        icon={<MapIcon color={iconColor} size={22} />}
        label="Explore The Map"
        onPress={() => router.push('/map')}
      />
    </Screen>
  );
}
