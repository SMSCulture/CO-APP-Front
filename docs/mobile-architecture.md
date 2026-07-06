# CultureOwl Mobile — Architecture

## Stack

- **Expo SDK 57** / React Native 0.86 / TypeScript (strict)
- **Expo Router** — file-based routing under `src/app/`
- **TanStack Query** — server state (queries in `src/queries/`)
- **Zustand** — client state (auth session, theme mode)
- **expo-secure-store** — JWT storage (device keychain)
- **Plus Jakarta Sans** via `@expo-google-fonts/plus-jakarta-sans`

## Layering

```
app/ (routes)  →  features/ (screens)  →  components/ (reusable UI)
                        ↓
                  queries/ (TanStack hooks)
                        ↓
                  api/modules (GraphQL calls) → api/mappers → types/
                        ↓
                  api/client.ts (fetch → NestJS /graphql, Bearer token)
```

Route files under `src/app/` are thin re-exports; screen logic lives in
`src/features/`. This mirrors the web repo's "page.tsx = orchestrator only" rule.

## Navigation

- Four bottom tabs only: **Home, Search, Tickets, Profile** (`(tabs)/_layout.tsx`).
- **Map is NOT a tab** — a floating Map pill on Search (`MapButton`) opens `/map`.
- Top-right of every header (`AppHeader`) opens the **SideDrawer** directories
  panel (Events, Venues, Arts Groups, Art & Dine, Map) — mirrors the web nav.
- `(public)/` holds welcome/login/verify-code; everything else is browsable as guest.

## Backend connection model

The web frontend proxies GraphQL through a Next.js BFF whose only job is to
verify the JWT cookie and forward `Authorization: Bearer <token>`. Mobile skips
the proxy and calls the NestJS `/graphql` endpoint directly with the same
Bearer header, token held in SecureStore. See `docs/api-contract-notes.md`.

`EXPO_PUBLIC_USE_MOCK_DATA=true` (default) makes every api module resolve from
`src/mock/` — flip to `false` plus set the API URL to go live.

## State rules (mirrors web CLAUDE.md)

- Global/cross-screen state → Zustand stores
- Server data → TanStack Query, keyed in `src/queries/`
- Local UI state → `useState`
- No tokens outside SecureStore. No secrets in the repo.
