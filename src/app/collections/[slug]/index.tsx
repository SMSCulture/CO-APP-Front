import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Share, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { IconButton, Text } from '../../../components/ui';
import { palette, radius, shadows, spacing } from '../../../design/tokens';
import { formatDateSlot } from '../../../lib/formatDate';
import { formatEventPrice } from '../../../lib/formatPrice';
import { mockCollections } from '../../../mock/collections.mock';
import { mockEvents, mockEventSummaries } from '../../../mock/events.mock';
import { useToastStore } from '../../../store/toastStore';

const ink = '#f7f7f4';
const muted = '#a7abb0';
const surface = '#090b0d';
const panel = '#15181c';

function ShareIcon({ color = ink }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 16V3m0 0 4 4m-4-4L8 7M5 11v8h14v-8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function BookmarkIcon({ color = ink, filled = false }: { color?: string; filled?: boolean }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <Path d="M6 3h12v18l-6-4-6 4V3Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export default function CollectionDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [following, setFollowing] = useState(false);
  const showToast = useToastStore((s) => s.show);
  const c = mockCollections.find((x) => x.slug === slug);
  if (!c)
    return (
      <View style={{ flex: 1, backgroundColor: surface, alignItems: 'center', justifyContent: 'center' }}>
        <Text color={ink}>Collection not found</Text>
      </View>
    );
  const events = mockEventSummaries.filter((e) => c.eventIds.includes(e.id));
  const more = mockCollections.filter((x) => x.id !== c.id);
  const setWatch = () => {
    const next = !following;
    setFollowing(next);
    showToast(
      {
        message: next ? 'Added to your CultureOwl watchlist' : 'Removed from your watchlist',
        imageUrl: c.imageUrl,
        variant: 'success',
      },
      3500,
    );
  };
  const share = () => {
    Share.share({ message: `${c.title} on CultureOwl` }).catch(() => {});
  };
  return (
    <View style={{ flex: 1, backgroundColor: surface }}>
      <ScrollView stickyHeaderIndices={[2]} contentContainerStyle={{ paddingBottom: 104 }}>
        <View style={{ height: 318 }}>
          <Image source={{ uri: c.imageUrl }} contentFit="cover" style={{ position: 'absolute', inset: 0 }} />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,.16)' }} />
        </View>
        <View
          style={{
            marginTop: -38,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: surface,
            paddingHorizontal: spacing.screenX,
            paddingTop: spacing.xl,
            paddingBottom: spacing.lg,
            gap: spacing.md,
          }}
        >
          <Text variant="label" color={palette.blue}>{c.eyebrow}</Text>
          <Text variant="display" color={ink}>{c.title}</Text>
          <Text color={muted} style={{ fontSize: 15, lineHeight: 23 }}>{c.description}</Text>
          <View
            style={{
              marginTop: spacing.sm,
              borderRadius: radius.lg,
              backgroundColor: '#10293a',
              padding: spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.md,
            }}
          >
            <View style={{ flex: 1, gap: 3 }}>
              <Text variant="bodyBold" color={ink}>
                {following ? "You're following this collection" : 'Get updates from this collection'}
              </Text>
              <Text variant="caption" color="#b9d9ed">
                Deals, new dates and fresh additions, all in one place.
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={following ? 'Following collection' : 'Follow collection'}
              onPress={setWatch}
              style={{ backgroundColor: following ? ink : palette.blue, borderRadius: radius.full, paddingHorizontal: 16, paddingVertical: 10 }}
            >
              <Text variant="bodyBold" color={following ? surface : '#fff'}>{following ? 'Following' : 'Follow'}</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            backgroundColor: surface,
            paddingHorizontal: spacing.screenX,
            paddingVertical: spacing.sm,
            borderBottomWidth: 1,
            borderColor: '#24282d',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text variant="bodyBold" color={ink}>{c.title}</Text>
          <Text variant="caption" color={muted}>{events.length} experiences</Text>
        </View>
        <View style={{ paddingHorizontal: spacing.screenX, paddingTop: spacing.lg, gap: spacing.xl }}>
          {events.map((event) => {
            const detail = mockEvents.find((item) => item.id === event.id);
            return (
            <Pressable key={event.id} onPress={() => router.push(`/events/${event.id}`)} style={{ flexDirection: 'row', gap: spacing.md }}>
              <Image
                source={{ uri: event.mainImageUrl ?? undefined }}
                contentFit="cover"
                style={{ width: 104, height: 104, borderRadius: radius.md, backgroundColor: panel }}
              />
              <View style={{ flex: 1, gap: 4, justifyContent: 'center' }}>
                <Text variant="subheading" color={ink} numberOfLines={2}>{event.title}</Text>
                <Text variant="caption" color={palette.blue}>{formatEventPrice(event)}</Text>
                <Text variant="caption" color={muted}>{formatDateSlot(event.nextEventDate, event.startDate)}</Text>
                <Text variant="caption" color={muted} numberOfLines={1}>{event.venueName}</Text>
                <Text variant="caption" color="#d2d3d4" numberOfLines={2} ellipsizeMode="tail">
                  {detail?.description ?? `A CultureOwl pick in ${event.city}, selected for this edit.`}
                </Text>
              </View>
            </Pressable>
            );
          })}
        </View>
        <View style={{ marginTop: spacing['2xl'], padding: spacing.screenX, backgroundColor: panel, gap: spacing.md }}>
          <Text variant="heading" color={ink}>Discover more collections</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {more.map((item) => (
              <Pressable key={item.id} onPress={() => router.push(`/collections/${item.slug}`)} style={{ flex: 1, gap: spacing.sm }}>
                <View>
                  <Image source={{ uri: item.imageUrl }} contentFit="cover" style={{ width: '100%', aspectRatio: 1, borderRadius: radius.md }} />
                  <View style={{ position: 'absolute', right: 8, top: 8 }}><BookmarkIcon color="#fff" /></View>
                </View>
                <Text variant="caption" color={ink} numberOfLines={2}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', top: 48, right: spacing.md }}>
        <IconButton accessibilityLabel="Share collection" onPress={share}><ShareIcon /></IconButton>
      </View>
      <View style={{ position: 'absolute', left: spacing.screenX, right: spacing.screenX, bottom: spacing.lg }}>
        <Pressable
          accessibilityRole="button"
          onPress={setWatch}
          style={{ minHeight: 52, borderRadius: radius.full, backgroundColor: following ? ink : palette.blue, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm, ...shadows.raised }}
        >
          <BookmarkIcon color={following ? surface : '#fff'} filled={following} />
          <Text variant="bodyBold" color={following ? surface : '#fff'}>{following ? 'Following collection' : 'Follow for updates'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
