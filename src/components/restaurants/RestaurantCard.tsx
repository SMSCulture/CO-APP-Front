import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { HeartButton } from '../discovery/HeartButton';
import { useFavoriteToggle } from '../../queries/favorites.queries';
import { spacing } from '../../design/tokens';
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
}

export function RestaurantCard({ restaurant, width }: RestaurantCardProps) {
  const theme = useAppTheme();
  const { isFavorite: saved, toggle } = useFavoriteToggle('restaurant', restaurant);

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
