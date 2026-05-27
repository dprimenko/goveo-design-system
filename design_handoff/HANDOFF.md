# HANDOFF.md — Concrete changes to apply

Apply these in order. Each step has the source file in `design_handoff/` and
the destination path in the repo.

---

## Step 1 · Install Phosphor RN

```bash
npx expo install phosphor-react-native
```

Verify in `package.json`:

```json
"phosphor-react-native": "^2.x",
"react-native-svg": "15.8.0"   // already there
```

---

## Step 2 · Sync Tailwind config

| Source | Destination |
|---|---|
| `design_handoff/tokens/tailwind.config.js` | `tailwind.config.js` (replace) |

The new file is a superset of the current one. It keeps the existing
primary/neutral palette (no breaking change) and adds:

- Full primary ramp (50→950) — was missing 600
- `landing-*` semantic tokens
- `zinc-*` neutrals for landing surface
- Spacing scale (4 → 96)
- Border radii (`card-xl`, `card-xxl`, `card-hero`, `pill`)
- Box shadows (`orange-cta`, `orange-glow`, `app`)
- Font sizes (`display1`-`caption`)

After replacing, restart Metro: `npx expo start --clear`.

---

## Step 3 · Drop in design tokens (TypeScript)

Create directory `theme/` (sibling to `app/`, `components/`, `features/`).

| Source | Destination |
|---|---|
| `design_handoff/tokens/tokens.ts`      | `theme/tokens.ts` |
| `design_handoff/theme/colors.ts`       | `theme/colors.ts` |
| `design_handoff/theme/typography.ts`   | `theme/typography.ts` |
| `design_handoff/theme/spacing.ts`      | `theme/spacing.ts` |
| `design_handoff/theme/shadows.ts`      | `theme/shadows.ts` |

These do **not** replace the existing `apps/goveo/themes/` ThemeContextProvider.
They live next to it as a static-import source of truth. If you later want to
collapse both into one, the existing `useThemeContext()` can re-export from
`theme/tokens.ts`.

---

## Step 4 · Create the Phosphor `Icon` wrapper

| Source | Destination |
|---|---|
| `design_handoff/components/Icon.tsx` | `components/ui/Icon.tsx` |

Why a wrapper: it keeps `phosphor-react-native` as a single point of contact
and lets you swap icon libraries later by editing one file.

---

## Step 5 · Replace the tab bar

| Source | Destination |
|---|---|
| `design_handoff/components/BottomTabBar.tsx` | `app/(tabs)/_layout.tsx` (replace) |

Changes from current:

| Slot | Before | After |
|---|---|---|
| 1 | Lugares (EarthIcon.svg) | **Lugares** — `GlobeHemisphereWest` (phosphor) |
| 2 | Negocios (ShopIcon.svg) | **Negocios** — `Storefront` (phosphor) |
| 3 | **Add** (center, conditional) | **Home** — `Compass` (phosphor) |
| 4 | Eventos (MaskIcon.svg) | **Eventos** — `MaskHappy` (phosphor) |
| 5 | GeoStories (TempIcon.svg) | **GeoStories** — `ClockCountdown` (phosphor) |

The existing tab files (`index.tsx`, `business.tsx`, etc.) keep working —
**don't rename them**. The `<Tabs.Screen name>` props in the new layout map
to those same filenames.

The `action.tsx` tab is **removed** (its file can stay; just remove its
`<Tabs.Screen>` entry). The "+" creator action now lives in the FAB (next
step).

> ⚠️ The current `index.tsx` is "Lugares". After this change the **center**
> tab is "Home", and "Lugares" stays at slot 1. If you want the deep-link
> root (`/`) to point at "Home" instead, rename `app/(tabs)/index.tsx` to
> `app/(tabs)/lugares.tsx` and add a new `app/(tabs)/index.tsx` that renders
> the Home/Compass screen. Confirm with the user before doing this.

---

## Step 6 · Add the floating "+" creator FAB

| Source | Destination |
|---|---|
| `design_handoff/components/CreateFAB.tsx` | `components/ui/CreateFAB.tsx` |

Then mount it once, app-wide, in the root layout:

```tsx
// app/_layout.tsx — inside the ThemeContextProvider, AFTER <MainContent />
import { CreateFAB } from '@/components/ui/CreateFAB'
import { useRouter } from 'expo-router'

// inside RootLayout:
const router = useRouter()

return (
  <ThemeContextProvider>
    <MainContent />
    <CreateFAB onPress={() => router.push('/addgeostory')} />
  </ThemeContextProvider>
)
```

The FAB is `position: absolute`, top-right, above all content. It only shows
itself when `canCreate` is true — see the component for the role check stub.

