import {
  Camera,
  GeoJSONSource,
  Layer,
  Map,
  type ViewStateChangeEvent,
} from '@maplibre/maplibre-react-native';
import { useMemo } from 'react';
import type { NativeSyntheticEvent } from 'react-native';
import { View } from 'react-native';
import type { EventMapPin, MapViewport } from '../../types/map';
const STYLE = 'https://tiles.openfreemap.org/styles/positron';
interface Props {
  pins: EventMapPin[];
  selectedEventId: string | null;
  onSelectPin: (id: string) => void;
  onViewportChange: (v: MapViewport) => void;
  recenterTo?: { latitude: number; longitude: number } | null;
}
export function EventMap({ pins, selectedEventId, onSelectPin, onViewportChange }: Props) {
  const collection = useMemo<GeoJSON.FeatureCollection>(
    () => ({
      type: 'FeatureCollection',
      features: pins.map((p) => ({
        type: 'Feature',
        id: p.eventId,
        properties: {
          eventId: p.eventId,
          title: p.title,
          price: p.priceLabel,
          selected: p.eventId === selectedEventId ? 1 : 0,
          category: p.category ?? 'event',
        },
        geometry: { type: 'Point', coordinates: [p.coordinate.longitude, p.coordinate.latitude] },
      })),
    }),
    [pins, selectedEventId],
  );
  const region = (event: NativeSyntheticEvent<ViewStateChangeEvent>) => {
    const { center, zoom, bounds } = event.nativeEvent;
    onViewportChange({
      latitude: center[1],
      longitude: center[0],
      zoom,
      bounds: { north: bounds[3], south: bounds[1], east: bounds[2], west: bounds[0] },
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Map style={{ flex: 1 }} mapStyle={STYLE} logo={false} attribution onRegionDidChange={region}>
        <Camera initialViewState={{ center: [-80.1937, 25.7743], zoom: 10.5 }} />
        <GeoJSONSource
          id="events"
          data={collection}
          cluster
          onPress={(e) => {
            const id = e.nativeEvent.features?.[0]?.properties?.eventId;
            if (id) onSelectPin(String(id));
          }}
        >
          <Layer
            id="event-dots"
            type="circle"
            style={{
              circleRadius: 18,
              circleColor: [
                'case',
                ['==', ['get', 'selected'], 1],
                '#f47d30',
                [
                  'match',
                  ['get', 'category'],
                  'food',
                  '#f47d30',
                  'art',
                  '#8b55d9',
                  'music',
                  '#2a9d8f',
                  'theatre',
                  '#cc3b7a',
                  '#3d98d3',
                ],
              ],
              circleStrokeColor: '#fff',
              circleStrokeWidth: 3,
            }}
          />
          <Layer
            id="event-prices"
            type="symbol"
            style={{ textField: ['get', 'price'], textSize: 10, textColor: '#fff' }}
          />
        </GeoJSONSource>
      </Map>
    </View>
  );
}
