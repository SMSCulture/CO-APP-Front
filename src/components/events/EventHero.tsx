import { Image } from 'expo-image';
import { View } from 'react-native';

import { useAppTheme } from '../../design/useAppTheme';
import type { EventDetail } from '../../types/event';
import { EventDateBadge } from './EventDateBadge';

/** Full-bleed image hero with an overlaid date badge. */
export function EventHero({ event }: { event: EventDetail }) {
  const theme = useAppTheme();
  return (
    <View>
      <Image
        source={{ uri: event.bigImageUrl ?? event.mainImageUrl ?? undefined }}
        style={{ width: '100%', aspectRatio: 4 / 3, backgroundColor: theme.colors.skeleton }}
        contentFit="cover"
        transition={250}
        accessibilityLabel={event.title}
      />
      <View style={{ position: 'absolute', top: 16, left: 16 }}>
        <EventDateBadge date={event.nextEventDate?.date ?? event.startDate} />
      </View>
    </View>
  );
}
