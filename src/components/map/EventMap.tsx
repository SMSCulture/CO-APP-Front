import {
  Camera,
  GeoJSONSource,
  Layer,
  Map,
  type CameraRef,
  type GeoJSONSourceRef,
  type ViewStateChangeEvent,
} from '@maplibre/maplibre-react-native';
import { useMemo, useRef } from 'react';
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
  const camera = useRef<CameraRef>(null);
  const source = useRef<GeoJSONSourceRef>(null);
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
          color: p.color,
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
        <Camera ref={camera} initialViewState={{ center: [-80.1937, 25.7743], zoom: 10.5 }} />
        <GeoJSONSource
          ref={source}
          id="events"
          data={collection}
          cluster
          onPress={async (e) => {
            const feature = e.nativeEvent.features?.[0];
            const id = feature?.properties?.eventId;
            if (id) {
              onSelectPin(String(id));
              return;
            }
            const clusterId = feature?.properties?.cluster_id;
            const pointCount = feature?.properties?.point_count;
            if (clusterId == null || pointCount == null || !source.current || !camera.current)
              return;
            await source.current.getClusterLeaves(Number(clusterId), Number(pointCount), 0);
            const center = (feature.geometry as GeoJSON.Point).coordinates as [number, number];
            camera.current.easeTo({ center, zoom: 14.5, duration: 560 });
          }}
        >
          <Layer
            id="event-dots"
            type="circle"
            style={{
              circleRadius: 18,
              circleColor: ['case', ['==', ['get', 'selected'], 1], '#f47d30', ['get', 'color']],
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
