/** Geographic box sent whenever the visible map changes. */
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bounds: MapBounds;
}
/** Generic shape deliberately supports future map layers while V1 renders events only. */
export type MapEntityKind = 'event' | 'venue' | 'organization' | 'attraction' | 'story';
export interface EventMapPin {
  entityKind: 'event';
  eventId: string;
  title: string;
  coordinate: { latitude: number; longitude: number };
  priceLabel: string;
  category?: string;
}
