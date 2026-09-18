import type { AppTheme } from '../types/theme';
import { palette } from './colors';

export const darkTheme: AppTheme = {
  scheme: 'dark',
  colors: {
    background: '#101923',
    surface: '#172431',
    surfaceElevated: '#1d2d3b',
    text: palette.gray100,
    textMuted: palette.gray400,
    textInverse: palette.darkGray,
    border: 'rgba(255,255,255,0.10)',
    primary: palette.blue,
    primaryPressed: palette.blueLight,
    onPrimary: palette.white,
    accent: palette.orange,
    danger: palette.red,
    chipBackground: palette.gray800,
    chipActiveBackground: palette.blue,
    chipActiveText: palette.white,
    tabBarBackground: 'rgba(16,25,35,0.92)',
    tabInactive: palette.gray500,
    overlay: 'rgba(0, 0, 0, 0.7)',
    skeleton: palette.gray800,
  },
};
