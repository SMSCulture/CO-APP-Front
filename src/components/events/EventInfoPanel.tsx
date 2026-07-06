import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventPrice } from '../../lib/formatPrice';
import type { EventDetail } from '../../types/event';
import { Card } from '../ui';
import { EventMetaRow } from './EventMetaRow';

/** Date / location / price summary panel. */
export function EventInfoPanel({ event }: { event: EventDetail }) {
  return (
    <Card>
      <View style={{ gap: spacing.lg }}>
        <EventMetaRow
          icon="🗓"
          primary={formatDateSlot(event.nextEventDate, event.startDate)}
          secondary={
            event.eventDates.length > 1 ? `+${event.eventDates.length - 1} more dates` : null
          }
        />
        <EventMetaRow
          icon="📍"
          primary={event.virtual ? 'Virtual event' : (event.venueName ?? event.city)}
          secondary={event.address}
        />
        <EventMetaRow icon="🎟" primary={formatEventPrice(event)} />
      </View>
    </Card>
  );
}
