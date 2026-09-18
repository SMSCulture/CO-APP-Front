import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EventMap } from '../../components/map/EventMap';
import { MapPreviewCard } from '../../components/map/MapPreviewCard';
import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { FilterPanel } from '../../components/discovery/FilterPanel';
import { FilterPillRow } from '../../components/discovery/FilterPillRow';
import { SortModal, type SortOption } from '../../components/discovery/SortModal';
import { ChevronLeftIcon, MapPinIcon } from '../../components/layout/icons/MenuIcons';
import { IconButton, ErrorState, LoadingState, Text } from '../../components/ui';
import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatEventPrice } from '../../lib/formatPrice';
import { useEventsFeed } from '../../queries/events.queries';
import { DEFAULT_EVENT_FILTERS, type EventFiltersState } from '../../types/filters';
import type { EventMapPin, MapViewport } from '../../types/map';
import type { EventSummary } from '../../types/event';

const starts = (event: EventSummary) =>
  new Date(`${event.startDate}T${event.nextEventDate?.startTime ?? '00:00'}`).getTime();
const price = (event: EventSummary) =>
  event.free ? 0 : Number(event.pricing?.match(/[\d.]+/)?.[0] ?? 999999);
function dateMatches(event: EventSummary, filters: EventFiltersState) {
  if (!filters.dateFilter && !filters.customDate) return true;
  const day = new Date(`${event.startDate}T12:00:00`),
    now = new Date();
  if (filters.customDate)
    return (
      event.startDate >= filters.customDate &&
      event.startDate <= (filters.customDateEnd ?? filters.customDate)
    );
  if (filters.dateFilter === 'TODAY') return day.toDateString() === now.toDateString();
  if (filters.dateFilter === 'THIS_WEEKEND') {
    const d = day.getDay();
    return d === 0 || d === 6;
  }
  return true;
}
export function MapScreen() {
  const theme = useAppTheme(),
    insets = useSafeAreaInsets();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_EVENT_FILTERS);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filterSection, setFilterSection] = useState<'date' | 'category'>('date');
  const [sort, setSort] = useState<SortOption>('POPULARITY');
  const [sortOpen, setSortOpen] = useState(false);
  const [viewport, setViewport] = useState<MapViewport | null>(null);
  const [recenterTo, setRecenterTo] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );
  const [pendingViewport, setPendingViewport] = useState<MapViewport | null>(null);
  const { data, isLoading, isError, refetch, isFetching } = useEventsFeed({
    tagId: filters.tagIds[0],
    latitude: viewport?.latitude,
    longitude: viewport?.longitude,
    bounds: viewport?.bounds,
  });
  const events = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = (data?.events ?? []).filter(
      (e) =>
        e.coordinates &&
        dateMatches(e, filters) &&
        (!viewport ||
          (e.coordinates.latitude <= viewport.bounds.north &&
            e.coordinates.latitude >= viewport.bounds.south &&
            e.coordinates.longitude <= viewport.bounds.east &&
            e.coordinates.longitude >= viewport.bounds.west)) &&
        (!q || `${e.title} ${e.venueName ?? ''}`.toLowerCase().includes(q)),
    );
    return sort === 'DATE'
      ? visible.sort((a, b) => starts(a) - starts(b))
      : sort === 'PRICE_ASC'
        ? visible.sort((a, b) => price(a) - price(b))
        : visible;
  }, [data?.events, filters, query, sort, viewport]);
  const pins: EventMapPin[] = events.map((e) => ({
    entityKind: 'event',
    eventId: e.id,
    title: e.title,
    coordinate: e.coordinates!,
    priceLabel: formatEventPrice(e),
    category: e.tags[0]?.id ?? 'event',
  }));
  const selected = events.find((e) => e.id === selectedEventId) ?? null;
  const mapMoved =
    pendingViewport &&
    viewport &&
    (Math.abs(pendingViewport.latitude - viewport.latitude) > 0.001 ||
      Math.abs(pendingViewport.longitude - viewport.longitude) > 0.001 ||
      Math.abs(pendingViewport.zoom - viewport.zoom) > 0.05);
  const receiveViewport = (next: MapViewport) => {
    if (!viewport) setViewport(next);
    else setPendingViewport(next);
  };
  const applyArea = () => {
    if (pendingViewport) setViewport(pendingViewport);
    setSelectedEventId(null);
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      {isLoading ? (
        <View style={{ paddingTop: insets.top + 100 }}>
          <LoadingState rows={1} />
        </View>
      ) : isError ? (
        <View style={{ paddingTop: insets.top + 100, paddingHorizontal: spacing.screenX }}>
          <ErrorState message="We couldn’t load the map." onRetry={() => refetch()} />
        </View>
      ) : (
        <EventMap
          pins={pins}
          selectedEventId={selectedEventId}
          onSelectPin={(id) => setSelectedEventId(id)}
          onViewportChange={receiveViewport}
          recenterTo={recenterTo}
        />
      )}
      <View
        style={{
          position: 'absolute',
          left: spacing.md,
          right: spacing.md,
          top: insets.top + spacing.sm,
          gap: spacing.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <IconButton
            accessibilityLabel="Back to list"
            onPress={() => router.replace('/(tabs)/search')}
          >
            <ChevronLeftIcon color={String(theme.colors.text)} size={22} />
          </IconButton>
          <View style={{ flex: 1 }}>
            <SearchBarPill
              mode="input"
              placeholder="Discover events, venues, restaurants…"
              value={query}
              onChangeText={setQuery}
              showFilterIcon={false}
            />
          </View>
        </View>
        <FilterPillRow
          dateActive={!!filters.dateFilter || !!filters.customDate}
          categoryActive={!!filters.tagIds.length}
          sortActive={sort !== 'POPULARITY'}
          onDatePress={() => {
            setFilterSection('date');
            setFilterPanelOpen(true);
          }}
          onCategoryPress={() => {
            setFilterSection('category');
            setFilterPanelOpen(true);
          }}
          onSortPress={() => setSortOpen(true)}
        />
        {mapMoved ? (
          <Pressable
            onPress={applyArea}
            style={{
              alignSelf: 'center',
              backgroundColor: theme.colors.text,
              borderRadius: radius.full,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.lg,
              ...shadows.raised,
            }}
          >
            <Text variant="bodyBold" color={theme.colors.background}>
              ↻ Search this area
            </Text>
          </Pressable>
        ) : null}
        {isFetching ? (
          <Text variant="caption" style={{ alignSelf: 'center' }} muted>
            Refreshing this area…
          </Text>
        ) : null}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Use my location"
        onPress={() => {
          const target = {
            latitude: viewport?.latitude ?? 25.7743,
            longitude: viewport?.longitude ?? -80.1937,
          };
          setRecenterTo(target);
          setPendingViewport(null);
        }}
        style={{
          position: 'absolute',
          right: spacing.md,
          bottom: selected ? insets.bottom + 260 : insets.bottom + 86,
          width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.raised,
        }}
      >
        <MapPinIcon color={String(theme.colors.onPrimary)} size={22} />
      </Pressable>
      {selected ? (
        <View
          style={{
            position: 'absolute',
            left: spacing.md,
            right: spacing.md,
            bottom: insets.bottom + 76,
            borderRadius: radius.xl,
            backgroundColor: theme.colors.background,
            padding: spacing.md,
            ...shadows.raised,
          }}
        >
          <MapPreviewCard event={selected} />
        </View>
      ) : null}
      <Pressable
        onPress={() => router.replace('/(tabs)/search')}
        style={({ pressed }) => ({
          position: 'absolute',
          bottom: insets.bottom + spacing.md,
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
          See {events.length} {events.length === 1 ? 'Experience' : 'Experiences'}
        </Text>
      </Pressable>
      <FilterPanel
        visible={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        filters={filters}
        onChange={setFilters}
        initialSection={filterSection}
      />
      <SortModal
        visible={sortOpen}
        onClose={() => setSortOpen(false)}
        value={sort}
        onChange={setSort}
      />
    </View>
  );
}
