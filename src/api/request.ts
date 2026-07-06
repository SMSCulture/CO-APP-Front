import { getToken } from '../auth/tokenStorage';

/** Builds headers for a backend request, attaching the Bearer token when present. */
export async function buildHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = await getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
