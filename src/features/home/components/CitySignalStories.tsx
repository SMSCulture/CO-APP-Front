import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, ScrollView, View } from 'react-native';
import { Button, Text } from '../../../components/ui';
import { palette } from '../../../design/colors';
import { spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';

const storyLooks = [
  { background: '#d62f82', accent: '#ffd22e', label: "TONIGHT'S LEAD" },
  { background: '#1650bd', accent: '#36d8bc', label: 'FREE TONIGHT' },
  { background: '#702dd1', accent: '#ff7447', label: 'YOUR LATE PICK' },
];

function SignalStory({
  event,
  index,
  active,
}: {
  event: EventSummary;
  index: number;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [reveal] = useState(() => new Animated.Value(0));
  const look = storyLooks[index % storyLooks.length];
  useEffect(() => {
    if (!active) {
      const reset = setTimeout(() => {
        setOpen(false);
        reveal.setValue(0);
      }, 0);
      return () => clearTimeout(reset);
    }
    const timer = setTimeout(() => setOpen(true), 520);
    return () => clearTimeout(timer);
  }, [active, reveal]);
  useEffect(() => {
    Animated.timing(reveal, {
      toValue: open ? 1 : 0,
      duration: open ? 420 : 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, reveal]);
  const leftTransform = {
    transform: [{ translateX: reveal.interpolate({ inputRange: [0, 1], outputRange: [0, -170] }) }],
  };
  const rightTransform = {
    transform: [{ translateX: reveal.interpolate({ inputRange: [0, 1], outputRange: [0, 170] }) }],
  };
  return (
    <View
      style={{
        width: 318,
        height: 568,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#08090d',
      }}
    >
      <Image
        source={{ uri: event.mainImageUrl ?? undefined }}
        contentFit="cover"
        style={{ position: 'absolute', inset: 0 }}
      />
      <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5,6,10,.34)' }} />
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '54%',
            backgroundColor: look.background,
          },
          leftTransform,
        ]}
      >
        <View
          style={{
            position: 'absolute',
            width: 190,
            height: 190,
            borderRadius: 95,
            backgroundColor: look.accent,
            top: 92,
            right: -60,
          }}
        />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '54%',
            backgroundColor: look.background,
          },
          rightTransform,
        ]}
      >
        <View
          style={{
            position: 'absolute',
            width: 126,
            height: 126,
            borderRadius: 63,
            backgroundColor: 'rgba(255,255,255,.2)',
            top: 124,
            left: -10,
          }}
        />
      </Animated.View>
      <View style={{ flex: 1, padding: spacing.lg, justifyContent: 'space-between' }}>
        <View style={{ gap: 8 }}>
          <View style={{ height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,.42)' }}>
            <View
              style={{
                width: `${34 + index * 22}%`,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#fff',
              }}
            />
          </View>
          <Text variant="label" color="#fff">
            CITY SIGNAL · 0{index + 1}
          </Text>
        </View>
        <View style={{ gap: spacing.sm }}>
          <Text variant="label" color={open ? '#fff' : look.accent}>
            {open ? 'THE REAL EVENT' : look.label}
          </Text>
          <Text variant="title" color="#fff" style={{ fontSize: 30, lineHeight: 32 }}>
            {event.title.toUpperCase()}
          </Text>
          <Text color="#fff">
            {event.venueName} · {event.pricing ?? 'Free'}
          </Text>
          <Text variant="caption" color="rgba(255,255,255,.86)">
            {open
              ? 'Photo revealed · Event details ready'
              : 'Photo revealing now · Event details stay ready'}
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
            <Button
              label="Open event"
              onPress={() => router.push(`/events/${event.id}`)}
              style={{ flex: 1, backgroundColor: '#fff' }}
            />
            {open ? (
              <Button
                label="Replay"
                variant="secondary"
                onPress={() => {
                  setOpen(false);
                  setTimeout(() => setOpen(true), 220);
                }}
                style={{ minWidth: 82 }}
              />
            ) : null}
          </View>
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
          NEW · INTERACTIVE
        </Text>
        <Text variant="title" color="#fff">
          City Signal Stories
        </Text>
        <Text color="rgba(255,255,255,.72)">Design opens into the real event.</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
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
          <SignalStory key={event.id} event={event} index={index} active={index === activeIndex} />
        ))}
      </ScrollView>
    </View>
  );
}
