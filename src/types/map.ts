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
/** The five user-facing map layers. New backends can populate every layer without changing the renderer. */
export type MapPinKind = 'organization' | 'venue' | 'art-dine' | 'event' | 'free';
export interface EventMapPin {
  entityKind: MapPinKind;
  eventId: string;
  title: string;
  coordinate: { latitude: number; longitude: number };
  priceLabel: string;
  category?: string;
  color: string;
}
