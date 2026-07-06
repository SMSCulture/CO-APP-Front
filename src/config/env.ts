/**
 * Environment configuration.
 *
 * The mobile app talks DIRECTLY to the NestJS GraphQL backend with a Bearer
 * token (the web BFF does exactly this server-side). Set per-environment URLs
 * via EXPO_PUBLIC_* variables — never commit secrets here; these URLs are the
 * only environment values the client needs.
 */
export type AppEnvironment = 'development' | 'staging' | 'production';

const API_URLS: Record<AppEnvironment, string> = {
  development: process.env.EXPO_PUBLIC_API_URL_DEV ?? 'http://localhost:3001',
  staging: process.env.EXPO_PUBLIC_API_URL_STAGING ?? 'https://staging-api.cultureowl.com',
  production: process.env.EXPO_PUBLIC_API_URL_PROD ?? 'https://api.cultureowl.com',
};

export const APP_ENV: AppEnvironment =
  (process.env.EXPO_PUBLIC_APP_ENV as AppEnvironment) ?? 'development';

export const API_BASE_URL = API_URLS[APP_ENV];
export const GRAPHQL_URL = `${API_BASE_URL}/graphql`;

/** When true, query hooks resolve from src/mock instead of the network. */
export const USE_MOCK_DATA = (process.env.EXPO_PUBLIC_USE_MOCK_DATA ?? 'true') === 'true';
