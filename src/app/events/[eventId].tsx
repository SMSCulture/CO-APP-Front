import { useLocalSearchParams } from 'expo-router';

import { EventDetailScreen } from '../../features/event-detail/EventDetailScreen';
import type { EventRouteParams } from '../../types/navigation';

export default function EventRoute() {
  const { eventId } = useLocalSearchParams<EventRouteParams>();
  return <EventDetailScreen eventId={eventId} />;
}
