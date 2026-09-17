import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EventMap } from '../../components/map/EventMap';
import { MapPreviewCard } from '../../components/map/MapPreviewCard';
import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { FilterPanel } from '../../components/discovery/FilterPanel';
import { ChevronLeftIcon } from '../../components/layout/icons/MenuIcons';
import { Chip, IconButton, ErrorState, LoadingState, Text } from '../../components/ui';
import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatEventPrice } from '../../lib/formatPrice';
import { useEventsFeed } from '../../queries/events.queries';
import { DEFAULT_EVENT_FILTERS, type EventFiltersState } from '../../types/filters';
import type { EventMapPin } from '../../types/map';

/** Full-bleed map browsing: persistent search/filter overlay, price pins, selected-event card and list handoff. */
export function MapScreen() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_EVENT_FILTERS);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useEventsFeed({ tagId: filters.tagIds[0] });
  const events = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data?.events ?? []).filter((e) => e.coordinates && (!q || `${e.title} ${e.venueName ?? ''}`.toLowerCase().includes(q)));
  }, [data?.events, query]);
  const pins: EventMapPin[] = events.map((e) => ({ eventId: e.id, title: e.title, coordinate: e.coordinates!, priceLabel: formatEventPrice(e) }));
  const selected = events.find((e) => e.id === selectedEventId) ?? null;
  const goToList = () => router.replace('/(tabs)/search');

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      {isLoading ? <View style={{ paddingTop: insets.top + 100 }}><LoadingState rows={1} /></View> : isError ? (
        <View style={{ paddingTop: insets.top + 100, paddingHorizontal: spacing.screenX }}><ErrorState message="We couldn’t load the map." onRetry={() => refetch()} /></View>
      ) : <EventMap pins={pins} selectedEventId={selectedEventId} onSelectPin={(id) => setSelectedEventId((cur) => cur === id ? null : id)} />}

      <View style={{ position: 'absolute', left: spacing.md, right: spacing.md, top: insets.top + spacing.sm, gap: spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <IconButton accessibilityLabel="Back to list" onPress={goToList}><ChevronLeftIcon color={String(theme.colors.text)} size={22} /></IconButton>
          <View style={{ flex: 1 }}><SearchBarPill mode="input" placeholder="Search this area" value={query} onChangeText={setQuery} onFilterPress={() => setFilterPanelOpen(true)} hasActiveFilters={filters.tagIds.length > 0 || filters.dateFilter !== ''} /></View>
        </View>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <Chip label="Any date" active={!filters.dateFilter} onPress={() => setFilterPanelOpen(true)} />
          <Chip label="Categories" active={filters.tagIds.length > 0} onPress={() => setFilterPanelOpen(true)} />
        </View>
      </View>

      {selected ? <View style={{ position: 'absolute', left: spacing.md, right: spacing.md, bottom: insets.bottom + 78, borderRadius: radius.lg, backgroundColor: theme.colors.background, padding: spacing.md, ...shadows.raised }}><MapPreviewCard event={selected} /></View> : null}
      <Pressable onPress={goToList} accessibilityRole="button" style={({ pressed }) => ({ position: 'absolute', bottom: insets.bottom + spacing.md, alignSelf: 'center', backgroundColor: theme.colors.text, borderRadius: radius.full, paddingVertical: spacing.md, paddingHorizontal: spacing.xl, opacity: pressed ? .85 : 1, ...shadows.raised })}>
        <Text variant="bodyBold" color={theme.colors.background}>See {events.length} {events.length === 1 ? 'event' : 'events'}</Text>
      </Pressable>
      <FilterPanel visible={filterPanelOpen} onClose={() => setFilterPanelOpen(false)} filters={filters as Filters} onChange={setFilters as (next: Filters) => void} />
    </View>
  );
}
type Filters = FiltersState;
type FiltersState = EventFiltersState;
