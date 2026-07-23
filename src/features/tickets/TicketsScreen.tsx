import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Button, Chip, EmptyState, LoadingState, Screen, Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useAuth } from '../../auth/useAuth';
import { useMyTickets } from '../../queries/tickets.queries';
import { TicketCard } from './components/TicketCard';
import { TicketQRCodePlaceholder } from './components/TicketQRCodePlaceholder';

type TicketTab = 'UPCOMING' | 'EXPIRED';

const appLogo = require('../../../assets/images/icon.png');

/** Branded mark for empty states — no tickets, or signed out. */
function TicketsLogo() {
  return <Image source={appLogo} style={{ width: 64, height: 64, borderRadius: 16 }} contentFit="cover" />;
}

/** "Already have tickets but don't see them?" nudge + Refresh, plus a Help link — shown under any empty ticket list. */
function MissingTicketsHelp({ onRefresh, isRefreshing }: { onRefresh: () => void; isRefreshing: boolean }) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        marginTop: spacing.xl,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: spacing.lg,
        gap: spacing.sm,
        alignItems: 'center',
      }}
    >
      <Text variant="bodyBold" style={{ textAlign: 'center' }}>
        Already got tickets and don’t see them here?
      </Text>
      <Text variant="caption" muted style={{ textAlign: 'center' }}>
        A quick refresh usually pulls in anything new.
      </Text>
      <Button label="Refresh" variant="secondary" loading={isRefreshing} onPress={onRefresh} />
      <Text
        variant="caption"
        color={theme.colors.primary}
        style={{ marginTop: spacing.xs }}
        onPress={() => router.push('/help')}
      >
        Still stuck? Our support team can help.
      </Text>
    </View>
  );
}

export function TicketsScreen() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth();
  const { data: tickets, isLoading, refetch, isRefetching } = useMyTickets(isAuthenticated);
  const [openTicketId, setOpenTicketId] = useState<string | null>(null);
  const [tab, setTab] = useState<TicketTab>('UPCOMING');

  const upcoming = (tickets ?? []).filter((t) => t.status === 'UPCOMING');
  const expired = (tickets ?? []).filter((t) => t.status !== 'UPCOMING');
  const openTicket = (tickets ?? []).find((t) => t.id === openTicketId);
  const visible = tab === 'UPCOMING' ? upcoming : expired;

  return (
    // Not Screen's own `scroll` mode — the sign-in bar below needs to sit
    // outside the scrollable area so it stays pinned to the bottom instead
    // of scrolling away with the ticket list.
    <Screen>
      <DetailScreenHeader title="Tickets" showBack={false} />

      {/* Upcoming/Expired pills show even signed out — people should be able
          to see the shape of the feature before signing in, not just a wall
          of "please sign in" with no context. Pushed down a bit further
          from the header per explicit request. */}
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl, marginBottom: spacing.lg }}>
        <Chip label="Upcoming" active={tab === 'UPCOMING'} onPress={() => setTab('UPCOMING')} />
        <Chip label="Expired" active={tab === 'EXPIRED'} onPress={() => setTab('EXPIRED')} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing['3xl'] }}>
        {!isAuthenticated ? (
          <EmptyState
            image={<TicketsLogo />}
            title="Sign in to see your tickets"
            message="Your upcoming and past tickets will live here."
          />
        ) : isLoading ? (
          <LoadingState rows={2} />
        ) : visible.length === 0 ? (
          <>
            {tab === 'UPCOMING' ? (
              <EmptyState
                image={<TicketsLogo />}
                title="No active tickets"
                message="Grab tickets to something and they’ll land right here."
                actionLabel="Discover events"
                onAction={() => router.push('/(tabs)/home')}
              />
            ) : (
              <EmptyState image={<TicketsLogo />} title="Nothing in your history yet" message="Past tickets will collect here." />
            )}
            <MissingTicketsHelp onRefresh={() => refetch()} isRefreshing={isRefetching} />
          </>
        ) : (
          <View style={{ gap: spacing.lg }}>
            {visible.map((ticket) => (
              <View key={ticket.id} style={{ gap: spacing.lg }}>
                <TicketCard
                  ticket={ticket}
                  onPress={
                    tab === 'UPCOMING' ? () => setOpenTicketId((cur) => (cur === ticket.id ? null : ticket.id)) : undefined
                  }
                />
                {tab === 'UPCOMING' && openTicketId === ticket.id && openTicket ? (
                  <TicketQRCodePlaceholder payload={openTicket.qrPayload} />
                ) : null}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {!isAuthenticated ? (
        <View
          style={{
            marginHorizontal: -spacing.screenX,
            padding: spacing.lg,
            paddingBottom: insets.bottom + spacing.md,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}
        >
          <Button label="Sign in" fullWidth onPress={() => router.push('/(public)/login')} />
        </View>
      ) : null}
    </Screen>
  );
}
