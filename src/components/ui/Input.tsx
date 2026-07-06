import { TextInput, type TextInputProps } from 'react-native';

import { fontFamily, fontSize, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

export function Input(props: TextInputProps) {
  const theme = useAppTheme();
  return (
    <TextInput
      placeholderTextColor={theme.colors.textMuted}
      {...props}
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: radius.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          fontFamily: fontFamily.regular,
          fontSize: fontSize.base,
          color: theme.colors.text,
        },
        props.style,
      ]}
    />
  );
}
