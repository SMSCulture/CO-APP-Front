import { Image } from 'expo-image';
import { View } from 'react-native';

import { palette, radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatEventDate } from '../../lib/formatDate';
import type { EventDetail } from '../../types/event';
import { Text } from '../ui';

/** Immersive event cover. The floating date treatment keeps the art unobstructed
 * while making the first useful fact available before the title. */
export function EventHero({ event }: { event: EventDetail }) {
  const theme = useAppTheme();
  return (
    <View style={{ position: 'relative' }}>
      <Image
        source={{ uri: event.bigImageUrl ?? event.mainImageUrl ?? undefined }}
        style={{ width: '100%', aspectRatio: 1.08, backgroundColor: theme.colors.skeleton }}
        contentFit="cover"
        transition={250}
        accessibilityLabel={event.title}
      />
      <View style={{ position: 'absolute', left: spacing.screenX, right: spacing.screenX, bottom: -22, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 11, paddingHorizontal: spacing.lg, borderRadius: radius.full, backgroundColor: theme.colors.surfaceElevated, borderWidth: 1, borderColor: theme.colors.border, ...shadows.raised }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: palette.orange }} />
          <Text variant="bodyBold">{formatEventDate(event.nextEventDate?.date ?? event.startDate)}</Text>
        </View>
      </View>
    </View>
  );
}
