import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { trackEvent } from '../../lib/analytics';
import { IconButton, Text } from '../ui';

interface EventActionsProps {
  eventId: string;
  saved: boolean;
  onToggleSave: () => void;
}

/** Save/favorite + share placeholder actions (web parity: favorites store). */
export function EventActions({ eventId, saved, onToggleSave }: EventActionsProps) {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      <IconButton
        accessibilityLabel={saved ? 'Remove from saved' : 'Save event'}
        onPress={onToggleSave}
      >
        <Text variant="subheading" color={saved ? theme.colors.danger : theme.colors.text}>
          {saved ? '♥' : '♡'}
        </Text>
      </IconButton>
      <IconButton
        accessibilityLabel="Share event"
        onPress={() => trackEvent('share_event_placeholder', { eventId })}
      >
        <Text variant="subheading">↗</Text>
      </IconButton>
    </View>
  );
}
