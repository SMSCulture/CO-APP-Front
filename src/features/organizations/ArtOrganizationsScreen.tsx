import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { OrganizationCard } from '../../components/organizations/OrganizationCard';
import { VenueCard } from '../../components/venues/VenueCard';
import { Chip, EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useOrganizationsInfinite } from '../../queries/organizations.queries';
import { useVenuesInfinite } from '../../queries/venues.queries';
import { useLocationStore } from '../../store/locationStore';
import { DEFAULT_CITY } from '../../config/constants';

type Kind = 'all' | 'venue' | 'group';
type Result =
  | { key: string; kind: 'venue'; name: string; item: NonNullable<ReturnType<typeof useVenuesInfinite>['data']>['pages'][number]['venues'][number] }
  | { key: string; kind: 'group'; name: string; item: NonNullable<ReturnType<typeof useOrganizationsInfinite>['data']>['pages'][number]['organizations'][number] };

/** One CultureOwl directory for the places and groups that make culture happen. */
export function ArtOrganizationsScreen() {
  const city = useLocationStore((s) => s.selectedCity?.city) ?? DEFAULT_CITY;
  const venues = useVenuesInfinite(city);
  const groups = useOrganizationsInfinite();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<Kind>('all');

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    const venueRows: Result[] = (venues.data?.pages.flatMap((p) => p.venues) ?? []).map((item) => ({ key: `venue-${item.id}`, kind: 'venue', name: item.name, item }));
    const groupRows: Result[] = (groups.data?.pages.flatMap((p) => p.organizations) ?? []).map((item) => ({ key: `group-${item.id}`, kind: 'group', name: item.name, item }));
    return [...venueRows, ...groupRows]
      .filter((row) => kind === 'all' || row.kind === kind)
      .filter((row) => !q || row.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [groups.data, kind, query, venues.data]);

  const loading = venues.isLoading || groups.isLoading;
  const failed = venues.isError && groups.isError;

  return (
    <Screen>
      <DetailScreenHeader title="Art Organizations" subtitle={city} />
      <View style={{ marginBottom: spacing.md }}>
        <SearchBarPill mode="input" placeholder="Search art organizations" value={query} onChangeText={setQuery} showFilterIcon={false} />
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Chip label="All" active={kind === 'all'} onPress={() => setKind('all')} />
        <Chip label="Venues" active={kind === 'venue'} onPress={() => setKind('venue')} />
        <Chip label="Arts groups" active={kind === 'group'} onPress={() => setKind('group')} />
      </View>
      {loading ? <LoadingState /> : failed ? (
        <ErrorState message="We couldn’t load art organizations." onRetry={() => { venues.refetch(); groups.refetch(); }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(row) => row.key}
          contentContainerStyle={{ gap: spacing.lg, paddingBottom: 120 }}
          renderItem={({ item }) => item.kind === 'venue' ? <VenueCard venue={item.item} variant="row" /> : <OrganizationCard organization={item.item} variant="row" />}
          ListEmptyComponent={<EmptyState title="No art organizations found" message="Try another name or type." />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
