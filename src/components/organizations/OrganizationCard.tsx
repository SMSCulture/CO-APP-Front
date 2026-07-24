import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { HeartButton } from '../discovery/HeartButton';
import { useFavoriteToggle } from '../../queries/favorites.queries';
import { radius, sizes, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { Organization } from '../../types/organization';
import { MapPinIcon } from '../layout/icons/MenuIcons';
import { Badge, Text } from '../ui';

/**
 * Faithful port of components/directory/directory-card.tsx (via
 * app/arts-groups/components/arts-group-card.tsx's field mapping) on web —
 * stacked square image (not the old 84x84 row shape), pin + city topLine,
 * art-type badge under the title. `genres[0]` stands in for web's single
 * `artType` field — organizations.api.ts already maps the GraphQL `artType`
 * string into a one-element `genres` array, so no schema change needed.
 */
interface OrganizationCardProps {
  organization: Organization;
  /** 'tile' (default) — square image + stacked text. 'row' — square thumbnail left + text right, matches the Search page's vertical-list look (OrganizationsScreen). */
  variant?: 'tile' | 'row';
}

export function OrganizationCard({ organization, variant = 'tile' }: OrganizationCardProps) {
  const theme = useAppTheme();
  const { isFavorite: saved, toggle } = useFavoriteToggle('arts-group', organization);
  const artType = organization.genres[0];

  if (variant === 'row') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={organization.name}
          onPress={() => router.push(`/organizations/${organization.id}`)}
          style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.85 : 1 })}
        >
          <Image
            source={{ uri: organization.imageUrl ?? undefined }}
            style={{
              width: sizes.rowThumbnail,
              height: sizes.rowThumbnail,
              borderRadius: radius.md,
              backgroundColor: theme.colors.skeleton,
            }}
            contentFit="cover"
            accessibilityLabel={organization.name}
          />
          <View style={{ flex: 1, paddingLeft: spacing.md, gap: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <MapPinIcon color={String(theme.colors.primary)} size={14} />
              <Text variant="caption" muted numberOfLines={1} style={{ flex: 1 }}>
                {organization.city}
              </Text>
            </View>
            <Text variant="subheading" numberOfLines={2}>
              {organization.name}
            </Text>
            {artType ? <Badge label={artType} /> : null}
          </View>
        </Pressable>
        <HeartButton saved={saved} onPress={toggle} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={organization.name}
        onPress={() => router.push(`/organizations/${organization.id}`)}
        style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
      >
        <Image
          source={{ uri: organization.imageUrl ?? undefined }}
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: 10,
            backgroundColor: theme.colors.skeleton,
          }}
          contentFit="cover"
          accessibilityLabel={organization.name}
        />
        <View style={{ marginTop: 6, gap: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <MapPinIcon color={String(theme.colors.primary)} size={16} />
            <Text variant="body" numberOfLines={1} style={{ flex: 1 }}>
              {organization.city}
            </Text>
          </View>
          <Text variant="subheading" numberOfLines={1}>
            {organization.name}
          </Text>
          {artType ? <Badge label={artType} /> : null}
        </View>
      </Pressable>

      <View style={{ position: 'absolute', top: spacing.xs, right: spacing.xs }}>
        <HeartButton saved={saved} onPress={toggle} />
      </View>
    </View>
  );
}
