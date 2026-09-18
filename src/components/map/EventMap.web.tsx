import 'maplibre-gl/dist/maplibre-gl.css';
import * as maplibregl from 'maplibre-gl';
import type { GeoJSONSource, Map as MLMap, MapMouseEvent } from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import type { EventMapPin, MapViewport } from '../../types/map';

interface Props {
  pins: EventMapPin[];
  selectedEventId: string | null;
  onSelectPin: (id: string) => void;
  onViewportChange: (v: MapViewport) => void;
  recenterTo?: { latitude: number; longitude: number } | null;
}
const STYLE = 'https://tiles.openfreemap.org/styles/positron';
const SOURCE = 'cultureowl-events';
export function EventMap({
  pins,
  selectedEventId,
  onSelectPin,
  onViewportChange,
  recenterTo,
}: Props) {
  const host = useRef<HTMLDivElement | null>(null);
  const map = useRef<MLMap | null>(null);
  useEffect(() => {
    if (!host.current || map.current) return;
    const m = new maplibregl.Map({
      container: host.current,
      style: STYLE,
      center: [-80.1937, 25.7743],
      zoom: 10.5,
      attributionControl: false,
    });
    map.current = m;
    // react-native-web's global div reset can collapse MapLibre's canvas container.
    // Give the renderer an explicit box so tiles and layers remain visible.
    const canvasContainer = host.current.querySelector<HTMLElement>('.maplibregl-canvas-container');
    if (canvasContainer) {
      canvasContainer.style.position = 'relative';
      canvasContainer.style.width = '100%';
      canvasContainer.style.height = '100%';
    }
    m.resize();
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    let timer: ReturnType<typeof setTimeout> | undefined;
    const publish = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const b = m.getBounds(),
          c = m.getCenter();
        onViewportChange({
          latitude: c.lat,
          longitude: c.lng,
          zoom: m.getZoom(),
          bounds: {
            north: b.getNorth(),
            south: b.getSouth(),
            east: b.getEast(),
            west: b.getWest(),
          },
        });
      }, 280);
    };
    m.on('load', publish);
    m.on('moveend', publish);
    return () => {
      if (timer) clearTimeout(timer);
      m.remove();
      map.current = null;
    };
  }, [onViewportChange]);
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const data: GeoJSON.FeatureCollection<GeoJSON.Point> = {
      type: 'FeatureCollection',
      features: pins.map((pin) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [pin.coordinate.longitude, pin.coordinate.latitude],
        },
        properties: {
          eventId: pin.eventId,
          title: pin.title,
          priceLabel: pin.priceLabel,
          category: pin.category ?? 'event',
        },
      })),
    };
    const install = () => {
      if (m.getSource(SOURCE)) {
        (m.getSource(SOURCE) as GeoJSONSource).setData(data);
        m.setPaintProperty('event-pins', 'circle-color', [
          'case',
          ['==', ['get', 'eventId'], selectedEventId ?? ''],
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
        ]);
        return;
      }
      m.addSource(SOURCE, {
        type: 'geojson',
        data,
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 48,
      });
      m.addLayer({
        id: 'event-clusters',
        type: 'circle',
        source: SOURCE,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#12283a',
          'circle-radius': ['step', ['get', 'point_count'], 22, 10, 27, 25, 32],
          'circle-stroke-width': 3,
          'circle-stroke-color': '#7bc6f2',
        },
      });
      m.addLayer({
        id: 'event-cluster-count',
        type: 'symbol',
        source: SOURCE,
        filter: ['has', 'point_count'],
        layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-size': 13 },
        paint: { 'text-color': '#fff' },
      });
      m.addLayer({
        id: 'event-pins',
        type: 'circle',
        source: SOURCE,
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-radius': 16,
          'circle-color': [
            'case',
            ['==', ['get', 'eventId'], selectedEventId ?? ''],
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
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff',
        },
      });
      m.addLayer({
        id: 'event-pin-price',
        type: 'symbol',
        source: SOURCE,
        filter: ['!', ['has', 'point_count']],
        layout: { 'text-field': ['get', 'priceLabel'], 'text-size': 10 },
        paint: { 'text-color': '#fff' },
      });
      const expand = async (e: MapMouseEvent) => {
        const feature = m.queryRenderedFeatures(e.point, { layers: ['event-clusters'] })[0];
        if (!feature?.properties) return;
        const zoom = await (m.getSource(SOURCE) as GeoJSONSource).getClusterExpansionZoom(
          Number(feature.properties.cluster_id),
        );
        const coordinates = (feature.geometry as GeoJSON.Point).coordinates as [number, number];
        m.easeTo({ center: coordinates, zoom, duration: 360 });
      };
      const select = (e: MapMouseEvent) => {
        const feature = m.queryRenderedFeatures(e.point, { layers: ['event-pins'] })[0];
        const id = feature?.properties?.eventId as string | undefined;
        if (id) onSelectPin(id);
      };
      m.on('click', 'event-clusters', expand);
      m.on('click', 'event-pins', select);
      for (const layer of ['event-clusters', 'event-pins']) {
        m.on('mouseenter', layer, () => {
          m.getCanvas().style.cursor = 'pointer';
        });
        m.on('mouseleave', layer, () => {
          m.getCanvas().style.cursor = '';
        });
      }
    };
    if (m.isStyleLoaded()) install();
    else m.once('load', install);
  }, [pins, selectedEventId, onSelectPin]);
  useEffect(() => {
    if (recenterTo && map.current)
      map.current.easeTo({
        center: [recenterTo.longitude, recenterTo.latitude],
        zoom: 13,
        duration: 500,
      });
  }, [recenterTo]);
  return (
    <View style={{ flex: 1 }}>
      <div
        ref={host}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </View>
  );
}
