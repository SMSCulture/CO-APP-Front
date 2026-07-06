import { ApiError, UnauthorizedError } from './errors';
import type { GraphQLResponse } from '../types/api';

/** Unwraps a GraphQL response, throwing typed errors on failure. */
export function unwrap<T>(payload: GraphQLResponse<T>): T {
  if (payload.errors?.length) {
    const first = payload.errors[0];
    if (first.extensions?.code === 'UNAUTHENTICATED') {
      throw new UnauthorizedError(first.message);
    }
    throw new ApiError(first.message, first.extensions?.code);
  }
  if (!payload.data) {
    throw new ApiError('Empty response from server', 'EMPTY_RESPONSE');
  }
  return payload.data;
}
