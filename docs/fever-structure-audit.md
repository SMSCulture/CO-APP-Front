# Fever structure audit and CultureOwl adaptation

Reviewed September 16, 2026 from Sean's two mobile recordings and Fever's public site.

## What the recordings establish

Fever uses five persistent destinations: For you, Search, Discover, Tickets, Profile. City is a primary scope. Search starts as browse, then exposes date/category/sort. Home relies on horizontal editorial rails, ranked highlights and compact event rows. A floating Map control follows event feeds. Collection pages break the standard feed with their own hero treatment. Tickets and favorites remain dedicated utilities.

## CultureOwl structure

- Home: city-scoped recommendations, six genres, events, Art organizations, Restaurants, and Stories.
- Search: popular searches, date/category/sort and event results.
- Discover: six genre portals plus Art organizations, Restaurants, Stories and Map.
- Tickets: upcoming and expired wallet. Checkout is visibly structured but remains a prototype until the ticket API and payments are approved.
- Profile: favorites, interests, settings, help.
- Art organizations: one discovery directory combining CultureOwl venues and arts groups while preserving the existing entity detail routes and APIs.
- Stories: Culture news and Industry desk lanes.

## Curated and genre pages

The six genre portals share navigation and data contracts, not presentation. Each has its own editorial kicker, image direction, color family, headline promise and city-aware inventory. Curated campaigns can use the same concept with a dedicated composition instead of one universal template with a new color.

## Sparse-city rule

No false abundance. Under eight events, Home adds an explicit city context, nearby-city path, editorial rail and coverage message. A zero-result genre becomes a guide-in-progress with stories and nearby discovery rather than a blank grid. This lets CultureOwl remain useful while local supply grows.

## Map mode

Full-bleed map canvas; search and active filters float above it; price pins show bookability; selecting a pin opens a bottom event preview; a persistent event-count control returns to list. Current canvas uses real event coordinates with a lightweight projected map surface. Native map tiles and viewport-bounded API search remain backend/native integration work.

## Truth boundaries

Working now with mock data: navigation, directories, genre portals, sparse-city composition, full-screen map interaction, event detail, checkout structure, ticket wallet shape.

Not connected: native map tiles, current-device location, viewport search, real CultureOwl API environments, payments, ticket issuance/QR verification, wallet passes, push notifications.

## Competitive product notes

### DICE
DICE wins on trust and repeat behavior: full prices early, fast checkout, personalized music recommendations, artist follows, waitlists and resale controls. CultureOwl should borrow the clarity, not the music-only identity: show the complete ticket price on every card, let people follow artists and art organizations, and use a fair official ticket exchange when inventory exists.

### Bucket Listers
Bucket Listers sells an occasion, not a database row. Curated city lists, highly visual pop-ups, instant booking, exclusives and social proof answer "what should we do?" CultureOwl should use the same decision shortcut but own the local-arts angle: editor-made nights that pair an event, restaurant and neighborhood story, with proceeds and local impact made visible.

### News products
Apple News and Flipboard make topic following and editorial packages feel intentional; Ground News makes organization itself the product. CultureOwl's Stories area uses Culture news and Industry lanes now. Next: followable genres, organizations and cities, daily/weekly editions, and story-to-event links.

## Original creative direction and IP line

Use competitor UX patterns that are standard and functional: bottom navigation, search/filter controls, feed rails, map/list handoff and ticket wallet. Do not copy trademarks, brand colors, wording, visual assets, proprietary category names or screen compositions. CultureOwl's owned angle is "local culture as a connected night": editorial context, the organization behind the work, a restaurant pairing, transparent ticket value and visible local impact. The visual system stays light, editorial and CultureOwl blue/orange rather than Fever's dark teal marketplace or DICE's black music identity.

## Backend gap matrix

- Search: GlobalEventsSearch exists, but mobile still client-filters the event feed; needs paginated multi-entity results across events, art organizations, restaurants and stories.
- Feeds: event feed exists; needs reliable current/future date semantics, city/region fallback, inventory rank, availability, complete pricing and cursor/offset consistency.
- Genres/curation: genre feed exists; needs curated-page CMS contracts, hero modules, rail ordering, editorial copy and per-city fallbacks.
- Art organizations: separate venue/arts-group queries exist; needs a union search/feed contract, shared follow state and coordinates for every result.
- Restaurants: no confirmed live backend query; currently mock-only and needs directory, location, hours, reservation/deep-link and editorial pairing fields.
- News: public content exists in the front-end shape; needs culture/industry classification, topic follows, city targeting, saved stories and event links.
- Maps/location: event coordinates are incomplete; needs native map provider, permission state, viewport-bounded search, clustering, map pagination and nearby-city radius.
- Ticketing: no consumer commerce API. Needs inventory, ticket types, date/time sessions, price/fee quote, holds, order/payment state, issuance, QR rotation/validation, transfers/refunds, waitlist/exchange, receipts and wallet passes.
- Identity/profile: OTP/me exists; needs persisted interests, follows, notification preferences, city history, account deletion, email change and data export.
- Favorites: backend operations exist but must cover events, art organizations, restaurants, stories and collections consistently.
- Promotions: vouchers/credits, eligibility and redemption are not documented.
- Notifications: SSE exists for in-app; native push registration, preference topics and delivery receipts are not.
- Trust/operations: needs moderation, content provenance, accessibility metadata, analytics/consent, deep links, abuse/rate controls, observability and admin publishing workflows.

## Bigger plays

1. CultureOwl Night Out: one bookable package combining a local event, restaurant perk and short neighborhood guide.
2. Culture Pass: simple monthly credit with one clear tier, member previews and rollover, avoiding confusing membership ladders.
3. Follow the scene: follow creators, organizations, genres and cities; new-date alerts create retention before a city has dense inventory.
4. Local impact receipt: after purchase, show how much supported the presenter/artist and prompt a follow, donation or membership.
5. Fair last-minute marketplace: verified returns and waitlists, no speculative resale.
6. Cultural concierge collections: date night, under $30, family Saturday, accessible venues, first-time opera, neighborhood walks.
7. City launch mode: editorial guides, organization profiles, sign-up demand and nearby inventory let CultureOwl open before the calendar is full.
