import type { User } from '../types/user';

export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface Session {
  status: SessionStatus;
  user: User | null;
}
