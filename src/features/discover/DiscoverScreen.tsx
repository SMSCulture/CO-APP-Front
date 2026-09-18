import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { Screen, Text } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useEventsFeed } from '../../queries/events.queries';
import { useLocationStore } from '../../store/locationStore';
import type { EventSummary } from '../../types/event';

const examples = [
  'A surprising date night under $75 for two',
  'Independent theater, nothing after 10',
  'Something immersive and free tonight',
];
const moods = ['Date Night', 'Immersive', 'Hidden Gems', 'Independent Theater', 'Free Tonight', 'Surprise Me'];
const sections = [
  ['Date Night', 'An evening that feels considered, not overplanned.'],
  ['Something Different', 'The stories you will still be talking about tomorrow.'],
  ['Under $25', 'A good night out without the big-night price.'],
  ['Last Chance', 'Worth seeing before it leaves the city.'],
] as const;

function DiscoveryCard({ event, index }: { event: EventSummary; index: number }) {
  const theme = useAppTheme();
  const why = [
    'Why you might like it: atmospheric, local and easy to pair with dinner.',
    'Why you might like it: a smaller stage with a bigger point of view.',
    'Why you might like it: unusual enough to feel like a discovery.',
  ][index % 3];
  return (
    <Pressable onPress={() => router.push(`/events/${event.id}`)} style={({ pressed }) => ({ width: 255, opacity: pressed ? .86 : 1 })}>
      <Image source={{ uri: event.bigImageUrl ?? event.mainImageUrl ?? undefined }} contentFit="cover" style={{ width: '100%', height: 300, borderRadius: radius.xl, backgroundColor: theme.colors.skeleton }} />
      <View style={{ paddingTop: spacing.sm, gap: 5 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
          {(event.tags.slice(0, 1).map((tag) => tag.name).concat(event.free ? ['Free'] : [])).map((tag) => (
            <View key={tag} style={{ borderRadius: 999, backgroundColor: theme.colors.surface, paddingHorizontal: 8, paddingVertical: 4 }}><Text variant="caption">{tag}</Text></View>
          ))}
        </View>
        <Text variant="subheading" numberOfLines={2}>{event.title}</Text>
        <Text variant="caption" muted numberOfLines={2}>{why}</Text>
      </View>
    </Pressable>
  );
}

export function DiscoverScreen() {
  const theme = useAppTheme();
  const { selectedCity } = useLocationStore();
  const city = selectedCity?.city ?? DEFAULT_CITY;
  const { data } = useEventsFeed({ city, limit: 20 });
  const events = useMemo(() => data?.events ?? [], [data?.events]);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [activeMood, setActiveMood] = useState('Surprise Me');
  const [refinement, setRefinement] = useState('More like this');
  useEffect(() => { const timer = setInterval(() => setExampleIndex((value) => (value + 1) % examples.length), 3200); return () => clearInterval(timer); }, []);
  const ordered = useMemo(() => activeMood === 'Free Tonight' ? [...events].sort((a, b) => Number(b.free) - Number(a.free)) : events, [activeMood, events]);

  return (
    <Screen scroll>
      <AppHeader title="Discover" />
      <View style={{ marginHorizontal: -spacing.screenX, paddingHorizontal: spacing.screenX, paddingVertical: spacing.xl, backgroundColor: '#07111d', gap: spacing.lg }}>
        <View style={{ gap: 6 }}><Text variant="label" color="#56baff">ASK CULTUREOWL · PREVIEW</Text><Text color="#fff" style={{ fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 38 }}>What kind of night do you want?</Text><Text color="rgba(255,255,255,.62)">A visual cultural guide, shaped around your mood.</Text></View>
        <View style={{ backgroundColor: 'rgba(255,255,255,.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,.18)', borderRadius: radius.xl, padding: spacing.md, gap: spacing.sm }}>
          <TextInput value={prompt} onChangeText={setPrompt} placeholder={examples[exampleIndex]} placeholderTextColor="rgba(255,255,255,.55)" multiline style={{ color: '#fff', minHeight: 62, fontFamily: fontFamily.regular, fontSize: 17, lineHeight: 24 }} />
          <Pressable onPress={() => setRefinement(prompt || activeMood)} style={{ alignSelf: 'flex-end', backgroundColor: '#3d98d3', borderRadius: 999, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}><Text color="#fff" variant="bodyBold">Show me</Text></Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
          {moods.map((mood) => <Pressable key={mood} onPress={() => setActiveMood(mood)} style={{ borderRadius: 999, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: activeMood === mood ? '#fff' : 'rgba(255,255,255,.1)' }}><Text variant="bodyBold" color={activeMood === mood ? '#07111d' : '#fff'}>{mood}</Text></Pressable>)}
        </ScrollView>
        <Text variant="caption" color="rgba(255,255,255,.52)">Preview uses current inventory and mock curation. No live AI service is connected yet.</Text>
      </View>

      <View style={{ gap: spacing.sm }}><Text variant="label" color={theme.colors.primary}>CURATED FOR {activeMood.toUpperCase()}</Text><Text variant="title">A feed with a point of view</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
        {['More like this', 'Under $75 for two', 'Nothing after 10'].map((item) => <Pressable key={item} onPress={() => setRefinement(item)} style={{ borderRadius: 999, borderWidth: 1, borderColor: refinement === item ? theme.colors.primary : theme.colors.border, backgroundColor: refinement === item ? theme.colors.primary : theme.colors.surface, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}><Text variant="bodyBold" color={refinement === item ? '#fff' : theme.colors.text}>{item}</Text></Pressable>)}
      </ScrollView>

      {sections.map(([title, deck], sectionIndex) => {
        const start = (sectionIndex * 2) % Math.max(ordered.length, 1);
        const items = ordered.length ? [...ordered, ...ordered].slice(start, start + 6) : [];
        return <View key={title} style={{ gap: spacing.md }}><View style={{ gap: 3 }}><Text variant="heading">{title}</Text><Text muted>{deck}</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -spacing.screenX }} contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}>{items.map((event, index) => <DiscoveryCard key={`${title}-${event.id}-${index}`} event={event} index={sectionIndex + index} />)}</ScrollView></View>;
      })}
    </Screen>
  );
}
