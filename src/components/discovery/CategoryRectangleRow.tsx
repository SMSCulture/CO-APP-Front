import { Image } from 'expo-image';
import { Pressable } from 'react-native';

import { HorizontalCarousel } from '../layout/HorizontalCarousel';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useMainGenres } from '../../queries/genres.queries';
import { Text } from '../ui';

interface CategoryRectangleRowProps {
  selected?: string | null;
  onSelect: (genreId: string | null) => void;
  /** Show a leading "All" card — used for filter contexts (Home top row, Search). Omit for pure browse contexts (Discover). */
  showAll?: boolean;
}

/**
 * The single genre-picker UI, used identically everywhere genres are
 * selectable: Home's top filter row, Home's "Categories" section, the
 * Search screen, and the Discover tab. Real backend genres (useMainGenres),
 * rendered as rectangles — not the old rounded-pill CategoryChips shape.
 */
export function CategoryRectangleRow({ selected, onSelect, showAll = false }: CategoryRectangleRowProps) {
  const theme = useAppTheme();
  const { data: genres } = useMainGenres();

  return (
    <HorizontalCarousel>
      {showAll ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="All categories"
          onPress={() => onSelect(null)}
          style={({ pressed }) => ({
            width: 96,
            height: 72,
            borderRadius: radius.md,
            borderWidth: selected == null ? 2 : 1,
            borderColor: selected == null ? theme.colors.primary : theme.colors.border,
            backgroundColor: theme.colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text variant="bodyBold">All</Text>
        </Pressable>
      ) : null}
      {(genres ?? []).map((genre) => {
        const active = selected === genre.id;
        return (
          <Pressable
            key={genre.id}
            accessibilityRole="button"
            accessibilityLabel={`Browse ${genre.display}`}
            onPress={() => onSelect(active ? null : genre.id)}
            style={({ pressed }) => ({
              width: 140,
              height: 72,
              borderRadius: radius.md,
              overflow: 'hidden',
              borderWidth: active ? 2 : 0,
              borderColor: theme.colors.primary,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Image
              source={{ uri: genre.iconUrl ?? `https://picsum.photos/seed/${genre.id}/300/150` }}
              style={{ width: '100%', height: '100%', backgroundColor: theme.colors.skeleton }}
              contentFit="cover"
              transition={200}
            />
            <Text
              variant="bodyBold"
              color="#ffffff"
              numberOfLines={1}
              style={{
                position: 'absolute',
                left: spacing.sm,
                bottom: spacing.xs,
                right: spacing.sm,
              }}
            >
              {genre.display}
            </Text>
          </Pressable>
        );
      })}
    </HorizontalCarousel>
  );
}
