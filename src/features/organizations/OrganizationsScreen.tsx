import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { OrganizationCard } from '../../components/organizations/OrganizationCard';
import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Chip, EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useOrganizationsInfinite } from '../../queries/organizations.queries';

/**
 * Matches the Search page's look (search bar + pill row + vertical list of
 * row cards) instead of the 2-column grid — per explicit request to bring
 * Venues/Restaurants/Arts Groups/Favorites in line with Search's style. See
 * VenuesScreen.tsx for the full rationale (this reverses the grid-cols-2
 * mirroring from the previous pass — the user's later, more specific
 * direction wins).
 */
export function OrganizationsScreen() {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useOrganizationsInfinite();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const organizations = data?.pages.flatMap((page) => page.organizations) ?? [];
    const q = query.trim().toLowerCase();
    return q ? organizations.filter((o) => o.name.toLowerCase().includes(q)) : organizations;
  }, [data, query]);

  return (
    <Screen>
      <DetailScreenHeader title="Arts Groups" />

      <View style={{ marginBottom: spacing.md }}>
        <SearchBarPill mode="input" placeholder="Search arts groups" value={query} onChangeText={setQuery} showFilterIcon={false} />
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Chip label="All" active onPress={() => {}} />
      </View>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load arts groups." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.lg, paddingBottom: 120 }}
          renderItem={({ item }) => <OrganizationCard organization={item} variant="row" />}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <LoadingState rows={1} /> : null}
          ListEmptyComponent={<EmptyState title="No arts groups found" message="Check back soon." />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
