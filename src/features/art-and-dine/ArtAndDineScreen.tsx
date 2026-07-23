import { FlatList } from 'react-native';

import { RestaurantCard } from '../../components/restaurants/RestaurantCard';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useRestaurantsInfinite } from '../../queries/restaurants.queries';
import { useLocationStore } from '../../store/locationStore';

/**
 * Same data as Restaurants (useRestaurantsInfinite/RestaurantCard) — this is
 * a differently-branded entry point, not a new entity type. Header is
 * centered title + city underneath (DetailScreenHeader's subtitle slot),
 * 2-column grid, matching Venues/Organizations/Restaurants.
 */
export function ArtAndDineScreen() {
  const city = useLocationStore((s) => s.selectedCity?.city) ?? DEFAULT_CITY;
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useRestaurantsInfinite(city);

  const restaurants = data?.pages.flatMap((page) => page.restaurants) ?? [];

  return (
    <Screen>
      <DetailScreenHeader title="Art & Dine" subtitle={city} />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load Art & Dine." onRetry={() => refetch()} />
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
          ListEmptyComponent={<EmptyState title="Nothing found" message="Try another city." />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
