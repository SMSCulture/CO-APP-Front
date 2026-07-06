import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { EventMap } from '../../components/map/EventMap';
import { MapPreviewCard } from '../../components/map/MapPreviewCard';
import { Button, ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { formatEventPrice } from '../../lib/formatPrice';
import { useEventsFeed } from '../../queries/events.queries';
import type { EventMapPin } from '../../types/map';

export function MapScreen() {
  const { data, isLoading, isError, refetch } = useEventsFeed({});
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const events = useMemo(
    () => (data?.events ?? []).filter((e) => e.coordinates != null),
    [data?.events],
  );
  const pins: EventMapPin[] = events.map((e) => ({
    eventId: e.id,
    title: e.title,
    coordinate: e.coordinates!,
    priceLabel: formatEventPrice(e),
  }));
  const selected = events.find((e) => e.id === selectedEventId) ?? null;

  return (
    <Screen>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: spacing.lg,
        }}
      >
        <Text variant="title">Map</Text>
        <Button label="List view" variant="secondary" onPress={() => router.back()} />
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
        </View>
      )}
    </Screen>
  );
}
