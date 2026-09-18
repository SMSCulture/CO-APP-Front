import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Button, Chip, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useAuth } from '../../auth/useAuth';
import { useMyTickets } from '../../queries/tickets.queries';
import { TicketCard } from './components/TicketCard';
import { TicketQRCodePlaceholder } from './components/TicketQRCodePlaceholder';

type TicketTab = 'UPCOMING' | 'EXPIRED';

function TicketIllustration({ expired = false }: { expired?: boolean }) {
  return (
    <View style={{ width: 138, height: 138, borderRadius: 69, backgroundColor: expired ? '#f4f4f4' : '#e8f4fb', alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={92} height={92} viewBox="0 0 92 92">
        <Path d="M17 30h58v10c-5 0-8 3-8 7s3 7 8 7v10H17V54c5 0 8-3 8-7s-3-7-8-7V30Z" fill={expired ? '#a9adb0' : '#ef6b62'} />
        <Rect x="34" y="38" width="25" height="18" rx="3" fill="none" stroke="#703b3b" strokeWidth="3" />
        <Path d="M43 47h9" stroke="#703b3b" strokeWidth="3" strokeLinecap="round" />
        <Circle cx="17" cy="30" r="3" fill="#f47d30" />
      </Svg>
    </View>
  );
}

function EmptyTickets({ expired = false, onRefresh, isRefreshing, signedOut = false }: { expired?: boolean; onRefresh: () => void; isRefreshing: boolean; signedOut?: boolean }) {
  const theme = useAppTheme();
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingBottom: 70 }}>
    <TicketIllustration expired={expired} />
    <Text variant="title" style={{ textAlign: 'center' }}>{expired ? 'No expired tickets' : 'No active tickets'}</Text>
    <Text muted style={{ textAlign: 'center' }}>{expired ? 'Past tickets will collect here.' : 'Bought tickets but can’t find them?'}</Text>
    {!expired ? <Button label="Refresh" fullWidth loading={isRefreshing} onPress={onRefresh} /> : null}
    {!expired ? <Text variant="bodyBold" color={theme.colors.primary} onPress={() => router.push('/help')}>Need help? Get support here</Text> : null}
    {signedOut ? <Text variant="caption" muted onPress={() => router.push('/(public)/login')}>Sign in to sync tickets from your account.</Text> : null}
  </View>;
}

export function TicketsScreen() {
  const theme = useAppTheme();
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}><DetailScreenHeader title="Tickets" showBack={false} /></View>
        <Pressable accessibilityRole="button" accessibilityLabel="Open ticket help" onPress={() => router.push('/help')} style={{ position: 'absolute', right: 0, width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, alignItems: 'center', justifyContent: 'center' }}><Text variant="bodyBold">?</Text></Pressable>
      </View>

      {/* Upcoming/Expired pills show even signed out — people should be able
          to see the shape of the feature before signing in, not just a wall
          of "please sign in" with no context. Pushed down a bit further
          from the header per explicit request. */}
      <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl, marginBottom: spacing.lg }}>
        <Chip label="Upcoming" active={tab === 'UPCOMING'} onPress={() => setTab('UPCOMING')} />
        <Chip label="Expired" active={tab === 'EXPIRED'} onPress={() => setTab('EXPIRED')} />
      </View>

      {!isAuthenticated ? (
        <EmptyTickets onRefresh={() => refetch()} isRefreshing={isRefetching} signedOut />
      ) : isLoading ? (
        <LoadingState rows={2} />
      ) : visible.length === 0 ? (
        <EmptyTickets expired={tab === 'EXPIRED'} onRefresh={() => refetch()} isRefreshing={isRefetching} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing['3xl'] }}>
          <View style={{ gap: spacing.lg }}>
            {visible.map((ticket) => (
              <View key={ticket.id} style={{ gap: spacing.lg }}>
                <TicketCard ticket={ticket} onPress={tab === 'UPCOMING' ? () => setOpenTicketId((cur) => (cur === ticket.id ? null : ticket.id)) : undefined} />
                {tab === 'UPCOMING' && openTicketId === ticket.id && openTicket ? <TicketQRCodePlaceholder payload={openTicket.qrPayload} /> : null}
              </View>
            ))}
          </View>
        </ScrollView>
      )}

    </Screen>
  );
}
