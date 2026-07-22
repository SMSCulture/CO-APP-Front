import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { palette } from '../../design/tokens';

/**
 * Faithful port of the heart button in components/directory/directory-card.tsx
 * on web: transparent background (no circle behind it — the earlier IconButton
 * version had one, that was wrong), a SOLID heart icon — grey-filled with a
 * white stroke when not saved, not an empty outline (♡). Filled red/pink when
 * saved. Web uses its "co-pink" brand color, which isn't defined in this
 * mobile app's palette yet (design/colors.ts has no pink token) — used
 * palette.red as the closest existing brand color instead of inventing a hex
 * value. Path is lucide's actual Heart shape (same as HeartIcon in
 * components/layout/icons/MenuIcons.tsx) — the earlier hand-approximated
 * path didn't match.
 */
export function HeartButton({ saved, onPress, size = 24 }: { saved: boolean; onPress: () => void; size?: number }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={saved ? 'Remove from favorites' : 'Save'}
      onPress={onPress}
      hitSlop={12}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, padding: 8 })}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          fill={saved ? palette.red : palette.gray300}
          stroke={saved ? palette.red : palette.white}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}
