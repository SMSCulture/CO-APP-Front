# API Contract Notes — connecting the NestJS backend

Everything below was verified against the web frontend (`cultureowl_front`).

## Transport

- Single GraphQL endpoint: `POST {API_BASE_URL}/graphql`
- Auth header: `Authorization: Bearer <jwt>` (token from `verifyOtp`, 7-day life,
  **no refresh endpoint** — web disabled `/api/auth/refresh`)
- Errors: standard GraphQL `errors[]`; `extensions.code === 'UNAUTHENTICATED'`
  → clear token, route to login (handled in `src/api/response.ts`).

## Real operations already mirrored

| Mobile module | Backend operation | Web source file |
|---|---|---|
| `auth.api.ts` | `requestOtp(input: RequestOtpInput!)` → `{ success, message, userCreated }` | `app/api/auth/request-otp/route.ts` |
| `auth.api.ts` | `verifyOtp(input: VerifyOtpInput!)` → `{ access_token, isFirstLogin, user }` | `app/api/auth/verify-otp/route.ts` |
| `events.api.ts` | `publicEventsFeed(input: EventsFeedInput)` — offset paging, `city`/`latitude`/`longitude`/`tagId`, returns `{ event, distanceMiles, timeWindow }` edges | `lib/graphql/public-events.ts` |
| `events.api.ts` | `publicEvent(identifier: String!)` — slug or ID | `lib/graphql/public-events.ts` |
| `profile.api.ts` | `me` query (web equivalent: `/api/auth/me`) | BFF session route |

## Operations to wire next (exist on backend)

- `publicGenreFeed(input: GenreFeedInput!)` — genre rails (`lib/graphql/genre-feed.ts`)
- `GlobalEventsSearch` — term search (`lib/graphql/global-search.ts`); mobile
  search currently filters the feed client-side
- `MyFavorites` / `ToggleFavorite($input: ToggleFavoriteInput!)` — saved events
  (`lib/graphql/favorites.ts`); EventActions save button is local-state only
- Public venues / arts-groups paginated queries (`lib/graphql/public-venues.ts`,
  `public-arts-groups.ts`) — `venues.api.ts` / `organizations.api.ts` are mock-only

## Does NOT exist yet — Tickets

`lib/graphql/tickets.ts` on web is the **support ticket** module, not event
tickets. Consumer ticket purchases (flat-fee ticketing) have no API. The mobile
Tickets tab runs on `mock/tickets.mock.ts` behind `tickets.api.ts`; proposed
contract is the `PurchasedTicket` type (`src/types/ticket.ts`). When the
backend ships (e.g. `myPurchasedTickets`), replace the mock branch and map in
`api/mappers/ticket.mapper.ts` — screens need no changes.

## Notifications

Backend exposes SSE at `/notifications/stream?token=...` (web connects
directly, bypassing the BFF). `endpoints.notificationsStream(token)` is ready.

## GraphQL type gotchas (from web CLAUDE.md)

- Entity IDs are `ID!`; `companyId` params are `String`
- Public directory pagination is cursor-based (`first`, `after`) except
  `publicEventsFeed`, which is offset-based (`page`, `limit`)
