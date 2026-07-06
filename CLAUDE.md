# CultureOwl Mobile — Project Context

React Native + Expo consumer app for CultureOwl. Read `docs/mobile-architecture.md` first.

## Stack
Expo SDK 57 · Expo Router (`src/app/`) · TypeScript strict · TanStack Query (server state) · Zustand (client state) · expo-secure-store (JWT) · Plus Jakarta Sans

## Rules
- Routes in `src/app/` are thin re-exports; screen logic lives in `src/features/`
- All text via `components/ui/Text` variants; all colors via `useAppTheme()` tokens — no hardcoded hex outside `src/design/colors.ts`
- Light/dark/system theming must keep working: new semantic colors go in `types/theme.ts` + both theme files
- Exactly 4 bottom tabs (Home, Search, Tickets, Profile). Map is a button/route, never a tab
- Backend: direct GraphQL to NestJS `/graphql` with Bearer token (see `docs/api-contract-notes.md`). Mirror the web repo's query shapes — never invent API contracts
- Mock data behind `EXPO_PUBLIC_USE_MOCK_DATA`; mock branches live only in `src/api/modules/`
- Skeleton loading states (`LoadingState`), never bare spinners
- No secrets in the repo; tokens only in SecureStore

## Commands
`npm start` · `npm run lint` · `npm run typecheck` · `npm run format`

## Reference
Web frontend repo (`cultureowl_front`) is the source of truth for backend contracts and design conventions.
