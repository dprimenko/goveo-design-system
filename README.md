# Goveo Design System

> **La vídeo Smart City. El nuevo marketing local.**
> Geoclips — vídeos cortos geolocalizados — conectan ciudadanos y turistas con la oferta local: lugares de interés, comercios, eventos y cultura.

Goveo se posiciona como el **"Instagram" de los negocios físicos**: el espacio donde las redes sociales no llegan (por ruido y caos) y donde Google Maps se queda corto (es un directorio, no una experiencia). El propósito declarado en el material de marca es **fomentar economías locales y relaciones humanas**.

This folder is the design system that supports two surfaces of the product:

1. **Goveo App** – mobile-first vertical-video feed (TikTok-style, 9:16) with location chips, category filters, sidebar, bottom bar, and download-app modal. Source code: `dprimenko/goveo-astro` → `src/features/feed/*`, `src/components/*`.
2. **Goveo Landing / Marketing** – dark, poster-style sales pages with pricing plans, "GeoClip" explainers, and lead-capture forms. Source: `dprimenko/goveo-astro` → `landing-test.html`.

Both surfaces share the orange brand ramp, Inter typography, and the pin-with-play-button logo. They differ wildly in tone: the app chrome is calm and utilitarian (neutral grays, body weights, no italics), the landing is **loud, italic, ALL-CAPS, font-weight-900 poster copy** with glass-card containers on a near-black background.

---

## Sources & references

This design system was extracted from a single GitHub repo provided by the user. Browse it for richer context:

- **dprimenko/goveo-astro** – Astro + React storefront and shared design tokens. The most relevant files:
  - `landing-test.html` – the dark marketing-page reference we were told to anchor on for the first iteration. It contains the full poster aesthetic, pricing-tab logic, and modal copy.
  - `src/design-system/settings/*.scss` – source-of-truth tokens for colors, spacing, radii, typography, sizes, z-index.
  - `src/features/feed/Feed.tsx` + `GeoStoryView.tsx` – the vertical-video feed UI (this is the heart of the product).
  - `src/components/mobile-sidebar/MobileSidebar.tsx` – left drawer / nav.
  - `src/components/modal/DownloadAppModal.tsx` – cross-screen download prompt.
- Live brand assets that we link to (and that the landing pulls from) are hosted on `https://es.goveo.app/assets/img/...` and `https://res.cloudinary.com/goveo/...`. The download buttons go to:
  - iOS: https://apps.apple.com/es/app/goveo/id1480569862
  - Android: https://play.google.com/store/apps/details?id=app.goveo.android
- Other Goveo-adjacent repos worth checking for deeper UI work (not pulled here):
  `dprimenko/goveo-flutter`, `dprimenko/goveo-ibiza-flutter`, `dprimenko/goveo-microsites`, `dprimenko/goveo-nova`, `dprimenko/goveo-expo`.

If you have read access to those repos, dig in — the design-system tokens are consistent across them.

---

## Content Fundamentals

### Language

- **Spanish (Spain)**, with very occasional English idioms ("INNOVATION IN MOTION", "Boost").
- Direct address using **tú / tu negocio / te ayudamos / atrae los clientes**. Never "usted".
- "Goveo" is treated like a stage name — always capitalized in lock-step with the orange brand color when on the dark surface.

### Voice & tone

- **Manifesto, not marketing-speak.** Short sentences. Heavy rhetorical contrast: "Basta de fotos y de caos/ruido de las Redes."
- **Action verbs in the imperative**: *Únete · Geolocaliza · Atrae · Descarga · Regístrate · Sube · Empieza · Comparte · Configura · Activar · Solicitar*.
- **Confident, slightly provocative**, framed as a "revolución" / new category: *"Bienvenidos al Instagram de los negocios físicos"*, *"PRUEBA LA REVOLUCIÓN"*, *"DOMINIO TOTAL"*.
- **Numbers do the talking**: explicit savings ("Ahorras 213€"), counts ("100/200 primeros seguidores", "Hasta 50 vídeos"), discounts ("-30%", "20% DE DESCUENTO"). Prices always **with `€` suffix**, never prefix.

### Casing & punctuation

- Landing copy is **ITALIC + UPPERCASE + font-weight 900** for headlines, CTAs, and plan names. Body copy in the landing is also italic but mixed-case.
- App UI uses **Sentence case**, regular Inter weights (400–600). No italics or upper-case in the in-app chrome.
- Brand orange is used to highlight **one or two words per headline** — not for whole sentences. Pattern: *"Atrae **los clientes** fácilmente"*, *"Únete **Gratis** a la Vídeo Smart City"*.
- En-dashes and slashes show up as casual separators ("Reglas/Ayuda", "Turismo/Cultura", "30 segundos - 60MB").
- Exclamation marks open and close enthusiastic CTAs: *"¡EMPIEZA GRATIS!"*, *"¡SUBIR MI PRIMER VÍDEO GRATIS!"*.

