import { router } from 'expo-router';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { Organization } from '../../types/organization';
import { Card, Text } from '../ui';

export function OrganizationCard({ organization }: { organization: Organization }) {
  const theme = useAppTheme();
  return (
    <Card padded={false} onPress={() => router.push(`/organizations/${organization.id}`)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: organization.imageUrl ?? undefined }}
          style={{ width: 84, height: 84, backgroundColor: theme.colors.skeleton }}
          contentFit="cover"
          accessibilityLabel={organization.name}
        />
        <View style={{ flex: 1, padding: spacing.md, gap: 2 }}>
          <Text variant="subheading" numberOfLines={1}>
            {organization.name}
          </Text>
          <Text variant="caption" muted numberOfLines={1}>
            {[organization.city, organization.genres.join(', ')].filter(Boolean).join(' · ')}
          </Text>
        </View>
      </View>
    </Card>
  );
}
