import { useState } from 'react';
import { FlatList, View } from 'react-native';

import { CategoryChips } from '../../components/discovery/CategoryChips';
import { EventCard } from '../../components/discovery/EventCard';
import { MapButton } from '../../components/discovery/MapButton';
import { AppHeader } from '../../components/layout/AppHeader';
import { EmptyState, ErrorState, Input, LoadingState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useDebounce } from '../../hooks/useDebounce';
import { useEventSearch } from '../../queries/search.queries';

export function SearchScreen() {
  const [term, setTerm] = useState('');
  const [genre, setGenre] = useState<string | null>(null);
  const debouncedTerm = useDebounce(term);
  const { data, isLoading, isError, refetch } = useEventSearch({
    searchTerm: debouncedTerm,
    tagId: genre ?? undefined,
  });

  return (
    <Screen>
      <AppHeader title="Search" />
      <View style={{ gap: spacing.md, marginBottom: spacing.lg }}>
        <Input
          placeholder="Search events, venues, cities…"
          value={term}
          onChangeText={setTerm}
          autoCorrect={false}
          returnKeyType="search"
          accessibilityLabel="Search events"
        />
        <CategoryChips selected={genre} onSelect={setGenre} />
      </View>

      {isLoading ? (
        <LoadingState rows={2} />
      ) : isError ? (
        <ErrorState message="Search is unavailable right now." onRetry={() => refetch()} />
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          contentContainerStyle={{ gap: spacing.lg, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title="No results"
              message={debouncedTerm ? `Nothing matches “${debouncedTerm}”.` : 'Start typing to search.'}
            />
          }
        />
      )}
      <MapButton />
    </Screen>
  );
}
