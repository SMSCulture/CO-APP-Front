import { FlatList } from 'react-native';

import { VenueCard } from '../../components/venues/VenueCard';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useVenuesInfinite } from '../../queries/venues.queries';
import { useLocationStore } from '../../store/locationStore';

/** Mirrors app/venues/venues-content.tsx on web — 2-column grid here (RN has no responsive Tailwind grid-cols breakpoints), cursor-paginated via onEndReached. */
export function VenuesScreen() {
  const city = useLocationStore((s) => s.selectedCity?.city) ?? DEFAULT_CITY;
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useVenuesInfinite(city);

  const venues = data?.pages.flatMap((page) => page.venues) ?? [];

  return (
    <Screen>
      <DetailScreenHeader title="Venues" />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load venues." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={venues}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.md }}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: 120 }}
          renderItem={({ item }) => <VenueCard venue={item} />}
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
