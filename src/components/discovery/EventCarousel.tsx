import { ScrollView, View } from 'react-native';
import type { EventSummary } from '../../types/event';
import { spacing } from '../../design/tokens';
import { EventCard } from './EventCard';
import { PortraitEventCard } from './PortraitEventCard';

interface EventCarouselProps {
  events: EventSummary[];
  variant?: 'portrait' | 'landscape';
}

/** Event rails show one full card plus a strong partial peek on mobile. */
export function EventCarousel({ events, variant = 'portrait' }: EventCarouselProps) {
  if (variant === 'landscape') {
    return <View style={{ gap: spacing.md }}>{events.map((event) => <EventCard key={event.id} event={event} />)}</View>;
  }
  return (
    <ScrollView
      horizontal
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -spacing.screenX }}
      contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}
    >
      {events.map((event) => <PortraitEventCard key={event.id} event={event} />)}
    </ScrollView>
  );
}
