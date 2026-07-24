import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { VenueCard } from '../../components/venues/VenueCard';
import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Chip, EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useVenuesInfinite } from '../../queries/venues.queries';
import { useLocationStore } from '../../store/locationStore';

/**
 * Matches the Search page's look (search bar + pill row + single-column
 * vertical list of row cards) instead of the old 2-column grid, per
 * explicit request to bring Venues/Restaurants/Arts Groups/Favorites in
 * line with Search. Venues have no upcoming/past-style second state (they're
 * places, not time-bound events), so the pill row is just "All" for now —
 * flag if you had something else in mind for a second Venues pill.
 */
export function VenuesScreen() {
  const city = useLocationStore((s) => s.selectedCity?.city) ?? DEFAULT_CITY;
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useVenuesInfinite(city);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const venues = data?.pages.flatMap((page) => page.venues) ?? [];
    const q = query.trim().toLowerCase();
    return q ? venues.filter((v) => v.name.toLowerCase().includes(q)) : venues;
  }, [data, query]);

  return (
    <Screen>
      <DetailScreenHeader title="Venues" subtitle={city} />

      <View style={{ marginBottom: spacing.md }}>
        <SearchBarPill mode="input" placeholder="Search venues" value={query} onChangeText={setQuery} showFilterIcon={false} />
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Chip label="All" active onPress={() => {}} />
      </View>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load venues." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.lg, paddingBottom: 120 }}
          renderItem={({ item }) => <VenueCard venue={item} variant="row" />}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <LoadingState rows={1} /> : null}
          ListEmptyComponent={<EmptyState title="No venues found" message="Try another city." />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
