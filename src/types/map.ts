export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface EventMapPin {
  eventId: string;
  title: string;
  coordinate: { latitude: number; longitude: number };
  priceLabel: string;
}
