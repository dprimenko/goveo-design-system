# Goveo Design System — Export

Sistema de tokens portable extraído de `dprimenko/goveo-astro`. Pensado para tres consumidores:

- **Astro / Web** → `tokens.css` (variables CSS) o `tailwind.preset.js` (Tailwind preset)
- **React Native (Expo)** → `tokens.ts` + `react-native/theme.ts`
- **Cualquier herramienta** (Figma Tokens, Style Dictionary, scripts) → `tokens.json`

---

## Contenido del paquete

```
export/
├── tokens.json              ← Source of truth (todos los tokens)
├── tokens.css               ← Variables CSS + utilidades (web)
├── tokens.ts                ← Objeto TS tipado (RN / React / Astro islands)
├── tokens.js                ← Objeto JS plano (sin TS)
├── tailwind.preset.js       ← Preset Tailwind para Astro/Next/Vite
├── icons.md                 ← Mapa oficial de iconos Phosphor por sección
├── astro/
│   ├── landing-example.astro
│   └── BottomNav.astro      ← Nav principal (5 tabs + FAB)
└── react-native/
    ├── theme.ts
    ├── components.example.tsx
    └── BottomNav.example.tsx ← Nav principal (RN)
```

---

## Astro — instalación

### Opción A · CSS Variables (recomendado, mínima fricción)

1. Copia `tokens.css` a tu proyecto:
   ```bash
   cp export/tokens.css apps/web/src/styles/tokens.css
   ```
2. Impórtalo una vez en tu layout raíz (`src/layouts/Layout.astro`):
   ```astro
   ---
   import '../styles/tokens.css';
   ---
   ```
3. Usa los tokens en cualquier componente:
   ```astro
   <style>
     .card {
       background: var(--bg-elevated);
       color: var(--fg);
       border-radius: var(--radius-16);
       padding: var(--space-24);
       box-shadow: var(--shadow-app);
     }
   </style>
   ```

### Opción B · Tailwind Preset

1. Asegúrate de tener Tailwind en tu Astro:
   ```bash
   npx astro add tailwind
   ```
2. Copia `tailwind.preset.js`:
   ```bash
   cp export/tailwind.preset.js apps/web/goveo.preset.js
   ```
3. Apúntalo en `tailwind.config.mjs`:
   ```js
   import goveo from './goveo.preset.js';
   export default {
     presets: [goveo],
     content: ['./src/**/*.{astro,tsx,ts,jsx,js,md,mdx}'],
   };
   ```
4. Usa utilities:
   ```astro
   <h1 class="font-sans italic font-black uppercase tracking-tighter text-display1
              text-white">
     Geolocaliza <span class="text-naranja-goveo">tu mejor reel</span>
   </h1>
   ```

### Opción C · Token JS

Para Astro islands (React/Vue/Solid) que necesiten leer los tokens en runtime:
```ts
import { tokens } from '../export/tokens';
const heroOrange = tokens.landing.accent;
```

> **Fuentes:** `tokens.css` carga Inter desde Google Fonts. Si necesitas offline/SSR puro, descarga Inter (`rsms.me/inter`) y reemplaza el `@import` por `@font-face`.

---

## React Native (Expo) — instalación

1. Copia los archivos:
   ```bash
   mkdir -p apps/mobile/src/theme
   cp export/tokens.ts          apps/mobile/src/theme/tokens.ts
   cp export/react-native/theme.ts apps/mobile/src/theme/index.ts
   ```

2. Carga la familia **Inter** una vez al arrancar la app. RN no aplica
   `fontStyle:'italic'` ni `fontWeight:'900'` de forma fiable en Android,
   así que cargamos cada estilo como una familia independiente:

   ```bash
   npx expo install expo-font
   ```

   Coloca los TTF en `apps/mobile/assets/fonts/` (descárgalos de
   [rsms.me/inter](https://rsms.me/inter/)) y en tu `App.tsx`:

   ```tsx
   import * as Font from 'expo-font';
   import { useEffect, useState } from 'react';

   export default function App() {
     const [ready, setReady] = useState(false);
     useEffect(() => {
       Font.loadAsync({
         'Inter':              require('./assets/fonts/Inter-Regular.ttf'),
         'Inter-Medium':       require('./assets/fonts/Inter-Medium.ttf'),
         'Inter-Semibold':     require('./assets/fonts/Inter-SemiBold.ttf'),
         'Inter-Bold':         require('./assets/fonts/Inter-Bold.ttf'),
         'Inter-Black':        require('./assets/fonts/Inter-Black.ttf'),
         'Inter-BlackItalic':  require('./assets/fonts/Inter-BlackItalic.ttf'),
       }).then(() => setReady(true));
     }, []);
     if (!ready) return null;
     return <YourApp />;
   }
   ```

3. Úsalo:

   ```tsx
   import { StyleSheet, View, Text } from 'react-native';
   import { tokens } from './src/theme/tokens';
   import { textStyles, elevate } from './src/theme';

   export function Card({ title }: { title: string }) {
     return (
       <View style={styles.card}>
         <Text style={styles.title}>{title}</Text>
       </View>
     );
   }
   const styles = StyleSheet.create({
     card: {
       backgroundColor: tokens.light.bgElevated,
       borderRadius: tokens.radius[16],
       padding: tokens.space[24],
       ...elevate('app'),
     },
     title: {
       ...textStyles.heading,
       color: tokens.light.fg,
     },
   });
   ```

4. Para alternar surface (light / dark / landing) usa el `ThemeProvider`
   exportado en `theme.ts` y `useTheme()`.

---

## Reglas no-negociables

1. **Nunca mezcles "app" y "landing" en la misma pantalla.** Elige una superficie y comprométete.
2. **Naranja solo para acentos** — 1-2 palabras en un titular, CTAs, glifos `✔ ★ ⚡`. Nunca para párrafos.
3. **Backgrounds: blanco puro o negro casi puro** (`#09090b`). Nada de medios tonos.
4. **Inter únicamente.** No introduzcas otra familia. Las distintas voces vienen del peso/italic/uppercase, no de la tipografía.
5. **Hit targets ≥ 44pt** en RN, ≥ 44px en web.
6. **Radios:** chrome de app 8–16, landing 48–64.
7. **El "poster style"** (`italic + 900 + uppercase + letter-spacing -0.02em + line-height 0.9`) **solo en marketing**. En el chrome de la app es ruido.

---

## Versionado

Este export se considera **v1.0.0**. Cambios:

- **MAJOR** — renombrar/eliminar tokens (rompe consumidores).
- **MINOR** — añadir tokens nuevos o variantes.
- **PATCH** — corregir valores (hex incorrecto, line-height mal calculado).

`tokens.json` es la fuente de verdad. Si editas los CSS/TS a mano, sincroniza el JSON.

---

## Próximos pasos sugeridos

- [ ] Publicar `export/` como paquete npm interno (`@goveo/tokens`) para evitar copiar archivos.
- [ ] Generar automáticamente los archivos con **Style Dictionary** desde `tokens.json`.
- [ ] Sincronizar con un Figma Library vía **Tokens Studio**.
- [ ] Añadir tokens de animación (duraciones, easings) cuando el sistema los formalice.
