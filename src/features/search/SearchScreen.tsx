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
import { SearchDestinations } from '../../components/discovery/SearchDestinations';
import { SortModal, type SortOption } from '../../components/discovery/SortModal';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { StaggeredReveal } from '../../components/layout/StaggeredReveal';
import { EmptyState, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useDebounce } from '../../hooks/useDebounce';
import { useMainGenres } from '../../queries/genres.queries';
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
    case 'DISTANCE':
      return sorted.sort((a, b) => (a.distanceMiles ?? Number.MAX_SAFE_INTEGER) - (b.distanceMiles ?? Number.MAX_SAFE_INTEGER));
    case 'POPULARITY':
    case 'RATING':
      return sorted;
    case 'DATE':
    default:
      return sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }
}

/**
 * CultureOwl search follows a familiar discovery rhythm: browse first, then
 * search/filter/sort results. Its jump destinations and six genres are our
 * own information architecture, and results stay virtualized with FlatList.
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
  const [sort, setSort] = useState<SortOption>('POPULARITY');
  // Already-active filters from Home's popup (or a Discover category tap)
  // mean the user has effectively already searched — go straight to results.
  const [hasInteracted, setHasInteracted] = useState(hasActiveFilters(initialFilters));
  const [inputActive, setInputActive] = useState(hasActiveFilters(initialFilters));
  const [openFilterSection, setOpenFilterSection] = useState<'date' | 'category' | null>(null);
  const [sortModalOpen, setSortModalOpen] = useState(false);

  const { data: genres } = useMainGenres();
  // The selected category's name shows on the Category filter pill (see
  // FilterPillRow's categoryLabel), NOT in the search box — the search box
  // is for actual search terms; the pill is what tells people what category
  // they're currently on.
  const categoryLabel = filters.tagIds.length === 1 ? genres?.find((g) => g.id === filters.tagIds[0])?.display : undefined;

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
    // Enter typing mode but keep the browse page in place until there is a term.
    setInputActive(true);
  };

  const changeTerm = (next: string) => {
    setTerm(next);
    setHasInteracted(next.trim().length > 0 || hasActiveFilters(filters));
  };

  const clearSearch = () => {
    setTerm('');
    setHasInteracted(hasActiveFilters(filters));
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
      <View style={{ gap: spacing.md, marginBottom: spacing.lg, marginTop: spacing.lg }}>
        <SearchBarPill
          mode={inputActive ? 'input' : 'link'}
          placeholder="Discover cities, events, venues…"
          value={term}
          onChangeText={changeTerm}
          onPress={activateSearch}
          autoFocus={inputActive}
          onClear={clearSearch}
          showFilterIcon={false}
        />
        <FilterPillRow
          dateActive={filters.dateFilter !== ''}
          categoryActive={filters.tagIds.length > 0}
          categoryLabel={categoryLabel}
          sortActive={sort !== 'POPULARITY'}
          onDatePress={() => setOpenFilterSection('date')}
          onCategoryPress={() => setOpenFilterSection('category')}
          onSortPress={() => setSortModalOpen(true)}
        />
      </View>

      {showBrowseState ? (
        <View style={{ gap: spacing.xl }}>
          <StaggeredReveal>
            <SectionHeader title="Popular Searches" />
            <PopularSearchesRow onSelect={selectPopularSearch} />
          </StaggeredReveal>
          <StaggeredReveal delay={55}>
            <SectionHeader title="Jump into CultureOwl" />
            <SearchDestinations />
          </StaggeredReveal>
          <StaggeredReveal delay={110}>
            <SectionHeader title="Explore Six Genres" />
            <CategoryRectangleGrid onSelect={selectCategory} />
          </StaggeredReveal>
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
          contentContainerStyle={{ gap: spacing.xl, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            debouncedTerm ? (
              <View style={{ gap: spacing.md, paddingBottom: spacing.lg }}>
                <Text variant="subheading">Suggestions</Text>
                <Text variant="bodyBold">{debouncedTerm}</Text>
                <Text variant="subheading" style={{ paddingTop: spacing.sm }}>Experiences</Text>
              </View>
            ) : null
          }
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
