export type DiscoveryTagKind = 'category' | 'neighborhood' | 'vibe';

/** One cross-content taxonomy shared by editorial and cultural entities. */
export interface DiscoveryTags {
  category: string[];
  neighborhood: string[];
  vibe: string[];
}

export const EMPTY_DISCOVERY_TAGS: DiscoveryTags = {
  category: [],
  neighborhood: [],
  vibe: [],
};
