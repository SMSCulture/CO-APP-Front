import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { LocationSwitcherModal } from '../../../components/discovery/LocationSwitcherModal';
import { ChevronDownIcon, MapPinIcon } from '../../../components/layout/icons/MenuIcons';
import { Text } from '../../../components/ui';
import { DEFAULT_CITY } from '../../../config/constants';
import { spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { useLocationStore } from '../../../store/locationStore';

/**
 * Extracted from HomeHeader — sits below the search bar, above Categories
 * (per explicit reorder request).
 */
export function LocationRow() {
  const theme = useAppTheme();
  const [locationOpen, setLocationOpen] = useState(false);
  const { selectedCity, setSelectedCity } = useLocationStore();
  const displayCity = selectedCity?.city ?? DEFAULT_CITY;

  return (
    <View style={{ marginBottom: spacing.sm }}>
      <Pressable
        onPress={() => setLocationOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Change city, currently ${displayCity}`}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          alignSelf: 'flex-start',
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <MapPinIcon color={String(theme.colors.text)} size={20} />
        <View>
          <Text variant="label" muted>
            Location
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text variant="subheading">{displayCity}</Text>
            <ChevronDownIcon color={String(theme.colors.textMuted)} size={14} />
          </View>
        </View>
      </Pressable>

      <LocationSwitcherModal visible={locationOpen} onClose={() => setLocationOpen(false)} onSelectCity={setSelectedCity} />
    </View>
  );
}
