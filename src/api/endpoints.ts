import { API_BASE_URL, GRAPHQL_URL } from '../config/env';

/**
 * The backend is GraphQL-first: everything goes through the single /graphql
 * endpoint. REST paths listed here exist for non-GraphQL backend features.
 */
export const endpoints = {
  graphql: GRAPHQL_URL,
  /** SSE notifications stream (web connects directly too). */
  notificationsStream: (token: string) =>
    `${API_BASE_URL}/notifications/stream?token=${encodeURIComponent(token)}`,
} as const;
