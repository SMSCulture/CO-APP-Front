import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';

const edits = [
  { title: 'After hours', note: 'Art that starts after sunset', color: '#2054bd' },
  { title: 'Open air', note: 'Performances under the Miami sky', color: '#d62f82' },
  { title: 'Weekend reset', note: 'Low-pressure plans worth leaving home for', color: '#14715f' },
];
export function CityEditsRow({ events }: { events: EventSummary[] }) {
  if (!events.length) return null;
  return (
    <View style={{ marginTop: spacing.xl }}>
      <View style={{ gap: 4, marginBottom: spacing.md }}>
        <Text variant="title">City Edits</Text>
        <Text muted>Curated windows into what the city is doing.</Text>
      </View>
      <ScrollView
        horizontal
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -spacing.screenX }}
        contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}
      >
        {edits.map((edit, i) => {
          const event = events[i % events.length];
          return (
            <Pressable
              key={edit.title}
              onPress={() => router.push(`/events/${event.id}`)}
              style={{
                width: 248,
                height: 372,
                borderRadius: radius.xl,
                overflow: 'hidden',
                backgroundColor: edit.color,
              }}
            >
              <View style={{ height: 164, padding: spacing.lg, justifyContent: 'space-between' }}>
                <Text variant="label" color="#fff">
                  CITY EDIT · 0{i + 1}
                </Text>
                <Text variant="title" color="#fff" style={{ fontSize: 30, lineHeight: 30 }}>
                  {edit.title.toUpperCase()}
                </Text>
              </View>
              <Image
                source={{ uri: event.mainImageUrl ?? undefined }}
                contentFit="cover"
                style={{ height: 112 }}
              />
              <View
                style={{
                  flex: 1,
                  padding: spacing.lg,
                  backgroundColor: 'rgba(6,7,10,.78)',
                  justifyContent: 'space-between',
                }}
              >
                <Text variant="bodyBold" color="#fff">
                  {edit.note}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text variant="label" color="rgba(255,255,255,.7)">
                    OPEN EDIT
                  </Text>
                  <Text variant="heading" color="#fff">
                    ↗
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
