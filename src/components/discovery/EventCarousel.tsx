import { View } from 'react-native';
import type { EventSummary } from '../../types/event';
import { spacing } from '../../design/tokens';
import { EventCard } from './EventCard';
import { PortraitEventCard } from './PortraitEventCard';

interface EventCarouselProps {
  events: EventSummary[];
  /** portrait = compact two-column discovery cards; landscape = full-width cards. */
  variant?: 'portrait' | 'landscape';
}

/** App discovery uses complete two-up cards, never a clipped third-card teaser. */
export function EventCarousel({ events, variant = 'portrait' }: EventCarouselProps) {
  if (variant === 'landscape') {
    return <View style={{ gap: spacing.md }}>{events.map((event) => <EventCard key={event.id} event={event} />)}</View>;
  }
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
      {events.slice(0, 4).map((event) => <PortraitEventCard key={event.id} event={event} grid />)}
    </View>
  );
}
