import { View } from 'react-native';

import { radius } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { EventMapPin } from '../../types/map';
import { Text } from '../ui';
import { EventMapMarker } from './EventMapMarker';

interface EventMapProps {
  pins: EventMapPin[];
  selectedEventId: string | null;
  onSelectPin: (eventId: string) => void;
}

/**
 * Lightweight map placeholder. Pins are projected onto the canvas from their
 * real coordinates. Swap the canvas for react-native-maps (MapView + Marker)
 * later — the pin/selection API is already shaped for it.
 */
export function EventMap({ pins, selectedEventId, onSelectPin }: EventMapProps) {
  const theme = useAppTheme();

  const lats = pins.map((p) => p.coordinate.latitude);
  const lngs = pins.map((p) => p.coordinate.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const project = (pin: EventMapPin) => ({
    leftPct:
      maxLng === minLng ? 50 : 8 + ((pin.coordinate.longitude - minLng) / (maxLng - minLng)) * 76,
    topPct:
      maxLat === minLat ? 50 : 10 + ((maxLat - pin.coordinate.latitude) / (maxLat - minLat)) * 70,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: radius.lg,
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', top: 12, alignSelf: 'center' }}>
        <Text variant="caption" muted>
          Map preview — real map integration pending
        </Text>
      </View>
      {pins.map((pin) => (
        <EventMapMarker
          key={pin.eventId}
          pin={pin}
          position={project(pin)}
          selected={pin.eventId === selectedEventId}
          onPress={() => onSelectPin(pin.eventId)}
        />
      ))}
    </View>
  );
}
