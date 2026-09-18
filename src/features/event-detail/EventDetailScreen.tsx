import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EventActions } from '../../components/events/EventActions';
import { EventHero } from '../../components/events/EventHero';
import { EventInfoPanel } from '../../components/events/EventInfoPanel';
import { EventOrganizerCard } from '../../components/events/EventOrganizerCard';
import { SimilarEvents } from '../../components/events/SimilarEvents';
import { ChevronLeftIcon } from '../../components/layout/icons/MenuIcons';
import { Button, ErrorState, IconButton, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { trackEvent } from '../../lib/analytics';
import { useEvent, useEventsFeed } from '../../queries/events.queries';
import { useFavoriteToggle } from '../../queries/favorites.queries';
import { EventSocialContext } from '../../components/social/EventSocialContext';
import { InviteFriendsSheet } from '../../components/social/InviteFriendsSheet';
import { CURRENT_USER_ID, useSocialStore } from '../../store/socialStore';

export function EventDetailScreen({ eventId }: { eventId: string }) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: event, isLoading, isError, refetch } = useEvent(eventId);
  const { data: feed } = useEventsFeed({});
  // Called before the early returns (rules of hooks) — useFavoriteToggle
  // tolerates `event` being undefined while still loading.
  const { isFavorite: saved, toggle } = useFavoriteToggle('event', event);
  const [inviteOpen, setInviteOpen] = useState(false);
  const { attendance, toggleGoing } = useSocialStore();
  const going = attendance.some((a) => a.userId === CURRENT_USER_ID && a.eventId === eventId && a.sources.includes('manual'));

  if (isLoading) {
    return (
      <Screen>
        <LoadingState rows={1} />
      </Screen>
    );
  }
  if (isError || !event) {
    return (
      <Screen>
        <ErrorState message="We couldn’t load this event." onRetry={() => refetch()} />
      </Screen>
    );
  }

  const similar = (feed?.events ?? []).filter((e) => e.id !== event.id).slice(0, 4);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <EventHero event={event} />
        <View style={{ paddingHorizontal: spacing.screenX, gap: spacing.lg, marginTop: spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md }}>
            <Text variant="title" style={{ flex: 1 }}>
              {event.title}
            </Text>
            <EventActions eventId={event.id} saved={saved} onToggleSave={toggle} />
          </View>
          <EventInfoPanel event={event} />
          <View style={{paddingVertical:spacing.md}}><Text variant="heading">Friends going</Text><EventSocialContext eventId={event.id}/></View>
          <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:spacing.sm}}>
            <Pressable onPress={toggle}><Text variant="bodyBold">{saved?'♥ Saved':'♡ Save'}</Text></Pressable>
            <Pressable onPress={()=>toggleGoing(event.id)}><Text variant="bodyBold">{going?'✓ Going':'○ Going'}</Text></Pressable>
            <Pressable onPress={()=>setInviteOpen(true)}><Text variant="bodyBold">＋ Invite</Text></Pressable>
          </View>
          <Text variant="heading">About</Text>
          <Text style={{ lineHeight: 24 }}>{event.description}</Text>
          <EventOrganizerCard event={event} />
          <SimilarEvents events={similar} />
        </View>
      </ScrollView>

      {/* Back button over the hero */}
      <View style={{ position: 'absolute', top: insets.top + spacing.sm, left: spacing.lg }}>
        <IconButton accessibilityLabel="Go back" onPress={() => router.back()}>
          <ChevronLeftIcon color="#ffffff" size={20} />
        </IconButton>
      </View>

      {/* Sticky CTA */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: spacing.lg,
          paddingBottom: insets.bottom + spacing.md,
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}
      >
        <Button
          label={event.free ? 'Get Details' : 'Get Tickets'}
          fullWidth
          onPress={() => {
            trackEvent('get_tickets_tap', { eventId: event.id });
            router.push(`/checkout/${event.id}`);
          }}
        />
      </View>
      <InviteFriendsSheet eventId={event.id} visible={inviteOpen} onClose={() => setInviteOpen(false)} />
    </View>
  );
}
