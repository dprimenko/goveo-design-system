# Goveo Design System → goveo-expo

This folder is a **drop-in handoff package** for [`dprimenko/goveo-expo`](https://github.com/dprimenko/goveo-expo).
Generated from the Goveo Design System and adapted to your project's conventions
(Expo Router + NativeWind + styled-components + DDD).

## How to use it with Claude Code

The design system lives at [`dprimenko/goveo-design-system`](https://github.com/dprimenko/goveo-design-system).
**Add it as a git submodule** so updates flow through `git pull`:

```bash
# from goveo-expo root
git submodule add https://github.com/dprimenko/goveo-design-system.git design-system
git submodule update --init --recursive
```

Then open Claude Code:

```bash
claude
```

Inside Claude Code:

> Read `design-system/design_handoff/CLAUDE.md` and apply the instructions in `design-system/design_handoff/HANDOFF.md`. Confirm the plan before writing files.

Claude Code reads the design tokens, the icon map, and the component code
in this folder, then updates the right files in your repo.

### Updating later

When this design system gets a new release:

```bash
cd design-system && git pull && cd ..
claude   # re-apply HANDOFF.md
```

That's it — no zips, no manual file moves.

---

## What's inside

```
design_handoff/
├── README.md            ← (this file)
├── CLAUDE.md            ← Drop-in instructions for Claude Code (auto-read)
├── HANDOFF.md           ← Step-by-step list of changes to apply
├── tokens/
│   ├── tokens.ts        ← Numeric tokens (dp/px) — for StyleSheet
│   ├── tokens.json      ← Source of truth (sync target for other platforms)
│   └── tailwind.config.js  ← Drop-in replacement for your current config
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
├── components/
│   ├── BottomTabBar.tsx ← Replacement for app/(tabs)/_layout.tsx
│   ├── CreateFAB.tsx    ← Floating "+" button (top-right, for creators)
│   └── Icon.tsx         ← Thin re-export from phosphor-react-native
├── icons-map.md         ← Section → Phosphor icon name mapping
└── references/
    └── feed-bottom-nav.html  ← The HTML reference design that produced this
```

---

## Sync workflow

When the design system changes (new tokens, new components, etc.):

1. Re-generate this folder from the source project (just download the latest
   zip of `design_handoff/` from the design-system project).
2. Replace the folder in your repo: `rm -rf design_handoff && unzip ...`
3. In Claude Code: *"Re-apply `design_handoff/HANDOFF.md`. Show diff first."*

Claude Code will produce a diff so you can review before committing.

---

## Versioning

This handoff is **v1.1.0**. Changes from v1.0:

- 🆕 Bottom navigation: 5 canonical tabs with labels (Lugares · Negocios · Home · Eventos · GeoStories)
- 🆕 Floating "+" creator FAB (replaces the center "Add" tab)
- 🆕 Phosphor icons replace the local SVG set
- ✅ Tokens unchanged from v1.0 (no migrations needed for colors/type/spacing)
