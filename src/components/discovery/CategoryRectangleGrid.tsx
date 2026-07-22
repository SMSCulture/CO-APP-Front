import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useMainGenres } from '../../queries/genres.queries';
import { Text } from '../ui';

interface CategoryRectangleGridProps {
  onSelect: (genreId: string) => void;
}

/**
 * Same category rectangles as CategoryRectangleRow, but stacked in a
 * 2-column wrap grid (3 rows of 2, for 6 categories) instead of a
 * horizontal-scrolling row — per explicit request for the Search page
 * specifically.
 */
export function CategoryRectangleGrid({ onSelect }: CategoryRectangleGridProps) {
  const theme = useAppTheme();
  const { data: genres } = useMainGenres();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
      {(genres ?? []).map((genre) => (
        <Pressable
          key={genre.id}
          accessibilityRole="button"
          accessibilityLabel={`Browse ${genre.display}`}
          onPress={() => onSelect(genre.id)}
          style={({ pressed }) => ({
            width: '47%',
            height: 90,
            borderRadius: radius.md,
            overflow: 'hidden',
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <Image
            source={{ uri: genre.iconUrl ?? `https://picsum.photos/seed/${genre.id}/300/200` }}
            style={{ width: '100%', height: '100%', backgroundColor: theme.colors.skeleton }}
            contentFit="cover"
            transition={200}
          />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(22,23,23,0.35)' }} />
          <Text
            variant="bodyBold"
            color="#ffffff"
            numberOfLines={2}
            style={{ position: 'absolute', left: spacing.sm, bottom: spacing.xs, right: spacing.sm }}
          >
            {genre.display}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
