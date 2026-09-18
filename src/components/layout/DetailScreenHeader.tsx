import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { Text } from '../ui';

interface DetailScreenHeaderProps {
  title: string;
  /** Optional centered line below the title, such as the current city. */
  subtitle?: string;
  /** Retained for call-site compatibility; app navigation now lives in the tab bar. */
  fallbackHref?: string;
  showBack?: boolean;
}

/** Compact title treatment for app pages. Navigation stays in the persistent tab bar. */
export function DetailScreenHeader({ title, subtitle }: DetailScreenHeaderProps) {
  return (
    <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
      <Text variant="heading" style={{ textAlign: 'center' }} numberOfLines={1}>{title}</Text>
      {subtitle ? <Text variant="caption" muted style={{ textAlign: 'center', marginTop: 2 }} numberOfLines={1}>{subtitle}</Text> : null}
    </View>
  );
}
