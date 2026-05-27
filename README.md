# Goveo Design System

Source of truth for the Goveo visual language. Consumed by:

- [`dprimenko/goveo-expo`](https://github.com/dprimenko/goveo-expo) — Expo / React Native app
- [`dprimenko/goveo-astro`](https://github.com/dprimenko/goveo-astro) — Astro web (landing + marketing)
- Any future Goveo surface (Flutter, native widgets, internal tools…)

---

## Repo layout

```
.
├── export/                ← Publishable package. Stable tokens + components.
│   ├── tokens.json        ← Source of truth (W3C-ish design-tokens format)
│   ├── tokens.css         ← CSS variables + utility classes (web)
│   ├── tokens.ts          ← TypeScript objects, px/dp values (RN-friendly)
│   ├── tokens.js          ← Plain JS mirror
│   ├── tailwind.preset.js ← Drop-in Tailwind preset (Astro, Next, …)
│   ├── icons.md           ← Phosphor icon mapping per section
│   ├── astro/             ← Astro components (BottomNav.astro, examples)
│   ├── react-native/      ← RN components (BottomNav, theme.ts)
│   └── package.json       ← Installable as @goveo/design-tokens
│
├── design_handoff/        ← Pre-built handoff bundle for Claude Code
│   ├── CLAUDE.md          ← Auto-read by Claude Code in goveo-expo
│   ├── HANDOFF.md         ← Step-by-step changes for the next sync
│   └── components/        ← Drop-in component files for goveo-expo
│
├── preview/               ← Design-system storybook (HTML cards)
├── ui_kits/               ← Reference UI kits (app + product + landing)
├── Storybook.html         ← Master index of preview/ cards
├── Export Guide.html      ← Visual guide for integrating into Astro / RN
└── README.md              ← (this file)
```

---

## How to consume — three flavours

### 1 · Git submodule (recommended for active development)

Cleanest workflow when this system is iterated weekly and a real diff matters.

In `goveo-expo`:

```bash
git submodule add https://github.com/dprimenko/goveo-design-system.git design-system
git submodule update --init --recursive
```

Then in `package.json` of the consumer:

```json
"dependencies": {
  "@goveo/design-tokens": "file:./design-system/export"
}
```

```bash
npm install
```

You now `import { tokens } from '@goveo/design-tokens'` anywhere.

**To pull updates:**

```bash
cd design-system && git pull && cd ..
npm install   # re-link if package.json of design-system changed
```

### 2 · npm `file:` install (no submodule, single working copy)

If you'd rather clone this repo next to `goveo-expo`:

```bash
# sibling layout
~/code/goveo-design-system
~/code/goveo-expo
```

In `goveo-expo/package.json`:

```json
"dependencies": {
  "@goveo/design-tokens": "file:../goveo-design-system/export"
}
```

`npm install`, done. Reinstall after each pull of the design-system repo.

### 3 · GitHub Packages / npm publish (production-grade)

When the system stabilises, publish `export/` to GitHub Packages (private)
or npm. Then `goveo-expo` does:

```bash
npm i @goveo/design-tokens@1.1.0
```

Versioning then becomes explicit and apps can pin a known-good version. See
`PUBLISHING.md` (TODO).

---

## How to apply the latest design changes — Claude Code workflow

After pulling new versions of this repo into `goveo-expo` (as a submodule
or sibling), open Claude Code in `goveo-expo` and say:

> Read `design-system/design_handoff/CLAUDE.md` and apply `HANDOFF.md`. Show diff before writing.

Claude Code will:

1. Detect what changed since the last application.
2. Update tokens, components, and tab navigation in your repo.
3. Print a diff for review.

The `design_handoff/` folder is **kept in sync** with each release of this
repo — it's the imperative twin of the declarative `export/` package.

---

## Versioning

Semver. The version in `export/package.json` is the canonical version.

- **MAJOR** — renaming/removing tokens, breaking component APIs.
- **MINOR** — new tokens, new components, new variants.
- **PATCH** — bug fixes, value corrections.

Tag releases on this repo:

```bash
git tag v1.1.0
git push origin v1.1.0
```

Consumers using a submodule pin to the tag:

```bash
cd design-system && git checkout v1.1.0
```

---

## Current version: 1.1.0

- Bottom navigation: 5 canonical tabs with labels (Lugares · Negocios · Home · Eventos · GeoStories)
- Floating "+" creator FAB pattern
- Phosphor as the icon family (`globe-hemisphere-west`, `storefront`, `compass`, `mask-happy`, `clock-countdown`)
- Tokens unchanged from v1.0
