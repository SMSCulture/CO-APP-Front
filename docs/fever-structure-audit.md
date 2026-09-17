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
