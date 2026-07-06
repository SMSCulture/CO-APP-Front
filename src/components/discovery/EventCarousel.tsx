import { HorizontalCarousel } from '../layout/HorizontalCarousel';
import type { EventSummary } from '../../types/event';
import { EventCard } from './EventCard';

export function EventCarousel({ events }: { events: EventSummary[] }) {
  return (
    <HorizontalCarousel>
      {events.map((event) => (
        <EventCard key={event.id} event={event} width={280} />
      ))}
    </HorizontalCarousel>
  );
}
