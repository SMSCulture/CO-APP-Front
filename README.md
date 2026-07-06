# CultureOwl Mobile (CO-APP-Front)

The CultureOwl consumer mobile app — React Native + Expo.

## Quick start

```bash
npm install
cp .env.example .env
npm start          # Expo dev server (press i / a for simulator)
```

Runs on mock data by default (`EXPO_PUBLIC_USE_MOCK_DATA=true`). Set it to
`false` and point `EXPO_PUBLIC_API_URL_*` at the NestJS backend to go live.

## Scripts

- `npm start` — Expo dev server
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run format` — Prettier

## Docs

See `docs/` — architecture, API contract notes, design/theme system, and the
implementation plan.
