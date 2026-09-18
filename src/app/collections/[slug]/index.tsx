import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { ChevronLeftIcon } from '../../../components/layout/icons/MenuIcons';
import { IconButton, Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { formatDateSlot } from '../../../lib/formatDate';
import { formatEventPrice } from '../../../lib/formatPrice';
import { mockCollections } from '../../../mock/collections.mock';
import { mockEventSummaries } from '../../../mock/events.mock';
export default function CollectionDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const theme = useAppTheme();
  const c = mockCollections.find((x) => x.slug === slug);
  if (!c)
    return (
      <View>
        <Text>Collection not found</Text>
      </View>
    );
  const events = mockEventSummaries.filter((e) => c.eventIds.includes(e.id));
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <View style={{ height: 300 }}>
          <Image
            source={{ uri: c.imageUrl }}
            contentFit="cover"
            style={{ position: 'absolute', inset: 0 }}
          />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(8,9,13,.36)' }} />
          <View style={{ flex: 1, justifyContent: 'flex-end', padding: spacing.xl, gap: 8 }}>
            <Text variant="label" color="#fff">
              {c.eyebrow}
            </Text>
            <Text variant="display" color="#fff">
              {c.title}
            </Text>
          </View>
        </View>
        <View style={{ padding: spacing.screenX, gap: spacing.xl }}>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>{c.description}</Text>
          <View style={{ gap: 4 }}>
            <Text variant="heading">{events.length} events in this collection</Text>
            <Text variant="caption" muted>
              Simple, scannable and ready to open.
            </Text>
          </View>
          <View style={{ gap: spacing.lg }}>
            {events.map((event) => (
              <Pressable
                key={event.id}
                onPress={() => router.push(`/events/${event.id}`)}
                style={{ flexDirection: 'row', gap: spacing.md }}
              >
                <Image
                  source={{ uri: event.mainImageUrl ?? undefined }}
                  contentFit="cover"
                  style={{
                    width: 118,
                    height: 148,
                    borderRadius: radius.md,
                    backgroundColor: theme.colors.skeleton,
                  }}
                />
                <View style={{ flex: 1, justifyContent: 'center', gap: 5 }}>
                  <Text variant="label" color={theme.colors.primary}>
                    {formatEventPrice(event)}
                  </Text>
                  <Text variant="subheading" numberOfLines={3}>
                    {event.title}
                  </Text>
                  <Text variant="caption" muted>
                    {formatDateSlot(event.nextEventDate, event.startDate)}
                  </Text>
                  <Text variant="caption" muted numberOfLines={1}>
                    {event.venueName}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', top: 48, left: spacing.lg }}>
        <IconButton accessibilityLabel="Go back" onPress={() => router.back()}>
          <ChevronLeftIcon color="#fff" />
        </IconButton>
      </View>
    </View>
  );
}
