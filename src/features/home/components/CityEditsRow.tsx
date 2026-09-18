import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';

const looks = [
  { kicker: "TONIGHT'S OPEN-AIR PICK", color: '#2054bd' },
  { kicker: 'FREE PLAN WORTH THE TRIP', color: '#d62f82' },
  { kicker: 'LATE CULTURE SIGNAL', color: '#14715f' },
];
export function CityEditsRow({ events }: { events: EventSummary[] }) {
  if (!events.length) return null;
  return (
    <View style={{ marginTop: spacing.xl }}>
      <View style={{ gap: 4, marginBottom: spacing.md }}>
        <Text variant="title">Event Spotlights</Text>
        <Text muted>One real event, given the full editorial treatment.</Text>
      </View>
      <ScrollView
        horizontal
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -spacing.screenX }}
        contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}
      >
        {looks.map((look, i) => {
          const event = events[i % events.length];
          return (
            <Pressable
              key={look.kicker}
              onPress={() => router.push(`/events/${event.id}`)}
              style={{
                width: 248,
                height: 372,
                borderRadius: radius.xl,
                overflow: 'hidden',
                backgroundColor: look.color,
              }}
            >
              <View style={{ height: 148, padding: spacing.lg, justifyContent: 'space-between' }}>
                <Text variant="label" color="#fff">
                  SPOTLIGHT · 0{i + 1}
                </Text>
                <Text variant="heading" color="#fff" style={{ fontSize: 23, lineHeight: 24 }}>
                  {look.kicker}
                </Text>
              </View>
              <Image
                source={{ uri: event.mainImageUrl ?? undefined }}
                contentFit="cover"
                style={{ height: 116 }}
              />
              <View
                style={{
                  flex: 1,
                  padding: spacing.lg,
                  backgroundColor: 'rgba(6,7,10,.82)',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ gap: 4 }}>
                  <Text variant="bodyBold" color="#fff" numberOfLines={2}>
                    {event.title}
                  </Text>
                  <Text variant="caption" color="rgba(255,255,255,.7)" numberOfLines={1}>
                    {event.venueName} · {event.pricing ?? 'Free'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text variant="label" color="rgba(255,255,255,.8)">
                    OPEN EVENT
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
      <Pressable
        onPress={() => router.push('/collections/miami-after-dark')}
        style={{
          marginTop: spacing.md,
          borderRadius: radius.lg,
          padding: spacing.lg,
          backgroundColor: '#12141d',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1, gap: 3 }}>
          <Text variant="label" color="rgba(255,255,255,.62)">
            PREFER A THEME?
          </Text>
          <Text variant="bodyBold" color="#fff">
            Browse collection stories instead
          </Text>
        </View>
        <Text variant="heading" color="#fff">
          ↗
        </Text>
      </Pressable>
    </View>
  );
}
