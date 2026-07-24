import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';

import { SearchBarPill } from '../../components/discovery/SearchBarPill';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Chip, EmptyState, IconButton, Screen, Text } from '../../components/ui';
import { radius, sizes, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useFavoritesStore } from '../../store/favoritesStore';
import type { FavoriteEntityType, FavoriteItem } from '../../types/favorite';

const TABS: { type: FavoriteEntityType; label: string }[] = [
  { type: 'event', label: 'Events' },
  { type: 'venue', label: 'Venues' },
  { type: 'arts-group', label: 'Arts Groups' },
  { type: 'restaurant', label: 'Restaurants' },
];

/** Routes match the existing detail screens: src/app/events/[eventId].tsx, venues/[venueId].tsx, organizations/[organizationId].tsx. */
const ENTITY_ROUTES: Record<FavoriteEntityType, (id: string) => string> = {
  event: (id) => `/events/${id}`,
  venue: (id) => `/venues/${id}`,
  'arts-group': (id) => `/organizations/${id}`,
  restaurant: (id) => `/venues/${id}`, // no dedicated restaurant detail route yet
};

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
  const [activeTab, setActiveTab] = useState<FavoriteEntityType>('event');
  const [query, setQuery] = useState('');
  const { getFavoritesByType } = useFavoritesStore();
  const items = getFavoritesByType(activeTab);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((item) => item.title.toLowerCase().includes(q)) : items;
  }, [items, query]);

  return (
    <Screen scroll>
      <DetailScreenHeader title="Favorites" />

      <View style={{ marginBottom: spacing.md }}>
        <SearchBarPill mode="input" placeholder="Search favorites" value={query} onChangeText={setQuery} showFilterIcon={false} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          {TABS.map((tab) => (
            <Chip
              key={tab.type}
              label={tab.label}
              active={activeTab === tab.type}
              onPress={() => setActiveTab(tab.type)}
            />
          ))}
        </View>
      </ScrollView>

      {filtered.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Tap the heart on anything you want to save for later."
        />
      ) : (
        <View style={{ gap: spacing.lg }}>
          {filtered.map((item) => (
            <FavoriteRow key={`${item.entityType}:${item.id}`} item={item} />
          ))}
        </View>
      )}
    </Screen>
  );
}
