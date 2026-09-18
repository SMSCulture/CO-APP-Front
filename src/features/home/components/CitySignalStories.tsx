import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, View } from 'react-native';
import { Button, Text } from '../../../components/ui';
import { palette } from '../../../design/colors';
import { spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';

const storyLooks = [
  { background: '#d62f82', accent: '#ffd22e', label: "TONIGHT'S LEAD" },
  { background: '#1650bd', accent: '#36d8bc', label: 'FREE TONIGHT' },
  { background: '#702dd1', accent: '#ff7447', label: 'YOUR LATE PICK' },
];

function SignalStory({ event, index }: { event: EventSummary; index: number }) {
  const [open, setOpen] = useState(false);
  const [reveal] = useState(() => new Animated.Value(0));
  const look = storyLooks[index % storyLooks.length];
  useEffect(() => {
    Animated.timing(reveal, {
      toValue: open ? 1 : 0,
      duration: 360,
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
          {!open ? (
            <Text variant="caption" color="rgba(255,255,255,.86)">
              Tap the design to reveal the event
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
            <Button
              label={open ? 'Open event' : 'Reveal'}
              onPress={() => (open ? router.push(`/events/${event.id}`) : setOpen(true))}
              style={{ flex: 1, backgroundColor: '#fff' }}
            />
            {open ? (
              <Button
                label="Close"
                variant="secondary"
                onPress={() => setOpen(false)}
                style={{ minWidth: 82 }}
              />
            ) : null}
          </View>
        </View>
      </View>
      {!open ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Reveal event image"
          onPress={() => setOpen(true)}
          style={{ position: 'absolute', inset: 0 }}
        />
      ) : null}
    </View>
  );
}

export function CitySignalStories({ events }: { events: EventSummary[] }) {
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
        contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}
      >
        {events.slice(0, 5).map((event, index) => (
          <SignalStory key={event.id} event={event} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}
