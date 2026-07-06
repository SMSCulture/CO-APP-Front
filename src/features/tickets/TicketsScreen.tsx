import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Button, EmptyState, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAuth } from '../../auth/useAuth';
import { useMyTickets } from '../../queries/tickets.queries';
import { TicketCard } from './components/TicketCard';
import { TicketQRCodePlaceholder } from './components/TicketQRCodePlaceholder';

export function TicketsScreen() {
  const { isAuthenticated } = useAuth();
  const { data: tickets, isLoading } = useMyTickets(isAuthenticated);
  const [openTicketId, setOpenTicketId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <Screen>
        <AppHeader title="Tickets" />
        <EmptyState
          title="Sign in to see your tickets"
          message="Your upcoming and past tickets will live here."
        />
        <Button label="Sign in" fullWidth onPress={() => router.push('/(public)/login')} />
      </Screen>
    );
  }

  const upcoming = (tickets ?? []).filter((t) => t.status === 'UPCOMING');
  const past = (tickets ?? []).filter((t) => t.status !== 'UPCOMING');
  const openTicket = (tickets ?? []).find((t) => t.id === openTicketId);

  return (
    <Screen scroll>
      <AppHeader title="Tickets" />
      {isLoading ? (
        <LoadingState rows={2} />
      ) : (
        <>
          <SectionHeader title="Upcoming" />
          {upcoming.length === 0 ? (
            <EmptyState
              title="No upcoming tickets"
              message="When you get tickets to an event, they’ll show up here."
              actionLabel="Discover events"
              onAction={() => router.push('/(tabs)/home')}
            />
          ) : (
            <View style={{ gap: spacing.lg }}>
              {upcoming.map((ticket) => (
                <View key={ticket.id} style={{ gap: spacing.lg }}>
                  <TicketCard
                    ticket={ticket}
                    onPress={() => setOpenTicketId((cur) => (cur === ticket.id ? null : ticket.id))}
                  />
                  {openTicketId === ticket.id && openTicket ? (
                    <TicketQRCodePlaceholder payload={openTicket.qrPayload} />
                  ) : null}
                </View>
              ))}
            </View>
          )}

          <SectionHeader title="Past" />
          {past.length === 0 ? (
            <Text muted>No past tickets yet.</Text>
          ) : (
            <View style={{ gap: spacing.lg }}>
              {past.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </View>
          )}
        </>
      )}
    </Screen>
  );
}
