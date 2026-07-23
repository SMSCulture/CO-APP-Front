import type { ReactNode } from 'react';
import { ScrollView, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
}

/** Themed screen container with safe-area top inset. */
export function Screen({ children, scroll = false, padded = true, style }: ScreenProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const base: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: insets.top,
  };
  const padding = padded ? { paddingHorizontal: spacing.screenX } : undefined;

  if (scroll) {
    // Outer non-scrolling View carries the background — belt-and-suspenders
    // against any seam between the scrollable content and the tab bar when
    // content is shorter than the viewport (the ScrollView's own background
    // should cover this already, but screens using `scroll` were the ones
    // showing a stray line above the tab bar; this guarantees it's covered
    // regardless of content height).
    return (
      <View style={[base, style]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[padding, { paddingBottom: spacing['3xl'] + insets.bottom + 40 }]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }
  return <View style={[base, padding, style]}>{children}</View>;
}
