import { Pressable, View } from 'react-native';

import { palette } from '../../design/colors';
import { shadows } from '../../design/shadows';
import { useAppTheme } from '../../design/useAppTheme';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

/** Compact CultureOwl switch: brand-blue track, white thumb and a quiet outlined off state. */
export function Toggle({ value, onValueChange }: ToggleProps) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={value ? 'On' : 'Off'}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => ({
        width: 46,
        height: 26,
        borderRadius: 13,
        padding: 3,
        justifyContent: 'center',
        backgroundColor: value ? palette.blue : 'rgba(255,255,255,0.72)',
        borderWidth: 1,
        borderColor: value ? palette.blueDark : theme.colors.border,
        opacity: pressed ? 0.82 : 1,
      })}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          alignSelf: value ? 'flex-end' : 'flex-start',
          backgroundColor: palette.white,
          borderWidth: value ? 0 : 1,
          borderColor: theme.colors.border,
          ...shadows.card,
        }}
      />
    </Pressable>
  );
}
