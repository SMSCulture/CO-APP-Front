import { View } from 'react-native';

import { FeaturedEventCard } from '../../../components/discovery/FeaturedEventCard';
import { spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';

/** Hero area: the first feed event gets the large featured treatment. */
export function FeaturedEventsSection({ events }: { events: EventSummary[] }) {
  const featured = events[0];
  if (!featured) return null;
  return (
    <View style={{ marginTop: spacing.xl }}>
      <FeaturedEventCard event={featured} />
    </View>
  );
}
