import { Switch } from 'react-native';

import { useAppTheme } from '../../design/useAppTheme';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Toggle({ value, onValueChange }: ToggleProps) {
  const theme = useAppTheme();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ true: theme.colors.primary, false: theme.colors.border }}
      thumbColor="#ffffff"
    />
  );
}
