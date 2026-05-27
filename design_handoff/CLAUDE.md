# Goveo Design System · Context for Claude Code

You are working in **dprimenko/goveo-expo** — an Expo + React Native app that
follows the conventions in `.cursorrules` at the repo root.

This folder (`design_handoff/`) is the **source of truth** for the design
system. When applying changes:

1. Always read `HANDOFF.md` first — it lists the concrete file changes to
   apply, in order.
2. The HTML files in `references/` are **design references**, not code to
   copy. They show intended look and behavior. Re-create them in the existing
   RN stack.
3. The `tokens/`, `theme/`, and `components/` files **ARE** code — copy them
   directly into the matching paths in the repo (HANDOFF.md tells you where).

## Project conventions you must respect

From `.cursorrules`:

- **Styling**: NativeWind (Tailwind) for utility classes + styled-components
  for complex styled blocks. Don't mix paradigms inside one component.
- **Exports**: Named exports only. **No `export default`** for components.
- **File names**: PascalCase for components, camelCase for utilities.
- **Imports**: Use `@/` alias, not relative paths.
- **Folders**: Features follow DDD — `features/[Feature]/modules/[Module]/{domain,infrastructure}/`.
- **Lists**: `FlatList`, never `.map()` for long lists.
- **TypeScript**: Strict. Always type props with an explicit `interface`.
- **Bottom bar exception**: the rule "no tocar el bottom bar" is **lifted**
  for v1.1 — the user explicitly asked to redesign it.

## Stack already in place (don't re-install)

- Expo SDK 52, React Native 0.76.9, Expo Router 4
- NativeWind 4, styled-components 5, Tailwind 3
- `@expo-google-fonts/inter` — Inter weights 200-800 already loaded
- `react-native-svg` 15.8 — needed by phosphor-react-native

## New dependencies you need to install

```bash
npx expo install phosphor-react-native
```

That's it. `react-native-svg` is already there.

## When updating files

- Match the indentation of the file you're editing (the repo uses 4-space
  indent for TS/TSX based on `_layout.tsx`).
- Keep existing imports if they're still used.
- Don't reformat untouched code.
- Don't `export default` newly created components.

## How to verify

After applying:

```bash
npm run lint
npx expo start
```

Open the iOS simulator and confirm the tab bar shows the 5 new tabs with
labels and the orange floating "+" button appears on the Home screen.
