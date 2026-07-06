import { View } from 'react-native';

import { Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import type { User } from '../../../types/user';

export function ProfileHeader({ user }: { user: User }) {
  const theme = useAppTheme();
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;
  const initial = (user.firstName ?? user.email).charAt(0).toUpperCase();

  return (
    <View style={{ alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl }}>
      <View
        style={{
          width: 84,
          height: 84,
          borderRadius: radius.full,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text variant="title" color="#ffffff">
          {initial}
        </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text variant="heading">{displayName}</Text>
        <Text variant="caption" muted>
          {user.email}
        </Text>
      </View>
    </View>
  );
}
