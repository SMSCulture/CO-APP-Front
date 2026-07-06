import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

export function Divider({ spaced = true }: { spaced?: boolean }) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: spaced ? spacing.lg : 0,
      }}
    />
  );
}
