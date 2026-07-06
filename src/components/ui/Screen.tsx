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
    return (
      <ScrollView
        style={[base, style]}
        contentContainerStyle={[padding, { paddingBottom: spacing['3xl'] }]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }
  return <View style={[base, padding, style]}>{children}</View>;
}
