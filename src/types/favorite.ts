/** Mirrors store/favorites-store.ts and lib/graphql/favorites.ts on web. */
export type FavoriteEntityType = 'event' | 'venue' | 'restaurant' | 'arts-group';
export type FavoriteEntityTypeEnum = 'EVENT' | 'VENUE' | 'RESTAURANT' | 'ARTS_GROUP';

export const toBackendEntityType = (type: FavoriteEntityType): FavoriteEntityTypeEnum => {
  const map: Record<FavoriteEntityType, FavoriteEntityTypeEnum> = {
    event: 'EVENT',
    venue: 'VENUE',
    restaurant: 'RESTAURANT',
    'arts-group': 'ARTS_GROUP',
  };
  return map[type];
};

export const toFrontendEntityType = (type: FavoriteEntityTypeEnum): FavoriteEntityType => {
  const map: Record<FavoriteEntityTypeEnum, FavoriteEntityType> = {
    EVENT: 'event',
    VENUE: 'venue',
    RESTAURANT: 'restaurant',
    ARTS_GROUP: 'arts-group',
  };
  return map[type];
};

export interface FavoriteItem {
  id: string;
  entityType: FavoriteEntityType;
  slug: string;
  title: string;
  imageUrl?: string;
  location?: string;
  startDate?: string;
  addedAt: number;
}

export interface FavoriteNode {
  id: string;
  entityId: string;
  entityType: FavoriteEntityTypeEnum;
  createdAt: string;
  event?: { id: string; title: string; slug: string; mainImageUrl?: string; city: string; state: string; startDate?: string };
  venue?: { id: string; name: string; slug: string; imageUrl?: string; city: string; state: string };
  restaurant?: { id: string; name: string; slug: string; imageUrl?: string; city: string };
  artsGroup?: { id: string; name: string; slug: string; imageUrl?: string; market?: string };
}

export interface MyFavoritesResponse {
  myFavorites: {
    edges: { cursor: string; node: FavoriteNode }[];
    pageInfo: { hasNextPage: boolean; endCursor?: string };
    totalCount?: number;
  };
}

/** Flexible input shape any card/screen can pass — mirrors web's FavoriteEntity in hooks/use-favorites.ts. */
export interface FavoritableEntity {
  id: string;
  slug: string;
  title?: string;
  name?: string;
  imageUrl?: string | null;
  mainImageUrl?: string | null;
  bigImageUrl?: string | null;
  city?: string;
  state?: string;
  venueName?: string | null;
}

export function transformFavoriteNode(node: FavoriteNode): FavoriteItem {
  const entityType = toFrontendEntityType(node.entityType);
  let title = 'Untitled';
  let slug = '';
  let imageUrl: string | undefined;
  let location: string | undefined;
  let startDate: string | undefined;

  if (entityType === 'event' && node.event) {
    title = node.event.title;
    slug = node.event.slug;
    imageUrl = node.event.mainImageUrl;
    location = node.event.city && node.event.state ? `${node.event.city}, ${node.event.state}` : node.event.city;
    startDate = node.event.startDate;
  } else if (entityType === 'venue' && node.venue) {
    title = node.venue.name;
    slug = node.venue.slug;
    imageUrl = node.venue.imageUrl;
    location = node.venue.city && node.venue.state ? `${node.venue.city}, ${node.venue.state}` : node.venue.city;
  } else if (entityType === 'restaurant' && node.restaurant) {
    title = node.restaurant.name;
    slug = node.restaurant.slug;
    imageUrl = node.restaurant.imageUrl;
    location = node.restaurant.city;
  } else if (entityType === 'arts-group' && node.artsGroup) {
    title = node.artsGroup.name;
    slug = node.artsGroup.slug;
    imageUrl = node.artsGroup.imageUrl;
    location = node.artsGroup.market;
  }

  return { id: node.entityId, entityType, slug, title, imageUrl, location, startDate, addedAt: new Date(node.createdAt).getTime() };
}

export function toFavoriteItem(entityType: FavoriteEntityType, entity: FavoritableEntity): Omit<FavoriteItem, 'addedAt'> {
  return {
    id: entity.id,
    entityType,
    slug: entity.slug,
    title: entity.title ?? entity.name ?? 'Untitled',
    imageUrl: entity.bigImageUrl ?? entity.mainImageUrl ?? entity.imageUrl ?? undefined,
    location: entity.venueName ?? (entity.city && entity.state ? `${entity.city}, ${entity.state}` : entity.city),
  };
}
