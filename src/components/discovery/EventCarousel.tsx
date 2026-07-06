import { HorizontalCarousel } from '../layout/HorizontalCarousel';
import type { EventSummary } from '../../types/event';
import { EventCard } from './EventCard';
import { PortraitEventCard } from './PortraitEventCard';

interface EventCarouselProps {
  events: EventSummary[];
  /** portrait = tall discovery cards (home rows); landscape = wide cards. */
  variant?: 'portrait' | 'landscape';
}

export function EventCarousel({ events, variant = 'portrait' }: EventCarouselProps) {
  return (
    <HorizontalCarousel>
      {events.map((event) =>
        variant === 'portrait' ? (
          <PortraitEventCard key={event.id} event={event} />
        ) : (
          <EventCard key={event.id} event={event} width={280} />
        ),
      )}
    </HorizontalCarousel>
  );
}
