import type { User } from '../../types/user';

interface RawUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role?: string;
  avatarUrl?: string | null;
  authProvider?: string;
}

export function mapRawUser(raw: RawUser): User {
  return {
    id: raw.id,
    email: raw.email,
    firstName: raw.firstName ?? null,
    lastName: raw.lastName ?? null,
    role: raw.role ?? 'CULTURAL_MEMBER',
    avatarUrl: raw.avatarUrl ?? null,
    authProvider:
      raw.authProvider === 'google' || raw.authProvider === 'facebook'
        ? raw.authProvider
        : 'email',
  };
}
