import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { HorizontalCarousel } from '../../../components/layout/HorizontalCarousel';
import { Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';

/**
 * Editorial collections rail. Static definitions for now — when the backend
 * exposes curated collections (web: page zones / genre feeds), map them here.
 */
const COLLECTIONS = [
  { id: 'free', title: 'Free this week', image: 'https://picsum.photos/seed/free/600/750' },
  { id: 'date-night', title: 'Date night', image: 'https://picsum.photos/seed/date/600/750' },
  { id: 'family', title: 'Family fun', image: 'https://picsum.photos/seed/family/600/750' },
  { id: 'after-dark', title: 'After dark', image: 'https://picsum.photos/seed/night/600/750' },
];

export function CuratedCollectionsSection() {
  const theme = useAppTheme();
  return (
    <HorizontalCarousel>
      {COLLECTIONS.map((collection) => (
        <Pressable
          key={collection.id}
          accessibilityRole="button"
          accessibilityLabel={collection.title}
          onPress={() => router.push('/(tabs)/search')}
          style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
        >
          <View style={{ width: 150, borderRadius: radius.lg, overflow: 'hidden' }}>
            <Image
              source={{ uri: collection.image }}
              style={{ width: 150, height: 190, backgroundColor: theme.colors.skeleton }}
              contentFit="cover"
              transition={200}
            />
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: spacing.md,
                backgroundColor: 'rgba(22,23,23,0.5)',
              }}
            >
              <Text variant="bodyBold" color="#ffffff" numberOfLines={2}>
                {collection.title}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </HorizontalCarousel>
  );
}
