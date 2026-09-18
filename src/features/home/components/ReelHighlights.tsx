import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { radius, spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';
import { Text } from '../../../components/ui';

export function ReelHighlights({ events }: { events: EventSummary[] }) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(210, Math.floor((Math.min(width, 480) - spacing.screenX * 2) / 1.75));
  if (!events.length) return null;
  return (
    <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Text variant="heading">Highlights</Text>
        <Text variant="caption" muted>Quick city stories</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -spacing.screenX }} contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}>
        {events.slice(0, 6).map((event, index) => (
          <Pressable key={event.id} onPress={() => router.push(`/events/${event.id}`)} style={({ pressed }) => ({ width: cardWidth, aspectRatio: 9 / 16, borderRadius: radius.xl, overflow: 'hidden', opacity: pressed ? .86 : 1 })}>
            <Image source={{ uri: event.bigImageUrl ?? event.mainImageUrl ?? undefined }} contentFit="cover" style={{ position: 'absolute', inset: 0 }} />
            <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(4,8,12,.18)' }} />
            <View style={{ flex: 1, justifyContent: 'space-between', padding: spacing.md }}>
              <Text variant="label" color="#fff">HIGHLIGHT · {String(index + 1).padStart(2, '0')}</Text>
              <View style={{ gap: 5 }}>
                <Text variant="subheading" color="#fff" numberOfLines={3}>{event.title}</Text>
                <Text variant="caption" color="rgba(255,255,255,.82)" numberOfLines={1}>{event.venueName}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
