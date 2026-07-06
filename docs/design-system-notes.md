# Design System Notes

## Brand tokens (`src/design/colors.ts`)

- Primary blue `#3d98d3` — CTAs, active states, links
- Red `#e74e3d` — destructive, date-badge accent
- Orange `#f47d30` — accent badges (price, "Featured")
- Dark gray `#373939` — primary text (light mode)
- Neutral gray ramp derived from the dark gray hue

## Typography

Plus Jakarta Sans only (Regular/Medium/SemiBold/Bold), loaded via
`@expo-google-fonts/plus-jakarta-sans` in the root layout. All text goes
through `components/ui/Text.tsx` variants (display/title/heading/subheading/
body/bodyBold/caption/label) — never raw `<Text>` with ad-hoc styles.

## Web parity rules carried over

- Structured **skeleton loading** (`LoadingState`) — no plain spinners
- Theme tokens only — no hardcoded hex in components (brand hex lives only in
  `colors.ts`; the few `#ffffff` on-image overlays are intentional)
- StatusPill-style badges via `Badge` with explicit status→color maps
- 4pt spacing scale, radius scale, shadow presets in `src/design/`

## Icons

`TabBarIcon` uses text glyph placeholders. TODO: export the CultureOwl icon set
(SVG) from the brand kit and swap — single file change.

## FeverUp inspiration boundaries

Patterns adopted (generic UX): floating Map pill, price-pill map markers,
bottom preview card, image-first cards, sticky Get Tickets CTA.
Nothing copied: no FeverUp colors, copy, layout proportions, or branding.
The visual language is CultureOwl's palette + Plus Jakarta Sans throughout.
