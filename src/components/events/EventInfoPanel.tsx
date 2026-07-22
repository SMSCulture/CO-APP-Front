import { View } from 'react-native';

import { MapPinIcon } from '../layout/icons/MenuIcons';
import { TicketTabIcon } from '../layout/icons/TabIcons';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventPrice } from '../../lib/formatPrice';
import type { EventDetail } from '../../types/event';
import { Card, Text } from '../ui';
import { EventMetaRow } from './EventMetaRow';

/** Date / location / price summary panel. */
export function EventInfoPanel({ event }: { event: EventDetail }) {
  const theme = useAppTheme();
  const iconColor = String(theme.colors.text);

  return (
    <Card>
      <View style={{ gap: spacing.lg }}>
        <EventMetaRow
          icon={<Text variant="subheading">🗓</Text>}
          primary={formatDateSlot(event.nextEventDate, event.startDate)}
          secondary={
            event.eventDates.length > 1 ? `+${event.eventDates.length - 1} more dates` : null
          }
        />
        <EventMetaRow
          icon={<MapPinIcon color={iconColor} size={20} />}
          primary={event.virtual ? 'Virtual event' : (event.venueName ?? event.city)}
          secondary={event.address}
        />
        <EventMetaRow icon={<TicketTabIcon color={iconColor} size={20} />} primary={formatEventPrice(event)} />
      </View>
    </Card>
  );
}
