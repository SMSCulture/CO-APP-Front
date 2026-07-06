# Frontend Reference Audit (cultureowl_front)

What was examined in the web repo and how it shaped the mobile foundation.

## Backend connection (the important one)

`app/api/graphql/route.ts` (BFF) does exactly three things: rate-limit, verify
the `token` cookie with `jwtVerify`, and forward the body to
`GRAPHQL_BACKEND_URL` with `Authorization: Bearer <token>`. Conclusion: the
mobile app can and should call the NestJS `/graphql` endpoint directly with a
Bearer token — no proxy needed. Implemented in `src/api/client.ts`.

## Auth

- `app/api/auth/request-otp/route.ts` → backend `requestOtp` mutation
- `app/api/auth/verify-otp/route.ts` → backend `verifyOtp` mutation returning
  `access_token` (7-day JWT, refresh disabled), `isFirstLogin`, `user`
- OTP UX rules copied: 6 digits, auto-submit, 10-min expiry, 60s resend cooldown

## Data modules mirrored

- `lib/graphql/public-events.ts` — `publicEventsFeed` (offset paging,
  city/lat-lng/tag filters, `distanceMiles`) and `publicEvent(identifier)`;
  event card field set copied verbatim into `events.api.ts`
- `lib/graphql/favorites.ts`, `genre-feed.ts`, `global-search.ts`,
  `public-venues.ts`, `public-arts-groups.ts` — catalogued in
  `api-contract-notes.md` as next wiring targets
- `lib/graphql/tickets.ts` — discovered to be SUPPORT tickets; consumer
  ticketing API does not exist yet (Tickets tab is mock-backed by design)

## Conventions carried over

- Orchestrator pages + feature components + hooks structure
- Zustand for global state; skeletons over spinners; Zod-style input validation
  at the edges (lightweight here until forms grow)
- City switcher (Florida markets) and genre chips mirroring the web nav
- Top-right drawer panel of directories (web top nav → mobile SideDrawer)

## Not yet audited

- The design prototype GIFs/screenshots (files exceeded upload limits — visual
  fidelity pass pending; see prototype-reference-audit.md)
- Web design tokens in Tailwind config (mobile tokens derived from brand
  constants provided in the build brief)
