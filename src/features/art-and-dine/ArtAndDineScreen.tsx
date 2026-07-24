import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { RestaurantCard } from '../../components/restaurants/RestaurantCard';
import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Chip, EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useRestaurantsInfinite } from '../../queries/restaurants.queries';
import { useLocationStore } from '../../store/locationStore';

/**
 * Same data as Restaurants (useRestaurantsInfinite/RestaurantCard) — this is
 * a differently-branded entry point, not a new entity type. Matches the
 * Search page's look (search bar + pill row + vertical list of row cards),
 * same as Restaurants/Venues/Organizations now — see VenuesScreen.tsx.
 */
export function ArtAndDineScreen() {
  const city = useLocationStore((s) => s.selectedCity?.city) ?? DEFAULT_CITY;
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useRestaurantsInfinite(city);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const restaurants = data?.pages.flatMap((page) => page.restaurants) ?? [];
    const q = query.trim().toLowerCase();
    return q ? restaurants.filter((r) => r.name.toLowerCase().includes(q)) : restaurants;
  }, [data, query]);

  return (
    <Screen>
      <DetailScreenHeader title="Art & Dine" subtitle={city} />

      <View style={{ marginBottom: spacing.md }}>
        <SearchBarPill mode="input" placeholder="Search Art & Dine" value={query} onChangeText={setQuery} showFilterIcon={false} />
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Chip label="All" active onPress={() => {}} />
      </View>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load Art & Dine." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.lg, paddingBottom: 120 }}
          renderItem={({ item }) => <RestaurantCard restaurant={item} variant="row" />}
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
