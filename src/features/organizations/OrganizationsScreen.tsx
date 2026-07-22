import { FlatList } from 'react-native';

import { OrganizationCard } from '../../components/organizations/OrganizationCard';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useOrganizationsInfinite } from '../../queries/organizations.queries';

/** Mirrors app/arts-groups/arts-groups-content.tsx on web — single-column row list (OrganizationCard is already the horizontal "Fever style" row shape), cursor-paginated via onEndReached. */
export function OrganizationsScreen() {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useOrganizationsInfinite();

  const organizations = data?.pages.flatMap((page) => page.organizations) ?? [];

  return (
    <Screen>
      <DetailScreenHeader title="Arts Groups" />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load arts groups." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={organizations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: 120 }}
          renderItem={({ item }) => <OrganizationCard organization={item} />}
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
