import { SectionHeader } from '../layout/SectionHeader';
import type { EventSummary } from '../../types/event';
import { EventCarousel } from '../discovery/EventCarousel';

/** "The Owl suggests" carousel. */
export function SimilarEvents({ events }: { events: EventSummary[] }) {
  if (events.length === 0) return null;
  return (
    <>
      <SectionHeader title="The Owl suggests" />
      <EventCarousel events={events} />
    </>
  );
}
