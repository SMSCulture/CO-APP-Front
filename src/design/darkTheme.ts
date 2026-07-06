import type { AppTheme } from '../types/theme';
import { palette } from './colors';

export const darkTheme: AppTheme = {
  scheme: 'dark',
  colors: {
    background: palette.black,
    surface: palette.gray900,
    surfaceElevated: palette.gray800,
    text: palette.gray100,
    textMuted: palette.gray400,
    textInverse: palette.darkGray,
    border: palette.gray800,
    primary: palette.blue,
    primaryPressed: palette.blueLight,
    onPrimary: palette.white,
    accent: palette.orange,
    danger: palette.red,
    chipBackground: palette.gray800,
    chipActiveBackground: palette.blue,
    chipActiveText: palette.white,
    tabBarBackground: palette.gray900,
    tabInactive: palette.gray500,
    overlay: 'rgba(0, 0, 0, 0.7)',
    skeleton: palette.gray800,
  },
};
