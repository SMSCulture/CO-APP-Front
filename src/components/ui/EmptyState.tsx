import type { ReactNode } from 'react';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { Button } from './Button';
import { Text } from './Text';

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Optional visual above the title — e.g. the app logo for a branded empty state (Tickets). */
  image?: ReactNode;
}

export function EmptyState({ title, message, actionLabel, onAction, image }: EmptyStateProps) {
  return (
    <View style={{ alignItems: 'center', gap: spacing.md, paddingVertical: spacing['3xl'] }}>
      {image}
      <Text variant="heading" style={{ textAlign: 'center' }}>
        {title}
      </Text>
      {message ? (
        <Text muted style={{ textAlign: 'center' }}>
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="secondary" onPress={onAction} />
      ) : null}
    </View>
  );
}
