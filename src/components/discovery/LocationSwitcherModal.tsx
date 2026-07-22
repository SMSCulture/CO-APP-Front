/**
 * Location switcher — mirrors components/layout/header-location-selector.tsx
 * on web: search, recent, and suggested-cities sections in a modal.
 *
 * NOT ported: "Use my current location" (GPS). Web's version calls
 * requestUserLocation() (browser geolocation); this app has no geolocation
 * dependency yet (see src/hooks/useLocationPermission.ts — an explicit
 * placeholder awaiting expo-location). Adding that is a real native-module
 * decision, not made here — once it lands, the "near you" section can be
 * wired the same way web does it.
 */
import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';

import { getSuggestedCities, searchCities } from '../../api/modules/locations.api';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useDebounce } from '../../hooks/useDebounce';
import { useRecentLocations } from '../../hooks/useRecentLocations';
import type { CityData } from '../../types/location';
import { Input, LoadingState, Text } from '../ui';

interface LocationSwitcherModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (city: CityData) => void;
}

function CityRow({ city, onPress }: { city: CityData; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.xs,
        borderRadius: 12,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text variant="subheading">{city.city}</Text>
      {city.state ? (
        <Text variant="caption" muted>
          {city.state}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function LocationSwitcherModal({ visible, onClose, onSelectCity }: LocationSwitcherModalProps) {
  const theme = useAppTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { recentLocations, addRecentLocation } = useRecentLocations();

  const [searchResults, setSearchResults] = useState<CityData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [suggestedCities, setSuggestedCities] = useState<CityData[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const hasMinChars = debouncedSearch.trim().length >= 2;

  useEffect(() => {
    if (!visible) return;
    // Standard loading-flag-before-fetch pattern; the newer
    // react-hooks/set-state-in-effect rule flags any synchronous setState
    // in an effect body, including this one. Restructuring away from it
    // (e.g. a reducer, or a data-fetching library) is a real refactor, not
    // in scope here — suppressed narrowly rather than left failing lint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSuggestionsLoading(true);
    getSuggestedCities({ maxTopCities: 8 })
      .then((result) => setSuggestedCities(result.topCities))
      .finally(() => setSuggestionsLoading(false));
  }, [visible]);

  useEffect(() => {
    if (!hasMinChars) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    searchCities(debouncedSearch)
      .then(setSearchResults)
      .finally(() => setSearchLoading(false));
  }, [debouncedSearch, hasMinChars]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    if (!visible) setSearchTerm('');
  }, [visible]);

  const handleSelect = (city: CityData) => {
    addRecentLocation(city);
    onSelectCity(city);
    onClose();
  };

  const showSearchResults = hasMinChars && searchResults.length > 0;
  const showNoResults = hasMinChars && !searchLoading && searchResults.length === 0;

  const suggestedMinusRecent = useMemo(() => {
    const recentKeys = new Set(recentLocations.map((c) => `${c.city}|${c.state}`));
    return suggestedCities.filter((c) => !recentKeys.has(`${c.city}|${c.state}`));
  }, [suggestedCities, recentLocations]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: theme.colors.overlay, justifyContent: 'center', padding: spacing.xl }}>
        <Pressable
          onPress={onClose}
          accessibilityLabel="Close city picker"
          style={{ position: 'absolute', inset: 0 }}
        />
        <View
          style={{
            backgroundColor: theme.colors.surfaceElevated,
            borderRadius: 24,
            padding: spacing.lg,
            maxHeight: '75%',
          }}
        >
          <Text variant="heading" style={{ textAlign: 'center' }}>
            Choose your city
          </Text>
          <Text variant="caption" muted style={{ textAlign: 'center', marginTop: spacing.xs / 2, marginBottom: spacing.md }}>
            Find arts and culture near you
          </Text>

          <Input
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search city or region"
            autoCorrect={false}
            style={{ borderRadius: 999 }}
          />

          <ScrollView style={{ marginTop: spacing.md }} showsVerticalScrollIndicator={false}>
            {searchLoading && hasMinChars ? (
              <LoadingState rows={3} />
            ) : showSearchResults ? (
              <View>
                <Text variant="label" style={{ marginBottom: spacing.xs }}>
                  Search results
                </Text>
                {searchResults.map((city) => (
                  <CityRow key={`search-${city.city}-${city.state}`} city={city} onPress={() => handleSelect(city)} />
                ))}
              </View>
            ) : (
              <>
                {recentLocations.length > 0 ? (
                  <View style={{ marginBottom: spacing.md }}>
                    <Text variant="label" style={{ marginBottom: spacing.xs }}>
                      Recent
                    </Text>
                    {recentLocations.map((city) => (
                      <CityRow key={`recent-${city.city}-${city.state}`} city={city} onPress={() => handleSelect(city)} />
                    ))}
                  </View>
                ) : null}

                <Text variant="label" style={{ marginBottom: spacing.xs }}>
                  Suggested cities
                </Text>
                {suggestionsLoading && suggestedMinusRecent.length === 0 ? (
                  <LoadingState rows={3} />
                ) : (
                  suggestedMinusRecent.map((city) => (
                    <CityRow key={`suggested-${city.city}-${city.state}`} city={city} onPress={() => handleSelect(city)} />
                  ))
                )}
              </>
            )}

            {showNoResults ? (
              <Text variant="caption" muted style={{ textAlign: 'center', paddingVertical: spacing.xl }}>
                No cities found for &ldquo;{searchTerm}&rdquo;
              </Text>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
