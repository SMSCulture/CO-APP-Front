import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DIRECTORY_LINKS } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Divider, IconButton, Text } from '../ui';
import { XIcon } from './icons/MenuIcons';

const DRAWER_WIDTH = 300;

interface SideDrawerProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Right-side directories panel — mirrors the web frontend's top-nav drawer.
 * Slides in from the right with a fading scrim; the Modal fades on close.
 */
export function SideDrawer({ visible, onClose }: SideDrawerProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const [translateX] = useState(() => new Animated.Value(DRAWER_WIDTH));
  const [scrim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 240, useNativeDriver: true }),
        Animated.timing(scrim, { toValue: 1, duration: 240, useNativeDriver: true }),
      ]).start();
    } else {
      translateX.setValue(DRAWER_WIDTH);
      scrim.setValue(0);
    }
  }, [visible, translateX, scrim]);

  const navigate = (route: string) => {
    onClose();
    router.push(route as never);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Animated.View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: theme.colors.overlay,
            opacity: scrim,
          }}
        >
          <Pressable accessibilityLabel="Close menu" onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>
        <View style={{ flex: 1 }} pointerEvents="none" />
        <Animated.View
          style={{
            width: DRAWER_WIDTH,
            backgroundColor: theme.colors.background,
            paddingTop: insets.top + spacing.lg,
            paddingHorizontal: spacing.xl,
            transform: [{ translateX }],
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.xl,
            }}
          >
            <Text variant="heading">Explore</Text>
            {/* Matches the hamburger opener exactly (transparent, size 44) — was a
                default-size circle-background IconButton with a font "×" glyph,
                which looked mismatched and off-center compared to the opener. */}
            <IconButton accessibilityLabel="Close menu" onPress={onClose} transparent size={44}>
              <XIcon color={String(theme.colors.text)} size={22} />
            </IconButton>
          </View>
          {DIRECTORY_LINKS.map((link, index) => (
            <View key={link.label}>
              {index > 0 ? <Divider spaced={false} /> : null}
              <Pressable
                accessibilityRole="link"
                onPress={() => navigate(link.route)}
                style={({ pressed }) => ({
                  paddingVertical: spacing.lg,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text variant="subheading">{link.label}</Text>
              </Pressable>
            </View>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}
