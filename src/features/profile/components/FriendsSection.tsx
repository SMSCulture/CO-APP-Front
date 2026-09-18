import { router } from 'expo-router';
import { View } from 'react-native';

import { Card, Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';

/**
 * Friends block (top of Profile) — placeholder until the social/friends
 * backend exists. Shows an invite affordance.
 */
export function FriendsSection() {
  const theme = useAppTheme();
  return (
    <Card onPress={() => router.push('/profile/invite')}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.full,
            backgroundColor: theme.colors.chipBackground,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text variant="subheading">👥</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="subheading">Invite a friend</Text>
          <Text variant="caption" muted>
            Bring someone along to your next culture find.
          </Text>
        </View>
        <Text muted>›</Text>
      </View>
    </Card>
  );
}
