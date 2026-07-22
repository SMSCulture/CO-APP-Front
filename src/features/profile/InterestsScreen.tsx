import { View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Chip, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useMainGenres } from '../../queries/genres.queries';
import { useInterestsStore } from '../../store/interestsStore';

/**
 * Interests — multi-select from the real genre list (same useMainGenres()
 * data as Categories/Search/Discover), persisted locally. Mirrors the
 * concept of web's OnboardingInterestsEditor (app/auth/onboarding/), not a
 * literal port — that component is deeply tied to the onboarding flow's
 * own state/routing, which doesn't exist on mobile.
 */
export function InterestsScreen() {
  const { data: genres, isLoading } = useMainGenres();
  const { selectedGenreIds, toggle } = useInterestsStore();

  return (
    <Screen scroll>
      <DetailScreenHeader title="Interests" />
      <Text muted style={{ marginBottom: spacing.lg }}>
        Pick what you&apos;re into — we&apos;ll use this to surface more relevant events.
      </Text>
      {isLoading ? (
        <LoadingState rows={2} />
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          {(genres ?? []).map((genre) => (
            <Chip
              key={genre.id}
              label={genre.display}
              active={selectedGenreIds.includes(genre.id)}
              onPress={() => toggle(genre.id)}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}
