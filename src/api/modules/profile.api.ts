/**
 * Profile/session — the web frontend resolves the session via /api/auth/me
 * (BFF). On mobile the equivalent is a `me` query with the Bearer token.
 */
import { graphqlRequest } from '../client';
import { mapRawUser } from '../mappers/user.mapper';
import { USE_MOCK_DATA } from '../../config/env';
import { mockUser } from '../../mock/users.mock';
import type { User } from '../../types/user';

const ME = /* GraphQL */ `
  query Me {
    me {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export async function fetchMe(): Promise<User> {
  if (USE_MOCK_DATA) return mockUser;
  const data = await graphqlRequest<{ me: Parameters<typeof mapRawUser>[0] }>(ME);
  return mapRawUser(data.me);
}
