---
name: goveo-design
description: Use this skill to generate well-branded interfaces and assets for Goveo (the "vídeo Smart City" — geolocated short-video product for local businesses and tourism), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

Goveo ships two surfaces:

1. **Landing / marketing** — dark, italic-uppercase, font-weight-900 poster aesthetic on `--zinc-950`. Use `--naranja-goveo` (#E98027) accents on highlighted words and bullet glyphs (`✔ ★ ⚡`). Glass cards with 3–4 rem radii and orange glow shadows. See `ui_kits/goveo-landing/`.
2. **In-app feed** — calm, light/dark mobile chrome wrapping a 9:16 TikTok-style vertical video feed. Phosphor icons, 8–16 px radii, Inter 400/500/600, `--primary-500` (#F96A3F) for the orange CTAs. See `ui_kits/goveo-app/`.

**Never mix the two surfaces in one screen — pick one and commit.**

## Starting points

- Open `colors_and_type.css` — every token you'll need is already named (`--primary-500`, `--naranja-goveo`, `--landing-bg`, `--fs-display1`, etc) plus utility classes `.gv-poster-xl/lg/md/sm/xs`, `.gv-eyebrow`, `.gv-italic-bold`, `.gv-dark`.
- The reference landing markup lives at `landing-test.html` (Tailwind-flavored, exactly as imported from the source repo). Use it as ground truth for landing-page tone and copy.
- The reference app source lives under `src/features/feed/` (TSX + SCSS). Match its naming and overlay structure when recreating the feed.
- `assets/` has the logo (`goveo-logo.png`), app icon (`goveo-app-icon.jpg`), play affordance, brand SVG icons, and bottom-bar nav SVGs.
- `preview/` has 14 tiny demonstrator cards (~700×150 px) covering Type / Colors / Spacing / Components / Brand — useful as paste-in patterns.
- Inter is loaded from Google Fonts in `colors_and_type.css`. Phosphor Icons are loaded from a CDN in the app kit.

## When in doubt

Stack `font-style: italic; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; line-height: 0.9` on a hero, paint one word in `var(--naranja-goveo)`, drop everything onto `var(--zinc-950)`, and you have Goveo.
