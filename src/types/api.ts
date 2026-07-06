export interface GraphQLErrorShape {
  message: string;
  extensions?: { code?: string };
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLErrorShape[];
}

/** Offset pagination used by publicEventsFeed. */
export interface OffsetPagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

/** Cursor pagination used by publicEventsPaginated. */
export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}
