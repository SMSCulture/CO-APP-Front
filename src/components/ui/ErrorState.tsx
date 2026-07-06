import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { Button } from './Button';
import { Text } from './Text';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong.', onRetry }: ErrorStateProps) {
  return (
    <View style={{ alignItems: 'center', gap: spacing.lg, paddingVertical: spacing['3xl'] }}>
      <Text variant="heading">Hmm, that didn’t load</Text>
      <Text muted style={{ textAlign: 'center' }}>
        {message}
      </Text>
      {onRetry ? <Button label="Try again" variant="secondary" onPress={onRetry} /> : null}
    </View>
  );
}
