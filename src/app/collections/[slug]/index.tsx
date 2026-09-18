import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { ChevronLeftIcon } from '../../../components/layout/icons/MenuIcons';
import { Button, IconButton, Text } from '../../../components/ui';
import { radius, shadows, spacing } from '../../../design/tokens';
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
      <ScrollView stickyHeaderIndices={[2]} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={{ height: 360 }}>
          <Image
            source={{ uri: c.imageUrl }}
            contentFit="cover"
            style={{ position: 'absolute', inset: 0 }}
          />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(8,9,13,.16)' }} />
        </View>
        <View
          style={{
            marginTop: -42,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: theme.colors.background,
            paddingHorizontal: spacing.screenX,
            paddingTop: spacing.xl,
            paddingBottom: spacing.lg,
            gap: spacing.md,
          }}
        >
          <Text variant="display">{c.title}</Text>
          <Text muted style={{ fontSize: 16, lineHeight: 24 }}>
            {c.description}
          </Text>
          <Button label="Save collection" fullWidth onPress={() => {}} />
        </View>
        <View
          style={{
            backgroundColor: theme.colors.background,
            paddingHorizontal: spacing.screenX,
            paddingVertical: spacing.sm,
            borderBottomWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text variant="bodyBold">{events.length} events in this collection</Text>
        </View>
        <View style={{ padding: spacing.screenX, gap: spacing.xl }}>
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
                  width: 98,
                  height: 122,
                  borderRadius: radius.md,
                  backgroundColor: theme.colors.skeleton,
                }}
              />
              <View style={{ flex: 1, gap: 4 }}>
                <Text variant="subheading" numberOfLines={2}>
                  {event.title}
                </Text>
                <Text variant="caption" color={theme.colors.primary}>
                  {formatEventPrice(event)}
                </Text>
                <Text variant="caption" muted>
                  {formatDateSlot(event.nextEventDate, event.startDate)}
                </Text>
                <Text variant="caption" muted numberOfLines={1}>
                  {event.venueName}
                </Text>
                <Text variant="caption" muted numberOfLines={2}>
                  {event.city}, {event.state} · Open event for details.
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', top: 48, left: spacing.lg }}>
        <IconButton accessibilityLabel="Go back" onPress={() => router.back()}>
          <ChevronLeftIcon color="#fff" />
        </IconButton>
      </View>
      <View
        style={{
          position: 'absolute',
          left: spacing.screenX,
          right: spacing.screenX,
          bottom: spacing.lg,
        }}
      >
        <Button label="Save collection" fullWidth onPress={() => {}} style={shadows.raised} />
      </View>
    </View>
  );
}
