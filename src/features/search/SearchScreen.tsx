import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { CategoryRectangleGrid } from '../../components/discovery/CategoryRectangleGrid';
import { FilterPanel } from '../../components/discovery/FilterPanel';
import { FilterPillRow } from '../../components/discovery/FilterPillRow';
import { MapButton } from '../../components/discovery/MapButton';
import { PopularSearchesRow } from '../../components/discovery/PopularSearchesRow';
import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { SearchResultRow } from '../../components/discovery/SearchResultRow';
import { SortModal, type SortOption } from '../../components/discovery/SortModal';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EmptyState, ErrorState, LoadingState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useDebounce } from '../../hooks/useDebounce';
import { useEventSearch } from '../../queries/search.queries';
import type { EventSummary } from '../../types/event';
import { DEFAULT_EVENT_FILTERS, hasActiveFilters, type DateFilterType, type EventFiltersState } from '../../types/filters';
import type { SearchRouteParams } from '../../types/navigation';

function parsePrice(event: EventSummary): number {
  if (event.free) return 0;
  const match = event.pricing?.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : Number.MAX_SAFE_INTEGER;
}

function sortEvents(events: EventSummary[], sort: SortOption): EventSummary[] {
  const sorted = [...events];
  switch (sort) {
    case 'PRICE_ASC':
      return sorted.sort((a, b) => parsePrice(a) - parsePrice(b));
    case 'PRICE_DESC':
      return sorted.sort((a, b) => parsePrice(b) - parsePrice(a));
    case 'FREE_FIRST':
      return sorted.sort((a, b) => Number(b.free) - Number(a.free));
    case 'DATE':
    default:
      return sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }
}

/**
 * Matches the reference exactly: bare full-width search bar (no docked
 * filter icon — Date/Category/Sort are separate pills below), Popular
 * Searches + Categories shown by default, replaced by results only once
 * the user actually searches or taps a filter/category/popular term. The
 * search bar itself starts as a tap-to-activate bar (mode="link") on this
 * screen too — becomes a real editable input only after it's tapped.
 */
export function SearchScreen() {
  const params = useLocalSearchParams<SearchRouteParams>();
  const initialFilters: EventFiltersState = {
    dateFilter: (params.dateFilter as DateFilterType) ?? DEFAULT_EVENT_FILTERS.dateFilter,
    customDate: DEFAULT_EVENT_FILTERS.customDate,
    customDateEnd: DEFAULT_EVENT_FILTERS.customDateEnd,
    tagIds: params.tagIds ? params.tagIds.split(',') : DEFAULT_EVENT_FILTERS.tagIds,
    virtual: params.virtual === '1',
  };

  const [term, setTerm] = useState('');
  const [filters, setFilters] = useState<EventFiltersState>(initialFilters);
  const [sort, setSort] = useState<SortOption>('DATE');
  // Already-active filters from Home's popup (or a Discover category tap)
  // mean the user has effectively already searched — go straight to results.
  const [hasInteracted, setHasInteracted] = useState(hasActiveFilters(initialFilters));
  const [inputActive, setInputActive] = useState(hasActiveFilters(initialFilters));
  const [openFilterSection, setOpenFilterSection] = useState<'date' | 'category' | null>(null);
  const [sortModalOpen, setSortModalOpen] = useState(false);

  const debouncedTerm = useDebounce(term);
  const { data, isLoading, isError, refetch } = useEventSearch({
    searchTerm: debouncedTerm,
    tagIds: filters.tagIds,
    dateFilter: filters.dateFilter || undefined,
    customDate: filters.customDate,
    customDateEnd: filters.customDateEnd,
    virtual: filters.virtual,
  });

  const results = useMemo(() => sortEvents(data ?? [], sort), [data, sort]);

  const activateSearch = () => {
    setInputActive(true);
    setHasInteracted(true);
  };

  const selectPopularSearch = (popularTerm: string) => {
    setTerm(popularTerm);
    activateSearch();
  };

  const selectCategory = (genreId: string | null) => {
    setFilters((prev) => ({ ...prev, tagIds: genreId ? [genreId] : [] }));
    setHasInteracted(true);
  };

  const showBrowseState = !hasInteracted;

  return (
    <Screen>
      <DetailScreenHeader title="Search" />
      <View style={{ gap: spacing.md, marginBottom: spacing.lg }}>
        <SearchBarPill
          mode={inputActive ? 'input' : 'link'}
          placeholder="Discover cities, events, venues…"
          value={term}
          onChangeText={setTerm}
          onPress={activateSearch}
          showFilterIcon={false}
        />
        <FilterPillRow
          dateActive={filters.dateFilter !== ''}
          categoryActive={filters.tagIds.length > 0}
          sortActive={sort !== 'DATE'}
          onDatePress={() => setOpenFilterSection('date')}
          onCategoryPress={() => setOpenFilterSection('category')}
          onSortPress={() => setSortModalOpen(true)}
        />
      </View>

      {showBrowseState ? (
        <View style={{ gap: spacing.xl }}>
          <View>
            <SectionHeader title="Popular Searches" />
            <PopularSearchesRow onSelect={selectPopularSearch} />
          </View>
          <View>
            <SectionHeader title="Categories" />
            <CategoryRectangleGrid onSelect={selectCategory} />
          </View>
        </View>
      ) : isLoading ? (
        <LoadingState rows={2} />
      ) : isError ? (
        <ErrorState message="Search is unavailable right now." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchResultRow event={item} />}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title="No results"
              message={debouncedTerm ? `Nothing matches “${debouncedTerm}”.` : 'Try a different filter.'}
            />
          }
        />
      )}

      <FilterPanel
        visible={openFilterSection !== null}
        initialSection={openFilterSection ?? 'date'}
        onClose={() => setOpenFilterSection(null)}
        filters={filters}
        onChange={(next) => {
          setFilters(next);
          setHasInteracted(true);
        }}
      />
      <SortModal visible={sortModalOpen} onClose={() => setSortModalOpen(false)} value={sort} onChange={setSort} />
      <MapButton />
    </Screen>
  );
}
