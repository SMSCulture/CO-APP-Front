import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, ScrollView, View } from 'react-native';
import { Button, Text } from '../../../components/ui';
import { palette } from '../../../design/colors';
import { spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';

const signalLooks = [
  { background: '#d62f82', accent: '#ffd22e', label: "TONIGHT'S LEAD" },
  { background: '#1650bd', accent: '#36d8bc', label: 'FREE TONIGHT' },
  { background: '#702dd1', accent: '#ff7447', label: 'YOUR LATE PICK' },
];

function QuickSignal({
  event,
  index,
  active,
}: {
  event: EventSummary;
  index: number;
  active: boolean;
}) {
  const [motion] = useState(() => new Animated.Value(0));
  const look = signalLooks[index % signalLooks.length];
  useEffect(() => {
    Animated.timing(motion, {
      toValue: active ? 1 : 0,
      duration: active ? 420 : 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [active, motion]);
  const accentMove = {
    transform: [
      { translateX: motion.interpolate({ inputRange: [0, 1], outputRange: [0, 22] }) },
      { rotate: '-9deg' },
    ],
  };
  return (
    <View
      style={{
        width: 318,
        height: 420,
        borderRadius: 28,
        overflow: 'hidden',
        backgroundColor: '#08090d',
      }}
    >
      <Image
        source={{ uri: event.mainImageUrl ?? undefined }}
        contentFit="cover"
        style={{ position: 'absolute', left: 116, right: 0, top: 0, bottom: 0 }}
      />
      <View
        style={{
          position: 'absolute',
          left: 116,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(4,5,9,.18)',
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 142,
          backgroundColor: look.background,
        }}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            width: 126,
            height: 126,
            borderRadius: 63,
            backgroundColor: look.accent,
            top: 56,
            left: 60,
          },
          accentMove,
        ]}
      />
      <View style={{ flex: 1, padding: spacing.lg, justifyContent: 'space-between' }}>
        <View style={{ gap: 7 }}>
          <Text variant="label" color="#fff">
            CITY SIGNAL · 0{index + 1}
          </Text>
          <Text variant="caption" color="rgba(255,255,255,.82)">
            ONE PHOTO · AUTO-DESIGNED
          </Text>
        </View>
        <View
          style={{
            padding: spacing.sm,
            marginHorizontal: -4,
            borderRadius: 18,
            backgroundColor: 'rgba(7,8,13,.84)',
            gap: 5,
          }}
        >
          <Text variant="label" color={look.accent}>
            {look.label}
          </Text>
          <Text variant="heading" color="#fff" numberOfLines={2}>
            {event.title}
          </Text>
          <Text variant="caption" color="rgba(255,255,255,.78)" numberOfLines={1}>
            {event.venueName}
          </Text>
          <Text variant="bodyBold" color="#fff">
            {event.pricing ?? 'Free'}
          </Text>
          <Button
            label="Open event"
            onPress={() => router.push(`/events/${event.id}`)}
            fullWidth
            style={{ marginTop: spacing.xs, minHeight: 48, backgroundColor: '#fff' }}
          />
        </View>
      </View>
    </View>
  );
}

export function CitySignalStories({ events }: { events: EventSummary[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!events.length) return null;
  return (
    <View
      style={{
        marginTop: spacing.lg,
        marginHorizontal: -spacing.screenX,
        paddingVertical: spacing.xl,
        backgroundColor: '#090a10',
      }}
    >
      <View style={{ paddingHorizontal: spacing.screenX, marginBottom: spacing.lg, gap: 5 }}>
        <Text variant="label" color={palette.orange}>
          QUICK · ACTIONABLE
        </Text>
        <Text variant="title" color="#fff">
          City Signals
        </Text>
        <Text color="rgba(255,255,255,.72)">
          One publisher photo, automatically made ready for discovery.
        </Text>
      </View>
      <ScrollView
        horizontal
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        snapToInterval={318 + spacing.md}
        disableIntervalMomentum
        onMomentumScrollEnd={(e) =>
          setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / (318 + spacing.md)))
        }
        contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}
      >
        {events.slice(0, 5).map((event, index) => (
          <QuickSignal key={event.id} event={event} index={index} active={index === activeIndex} />
        ))}
      </ScrollView>
    </View>
  );
}
