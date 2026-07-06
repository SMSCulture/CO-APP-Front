import { View } from 'react-native';

import { EventCard } from '../../../components/discovery/EventCard';
import { EmptyState } from '../../../components/ui';
import { spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';

/** Vertical list sorted by distance (publicEventsFeed provides distanceMiles). */
export function NearbyEventsSection({ events }: { events: EventSummary[] }) {
  const nearby = [...events]
    .filter((e) => e.distanceMiles != null)
    .sort((a, b) => (a.distanceMiles ?? 0) - (b.distanceMiles ?? 0))
    .slice(0, 4);

  if (nearby.length === 0) {
    return <EmptyState title="No nearby events" message="Try another city or category." />;
  }
  return (
    <View style={{ gap: spacing.lg }}>
      {nearby.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </View>
  );
}
