import { Image } from 'expo-image';
import { View } from 'react-native';

import { Badge, Card, Text } from '../../../components/ui';
import { spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { formatEventDate, formatTime } from '../../../lib/formatDate';
import { formatCurrency } from '../../../lib/formatPrice';
import type { PurchasedTicket } from '../../../types/ticket';

const STATUS_COLORS: Record<PurchasedTicket['status'], string> = {
  UPCOMING: '#3d98d3',
  USED: '#6d7276',
  EXPIRED: '#6d7276',
  CANCELLED: '#e74e3d',
};

export function TicketCard({ ticket, onPress }: { ticket: PurchasedTicket; onPress?: () => void }) {
  const theme = useAppTheme();
  return (
    <Card padded={false} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: ticket.eventImageUrl ?? undefined }}
          style={{ width: 100, backgroundColor: theme.colors.skeleton }}
          contentFit="cover"
        />
        <View style={{ flex: 1, padding: spacing.md, gap: spacing.xs }}>
          <Badge label={ticket.status} color={STATUS_COLORS[ticket.status]} />
          <Text variant="subheading" numberOfLines={2}>
            {ticket.eventTitle}
          </Text>
          <Text variant="caption" muted>
            {formatEventDate(ticket.date)}
            {ticket.startTime ? ` · ${formatTime(ticket.startTime)}` : ''} · {ticket.venueName}
          </Text>
          <Text variant="caption" muted>
            {ticket.quantity} × ticket · {formatCurrency(ticket.totalPrice)}
          </Text>
        </View>
      </View>
    </Card>
  );
}
