import { SectionHeader } from '../layout/SectionHeader';
import type { EventSummary } from '../../types/event';
import { EventCarousel } from '../discovery/EventCarousel';

/** "More worth seeing" carousel. */
export function SimilarEvents({ events }: { events: EventSummary[] }) {
  if (events.length === 0) return null;
  return (
    <>
      <SectionHeader title="More worth seeing" />
      <EventCarousel events={events} />
    </>
  );
}
