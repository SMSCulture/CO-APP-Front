import { View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Chip } from '../ui';

interface ListMapToggleProps {
  mode: 'list' | 'map';
  onChange: (mode: 'list' | 'map') => void;
}

export function ListMapToggle({ mode, onChange }: ListMapToggleProps) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: spacing.xs,
        backgroundColor: theme.colors.surface,
        borderRadius: radius.full,
        padding: spacing.xs,
        alignSelf: 'flex-start',
      }}
    >
      <Chip label="List" active={mode === 'list'} onPress={() => onChange('list')} />
      <Chip label="Map" active={mode === 'map'} onPress={() => onChange('map')} />
    </View>
  );
}
