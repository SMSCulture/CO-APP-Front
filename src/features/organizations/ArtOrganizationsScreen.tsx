import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { OrganizationCard } from '../../components/organizations/OrganizationCard';
import { Chip, EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useOrganizationsInfinite } from '../../queries/organizations.queries';

/** Same directory treatment as Venues and Restaurants: heading, search, All pill, row cards and progressive loading. */
export function ArtOrganizationsScreen() {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useOrganizationsInfinite();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const organizations = data?.pages.flatMap((page) => page.organizations) ?? [];
    const q = query.trim().toLowerCase();
    return q ? organizations.filter((organization) => organization.name.toLowerCase().includes(q)) : organizations;
  }, [data, query]);

  return (
    <Screen>
      <DetailScreenHeader title="Art Organizations" />

      <View style={{ marginBottom: spacing.md }}>
        <SearchBarPill mode="input" placeholder="Search art organizations" value={query} onChangeText={setQuery} showFilterIcon={false} />
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Chip label="All" active onPress={() => {}} />
      </View>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load art organizations." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.lg, paddingBottom: 120 }}
          renderItem={({ item }) => <OrganizationCard organization={item} variant="row" />}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <LoadingState rows={1} /> : null}
          ListEmptyComponent={<EmptyState title="No art organizations found" message="Check back soon." />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
