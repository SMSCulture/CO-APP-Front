import type { AppTheme } from '../types/theme';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const themes: Record<'light' | 'dark', AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

export type { AppTheme };
