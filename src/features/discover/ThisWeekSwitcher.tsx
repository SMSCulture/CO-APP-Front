import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { MapPinIcon } from '../../components/layout/icons/MenuIcons';
import { Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatEventLocation } from '../../lib/formatLocation';
import { formatEventPrice } from '../../lib/formatPrice';
import type { EventSummary } from '../../types/event';

const PAGE_SIZE = 3;
const SWITCH_MS = 3500;

/** Fever-style This Week block: three compact rows, then a quiet automatic switch to the next three. */
export function ThisWeekSwitcher({ events }: { events: EventSummary[] }) {
  const theme = useAppTheme();
  const pages = useMemo(() => {
    const next: EventSummary[][] = [];
    for (let index = 0; index < events.length; index += PAGE_SIZE) {
      const page = events.slice(index, index + PAGE_SIZE);
      if (page.length === PAGE_SIZE) next.push(page);
    }
    return next;
  }, [events]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (pages.length < 2) return;
    const timer = setInterval(() => setPageIndex((current) => (current + 1) % pages.length), SWITCH_MS);
    return () => clearInterval(timer);
  }, [pages.length]);

  const visible = pages[pageIndex] ?? events.slice(0, PAGE_SIZE);

  return (
    <View style={{ gap: spacing.md }}>
      {visible.map((event) => (
        <Pressable
          key={`${pageIndex}-${event.id}`}
          accessibilityRole="button"
          accessibilityLabel={event.title}
          onPress={() => router.push(`/events/${event.id}`)}
          style={({ pressed }) => ({ flexDirection: 'row', gap: spacing.md, opacity: pressed ? 0.82 : 1 })}
        >
          <Image
            source={{ uri: event.mainImageUrl ?? undefined }}
            contentFit="cover"
            transition={180}
            style={{ width: 74, height: 74, borderRadius: radius.md, backgroundColor: theme.colors.skeleton }}
          />
          <View style={{ flex: 1, justifyContent: 'center', gap: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <MapPinIcon color={String(theme.colors.textMuted)} size={12} />
              <Text variant="caption" muted numberOfLines={1} style={{ flex: 1, fontSize: 10 }}>
                {formatEventLocation(event)}
              </Text>
            </View>
            <Text variant="bodyBold" numberOfLines={2} style={{ fontSize: 13, lineHeight: 16 }}>
              {event.title}
            </Text>
            <Text variant="caption" numberOfLines={1} style={{ fontSize: 11 }}>
              {formatEventPrice(event) ?? 'View details'}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
