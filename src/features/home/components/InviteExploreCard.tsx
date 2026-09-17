import { router } from 'expo-router';
import { Pressable, Share, View } from 'react-native';

import { palette } from '../../../design/colors';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { Text } from '../../../components/ui';

/**
 * CultureOwl's Home closer: a restrained editorial invitation with two clear
 * paths. Explore enters Search; Invite opens the native share sheet.
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
        borderRadius: radius.xl,
        overflow: 'hidden',
        backgroundColor: theme.scheme === 'dark' ? palette.gray900 : palette.blueLight,
      }}
    >
      <View style={{ height: 5, backgroundColor: palette.blue }} />
      <View style={{ padding: spacing.xl, gap: spacing.sm }}>
        <Text variant="caption" color={palette.blueDark}>YOUR CULTURE STARTS HERE</Text>
        <Text variant="heading">Find your next culture story</Text>
        <Text muted style={{ marginBottom: spacing.md }}>
          Explore what’s happening, then invite someone to come along.
        </Text>

        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Explore CultureOwl search"
            onPress={() => router.push('/(tabs)/search')}
            style={({ pressed }) => ({
              flex: 1,
              borderRadius: radius.full,
              paddingVertical: spacing.md,
              alignItems: 'center',
              backgroundColor: pressed ? palette.blueDark : palette.blue,
            })}
          >
            <Text variant="bodyBold" color="#ffffff">Explore</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Invite friends to CultureOwl"
            onPress={inviteFriends}
            style={({ pressed }) => ({
              flex: 1,
              borderRadius: radius.full,
              paddingVertical: spacing.md,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: palette.blue,
              backgroundColor: pressed ? 'rgba(61, 152, 211, 0.10)' : theme.colors.background,
            })}
          >
            <Text variant="bodyBold" color={palette.blueDark}>Invite</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
