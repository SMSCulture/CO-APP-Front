import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { EventMap } from '../../components/map/EventMap';
import { MapPreviewCard } from '../../components/map/MapPreviewCard';
import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { FilterPanel } from '../../components/discovery/FilterPanel';
import { ChevronLeftIcon } from '../../components/layout/icons/MenuIcons';
import { IconButton, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatEventPrice } from '../../lib/formatPrice';
import { useEventsFeed } from '../../queries/events.queries';
import { DEFAULT_EVENT_FILTERS, type EventFiltersState } from '../../types/filters';
import type { EventMapPin } from '../../types/map';

/**
 * Top row: back arrow (returns to List view) + search bar with the filter
 * icon docked inside, matching Search's SearchBarPill exactly instead of a
 * one-off "Map" title + "List view" button. Bottom: a floating pill mirrors
 * MapButton's style/position but reversed — "See N events near you" jumps
 * back to the list instead of to the map.
 */
export function MapScreen() {
  const theme = useAppTheme();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<EventFiltersState>(DEFAULT_EVENT_FILTERS);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  // EventsFeedInput only supports a single tagId (no date filter) today, so
  // that's the one FilterPanel field actually wired into the query here —
  // the Date section still shows/updates `filters`, just isn't applied yet.
  const { data, isLoading, isError, refetch } = useEventsFeed({ tagId: filters.tagIds[0] });

  const events = useMemo(() => {
    const withCoords = (data?.events ?? []).filter((e) => e.coordinates != null);
    const q = query.trim().toLowerCase();
    return q ? withCoords.filter((e) => e.title.toLowerCase().includes(q)) : withCoords;
  }, [data?.events, query]);

  const pins: EventMapPin[] = events.map((e) => ({
    eventId: e.id,
    title: e.title,
    coordinate: e.coordinates!,
    priceLabel: formatEventPrice(e),
  }));
  const selected = events.find((e) => e.id === selectedEventId) ?? null;

  const goBackToList = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/search');
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.lg }}>
        <IconButton accessibilityLabel="Back to list" onPress={goBackToList} transparent>
          <ChevronLeftIcon color={String(theme.colors.text)} size={22} />
        </IconButton>
        <View style={{ flex: 1 }}>
          <SearchBarPill
            mode="input"
            placeholder="Search this map"
            value={query}
            onChangeText={setQuery}
            onFilterPress={() => setFilterPanelOpen(true)}
            hasActiveFilters={filters.tagIds.length > 0 || filters.dateFilter !== ''}
          />
        </View>
      </View>

      {isLoading ? (
        <LoadingState rows={1} />
      ) : isError ? (
        <ErrorState message="We couldn’t load the map." onRetry={() => refetch()} />
      ) : (
        <View style={{ flex: 1, gap: spacing.lg, paddingBottom: spacing.xl }}>
          <EventMap
            pins={pins}
            selectedEventId={selectedEventId}
            onSelectPin={(id) => setSelectedEventId((cur) => (cur === id ? null : id))}
          />
          {selected ? <MapPreviewCard event={selected} /> : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`See ${events.length} events near you`}
            onPress={goBackToList}
            style={({ pressed }) => ({
              position: 'absolute',
              bottom: spacing.xl,
              alignSelf: 'center',
              backgroundColor: theme.colors.text,
              borderRadius: radius.full,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xl,
              opacity: pressed ? 0.85 : 1,
              ...shadows.raised,
            })}
          >
            <Text variant="bodyBold" color={theme.colors.background}>
              See {events.length} {events.length === 1 ? 'Event' : 'Events'} near you
            </Text>
          </Pressable>
        </View>
      )}

      <FilterPanel
        visible={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        filters={filters}
        onChange={setFilters}
      />
    </Screen>
  );
}
