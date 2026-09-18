import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { EventCarousel } from '../../components/discovery/EventCarousel';
import {
  BuildingIcon,
  MapIcon,
  NewspaperIcon,
  RestaurantIcon,
} from '../../components/layout/icons/MenuIcons';
import { Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import type { EventSummary } from '../../types/event';

const intents = [
  ['Lose track of time', 'art'],
  ['Make it a date', 'food'],
  ['Try something new', 'museums'],
  ['Keep it under $25', 'museums'],
] as const;

export function ExploreIntentEntry() {
  return (
    <View style={{ gap: spacing.sm }}>
      <Text variant="title">What kind of night?</Text>
      <Text muted>Finish the thought and jump straight into the map.</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -spacing.screenX }}
        contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.sm }}
      >
        {intents.map(([label, tag], index) => (
          <Pressable
            key={label}
            onPress={() => router.push({ pathname: '/map', params: { tagIds: tag } })}
            style={({ pressed }) => ({
              minWidth: 210,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: radius.full,
              backgroundColor: ['#304889', '#743052', '#286c63', '#7a5927'][index],
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text variant="bodyBold" color="#fff">
              I want to {label.toLowerCase()} →
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

export function ExploreUtilityRails({ events }: { events: EventSummary[] }) {
  const priced = events.filter(
    (event) => event.free || Number(event.pricing?.match(/[\d.]+/)?.[0] ?? 999) <= 25,
  );
  return (
    <View style={{ gap: spacing.xl }}>
      <View style={{ gap: spacing.md }}>
        <Text variant="heading">New this week</Text>
        <EventCarousel events={events.slice(0, 8)} />
      </View>
      <View style={{ gap: spacing.md }}>
        <Text variant="heading">Under $25</Text>
        <EventCarousel events={(priced.length ? priced : events).slice(0, 8)} />
      </View>
      <View style={{ gap: spacing.md }}>
        <Text variant="heading">Closing soon</Text>
        <EventCarousel events={[...events].reverse().slice(0, 8)} />
      </View>
    </View>
  );
}

const directories = [
  {
    label: 'Art & Dine',
    route: '/art-and-dine',
    icon: RestaurantIcon,
    image: 'https://picsum.photos/seed/havana/900/500',
  },
  {
    label: 'Art Organizations',
    route: '/organizations',
    icon: BuildingIcon,
    image: 'https://picsum.photos/seed/museum/500/500',
  },
  {
    label: 'Culture News',
    route: '/news',
    icon: NewspaperIcon,
    image: 'https://picsum.photos/seed/newsart/500/500',
  },
] as const;

export function ExploreDirectoryBento() {
  return (
    <View style={{ gap: spacing.md }}>
      <Text variant="title">Go beyond events</Text>
      {directories.map((item, index) => (
        <Pressable
          key={item.label}
          onPress={() => router.push(item.route)}
          style={({ pressed }) => ({
            height: index ? 140 : 190,
            borderRadius: radius.xl,
            overflow: 'hidden',
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Image
            source={{ uri: item.image }}
            contentFit="cover"
            style={{ position: 'absolute', inset: 0 }}
          />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(4,10,16,.38)' }} />
          <View
            style={{
              flex: 1,
              padding: spacing.lg,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: spacing.sm,
            }}
          >
            <item.icon color="#fff" />
            <Text variant="heading" color="#fff" style={{ flex: 1 }}>
              {item.label}
            </Text>
            <Text color="#fff">›</Text>
          </View>
        </Pressable>
      ))}
      <Pressable
        onPress={() => router.push('/map')}
        style={{
          backgroundColor: '#249bd8',
          borderRadius: radius.xl,
          padding: spacing.lg,
          flexDirection: 'row',
          gap: spacing.md,
          alignItems: 'center',
        }}
      >
        <MapIcon color="#fff" />
        <Text variant="heading" color="#fff" style={{ flex: 1 }}>
          Explore the map
        </Text>
        <Text color="#fff">›</Text>
      </Pressable>
    </View>
  );
}
