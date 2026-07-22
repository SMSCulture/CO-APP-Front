import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { fontFamily, fontSize } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { TextVariant } from '../../design/typography';

const variantStyles: Record<TextVariant, TextStyle> = {
  display: { fontFamily: fontFamily.bold, fontSize: fontSize['3xl'], lineHeight: 40 },
  title: { fontFamily: fontFamily.bold, fontSize: fontSize['2xl'], lineHeight: 34 },
  heading: { fontFamily: fontFamily.bold, fontSize: fontSize.lg, lineHeight: 26 },
  subheading: { fontFamily: fontFamily.semiBold, fontSize: fontSize.md, lineHeight: 23 },
  body: { fontFamily: fontFamily.regular, fontSize: fontSize.base, lineHeight: 22 },
  bodyBold: { fontFamily: fontFamily.semiBold, fontSize: fontSize.base, lineHeight: 22 },
  caption: { fontFamily: fontFamily.regular, fontSize: fontSize.sm, lineHeight: 18 },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    lineHeight: 15,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
};

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  muted?: boolean;
  color?: string;
}

export function Text({ variant = 'body', muted, color, style, ...rest }: TextProps) {
  const theme = useAppTheme();
  return (
    <RNText
      style={[
        variantStyles[variant],
        { color: color ?? (muted ? theme.colors.textMuted : theme.colors.text) },
        style,
      ]}
      {...rest}
    />
  );
}
