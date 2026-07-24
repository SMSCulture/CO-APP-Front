import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { HeartButton } from '../discovery/HeartButton';
import { useFavoriteToggle } from '../../queries/favorites.queries';
import { radius, sizes, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { Restaurant } from '../../types/restaurant';
import { MapPinIcon } from '../layout/icons/MenuIcons';
import { Text } from '../ui';

/**
 * Same DirectoryCard shell as VenueCard/OrganizationCard/PortraitEventCard —
 * square image, pin + city topLine, title, "{cuisine}  {priceLevel}" info
 * row (matches the reference screenshot's "Seafood  $$").
 */
interface RestaurantCardProps {
  restaurant: Restaurant;
  /** Fixed width for horizontal carousel use (Home's Restaurants row); omit for grid use (flex: 1, RestaurantsScreen). */
  width?: number;
  /** 'tile' (default) — square image + stacked text, used in Home's carousel. 'row' — square thumbnail left + text right, matches the Search page's vertical-list look (RestaurantsScreen, Art & Dine). */
  variant?: 'tile' | 'row';
}

export function RestaurantCard({ restaurant, width, variant = 'tile' }: RestaurantCardProps) {
  const theme = useAppTheme();
  const { isFavorite: saved, toggle } = useFavoriteToggle('restaurant', restaurant);

  if (variant === 'row') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={restaurant.name}
          onPress={() => router.push(`/restaurants/${restaurant.id}`)}
          style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.85 : 1 })}
        >
          <Image
            source={{ uri: restaurant.imageUrl ?? undefined }}
            style={{
              width: sizes.rowThumbnail,
              height: sizes.rowThumbnail,
              borderRadius: radius.md,
              backgroundColor: theme.colors.skeleton,
            }}
            contentFit="cover"
            accessibilityLabel={restaurant.name}
          />
          <View style={{ flex: 1, paddingLeft: spacing.md, gap: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <MapPinIcon color={String(theme.colors.primary)} size={14} />
              <Text variant="caption" muted numberOfLines={1} style={{ flex: 1 }}>
                {restaurant.city}
              </Text>
            </View>
            <Text variant="subheading" numberOfLines={2}>
              {restaurant.name}
            </Text>
            <Text variant="caption" muted numberOfLines={1}>
              {restaurant.cuisine}  {restaurant.priceLevel}
            </Text>
          </View>
        </Pressable>
        <HeartButton saved={saved} onPress={toggle} />
      </View>
    );
  }

  return (
    <View style={width ? { width } : { flex: 1 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={restaurant.name}
        onPress={() => router.push(`/restaurants/${restaurant.id}`)}
        style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
      >
        <Image
          source={{ uri: restaurant.imageUrl ?? undefined }}
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: 10,
            backgroundColor: theme.colors.skeleton,
          }}
          contentFit="cover"
          accessibilityLabel={restaurant.name}
        />
        <View style={{ marginTop: 6, gap: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <MapPinIcon color={String(theme.colors.primary)} size={16} />
            <Text variant="body" numberOfLines={1} style={{ flex: 1 }}>
              {restaurant.city}
            </Text>
          </View>
          <Text variant="subheading" numberOfLines={2}>
            {restaurant.name}
          </Text>
          <Text variant="caption" muted numberOfLines={1}>
            {restaurant.cuisine}  {restaurant.priceLevel}
          </Text>
        </View>
      </Pressable>

      <View style={{ position: 'absolute', top: spacing.xs, right: spacing.xs }}>
        <HeartButton saved={saved} onPress={toggle} />
      </View>
    </View>
  );
}
