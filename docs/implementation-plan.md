# Implementation Plan

## Phase 0 — Foundation (this PR)

Expo + Router + theme system + four tabs + Map button + mock-backed screens +
typed API layer. Done.

## Phase 1 — Visual fidelity

- Prototype comparison pass (see prototype-reference-audit.md)
- Real CultureOwl icon set for tab bar, drawer, and actions
- App icon + splash from brand kit
- Motion polish (hero transitions, card press feedback)

## Phase 2 — Backend wiring

1. Point `EXPO_PUBLIC_API_URL_*` at real environments; set
   `EXPO_PUBLIC_USE_MOCK_DATA=false`
2. Auth end-to-end (requestOtp/verifyOtp → SecureStore → me)
3. Events feed + event detail + genre feed
4. Search via GlobalEventsSearch
5. Favorites (EventActions save button → ToggleFavorite/MyFavorites)
6. Venues + arts-groups directories

## Phase 3 — Maps & location

- expo-location permission flow (useLocationPermission is stubbed for this)
- react-native-maps (or MapLibre) replacing the EventMap placeholder canvas —
  pin/selection API already matches
- lat/lng into publicEventsFeed for true "near you"

## Phase 4 — Ticketing

- Blocked on backend consumer ticketing API (contract proposal in
  api-contract-notes.md)
- Real checkout + payments, QR codes (react-native-qrcode-svg), wallet passes

## Phase 5 — Ship

- Push notifications (SSE endpoint exists for in-app; APNs/FCM for push)
- Analytics wiring (lib/analytics.ts call sites are in place)
- EAS build profiles, store listings, deep-link universal links
