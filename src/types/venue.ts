export interface Venue {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  address: string | null;
  imageUrl: string | null;
  description: string | null;
  coordinates: { latitude: number; longitude: number } | null;
}
