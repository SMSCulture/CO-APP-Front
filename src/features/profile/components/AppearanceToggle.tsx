import { View } from 'react-native';

import { Chip, Text } from '../../../components/ui';
import { spacing } from '../../../design/tokens';
import { useThemeMode } from '../../../design/useAppTheme';
import type { ThemeMode } from '../../../types/theme';

const OPTIONS: { mode: ThemeMode; label: string }[] = [
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
  { mode: 'system', label: 'System' },
];

/** Manual light/dark/system appearance selector. */
export function AppearanceToggle() {
  const { mode, setMode } = useThemeMode();
  return (
    <View style={{ gap: spacing.md }}>
      <Text variant="label" muted>
        Appearance
      </Text>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        {OPTIONS.map((option) => (
          <Chip
            key={option.mode}
            label={option.label}
            active={mode === option.mode}
            onPress={() => setMode(option.mode)}
          />
        ))}
      </View>
    </View>
  );
}
