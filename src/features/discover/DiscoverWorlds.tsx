import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { EventCarousel } from '../../components/discovery/EventCarousel';
import { Text } from '../../components/ui';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { eventDiscoveryTags, matchingArticles } from '../../lib/discoveryMatching';
import type { EventSummary } from '../../types/event';
import type { NewsArticle } from '../../types/news';

const worlds = [
  { id: 'immersive', label: 'Immersive', symbol: '◉', category: ['art', 'museums'], vibe: ['immersive'] },
  { id: 'exhibitions', label: 'Exhibitions', symbol: '▣', category: ['art', 'museums'], vibe: [] },
  { id: 'performances', label: 'Performances', symbol: '◈', category: ['theatre', 'dance', 'music'], vibe: ['performance'] },
  { id: 'dinner', label: 'Dinner + a Show', symbol: '◇', category: ['food', 'theatre'], vibe: ['date-night'] },
] as const;

export function DiscoverWorlds({ events, articles }: { events: EventSummary[]; articles: NewsArticle[] }) {
  const [activeId, setActiveId] = useState<(typeof worlds)[number]['id']>('immersive');
  const active = worlds.find((world) => world.id === activeId) ?? worlds[0];
  const tags = { category: [...active.category], neighborhood: [], vibe: [...active.vibe] };
  const categories = new Set<string>(active.category);
  const filtered = events.filter((event) => eventDiscoveryTags(event).category.some((tag) => categories.has(tag.toLowerCase())));
  const matching = filtered.length ? filtered : events;
  const [feature] = matchingArticles(tags, articles, 1);
  const bannerImage = feature?.heroImageUrl ?? matching[0]?.bigImageUrl ?? matching[0]?.mainImageUrl;

  return (
    <View style={{ marginHorizontal: -spacing.screenX, backgroundColor: '#07111d', paddingTop: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg }}>
      <View style={{ paddingHorizontal: spacing.screenX, gap: 6 }}>
        <Text variant="label" color="rgba(255,255,255,.62)" style={{ letterSpacing: 3 }}>NOW EXPLORING</Text>
        <Text color="#fff" style={{ fontFamily: fontFamily.bold, fontSize: 38, lineHeight: 43, fontWeight: '700' }}>{active.label}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.lg }}>
        {worlds.map((world) => {
          const selected = world.id === activeId;
          return (
            <Pressable key={world.id} onPress={() => setActiveId(world.id)} style={{ minHeight: 48, paddingHorizontal: 3, justifyContent: 'center', borderBottomWidth: 3, borderBottomColor: selected ? '#199cff' : 'transparent' }}>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <Text color={selected ? '#199cff' : 'rgba(255,255,255,.55)'} style={{ fontSize: 21 }}>{world.symbol}</Text>
                <Text variant="bodyBold" color={selected ? '#fff' : 'rgba(255,255,255,.58)'}>{world.label}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {bannerImage ? (
        <Pressable onPress={() => feature ? router.push(`/news/${feature.slug}`) : router.push(`/events/${matching[0]?.id}`)} style={({ pressed }) => ({ marginHorizontal: spacing.screenX, borderRadius: radius.xl, overflow: 'hidden', minHeight: 250, opacity: pressed ? .86 : 1 })}>
          <Image source={{ uri: bannerImage }} contentFit="cover" style={{ position: 'absolute', inset: 0 }} />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(3,9,17,.46)' }} />
          <View style={{ flex: 1, justifyContent: 'flex-end', padding: spacing.lg, gap: 7 }}>
            <Text variant="label" color="#2facff">FEATURED {active.label.toUpperCase()}</Text>
            <Text color="#fff" style={{ fontFamily: fontFamily.bold, fontSize: 27, lineHeight: 32, fontWeight: '700' }} numberOfLines={3}>{feature?.title ?? matching[0]?.title}</Text>
            {feature?.excerpt ? <Text color="rgba(255,255,255,.76)" numberOfLines={2}>{feature.excerpt}</Text> : null}
          </View>
        </Pressable>
      ) : null}

      <View style={{ paddingHorizontal: spacing.screenX, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Text variant="heading" color="#fff">Explore {active.label}</Text>
        <Text variant="caption" color="rgba(255,255,255,.54)">Swipe to explore</Text>
      </View>
      <View style={{ paddingHorizontal: spacing.screenX }}>
        <EventCarousel events={matching.slice(0, 8)} />
      </View>
    </View>
  );
}
