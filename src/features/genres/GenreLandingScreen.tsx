import { router } from 'expo-router';
import { Image } from 'expo-image';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EventCarousel } from '../../components/discovery/EventCarousel';
import { IconButton, LoadingState, Text } from '../../components/ui';
import { ChevronLeftIcon } from '../../components/layout/icons/MenuIcons';
import { useEventsFeed } from '../../queries/events.queries';
import { useMainGenres } from '../../queries/genres.queries';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

const treatments: Record<string, { kicker: string; promise: string; seed: string; tone: string }> = {
  art: { kicker: 'LOOK CLOSER', promise: 'Galleries, museums and ideas that change the view', seed: 'art-curation', tone: '#7C3AED' },
  theatre: { kicker: 'ON STAGE', promise: 'Stories that only happen live', seed: 'theatre-curation', tone: '#DC2626' },
  music: { kicker: 'TURN IT UP', promise: 'Concerts, intimate rooms and local sound', seed: 'music-curation', tone: '#0F766E' },
  classes: { kicker: 'MAKE SOMETHING', promise: 'Learn beside the people who do it best', seed: 'classes-curation', tone: '#B45309' },
  food: { kicker: 'GATHER HERE', promise: 'Festivals, fairs and flavors worth a trip', seed: 'festival-curation', tone: '#BE123C' },
  museums: { kicker: 'BRING EVERYONE', promise: 'Big discoveries for small explorers', seed: 'family-curation', tone: '#2563EB' },
};

/** Every genre owns an editorial art direction rather than sharing one recolored template. */
export function GenreLandingScreen({ genreId }: { genreId: string }) {
  const theme = useAppTheme(); const insets = useSafeAreaInsets();
  const { data: genres } = useMainGenres(); const { data, isLoading } = useEventsFeed({ tagId: genreId });
  const genre = genres?.find((g) => g.id === genreId); const treatment = treatments[genreId] ?? { kicker: 'CURATED BY CULTUREOWL', promise: `The best of ${genre?.display ?? 'culture'}, picked locally`, seed: genreId, tone: theme.colors.primary };
  const events = data?.events ?? [];
  return <View style={{ flex: 1, backgroundColor: theme.colors.background }}><ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
    <View style={{ height: 370, backgroundColor: treatment.tone }}><Image source={{ uri: `https://picsum.photos/seed/${treatment.seed}/1200/1000` }} style={{ width: '100%', height: '100%', opacity: .72 }} contentFit="cover" /><View style={{ position: 'absolute', left: spacing.xl, right: spacing.xl, bottom: spacing.xl, gap: spacing.sm }}><Text variant="caption" color="#fff">{treatment.kicker}</Text><Text variant="display" color="#fff">{genre?.display ?? 'Curated'}</Text><Text variant="subheading" color="#fff">{treatment.promise}</Text></View></View>
    <View style={{ paddingHorizontal: spacing.screenX, paddingTop: spacing.xl, gap: spacing.xl }}>{isLoading ? <LoadingState /> : <><Text variant="heading">Picked for this week</Text>{events.length ? <EventCarousel events={events} /> : <View style={{ padding: spacing.xl, borderRadius: radius.lg, backgroundColor: theme.colors.surface }}><Text variant="heading">The guide is growing</Text><Text muted>Read the scene now and check nearby while we add more dates.</Text></View>}</>}</View>
  </ScrollView><View style={{ position: 'absolute', top: insets.top + spacing.sm, left: spacing.md }}><IconButton accessibilityLabel="Go back" onPress={() => router.back()}><ChevronLeftIcon color="#fff" size={22} /></IconButton></View></View>;
}
