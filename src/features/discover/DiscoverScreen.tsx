import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { BuildingIcon, MapIcon, NewspaperIcon, RestaurantIcon } from '../../components/layout/icons/MenuIcons';
import { CategoryRectangleRow } from '../../components/discovery/CategoryRectangleRow';
import { EventCarousel } from '../../components/discovery/EventCarousel';
import { Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { DEFAULT_CITY } from '../../config/constants';
import { useEventsFeed } from '../../queries/events.queries';
import { useLocationStore } from '../../store/locationStore';
import { CultureNewsSection } from '../home/components/CultureNewsSection';
import { IconMenuRow } from '../profile/components/IconMenuRow';

/** A browse-first discovery hub: timely events, Culture News, directories, genres and map. */
export function DiscoverScreen() {
  const theme = useAppTheme();
  const iconColor = String(theme.colors.text);
  const { selectedCity } = useLocationStore();
  const city = selectedCity?.city ?? DEFAULT_CITY;
  const { data } = useEventsFeed({ city, limit: 3 });
  const [weekOpen, setWeekOpen] = useState(true);
  const events = (data?.events ?? []).slice(0, 3);

  return (
    <Screen scroll>
      <AppHeader title="Discover" />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Show events this week"
        onPress={() => setWeekOpen((open) => !open)}
        style={({ pressed }) => ({
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          paddingVertical: spacing.md, opacity: pressed ? 0.7 : 1,
        })}
      >
        <View>
          <Text variant="subheading" style={{ fontSize: 17 }}>This Week</Text>
          <Text variant="caption" muted>Three timely picks in {city}</Text>
        </View>
        <Text variant="subheading">{weekOpen ? '−' : '+'}</Text>
      </Pressable>
      {weekOpen && events.length ? <EventCarousel events={events} /> : null}

      <SectionHeader title="Explore Categories" spacious />
      <CategoryRectangleRow onSelect={(genreId) => genreId && router.push(`/genres/${genreId}`)} />

      <SectionHeader title="Culture News" spacious actionLabel="View All" onAction={() => router.push('/news')} />
      <CultureNewsSection />

      <SectionHeader title="Explore CultureOwl" spacious />
      <IconMenuRow icon={<BuildingIcon color={iconColor} />} label="Art Organizations" onPress={() => router.push('/organizations')} />
      <IconMenuRow icon={<RestaurantIcon color={iconColor} />} label="Restaurants" onPress={() => router.push('/restaurants')} />
      <IconMenuRow icon={<RestaurantIcon color={iconColor} />} label="Art & Dine" onPress={() => router.push('/art-and-dine')} />
      <IconMenuRow icon={<NewspaperIcon color={iconColor} />} label="Culture News" onPress={() => router.push('/news')} />
      <IconMenuRow icon={<MapIcon color={iconColor} size={22} />} label="Explore The Map" onPress={() => router.push('/map')} />
    </Screen>
  );
}
