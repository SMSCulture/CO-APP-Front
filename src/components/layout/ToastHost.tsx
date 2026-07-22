import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '../../design/colors';
import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useToastStore } from '../../store/toastStore';
import { Text } from '../ui';
import { XIcon } from './icons/MenuIcons';

/**
 * Faithful port of components/ui/favorites-toast.tsx on web: rounded card,
 * bottom-center, thumbnail (if provided) + message + optional action link +
 * dismiss X. Mounted once in app/_layout.tsx so it overlays every screen.
 */
export function ToastHost() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { toast, dismiss } = useToastStore();

  if (!toast) return null;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: insets.bottom + spacing.lg,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          maxWidth: '92%',
          backgroundColor: theme.colors.surfaceElevated,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: radius.lg,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          ...shadows.raised,
        }}
      >
        {toast.imageUrl ? (
          <Image
            source={{ uri: toast.imageUrl }}
            style={{ width: 48, height: 48, borderRadius: radius.sm, backgroundColor: theme.colors.skeleton }}
            contentFit="cover"
          />
        ) : null}

        <Text variant="body" numberOfLines={2} style={{ flex: 1 }}>
          {toast.message}
        </Text>

        {toast.action ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              toast.action?.onPress();
              dismiss();
            }}
            hitSlop={8}
          >
            <Text variant="bodyBold" color={palette.blue} style={{ textDecorationLine: 'underline' }}>
              {toast.action.label}
            </Text>
          </Pressable>
        ) : null}

        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={dismiss} hitSlop={8}>
          <XIcon color={String(theme.colors.textMuted)} size={16} />
        </Pressable>
      </View>
    </View>
  );
}
