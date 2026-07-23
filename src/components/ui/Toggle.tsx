import { Platform, Switch } from 'react-native';

import { palette } from '../../design/colors';
import { useAppTheme } from '../../design/useAppTheme';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

/**
 * `theme.colors.border` for the off-track (gray200 light / gray800 dark) was
 * too close to the surface color to read as an obvious "off" state, and
 * without `ios_backgroundColor` iOS was blending its own default track color
 * with ours mid-animation, producing the odd flash the "on/off animation and
 * color is very off" report described. A dedicated neutral gray + explicit
 * ios_backgroundColor fixes both.
 */
export function Toggle({ value, onValueChange }: ToggleProps) {
  const theme = useAppTheme();
  const offColor = theme.scheme === 'dark' ? palette.gray600 : palette.gray300;
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ true: theme.colors.primary, false: offColor }}
      thumbColor="#ffffff"
      ios_backgroundColor={Platform.OS === 'ios' ? offColor : undefined}
    />
  );
}
