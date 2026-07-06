import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { Text } from '../../../components/ui';
import { GENRES } from '../../../config/constants';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';

interface CategoryBrowseSectionProps {
  onSelect: (genreId: string) => void;
}

/** Two-column image grid of genres (web parity: genre strips on mobile nav). */
export function CategoryBrowseSection({ onSelect }: CategoryBrowseSectionProps) {
  const theme = useAppTheme();
  const featured = GENRES.slice(0, 6);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
      {featured.map((genre) => (
        <Pressable
          key={genre.id}
          accessibilityRole="button"
          accessibilityLabel={`Browse ${genre.name}`}
          onPress={() => onSelect(genre.id)}
          style={({ pressed }) => ({
            width: '48%',
            flexGrow: 1,
            borderRadius: radius.md,
            overflow: 'hidden',
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <Image
            source={{ uri: `https://picsum.photos/seed/${genre.id}/600/340` }}
            style={{ width: '100%', height: 84, backgroundColor: theme.colors.skeleton }}
            contentFit="cover"
            transition={200}
          />
          <View
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(22,23,23,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text variant="bodyBold" color="#ffffff">
              {genre.name}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
