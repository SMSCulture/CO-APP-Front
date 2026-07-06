import type { Organization } from '../../types/organization';

interface RawArtsGroup {
  id: string;
  name: string;
  slug: string;
  city?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  genres?: { name: string }[];
}

export function mapRawArtsGroup(raw: RawArtsGroup): Organization {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    city: raw.city ?? '',
    imageUrl: raw.imageUrl ?? null,
    description: raw.description ?? null,
    genres: (raw.genres ?? []).map((g) => g.name),
  };
}
