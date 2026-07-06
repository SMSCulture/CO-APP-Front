import type { Venue } from '../../types/venue';

interface RawVenue {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  address?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export function mapRawVenue(raw: RawVenue): Venue {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    city: raw.city,
    state: raw.state,
    address: raw.address ?? null,
    imageUrl: raw.imageUrl ?? null,
    description: raw.description ?? null,
    coordinates:
      raw.latitude != null && raw.longitude != null
        ? { latitude: raw.latitude, longitude: raw.longitude }
        : null,
  };
}
