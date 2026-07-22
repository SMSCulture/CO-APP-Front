import { FlatList } from 'react-native';

import { RestaurantCard } from '../../components/restaurants/RestaurantCard';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useRestaurantsInfinite } from '../../queries/restaurants.queries';
import { useLocationStore } from '../../store/locationStore';

/** Mirrors VenuesScreen.tsx — 2-column grid, cursor-paginated via onEndReached. */
export function RestaurantsScreen() {
  const city = useLocationStore((s) => s.selectedCity?.city) ?? DEFAULT_CITY;
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useRestaurantsInfinite(city);

  const restaurants = data?.pages.flatMap((page) => page.restaurants) ?? [];

  return (
    <Screen>
      <DetailScreenHeader title="Restaurants" />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load restaurants." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.md }}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: 120 }}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <LoadingState rows={1} /> : null}
          ListEmptyComponent={<EmptyState title="No restaurants found" message="Try another city." />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
