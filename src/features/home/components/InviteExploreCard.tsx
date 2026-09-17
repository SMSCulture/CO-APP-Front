import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, Share, View } from 'react-native';

import { palette } from '../../../design/colors';
import { radius, shadows, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { Text } from '../../../components/ui';

const INVITE_MESSAGE = 'Come find our next cultural outing with me on CultureOwl — events, art, music, restaurants, and more: https://www.cultureowl.com';

/** A branded invite moment that previews the message before native sharing. */
function InviteSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const theme = useAppTheme();

  const shareInvite = () => {
    Share.share({ message: INVITE_MESSAGE }).catch(() => {
      // Dismissing or closing the platform share sheet needs no error state.
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: theme.colors.overlay }}>
        <Pressable accessibilityLabel="Close invite" onPress={onClose} style={{ flex: 1 }} />
        <View
          style={{
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            backgroundColor: theme.colors.surfaceElevated,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.md,
            paddingBottom: spacing.xl * 2,
            gap: spacing.lg,
          }}
        >
          <View style={{ width: 42, height: 4, borderRadius: radius.full, backgroundColor: theme.colors.border, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, gap: spacing.xs }}>
              <Text variant="label" color={palette.blueDark}>YOUR CULTURE CIRCLE</Text>
              <Text variant="title">Culture is better together</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Close invite" onPress={onClose} hitSlop={10}>
              <Text style={{ fontSize: 30, lineHeight: 34 }}>×</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.sm }}>
            {['A', 'M', '+'].map((letter, index) => (
              <View
                key={letter}
                style={{
                  width: 54,
                  height: 54,
                  marginLeft: index ? -10 : 0,
                  borderRadius: radius.full,
                  borderWidth: 3,
                  borderColor: theme.colors.surfaceElevated,
                  backgroundColor: index === 0 ? palette.blue : index === 1 ? palette.orange : palette.red,
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...shadows.raised,
                }}
              >
                <Text variant="heading" color="#ffffff">{letter}</Text>
              </View>
            ))}
          </View>

          <View style={{ borderRadius: radius.lg, backgroundColor: theme.scheme === 'dark' ? palette.gray800 : palette.blueLight, padding: spacing.lg, gap: spacing.sm }}>
            <Text variant="label" color={palette.blueDark}>INVITE PREVIEW</Text>
            <Text variant="body">{INVITE_MESSAGE}</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Share CultureOwl invite"
            onPress={shareInvite}
            style={({ pressed }) => ({
              borderRadius: radius.full,
              paddingVertical: spacing.md,
              alignItems: 'center',
              backgroundColor: pressed ? palette.blueDark : palette.blue,
            })}
          >
            <Text variant="bodyBold" color="#ffffff">Choose who to invite</Text>
          </Pressable>
          <Text variant="caption" muted style={{ textAlign: 'center' }}>
            You’ll choose the person and app on the next screen.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

/** CultureOwl's Home closer: Explore enters Search; Invite opens a branded sheet. */
export function InviteExploreCard() {
  const theme = useAppTheme();
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
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
              accessibilityLabel="Open CultureOwl invite"
              onPress={() => setInviteOpen(true)}
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
      <InviteSheet visible={inviteOpen} onClose={() => setInviteOpen(false)} />
    </>
  );
}
