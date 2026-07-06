import { router } from 'expo-router';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DIRECTORY_LINKS } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Divider, IconButton, Text } from '../ui';

interface SideDrawerProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Right-side directories panel — mirrors the web frontend's top-nav drawer.
 * Opened from the top-right icon in AppHeader.
 */
export function SideDrawer({ visible, onClose }: SideDrawerProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  const navigate = (route: string) => {
    onClose();
    router.push(route as never);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        accessibilityLabel="Close menu"
        onPress={onClose}
        style={{ flex: 1, backgroundColor: theme.colors.overlay, flexDirection: 'row' }}
      >
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width: 300,
            backgroundColor: theme.colors.background,
            paddingTop: insets.top + spacing.lg,
            paddingHorizontal: spacing.xl,
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
            <IconButton accessibilityLabel="Close menu" onPress={onClose}>
              <Text variant="heading">×</Text>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}
