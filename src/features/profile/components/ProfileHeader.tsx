import { router } from 'expo-router';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { IconButton, Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import type { User } from '../../../types/user';

const PROVIDER_LABELS: Record<User['authProvider'], string> = {
  email: 'Connected with email',
  google: 'Connected with Google',
  facebook: 'Connected with Facebook',
};

/**
 * Profile header: avatar + name top-left, connection type under the name,
 * account settings gear top-right.
 */
export function ProfileHeader({ user }: { user: User }) {
  const theme = useAppTheme();
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;
  const initial = (user.firstName ?? user.email).charAt(0).toUpperCase();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.xl,
      }}
    >
      {user.avatarUrl ? (
        <Image
          source={{ uri: user.avatarUrl }}
          style={{ width: 64, height: 64, borderRadius: radius.full }}
          accessibilityLabel={displayName}
        />
      ) : (
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: radius.full,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text variant="heading" color="#ffffff">
            {initial}
          </Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text variant="heading" numberOfLines={1}>
          {displayName}
        </Text>
        <Text variant="caption" muted>
          {PROVIDER_LABELS[user.authProvider]}
        </Text>
      </View>
      <IconButton
        accessibilityLabel="Account settings"
        onPress={() => router.push('/settings/account')}
      >
        <Text variant="subheading">⚙</Text>
      </IconButton>
    </View>
  );
}
