/**
 * Goveo · React Native theme helpers
 *
 * Place this file in your RN project (e.g. src/theme/index.ts)
 * alongside tokens.ts. Then:
 *
 *   import { useTheme, t } from './theme';
 *   const { colors, type } = useTheme();
 *
 * Or for static styles:
 *   import { tokens } from './tokens';
 *   const styles = StyleSheet.create({
 *     card: { backgroundColor: tokens.light.bgElevated, borderRadius: tokens.radius[16] },
 *   });
 *
 * Font loading — call once on app start:
 *
 *   import * as Font from 'expo-font';
 *   await Font.loadAsync({
 *     'Inter':           require('./assets/fonts/Inter-Regular.ttf'),
 *     'Inter-Medium':    require('./assets/fonts/Inter-Medium.ttf'),
 *     'Inter-Semibold':  require('./assets/fonts/Inter-SemiBold.ttf'),
 *     'Inter-Bold':      require('./assets/fonts/Inter-Bold.ttf'),
 *     'Inter-Black':     require('./assets/fonts/Inter-Black.ttf'),
 *     'Inter-BlackItalic': require('./assets/fonts/Inter-BlackItalic.ttf'),
 *   });
 *
 * Why explicit font families? RN ignores fontStyle:'italic' on Android
 * unless the family name itself carries the italic — load each weight/style
 * combo as its own family for parity.
 */

import { createContext, useContext } from 'react';
import { Platform, TextStyle } from 'react-native';
import {
  tokens, lightTheme, darkTheme, landingTheme,
  colors, space, radius, type, poster, fontWeight, rnShadow,
} from './tokens';

export type Surface = 'light' | 'dark' | 'landing';

const surfaceMap = {
  light:   lightTheme,
  dark:    darkTheme,
  landing: landingTheme,
};

export type ThemeShape = {
  surface: Surface;
  colors:  typeof colors;
  semantic: typeof lightTheme;
  space:   typeof space;
  radius:  typeof radius;
  type:    typeof type;
  poster:  typeof poster;
  fontWeight: typeof fontWeight;
  shadow:  typeof rnShadow;
};

export const buildTheme = (surface: Surface = 'light'): ThemeShape => ({
  surface,
  colors,
  semantic: surfaceMap[surface] as typeof lightTheme,
  space, radius, type, poster, fontWeight,
  shadow: rnShadow,
});

const ThemeContext = createContext<ThemeShape>(buildTheme('light'));
export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);

/* -----------------------------------------------------------
   `t` — direct token access (when you don't want a hook)
   ----------------------------------------------------------- */
export const t = tokens;

/* -----------------------------------------------------------
   Ready-made text styles
   ----------------------------------------------------------- */

const family = (w: keyof typeof fontWeight): string => {
  switch (w) {
    case 'regular':  return 'Inter';
    case 'medium':   return 'Inter-Medium';
    case 'semibold': return 'Inter-Semibold';
    case 'bold':     return 'Inter-Bold';
    case 'extra':    return 'Inter-Bold';   // fallback
    case 'black':    return 'Inter-Black';
  }
};

export const textStyles = {
  display1:  { ...type.display1,  fontFamily: family('regular') },
  display2:  { ...type.display2,  fontFamily: family('regular') },
  display3:  { ...type.display3,  fontFamily: family('regular') },
  heading:   { ...type.heading,   fontFamily: family('semibold') },
  body:      { ...type.body,      fontFamily: family('regular') },
  bodySmall: { ...type.bodySmall, fontFamily: family('regular') },
  caption:   { ...type.caption,   fontFamily: family('regular') },

  /* Landing poster headlines.
     IMPORTANT: load 'Inter-BlackItalic' as its own font family. */
  posterXl: {
    fontFamily: 'Inter-BlackItalic',
    fontSize: poster.xl.fontSize,
    letterSpacing: poster.xl.letterSpacing,
    textTransform: 'uppercase',
    lineHeight: Math.round(poster.xl.fontSize * 0.9),
  } as TextStyle,
  posterLg: {
    fontFamily: 'Inter-BlackItalic',
    fontSize: poster.lg.fontSize,
    textTransform: 'uppercase',
    letterSpacing: -1,
    lineHeight: Math.round(poster.lg.fontSize * 0.9),
  } as TextStyle,
  posterMd: {
    fontFamily: 'Inter-BlackItalic',
    fontSize: poster.md.fontSize,
    textTransform: 'uppercase',
    lineHeight: poster.md.fontSize,
  } as TextStyle,
  eyebrow: {
    fontFamily: 'Inter-BlackItalic',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: landingTheme.fgSubtle,
  } as TextStyle,
} as const;

/* -----------------------------------------------------------
   Touch / hit-slop helper — Goveo minimum is 44pt
   ----------------------------------------------------------- */
export const hitSlop = { top: 8, right: 8, bottom: 8, left: 8 };

/* -----------------------------------------------------------
   Platform shadow helper — combines iOS shadow + Android elevation
   ----------------------------------------------------------- */
export const elevate = (kind: keyof typeof rnShadow) => {
  const s = rnShadow[kind];
  return Platform.select({
    ios: {
      shadowColor:   s.shadowColor,
      shadowOpacity: s.shadowOpacity,
      shadowRadius:  s.shadowRadius,
      shadowOffset:  s.shadowOffset,
    },
    android: { elevation: s.elevation },
    default: {},
  });
};
