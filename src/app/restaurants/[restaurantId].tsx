import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useRestaurant } from '../../queries/restaurants.queries';
import type { RestaurantRouteParams } from '../../types/navigation';

export default function RestaurantRoute() {
  const theme = useAppTheme();
  const { restaurantId } = useLocalSearchParams<RestaurantRouteParams>();
  const { data: restaurant, isLoading, isError, refetch } = useRestaurant(restaurantId);

  if (isLoading) {
    return (
      <Screen>
        <LoadingState rows={1} />
      </Screen>
    );
  }
  if (isError || !restaurant) {
    return (
      <Screen>
        <ErrorState message="We couldn’t load this restaurant." onRetry={() => refetch()} />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppHeader title={restaurant.name} subtitle={`${restaurant.city}, ${restaurant.state}`} />
      <View style={{ gap: spacing.lg }}>
        <Image
          source={{ uri: restaurant.imageUrl ?? undefined }}
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: radius.lg,
            backgroundColor: theme.colors.skeleton,
          }}
          contentFit="cover"
          accessibilityLabel={restaurant.name}
        />
        <Text muted>{restaurant.cuisine}  {restaurant.priceLevel}</Text>
        {restaurant.description ? <Text>{restaurant.description}</Text> : null}
      </View>
    </Screen>
  );
}
