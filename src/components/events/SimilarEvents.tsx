import { SectionHeader } from '../layout/SectionHeader';
import type { EventSummary } from '../../types/event';
import { EventCarousel } from '../discovery/EventCarousel';

/** "You might also like" carousel. */
export function SimilarEvents({ events }: { events: EventSummary[] }) {
  if (events.length === 0) return null;
  return (
    <>
      <SectionHeader title="You might also like" />
      <EventCarousel events={events} />
    </>
  );
}