### Glossary (must-know terms)

| Term | Use |
|---|---|
| **GeoClip** | A 30-second geolocated vertical video. Goveo's atomic content unit. Always capitalized. |
| **GeoStory** | The in-app data model for a feed item — used in code; user-facing copy prefers "GeoClip". |
| **Publisher** | A business or creator account that can upload GeoClips. |
| **Vídeo Smart City** | The product positioning line. Always with the accent on *Vídeo*. |
| **Local influencers / Creadores de contenido** | The two non-business user roles. |
| **Plan FREE / PREMIUM / PLATINUM / BOOST** | The pricing tiers. PLATINUM is the highlighted recommended tier ("COMPLETO"). |

### Emoji & symbols

- No emoji on the landing. Instead, the brand uses three text-shaped marks as bullet glyphs, **always tinted in `--naranja-goveo`**:
  - `✔` – inclusion checkmark (default in plan lists)
  - `★` – premium/exclusive feature (PLATINUM list)
  - `⚡` – power/boost feature (BOOST list)
- App UI uses **Phosphor Icons** (`@phosphor-icons/react`) — see ICONOGRAPHY.

### Example copy you can crib from

- Hero: *"Geolocaliza **tu mejor Reel**"*
- Subhead: *"Basta de fotos y de caos/ruido de las Redes"*
- Section opener: *"¿QUÉ ES UN **GEOCLIP**?"*
- CTA primary: *"¡SUBIR MI PRIMER VÍDEO GRATIS!"*
- CTA secondary: *"IR A DESCARGAR LA APP"*
- Pricing eyebrow: *"PRUEBA LA REVOLUCIÓN"*, *"VISIBILIDAD LOCAL"*, *"POTENCIA PERFIL"*, *"DOMINIO TOTAL"*
- Trust microcopy: *"Contenido sujeto a aprobación de calidad. Goveo se reserva el derecho de admisión."*

---

## Visual Foundations

### Two surfaces, one ramp

- **App chrome** (light): white / `--neutral-100` background, `--neutral-900` text, Inter 400/500/600, gentle 8–16 px radii. Has an opt-in **dark mode** (selector: `.dark &`) that swaps to pure black with white text. The feed view itself is always black.
- **Landing** (dark, marketing): `--zinc-950` (`#09090b`) background, white text, glass-card containers, italic-uppercase font-weight 900 type, oversized radii (24–64 px).

### Color

