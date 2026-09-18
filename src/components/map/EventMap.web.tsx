import 'maplibre-gl/dist/maplibre-gl.css';
import * as maplibregl from 'maplibre-gl';
import type { GeoJSONSource, Map as MLMap, MapMouseEvent, StyleSpecification } from 'maplibre-gl';
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
const STYLE: StyleSpecification = {
  version: 8,
  sources: {
    openmaptiles: {
      type: 'vector',
      tiles: ['https://tiles.openfreemap.org/planet/20260913_164504_pt/{z}/{x}/{y}.pbf'],
      minzoom: 0,
      maxzoom: 14,
    },
  },
  layers: [
    { id: 'background', type: 'background', paint: { 'background-color': '#f2f3f0' } },
    { id: 'parks', type: 'fill', source: 'openmaptiles', 'source-layer': 'park', paint: { 'fill-color': '#e4ebe2', 'fill-opacity': 0.9 } },
    { id: 'water', type: 'fill', source: 'openmaptiles', 'source-layer': 'water', paint: { 'fill-color': '#c5dce8' } },
    { id: 'buildings', type: 'fill', source: 'openmaptiles', 'source-layer': 'building', minzoom: 12, paint: { 'fill-color': '#dedbd5', 'fill-outline-color': '#d1cec8' } },
    { id: 'roads', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation', paint: { 'line-color': '#ffffff', 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.6, 14, 3] } },
    { id: 'road-casing', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation', filter: ['match', ['get', 'class'], ['motorway', 'trunk', 'primary'], true, false], paint: { 'line-color': '#d8d4cc', 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.8, 14, 1.5] } },
    { id: 'boundaries', type: 'line', source: 'openmaptiles', 'source-layer': 'boundary', paint: { 'line-color': '#b7bcc0', 'line-width': 0.8, 'line-dasharray': [3, 2] } },
  ],
};
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
  const onViewportChangeRef = useRef(onViewportChange);
  const onSelectPinRef = useRef(onSelectPin);
  useEffect(() => {
    onViewportChangeRef.current = onViewportChange;
  }, [onViewportChange]);
  useEffect(() => {
    onSelectPinRef.current = onSelectPin;
  }, [onSelectPin]);
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
    requestAnimationFrame(() => {
      m.resize();
      m.triggerRepaint();
    });
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    let timer: ReturnType<typeof setTimeout> | undefined;
    const publish = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const b = m.getBounds(),
          c = m.getCenter();
        onViewportChangeRef.current({
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
    m.on('load', () => {
      m.resize();
      m.triggerRepaint();
      publish();
    });
    m.on('moveend', publish);
    return () => {
      if (timer) clearTimeout(timer);
      m.remove();
      map.current = null;
    };
  }, []);
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
        if (id) onSelectPinRef.current(id);
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
  }, [pins, selectedEventId]);
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
