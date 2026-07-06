import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { Text } from '../ui';

interface EventMetaRowProps {
  icon: string;
  primary: string;
  secondary?: string | null;
}

export function EventMetaRow({ icon, primary, secondary }: EventMetaRowProps) {
  return (
    <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' }}>
      <Text variant="subheading">{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text variant="bodyBold">{primary}</Text>
        {secondary ? (
          <Text variant="caption" muted>
            {secondary}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
