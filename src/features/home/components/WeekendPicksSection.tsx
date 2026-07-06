import { EventCarousel } from '../../../components/discovery/EventCarousel';
import { EmptyState } from '../../../components/ui';
import type { EventSummary } from '../../../types/event';

export function WeekendPicksSection({ events }: { events: EventSummary[] }) {
  const picks = events.slice(1, 5);
  if (picks.length === 0) {
    return <EmptyState title="Nothing this weekend yet" message="Check back soon." />;
  }
  return <EventCarousel events={picks} />;
}
