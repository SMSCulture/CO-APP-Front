import type { ReactNode } from 'react';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { Text } from '../ui';

interface EventMetaRowProps {
  icon: ReactNode;
  primary: string;
  secondary?: string | null;
}

export function EventMetaRow({ icon, primary, secondary }: EventMetaRowProps) {
  return (
    <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' }}>
      <View style={{ width: 24, alignItems: 'center', paddingTop: 2 }}>{icon}</View>
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
