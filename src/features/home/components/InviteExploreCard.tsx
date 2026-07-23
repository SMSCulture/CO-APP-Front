import { router } from 'expo-router';
import { Pressable, Share, View } from 'react-native';

import { palette } from '../../../design/colors';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { Text } from '../../../components/ui';

/**
 * Brand-voice closer at the bottom of Home, below Culture News — one card,
 * two actions: share the app (native share sheet) or jump into Discover.
 * Not tied to any single genre/city, so it lives outside the events-loaded
 * branch's data — pure static content + navigation/share, no query.
 */
export function InviteExploreCard() {
  const theme = useAppTheme();

  const inviteFriends = () => {
    Share.share({
      message: 'I’ve been finding great local events, venues, and restaurants on CultureOwl — check it out: https://www.cultureowl.com',
    }).catch(() => {
      // User dismissed the share sheet — nothing to handle.
    });
  };

  return (
    <View
      style={{
        marginTop: spacing.xl * 2,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.scheme === 'dark' ? palette.blueDark : palette.blueLight,
        padding: spacing.lg,
        gap: spacing.xs,
      }}
    >
      <Text variant="heading">More culture, more people</Text>
      <Text muted style={{ marginBottom: spacing.md }}>
        Bring your crew, or find what’s happening near you next.
      </Text>

      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <Pressable
          accessibilityRole="button"
          onPress={inviteFriends}
          style={({ pressed }) => ({
            flex: 1,
            borderRadius: radius.full,
            paddingVertical: spacing.sm + 2,
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text variant="bodyBold" color={theme.colors.onPrimary}>
            Invite Friends
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/(tabs)/discover')}
          style={({ pressed }) => ({
            flex: 1,
            borderRadius: radius.full,
            paddingVertical: spacing.sm + 2,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.border,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text variant="bodyBold" muted>
            Explore
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