- **Brand orange** has two near-twin values that both ship. Use them surface-aware:
  - In app chrome → `--primary-500` (#F96A3F), the CSS-variable token already declared in `_colors.scss`.
  - On landing pages → `--naranja-goveo` (#E98027), the Tailwind config color from `landing-test.html`. Slightly warmer / more amber, set against pure black so the warmth reads.
- **Never** use orange for paragraphs of body text. Reserve it for: one or two highlighted words in a headline, primary CTAs, the `✔ ★ ⚡` bullets, plan accent rings, the icon-pill behind a hero icon.
- **Neutrals** are a custom ramp (`--neutral-100` → `--neutral-900`) that is slightly cool — not a true gray. Pair them with `--basic-white`/`--basic-black`. The landing additionally borrows Tailwind's `zinc` scale.
- Backgrounds are **either pure white or pure near-black**. We do NOT use mid-tone backgrounds.

### Type

- **Inter** is the single typeface. Weights actually used: 400, 500, 600, 700, 800, 900. The 900 italic is the brand's most recognizable type move.
- App scale (rem) lives in `_typography.scss` and is re-exported to `colors_and_type.css` as `--fs-display1` … `--fs-caption`.
- Landing scale is poster-driven and one-off — we expose it as `.gv-poster-xl / lg / md / sm / xs`.
- Letter-spacing: tight (`-0.02em` to `-0.03em`) on hero posters; **very wide** (`0.15–0.25em`) on tracking labels like *"INNOVATION IN MOTION"* or eyebrows.
- We never use slab serifs, scripts, or display fonts. Inter only.

### Spacing & layout

- Spacing tokens are powers-of-2 in rem: 4 / 8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 px.
- Container padding scales with breakpoint (24 → 32 → 40 → 96 px) via the `--container-padding` rule in `_base.scss`.
- Landing max-width is **1440 px** (`max-w-[1440px]`); cards within it center at **lg ≤ 1000 px**.
- Hero headlines are aggressively tightened: `leading-[0.9]` / `leading-none`, `tracking-tighter`.

### Backgrounds & imagery

- **Top-of-page banner** is a cinematic city skyline (Madrid in the reference) that bleeds into a **fade-to-black gradient mask** at the bottom. Image is full-bleed, `background-size: cover`, `background-position: top`.
- The dark surface is not a flat black — it sits on `--zinc-950` and is interrupted by `bg-zinc-900/40` strips with a 1 px `--landing-border` divider above and below for visual rhythm.
- **Glass cards** are the recurring container: `rgba(255,255,255,0.03)` fill + `backdrop-filter: blur(15px)` + `2px solid rgba(255,255,255,0.1)` border + an **oversized radius (3–4 rem)**. They cast no shadow by default but get a colored orange glow when they are the focal element (`shadow-[0_0_50px_rgba(233,128,39,0.15)]`).
- Imagery is **warm-toned, urban, ground-level**. People in motion, neon at night, food close-ups, cobble streets. We **never** use stock-photo office shots, abstract gradients, or AI-illustration patterns.

### Borders, shadows, glow

- **Borders** are mostly translucent white: 1 px `rgba(255,255,255,0.10)` (default) or 2 px at 0.10–0.40 alpha on glass cards. On light surfaces we use solid `--neutral-200`.
- **Shadows** are sparse in the app chrome and exuberant on the landing:
  - App: `0 1px 2px rgba(0,0,0,0.06)` is plenty.
  - Landing: orange "glow" boxes — `0 0 50px rgba(233,128,39,0.15)` for hero cards, `0 4px 15px rgba(233,128,39,0.4)` for the pricing tab pill, `0 0 60px rgba(233,128,39,0.25)` for the recommended PLATINUM card with its gradient ring.
- **Text glow** is used on the single highlighted hero word: `text-shadow: 0 0 20px rgba(233,128,39,0.5)` — `.orange-glow` in the source, exposed here as `--orange-glow`.

### Corners

- App: 4 / 8 / 16 / 32 px (`--radius-4 … --radius-24`). Most things are 8 or 16.
- Landing: dramatically larger — **3 rem (48 px)** for pricing cards, **3.5 rem (56 px)** for the "free plan" glass card, **4 rem (64 px)** for the promo banner. Buttons inside are **1.25–1.5 rem (20–24 px)** rounded.
- Pills/chips are fully round (`--radius-pill`). Logo and avatars are circles.

### Animation & interaction

- **Easing**: `transition-all 0.3s ease` is the default on hovers (modal inputs, CTAs). The landing also uses `duration-700` / `duration-1000` for slow opacity blooms on the promo image.
- **Hover states**:
  - Default CTA hover: bg flips from `white` → `--naranja-goveo`, text from `black` → `white`. Used on every secondary button.
  - Orange filled CTA hover: bg darkens to `--naranja-dark`.
  - Pricing card hover: border alpha jumps from 0.10 → 0.20.
  - App menu item hover: background fills with `--neutral-200` (or `--neutral-900` in dark mode).
- **Press states**: no explicit shrink/translate. Buttons get `shadow-lg` ambient at rest; the orange CTA also gets a stronger glow shadow.
- **Scroll**: `scroll-behavior: smooth` site-wide. The feed itself uses CSS `scroll-snap-type: y mandatory` for the TikTok-style vertical paging, with an `IntersectionObserver` driving play/pause.
- We don't use bouncy springs, parallax, or scroll-tied animations.

### Transparency & blur

- Used **only** for glass cards (`backdrop-filter: blur(15px)`) and the download-app modal scrim (`backdrop-filter: blur(10px)` over `rgba(0,0,0,0.85)`).
- In-app overlays use a **flat semi-opaque gray**: `rgba(84,84,84,0.5)` is the canonical chip / pressable-icon background on top of video.

### Layout rules

- **Single-column mobile-first**. The Astro repo declares container widths per breakpoint; on landing pages, the layout collapses to one column under `md`.
- The feed is **portrait 9:16 always**, even on desktop (`aspect-ratio: 0.5625 / 1; width: auto`).
- A fixed **bottom bar** is the primary navigation on mobile app, 64 px tall, 4 grid columns, white (or pure black in dark mode), with a 1 px top border.
- The download-app modal is **width-locked at 310 px** and centered. Forms in the landing are width-locked at **max-w-md (~28 rem)**.

---

## Iconography

Goveo's icon language has **two stacked layers**:

1. **In-product icons → Phosphor Icons (React)** via `@phosphor-icons/react`. Stroke style is the default `regular` weight, occasionally `fill` (e.g. the muted speaker). Imported by name in `Feed.tsx` and `GeoStoryView.tsx`:
   `MapPinIcon`, `ListIcon`, `FunnelIcon`, `MagnifyingGlassIcon`, `ShoppingCartIcon`, `CaretUpIcon`, `CaretDownIcon`, `HeartIcon`, `ShareFatIcon`, `SpeakerSimpleHighIcon`, `SpeakerSimpleSlashIcon`. Default size is **24 px** in the chrome, **32 px** in the action rail on the right of a feed video, and **48 px** for the "where" pin (which is the brand logo, not Phosphor).

   In this design system Phosphor is referenced via its CDN script (`https://unpkg.com/@phosphor-icons/web@2.1.1`) so HTML mocks can drop `<i class="ph ph-map-pin"></i>` without bundling. Stroke + fill weights are toggled with `ph-fill`, `ph-bold`, etc.

2. **Custom brand SVGs / PNGs** that live in this repo's `assets/` folder. These are the **mobile bottom-bar glyphs** (`earth`, `mask`, `video`, `shop`, `person`, `add`) plus the **branded "Where" pin** (`logo-play-white.png`) and the centered **play affordance** (`play-button.png`). They are the only icons that *aren't* Phosphor.

3. **Marketing landing SVGs are hand-rolled inline** in `landing-test.html` (the "download" arrow, the Instagram glyph on the promo button). These are direct copies — see `assets/icons/instagram-glyph.svg` and `assets/icons/download-arrow.svg` (extracted in `preview/`). The stroke weight is `2 px`, `currentColor`. Match this style if you add new marketing icons.

4. **Bullet glyphs** (`✔ ★ ⚡`) are Unicode characters tinted in `--naranja-goveo`, not SVG. Use them exactly as written; do not replace with custom shapes.

5. **No emoji** in any of the source surfaces. Don't add them.

> ⚠️ **Substitution flag** — the Phosphor icons are loaded from a CDN, not bundled. If you build for production from this kit, install `@phosphor-icons/react` to match the original repo and avoid runtime CDN dependency.

> ⚠️ **Font flag** — Inter is loaded from Google Fonts in both the source landing and this kit. No local TTF files are vendored. If you need offline / signed-PDF output, install Inter from rsms.me/inter or use the Google Fonts download.

---

## What's in this folder

```
README.md                 ← you are here
SKILL.md                  ← agent-skill entrypoint (for Claude Code / Skills)
colors_and_type.css       ← all design tokens as CSS variables + utility classes
assets/                   ← logos, app icon, bottom-bar SVGs, marketing icons
fonts/                    ← (empty — Inter is loaded from Google Fonts; see flag)
preview/                  ← HTML cards that populate the Design System tab
ui_kits/
  goveo-app/              ← in-app feed, sidebar, bottom-bar, modals
  goveo-landing/          ← dark marketing landing recreation
src/                      ← original sources imported from dprimenko/goveo-astro (read-only reference)
public/                   ← original public/ assets imported from the repo
landing-test.html         ← the reference landing copied as-is from the repo
```

### UI kits

| Kit | Index | What's covered |
|---|---|---|
| `ui_kits/goveo-app/index.html` | Mobile feed | GeoStory video card with overlays, location chip header, action rail (heart / share / where), sound toggle, bottom-bar with brand SVG icons, sidebar drawer, download-app modal |
| `ui_kits/goveo-landing/index.html` | Dark landing | Top banner with city image + fade, logo cap, italic-uppercase hero, "What is a GeoClip" split section, "EMPIEZA GRATIS" glass card, 4-tier pricing grid with billing-cycle tabs, help form, promo-share section, footer |

---

## Caveats

- We could not reach the live brand assets at `es.goveo.app/assets/img/...` (header skyline, `logo-newgoveo.png`, `sharenewgoveo.png`) from the build sandbox — the landing kit references them via remote URL. Mocks render correctly when viewed online; if you build offline-first, download those PNGs locally and rewrite the `src` paths in `ui_kits/goveo-landing/index.html`.
- The Astro repo's `src/pages/` is API-only (Google Maps proxy routes). There's no Astro page combining all the React features into one running app — the React surfaces are mounted as islands. Our `ui_kits/goveo-app/index.html` is the first single-page recreation of the feed UX.
- **Inter** is loaded from Google Fonts; no font files are vendored here. Flag, not blocker.
- Phosphor icons are linked via CDN, not bundled. Flag, not blocker.

---

## How to extend this kit

1. Read `colors_and_type.css` — every token you need is already named.
2. Build the dark "landing" feel with `.gv-dark` + `.gv-poster-xl/lg/md` + `--naranja-goveo` accents on text/bullets, glass cards (`background: var(--landing-bg-soft); backdrop-filter: blur(15px); border: 2px solid var(--landing-border);`).
3. Build app-chrome UI with `var(--bg) / var(--fg) / var(--primary-500)`, 8–16 px radii, Inter 400/500/600, Phosphor icons.
4. **Never** mix the two surfaces in one screen. Pick one and commit.
5. When in doubt: stack `font-style: italic; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; line-height: 0.9` on a hero, paint one word in `--naranja-goveo`, and you have Goveo.
