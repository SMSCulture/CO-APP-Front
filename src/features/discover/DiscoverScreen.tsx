import { router } from 'expo-router';

import { AppHeader } from '../../components/layout/AppHeader';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { BuildingIcon, MapIcon, NewspaperIcon, RestaurantIcon } from '../../components/layout/icons/MenuIcons';
import { CategoryRectangleRow } from '../../components/discovery/CategoryRectangleRow';
import { Screen } from '../../components/ui';
import { useAppTheme } from '../../design/useAppTheme';
import { IconMenuRow } from '../profile/components/IconMenuRow';

/** CultureOwl browse hub. Fever's discovery hierarchy, with CultureOwl's own directories. */
export function DiscoverScreen() {
  const theme = useAppTheme();
  const iconColor = String(theme.colors.text);

  return (
    <Screen scroll>
      <AppHeader title="Discover" />

      {/* Same genre rectangles as Home/Search — tapping one runs that
          filter as a search, same handoff as HomeHeader's filter popup. */}
      <SectionHeader title="Categories" />
      <CategoryRectangleRow
        onSelect={(genreId) => {
          if (!genreId) return;
          router.push(`/genres/${genreId}`);
        }}
      />

      <SectionHeader title="Browse" />
      {/* Building icon — same one web uses for Venues/Arts Groups
          (components/layout/user-menu.tsx, discover-menu.tsx), not a
          generic/different icon. */}
      <IconMenuRow icon={<BuildingIcon color={iconColor} />} label="Art organizations" onPress={() => router.push('/organizations')} />
      <IconMenuRow icon={<RestaurantIcon color={iconColor} />} label="Restaurants" onPress={() => router.push('/restaurants')} />
      <IconMenuRow icon={<RestaurantIcon color={iconColor} />} label="Art & Dine" onPress={() => router.push('/art-and-dine')} />
      <IconMenuRow icon={<NewspaperIcon color={iconColor} />} label="Stories: culture + industry" onPress={() => router.push('/news')} />
      <IconMenuRow icon={<MapIcon color={iconColor} />} label="Map" onPress={() => router.push('/map')} />
    </Screen>
  );
}
