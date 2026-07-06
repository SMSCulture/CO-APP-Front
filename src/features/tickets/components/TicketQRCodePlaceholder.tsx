import { View } from 'react-native';

import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { Text } from '../../../components/ui';

/**
 * QR placeholder — renders a deterministic pattern from the ticket payload.
 * Swap for a real QR library (e.g. react-native-qrcode-svg) when the
 * ticketing backend lands.
 */
export function TicketQRCodePlaceholder({ payload }: { payload: string }) {
  const theme = useAppTheme();
  const size = 9;
  const cells = Array.from({ length: size * size }, (_, i) => {
    const char = payload.charCodeAt(i % payload.length);
    return (char + i * 7) % 3 !== 0;
  });

  return (
    <View style={{ alignItems: 'center', gap: spacing.sm }}>
      <View
        style={{
          width: 162,
          height: 162,
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: '#ffffff',
          borderRadius: radius.md,
          overflow: 'hidden',
          padding: 9,
        }}
      >
        {cells.map((filled, i) => (
          <View
            key={i}
            style={{ width: 16, height: 16, backgroundColor: filled ? '#161717' : '#ffffff' }}
          />
        ))}
      </View>
      <Text variant="caption" color={theme.colors.textMuted}>
        {payload}
      </Text>
    </View>
  );
}
