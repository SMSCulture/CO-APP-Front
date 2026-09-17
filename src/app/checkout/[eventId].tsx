import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { Button, LoadingState, Screen, Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { useEvent } from '../../queries/events.queries';
import type { EventRouteParams } from '../../types/navigation';

type TicketChoice = { id: string; name: string; detail: string };

/** Complete V1 ticket-selection path. Payment and inventory submission stay disabled until the consumer ticket API exists. */
export default function CheckoutRoute() {
  const { eventId } = useLocalSearchParams<EventRouteParams>();
  const { data: event, isLoading } = useEvent(eventId);
  const theme = useAppTheme();
  const [dateIndex, setDateIndex] = useState(0);
  const [ticket, setTicket] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  const choices = useMemo<TicketChoice[]>(() => [
    { id: 'standard', name: 'Standard admission', detail: event?.pricing ?? (event?.free ? 'Free' : 'Price pending') },
    { id: 'supporter', name: 'Support local culture', detail: 'Includes a direct contribution to the presenter' },
  ], [event?.free, event?.pricing]);

  if (isLoading || !event) return <Screen><LoadingState /></Screen>;
  const selectedDate = event.eventDates[dateIndex] ?? event.nextEventDate;

  return <Screen scroll>
    <AppHeader title="Choose tickets" subtitle={event.title} />
    <View style={{ gap: spacing.xl }}>
      <View style={{ gap: spacing.sm }}><Text variant="heading">Date and time</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>{event.eventDates.map((slot, index) => <Pressable key={`${slot.date}-${slot.startTime}`} onPress={() => setDateIndex(index)} style={{ borderWidth: 1, borderColor: index === dateIndex ? theme.colors.primary : theme.colors.border, backgroundColor: index === dateIndex ? theme.colors.chipActiveBackground : theme.colors.surface, borderRadius: radius.lg, padding: spacing.md }}><Text color={index === dateIndex ? theme.colors.chipActiveText : theme.colors.text}>{formatDateSlot(slot, event.startDate)}</Text></Pressable>)}</View></View>
      <View style={{ gap: spacing.sm }}><Text variant="heading">Ticket type</Text>{choices.map((choice) => <Pressable key={choice.id} onPress={() => setTicket(choice.id)} style={{ borderWidth: ticket === choice.id ? 2 : 1, borderColor: ticket === choice.id ? theme.colors.primary : theme.colors.border, borderRadius: radius.lg, padding: spacing.lg, gap: 4 }}><Text variant="bodyBold">{choice.name}</Text><Text variant="caption" muted>{choice.detail}</Text></Pressable>)}</View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}><View><Text variant="heading">Quantity</Text><Text variant="caption" muted>Up to 6 in V1</Text></View><View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}><Button label="−" variant="secondary" onPress={() => setQuantity((q) => Math.max(1, q - 1))} /><Text variant="heading">{quantity}</Text><Button label="+" variant="secondary" onPress={() => setQuantity((q) => Math.min(6, q + 1))} /></View></View>
      <View style={{ backgroundColor: theme.colors.surface, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.sm }}><Text variant="heading">Order preview</Text><Text>{choices.find((choice) => choice.id === ticket)?.name} × {quantity}</Text><Text muted>{selectedDate ? formatDateSlot(selectedDate, event.startDate) : 'Schedule pending'}</Text><Text variant="caption" muted>V1 demo: no inventory is held and nothing will be charged. The exact-price quote and checkout submit will activate with CultureOwl’s consumer ticket API.</Text></View>
      <Button label="Review demo order" fullWidth onPress={() => router.push({ pathname: '/checkout/confirmation', params: { demo: '1', event: event.title } })} />
    </View>
  </Screen>;
}
