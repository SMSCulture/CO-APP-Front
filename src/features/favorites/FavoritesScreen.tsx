import { router } from 'expo-router';
import { useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Chip, EmptyState, IconButton, Screen, Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
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
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      onPress={() => router.push(ENTITY_ROUTES[item.entityType](item.id) as never)}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: radius.lg,
        padding: spacing.sm,
        opacity: pressed ? 0.9 : 1,
      })}
    >
      <Image
        source={{ uri: item.imageUrl ?? undefined }}
        style={{ width: 72, height: 72, borderRadius: radius.md, backgroundColor: theme.colors.skeleton }}
        contentFit="cover"
      />
      <View style={{ flex: 1, paddingHorizontal: spacing.md }}>
        <Text variant="subheading" numberOfLines={1}>
          {item.title}
        </Text>
        {item.location ? (
          <Text variant="caption" muted numberOfLines={1}>
            {item.location}
          </Text>
        ) : null}
      </View>
      <IconButton
        accessibilityLabel="Remove from favorites"
        onPress={() => removeFavorite(item.entityType, item.id)}
        size={36}
      >
        <Text variant="subheading" color={theme.colors.danger}>
          ♥
        </Text>
      </IconButton>
    </Pressable>
  );
}

/** Mirrors app/favorites/page.tsx on web — reads live from the local store (kept in sync by useFavoritesSync), not a separate fetch, since the store is already the reconciled source of truth. */
export function FavoritesScreen() {
  const [activeTab, setActiveTab] = useState<FavoriteEntityType>('event');
  const { getFavoritesByType } = useFavoritesStore();
  const items = getFavoritesByType(activeTab);

  return (
    <Screen scroll>
      <DetailScreenHeader title="Favorites" />
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

      {items.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Tap the heart on anything you want to save for later."
        />
      ) : (
        <View style={{ gap: spacing.sm }}>
          {items.map((item) => (
            <FavoriteRow key={`${item.entityType}:${item.id}`} item={item} />
          ))}
        </View>
      )}
    </Screen>
  );
}
