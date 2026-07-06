# Theme System Notes

## How it works

- `src/design/lightTheme.ts` / `darkTheme.ts` — semantic color maps
  (`background`, `surface`, `text`, `border`, `primary`, `chip*`, `tabBar*`, …)
  implementing the `ThemeColors` contract in `src/types/theme.ts`.
- `ThemeProvider` resolves the active theme from a persisted Zustand store
  (`useThemeModeStore`) + `useColorScheme()`:
  - mode `system` (default) → follows OS appearance live
  - mode `light` / `dark` → manual override, persisted in AsyncStorage
- `useAppTheme()` — read resolved theme in any component
- `useThemeMode()` — read/set the mode (used by `AppearanceToggle`)

## Where the toggle lives

Profile tab → Appearance (also `/settings/appearance`). Logged-out Profile
shows the toggle too.

## Rules

- Components consume `theme.colors.*` — never import `lightTheme`/`darkTheme`
  directly and never hardcode hex (brand constants live in `design/colors.ts`).
- Status bar style flips with the scheme in the root layout.
- New semantic slots: add to `ThemeColors`, then both theme files — the
  compiler enforces parity.
