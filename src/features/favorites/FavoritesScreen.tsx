import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Chip, IconButton, Screen, Text } from '../../components/ui';
import { radius, sizes, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useSocialStore } from '../../store/socialStore';
import type { FavoriteEntityType, FavoriteItem } from '../../types/favorite';

type FavoriteTab = 'SAVED' | 'INVITES';
const TABS: { value: FavoriteTab; label: string }[] = [{ value:'SAVED',label:'Saved'},{value:'INVITES',label:'Invites'}];

/** Routes match the existing detail screens: src/app/events/[eventId].tsx, venues/[venueId].tsx, organizations/[organizationId].tsx. */
const ENTITY_ROUTES: Record<FavoriteEntityType, (id: string) => string> = {
  event: (id) => `/events/${id}`,
  venue: (id) => `/venues/${id}`,
  'arts-group': (id) => `/organizations/${id}`,
  restaurant: (id) => `/restaurants/${id}`,
};


function FavoritesIllustration() {
  return (
    <View style={{ width: 136, height: 136, borderRadius: 68, backgroundColor: '#e8f4fb', alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={88} height={88} viewBox="0 0 88 88">
        <Circle cx="44" cy="44" r="32" fill="#fff" />
        <Path d="M44 64S23 51 23 36c0-7 5-12 12-12 4 0 7 2 9 6 2-4 5-6 9-6 7 0 12 5 12 12 0 15-21 28-21 28Z" fill="#ef6b62" />
        <Path d="M29 40c-2-8 5-13 11-9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".75" />
      </Svg>
    </View>
  );
}

function FavoriteRow({ item }: { item: FavoriteItem }) {
  const theme = useAppTheme();
  const { removeFavorite } = useFavoritesStore();

  return (
    // Plain View, not Pressable — the nav Pressable and the remove
    // IconButton (itself a Pressable) are siblings inside it, not
    // parent/child. Same nested-<button> fix already applied in
    // PortraitEventCard/VenueCard/OrganizationCard: react-native-web
    // renders Pressable as an HTML <button>, and a button nested inside
    // another button is invalid HTML that React throws on at render time.
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={item.title}
        onPress={() => router.push(ENTITY_ROUTES[item.entityType](item.id) as never)}
        style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.85 : 1 })}
      >
        <Image
          source={{ uri: item.imageUrl ?? undefined }}
          style={{
            width: sizes.rowThumbnail,
            height: sizes.rowThumbnail,
            borderRadius: radius.md,
            backgroundColor: theme.colors.skeleton,
          }}
          contentFit="cover"
        />
        <View style={{ flex: 1, paddingLeft: spacing.md, gap: 4 }}>
          <Text variant="subheading" numberOfLines={2}>
            {item.title}
          </Text>
          {item.location ? (
            <Text variant="caption" muted numberOfLines={1}>
              {item.location}
            </Text>
          ) : null}
        </View>
      </Pressable>
      <IconButton
        accessibilityLabel="Remove from favorites"
        onPress={() => removeFavorite(item.entityType, item.id)}
        size={36}
      >
        <Text variant="subheading" color={theme.colors.danger}>
          ♥
        </Text>
      </IconButton>
    </View>
  );
}

/**
 * Mirrors app/favorites/page.tsx on web — reads live from the local store
 * (kept in sync by useFavoritesSync), not a separate fetch, since the store
 * is already the reconciled source of truth. Matches the Search page's look
 * now too: search bar above the entity-type pills, row cards below (was
 * already close to this shape — added the search bar, bumped the thumbnail
 * to the same 96px used by the new Venue/Restaurant/Organization row cards
 * for visual consistency across all four).
 */
export function FavoritesScreen() {
  const theme = useAppTheme();
  const [activeTab, setActiveTab] = useState<FavoriteTab>('SAVED');
  const { invitations, users } = useSocialStore();
  const { getAllFavorites } = useFavoritesStore();
  const items = getAllFavorites();
  const filtered = useMemo(() => items, [items]);


  return (
    <Screen>
      <DetailScreenHeader title="Saved" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginBottom: spacing.lg }} contentContainerStyle={{ alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          {TABS.map((tab) => (
            <Chip
              key={tab.value}
              label={tab.label}
              active={activeTab === tab.value}
              onPress={() => setActiveTab(tab.value)}
            />
          ))}
        </View>
      </ScrollView>

      {activeTab === 'INVITES' ? (
        <View style={{ flex: 1, justifyContent: 'center', gap: spacing.md, paddingBottom: 80 }}>
          {invitations.map((invite) => { const inviter=users.find(u=>u.id===invite.senderUserId); return <Pressable key={invite.id} onPress={() => router.push(`/events/${invite.eventId}`)} style={{padding:spacing.lg,borderRadius:radius.lg,backgroundColor:theme.colors.surface}}><Text variant="caption" muted>{inviter?.name} invited you</Text><Text variant="subheading">View the event ›</Text></Pressable>; })}
          {!invitations.length ? <><FavoritesIllustration/><Text variant="heading" style={{textAlign:'center'}}>Your next invitation starts here</Text></> : null}
        </View>
      ) : filtered.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingBottom: 88 }}>
          <FavoritesIllustration />
          <Text variant="heading" style={{ textAlign: 'center' }}>Nothing tucked away yet</Text>
          <Text muted style={{ textAlign: 'center', maxWidth: 310 }}>Save what catches your eye. We’ll keep it here.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing['3xl'] }}>
        <View style={{ gap: spacing.lg }}>
          {filtered.map((item) => (
            <FavoriteRow key={`${item.entityType}:${item.id}`} item={item} />
          ))}
        </View>
        </ScrollView>
      )}
    </Screen>
  );
}
