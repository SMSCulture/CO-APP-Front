import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '../../../components/ui';
import { palette } from '../../../design/colors';
import { radius, spacing } from '../../../design/tokens';
import type { EventSummary } from '../../../types/event';
export function EditorialDiscovery({ events, city }: { events: EventSummary[]; city: string }) {
  const lead = events[0];
  return (
    <View style={{ gap: spacing.xl }}>
      {lead ? (
        <Pressable
          onPress={() => router.push(`/events/${lead.id}`)}
          style={{ borderRadius: radius.xl, overflow: 'hidden', minHeight: 300 }}
        >
          <Image
            source={{ uri: lead.bigImageUrl ?? lead.mainImageUrl ?? undefined }}
            style={{ position: 'absolute', inset: 0 }}
            contentFit="cover"
          />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,30,42,.42)' }} />
          <View
            style={{ flex: 1, justifyContent: 'flex-end', padding: spacing.xl, gap: spacing.sm }}
          >
            <Text variant="label" color="#fff">
              CULTUREOWL PICK · {city.toUpperCase()}
            </Text>
            <Text variant="title" color="#fff">
              {lead.title}
            </Text>
            <Text color="#fff">A closer look at one experience worth planning around.</Text>
          </View>
        </Pressable>
      ) : (
        <View
          style={{
            borderRadius: radius.xl,
            backgroundColor: palette.blueLight,
            padding: spacing.xl,
            gap: spacing.md,
          }}
        >
          <Text variant="label" color={palette.blueDark}>
            THE CULTUREOWL EDIT
          </Text>
          <Text variant="title">A city is more than its calendar</Text>
          <Text>Explore organizations, places and stories while new events arrive.</Text>
        </View>
      )}
    </View>
  );
}
