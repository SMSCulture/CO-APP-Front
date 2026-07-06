import { View } from 'react-native';

import { Card, Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { trackEvent } from '../../../lib/analytics';

/**
 * Friends block (top of Profile) — placeholder until the social/friends
 * backend exists. Shows an invite affordance.
 */
export function FriendsSection() {
  const theme = useAppTheme();
  return (
    <Card onPress={() => trackEvent('invite_friends_placeholder_tap')}>
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
          <Text variant="subheading">Friends</Text>
          <Text variant="caption" muted>
            Invite friends and see what they’re going to — coming soon.
          </Text>
        </View>
        <Text muted>›</Text>
      </View>
    </Card>
  );
}
