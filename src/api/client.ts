/**
 * GraphQL client for the CultureOwl NestJS backend.
 *
 * The web frontend proxies GraphQL through a Next.js BFF that only verifies
 * the JWT cookie and forwards `Authorization: Bearer <token>`. On mobile we
 * talk to the backend directly and keep the token in expo-secure-store.
 */
import { endpoints } from './endpoints';
import { NetworkError } from './errors';
import { buildHeaders } from './request';
import { unwrap } from './response';
import type { GraphQLResponse } from '../types/api';

export async function graphqlRequest<TData>(
  query: string,
  variables?: Record<string, unknown>,
  operationName?: string,
): Promise<TData> {
  let response: Response;
  try {
    response = await fetch(endpoints.graphql, {
      method: 'POST',
      headers: await buildHeaders(),
      body: JSON.stringify({ query, variables, operationName }),
    });
  } catch {
    throw new NetworkError();
  }

  if (!response.ok) {
    throw new NetworkError(`Server responded with ${response.status}`);
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;
  return unwrap(payload);
}
