/**
 * Favorites — mirrors lib/graphql/favorites.ts on web: toggleFavorite
 * mutation + myFavorites cursor-paginated query, same backend enum mapping.
 */
import { graphqlRequest } from '../client';
import { USE_MOCK_DATA } from '../../config/env';
import { mockFavoriteNodes } from '../../mock/favorites.mock';
import { toBackendEntityType, type FavoriteEntityType, type MyFavoritesResponse } from '../../types/favorite';

const TOGGLE_FAVORITE = /* GraphQL */ `
  mutation ToggleFavorite($input: ToggleFavoriteInput!) {
    toggleFavorite(input: $input) {
      isFavorite
      favoritesCount
    }
  }
`;

const GET_MY_FAVORITES = /* GraphQL */ `
  query MyFavorites($first: Int, $after: String, $filter: FavoriteFilterInput) {
    myFavorites(first: $first, after: $after, filter: $filter, includeTotalCount: true) {
      edges {
        cursor
        node {
          id
          entityId
          entityType
          createdAt
          event { id title slug mainImageUrl city state startDate }
          venue { id name slug imageUrl city state }
          restaurant { id name slug imageUrl city }
          artsGroup { id name slug imageUrl market }
        }
      }
      pageInfo { hasNextPage endCursor }
      totalCount
    }
  }
`;

interface ToggleFavoriteResponse {
  toggleFavorite: { isFavorite: boolean; favoritesCount: number };
}

export async function toggleFavoriteRemote(
  entityId: string,
  entityType: FavoriteEntityType,
): Promise<{ isFavorite: boolean; favoritesCount: number }> {
  if (USE_MOCK_DATA) {
    // Mock mode: the store is the source of truth (see useToggleFavorite) —
    // this call is a no-op success so the optimistic update never rolls back.
    return { isFavorite: true, favoritesCount: 0 };
  }
  const data = await graphqlRequest<ToggleFavoriteResponse>(TOGGLE_FAVORITE, {
    input: { entityId, entityType: toBackendEntityType(entityType) },
  });
  return data.toggleFavorite;
}

export async function fetchMyFavorites(filter?: { entityType?: FavoriteEntityType }): Promise<MyFavoritesResponse['myFavorites']> {
  if (USE_MOCK_DATA) {
    return { edges: mockFavoriteNodes.map((node) => ({ cursor: node.id, node })), pageInfo: { hasNextPage: false }, totalCount: mockFavoriteNodes.length };
  }
  const data = await graphqlRequest<MyFavoritesResponse>(GET_MY_FAVORITES, {
    first: 100,
    filter: filter?.entityType ? { entityType: filter.entityType } : undefined,
  });
  return data.myFavorites;
}
