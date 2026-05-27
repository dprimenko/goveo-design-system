# Goveo Landing UI Kit

Recreation of the dark poster-style marketing surface from `dprimenko/goveo-astro/landing-test.html`.

## Files

- `index.html` — single-page recreation. Loads React + Babel, the design tokens from `../../colors_and_type.css`, and the components below.
- `Banner.jsx` — top hero (city background + fade-to-black + logo cap + italic-uppercase headline stack).
- `GeoClipExplainer.jsx` — split section "¿Qué es un GeoClip?" with the vertical-9:16 video poster.
- `FreePlanCard.jsx` — the "¡Empieza gratis!" glass card with numbered steps.
- `PricingGrid.jsx` — Free/Premium/Platinum/Boost grid with billing-cycle tabs (Mensual / Semestral / Anual).
- `HelpForm.jsx` — italic-uppercase form ("¿Te ayudamos?").
- `PromoShare.jsx` — "Comparte y consigue seguidores" promo block with the orange-blur glow on the imagery.
- `Footer.jsx` — store-badges row + tracking-wide copyright line.

## Conventions

- Inter from Google Fonts via `colors_and_type.css`.
- Italic + uppercase + font-weight-900 is the brand voice: every headline, every CTA. Use `.gv-poster-xl/lg/md/sm/xs` for sizing.
- One or two words per headline tinted with `var(--naranja-goveo)`, never whole sentences.
- Glass cards: `background: var(--landing-bg-soft); backdrop-filter: blur(15px); border: 2px solid var(--landing-border);` with radii **3 rem +**.
- Bullet glyphs are `✔ ★ ⚡` (Unicode), always tinted `var(--naranja-goveo)`.
- Buttons: 16 px radius, italic black, 0.15em tracking; orange-on-white default flips to white-on-orange on hover.

This is a **cosmetic recreation**, not the Astro source. Interactive bits (tabs, form submit, modal open) are wired locally; nothing posts anywhere.