---

## Step 7 · Run + verify

```bash
npx expo start --clear
# press i for iOS simulator
```

Acceptance checklist:

- [ ] Tab bar shows 5 tabs with labels: Lugares · Negocios · Home · Eventos · GeoStories
- [ ] Active tab shows the icon in `fill` weight, label underlined
- [ ] Orange "+" floats top-right on the Home screen
- [ ] Tapping "+" navigates to `/addgeostory`
- [ ] No SVG-import warnings in Metro logs (the old `bottom-bar/*.svg` imports are gone)

---

## Files you can delete after this lands

These become unused but live in `assets/images/bottom-bar/`. **Delete only
after confirming no other screen imports them:**

```bash
rg "bottom-bar/(earth|shop|mask|temp|add)\.svg" app/ components/ features/ modules/
```

If `rg` returns nothing, safe to delete. Otherwise, leave them.

---

## Step 8 · Brand theming (v1.2.0 · new) — Goveo ↔ Ibiza Goveo

Two builds ship from the same codebase: the global **Goveo** app and the
regional **Ibiza Goveo** app (same product, geofenced to Ibiza/Formentera).
They share every component, type ramp, spacing token and radius — only the
brand colour ramp, accent and logo change.

The design system now exposes both brands. Pick one at app boot.

### What changed in `@goveo/design-tokens@1.2.0`

| File | Change |
|---|---|
| `tokens.ts` | New exports: `goveoBrand`, `ibizaBrand`, `brands`, `BrandVariant`, `buildBrandTheme(brand)`. Existing `colors.primary` / `lightTheme` etc. are unchanged (= Goveo). |
| `tokens.json` | New top-level `themes` object with `goveo` and `ibiza` blocks. |
| `tokens.css` | Brand tokens (primary ramp, naranja-*, --accent, --fg-on-accent, --orange-glow, --brand-name) are now inside `.theme-goveo` (= `:root` default) and `.theme-ibiza` blocks. Toggle by class on `<html>` or `<body>`. |

### What to apply in `goveo-expo`

1. Re-run `npm install` (the design-system submodule will pull the new tokens).

2. Add a brand selector to your app config. Easiest: read it from an env var
   at build time so the binary is brand-locked, two builds → two app icons.

   ```ts
   // app.config.ts
   const variant = process.env.EXPO_PUBLIC_BRAND ?? 'goveo';   // 'goveo' | 'ibiza'
   export default { extra: { brand: variant }, /* … */ };
   ```

3. Wire the brand through your existing `ThemeContextProvider`:

   ```ts
   // theme/ThemeContextProvider.tsx
   import Constants from 'expo-constants';
   import { brands, buildBrandTheme, type BrandVariant } from '@goveo/design-tokens';

   const brandKey = (Constants.expoConfig?.extra?.brand ?? 'goveo') as BrandVariant;
   const brand   = brands[brandKey];
   const themes  = buildBrandTheme(brand);

   // themes.light.accent === '#88e4d7' on Ibiza, '#f96a3f' on Goveo
   // themes.light.fgOnPrimary === '#0d3338' on Ibiza (critical — light primary needs dark text)
   ```

4. Audit any hardcoded `#fff` text on top of `--accent` / primary buttons.
   On Ibiza the primary is a light turquoise — you MUST use
   `theme.light.fgOnPrimary` (= `#0d3338`) for legibility.

   ```bash
   rg "color:\s*['\"]?#fff['\"]?" components/ app/ | rg -i "primary|accent|button"
   ```

5. Geofence: hardcode the Ibiza search/feed bounds when `brand === 'ibiza'`:

   ```ts
   // features/geo/bounds.ts
   export const IBIZA_BOUNDS = {
     north: 39.117, south: 38.635,
     east:  1.582,  west:  1.211,    // covers Ibiza + Formentera
   };
   ```

6. App icon + splash + logo: ship Ibiza variants under `assets/brand/ibiza/`
   and select at build time via the same `EXPO_PUBLIC_BRAND` env var.
   Source asset for the Ibiza logo: `https://es.goveo.app/assets/img/ibiza/logo-ibiza.png`
   (download and commit to `assets/brand/ibiza/logo.png`).

### Acceptance — Ibiza build

- [ ] Primary buttons render `#88e4d7` background with `#0d3338` text
- [ ] Feed `Seguir` CTA uses the Ibiza primary (turquoise)
- [ ] Landing accent words/CTAs still use orange (kept warm on purpose)
- [ ] Map opens centered on Ibiza; search results limited to Ibiza/Formentera
- [ ] Goveo build is unchanged (snapshot tests still pass)
