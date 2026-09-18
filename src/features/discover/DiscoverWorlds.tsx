import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { EventCarousel } from '../../components/discovery/EventCarousel';
import { Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import { eventDiscoveryTags, matchingArticles } from '../../lib/discoveryMatching';
import type { EventSummary } from '../../types/event';
import type { NewsArticle } from '../../types/news';

const worlds = [
  { id: 'immersive', label: 'Immersive', category: ['art', 'museums'], vibe: ['immersive'] },
  { id: 'exhibitions', label: 'Exhibitions', category: ['art', 'museums'], vibe: [] },
  { id: 'performances', label: 'Performances', category: ['theatre', 'dance', 'music'], vibe: ['performance'] },
  { id: 'dinner', label: 'Dinner + a Show', category: ['food', 'theatre'], vibe: ['date-night'] },
] as const;

export function DiscoverWorlds({ events, articles }: { events: EventSummary[]; articles: NewsArticle[] }) {
  const [activeId, setActiveId] = useState<(typeof worlds)[number]['id']>('immersive');
  const active = worlds.find((world) => world.id === activeId) ?? worlds[0];
  const tags = { category: [...active.category], neighborhood: [], vibe: [...active.vibe] };
  const categories = new Set<string>(active.category);
  const filtered = events.filter((event) => eventDiscoveryTags(event).category.some((tag) => categories.has(tag.toLowerCase())));
  const matching = filtered.length ? filtered : events;
  const [feature] = matchingArticles(tags, articles, 1);

  return (
    <View style={{ gap: spacing.lg }}>
      <View style={{ gap: 5 }}>
        <Text variant="label">EXPLORE A WORLD</Text>
        <Text variant="title">Find your next kind of night</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -spacing.screenX }} contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.sm }}>
        {worlds.map((world) => {
          const selected = world.id === activeId;
          return <Pressable key={world.id} onPress={() => setActiveId(world.id)} style={{ borderRadius: 999, paddingVertical: 10, paddingHorizontal: spacing.md, backgroundColor: selected ? '#258fc9' : '#e9edf0' }}><Text variant="bodyBold" color={selected ? '#fff' : '#27343c'}>{world.label}</Text></Pressable>;
        })}
      </ScrollView>
      {feature ? (
        <Pressable onPress={() => router.push(`/news/${feature.slug}`)} style={({ pressed }) => ({ borderRadius: radius.xl, overflow: 'hidden', minHeight: 230, opacity: pressed ? .86 : 1 })}>
          <Image source={{ uri: feature.heroImageUrl ?? undefined }} contentFit="cover" style={{ position: 'absolute', inset: 0 }} />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(6,11,17,.42)' }} />
          <View style={{ flex: 1, justifyContent: 'flex-end', padding: spacing.lg, gap: 6 }}>
            <Text variant="label" color="#fff">FEATURED IN {active.label.toUpperCase()}</Text>
            <Text variant="heading" color="#fff" numberOfLines={3}>{feature.title}</Text>
          </View>
        </Pressable>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Text variant="heading">{active.label} events</Text>
        <Text variant="caption" muted>Swipe to explore</Text>
      </View>
      <EventCarousel events={matching.slice(0, 8)} />
    </View>
  );
}
