import type { AppTheme } from '../types/theme';
import { palette } from './colors';

export const lightTheme: AppTheme = {
  scheme: 'light',
  colors: {
    background: palette.white,
    surface: palette.gray50,
    surfaceElevated: palette.white,
    text: palette.darkGray,
    textMuted: palette.gray500,
    textInverse: palette.white,
    border: palette.gray200,
    primary: palette.blue,
    primaryPressed: palette.blueDark,
    onPrimary: palette.white,
    accent: palette.orange,
    danger: palette.red,
    chipBackground: palette.gray100,
    chipActiveBackground: palette.blue,
    chipActiveText: palette.white,
    tabBarBackground: palette.white,
    tabInactive: palette.gray400,
    overlay: 'rgba(22, 23, 23, 0.55)',
    skeleton: palette.gray100,
  },
};
