import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { palette, spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';
import { Text } from '../../../components/ui';

/** Fast organizer/event highlights. Full story treatments remain on Discover. */
export function StoryCircles({ events }: { events: EventSummary[] }) {
  if (!events.length) return null;
  return (
    <View style={{ marginHorizontal: -spacing.screenX, marginTop: spacing.md, gap: spacing.sm }}>
      <View style={{ paddingHorizontal: spacing.screenX }}><Text variant="heading">Highlights</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}>
        {events.slice(0, 7).map((event, index) => (
          <Pressable key={event.id} accessibilityRole="button" accessibilityLabel={`Open ${event.title}`} onPress={() => router.push(`/events/${event.id}`)} style={({ pressed }) => ({ width: 76, alignItems: 'center', gap: 6, opacity: pressed ? 0.8 : 1 })}>
            <View style={{ width: 68, height: 68, borderRadius: 34, padding: 3, borderWidth: 2, borderColor: index === 0 ? palette.orange : palette.blue }}>
              <Image source={{ uri: event.mainImageUrl ?? undefined }} contentFit="cover" style={{ width: '100%', height: '100%', borderRadius: 31 }} />
            </View>
            <Text variant="caption" numberOfLines={2} style={{ fontSize: 11, lineHeight: 14, textAlign: 'center' }}>{event.venueName ?? event.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
