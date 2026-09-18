import { router } from 'expo-router';

import { AppHeader } from '../../components/layout/AppHeader';
import { SectionHeader } from '../../components/layout/SectionHeader';
import {
  BuildingIcon,
  MapIcon,
  NewspaperIcon,
  RestaurantIcon,
} from '../../components/layout/icons/MenuIcons';
import { Screen } from '../../components/ui';
import { CitySignalStories } from '../home/components/CitySignalStories';
import { useAppTheme } from '../../design/useAppTheme';
import { DEFAULT_CITY } from '../../config/constants';
import { useEventsFeed } from '../../queries/events.queries';
import { useNews } from '../../queries/news.queries';
import { useLocationStore } from '../../store/locationStore';
import { CultureNewsSection } from '../home/components/CultureNewsSection';
import { IconMenuRow } from '../profile/components/IconMenuRow';
import { DiscoverWorlds } from './DiscoverWorlds';

/** A browse-first discovery hub: timely events, Culture News, directories, genres and map. */
export function DiscoverScreen() {
  const theme = useAppTheme();
  const iconColor = String(theme.colors.text);
  const { selectedCity } = useLocationStore();
  const city = selectedCity?.city ?? DEFAULT_CITY;
  const { data } = useEventsFeed({ city, limit: 9 });
  const { data: articles } = useNews();


  return (
    <Screen scroll>
      <AppHeader title="Discover" />

      <CitySignalStories events={data?.events ?? []} />

      <DiscoverWorlds events={data?.events ?? []} articles={articles ?? []} />

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
