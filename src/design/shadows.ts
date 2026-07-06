import { Platform, type ViewStyle } from 'react-native';

const shadow = (elevation: number, opacity: number, radiusPx: number, y: number): ViewStyle =>
  Platform.select<ViewStyle>({
    android: { elevation },
    default: {
      shadowColor: '#000',
      shadowOpacity: opacity,
      shadowRadius: radiusPx,
      shadowOffset: { width: 0, height: y },
    },
  }) as ViewStyle;

export const shadows = {
  card: shadow(3, 0.08, 8, 2),
  raised: shadow(6, 0.14, 16, 6),
  none: {} as ViewStyle,
} as const;
