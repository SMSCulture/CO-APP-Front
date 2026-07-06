import type { User } from '../../types/user';

interface RawUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role?: string;
  avatarUrl?: string | null;
}

export function mapRawUser(raw: RawUser): User {
  return {
    id: raw.id,
    email: raw.email,
    firstName: raw.firstName ?? null,
    lastName: raw.lastName ?? null,
    role: raw.role ?? 'CULTURAL_MEMBER',
    avatarUrl: raw.avatarUrl ?? null,
  };
}
