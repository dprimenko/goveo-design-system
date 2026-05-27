/**
 * Goveo Design Tokens — TypeScript / JavaScript
 *
 * Works in React Native, React, Astro islands, plain JS, anywhere.
 * All sizes are NUMBERS (in dp / px), so they drop straight into
 * React Native StyleSheet without unit conversion.
 *
 * import { tokens, type Tokens } from './tokens';
 */

export const colors = {
  primary: {
    50:  '#fff3f0', 100: '#ffe4dd', 200: '#ffc8bb', 300: '#ffa38e',
    400: '#ff7d5e', 500: '#f96a3f', 600: '#f26134', 700: '#eb5a2c',
    800: '#d44d23', 900: '#b33d1a', 950: '#7c2610',
  },
  naranja: { goveo: '#e98027', dark: '#d36d1d' },
  neutral: {
    100: '#f5f7f9', 200: '#e9e9eb', 300: '#c8cbce', 400: '#acaeb3',
    500: '#8a8f94', 600: '#585b61', 700: '#585b61', 800: '#3b3f48',
    900: '#292c32',
  },
  zinc: {
    400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46',
    800: '#27272a', 900: '#18181b', 950: '#09090b',
  },
  basic: { white: '#ffffff', black: '#000000' },
} as const;

/** Semantic colors — light app surface (default) */
export const lightTheme = {
  bg:          colors.basic.white,
  bgElevated:  colors.neutral[100],
  bgOverlay:   'rgba(84,84,84,0.5)',
  fg:          colors.neutral[900],
  fgMuted:     colors.neutral[600],
  fgSubtle:    colors.neutral[400],
  fgOnPrimary: colors.basic.white,
  border:      colors.neutral[200],
  borderStrong:colors.neutral[300],
  accent:      colors.primary[500],
  accentHover: colors.primary[700],
} as const;

/** Semantic colors — dark app surface (in-app dark mode) */
export const darkTheme = {
  bg:          colors.basic.black,
  bgElevated:  colors.zinc[900],
  bgOverlay:   'rgba(84,84,84,0.5)',
  fg:          colors.basic.white,
  fgMuted:     colors.zinc[400],
  fgSubtle:    colors.zinc[500],
  fgOnPrimary: colors.basic.white,
  border:      colors.zinc[800],
  borderStrong:colors.zinc[700],
  accent:      colors.primary[500],
  accentHover: colors.primary[700],
} as const;

/** Semantic colors — landing / marketing dark surface (poster aesthetic) */
export const landingTheme = {
  bg:            colors.zinc[950],
  bgSoft:        'rgba(255,255,255,0.05)',
  bgSection:     'rgba(24,24,27,0.40)',
  border:        'rgba(255,255,255,0.10)',
  borderStrong:  'rgba(255,255,255,0.20)',
  fg:            colors.basic.white,
  fgMuted:       colors.zinc[400],
  fgSubtle:      colors.zinc[500],
  accent:        colors.naranja.goveo,
  accentHover:   colors.naranja.dark,
} as const;

/** Spacing scale in px / dp (numbers, NOT rem). Keys match the rem unit they replace. */
export const space = {
  4: 4, 8: 8, 16: 16, 24: 24, 32: 32,
  40: 40, 48: 48, 64: 64, 80: 80, 96: 96,
} as const;

/** Corner radii in px / dp. `pill` = anything > height/2 to be fully rounded. */
export const radius = {
  4: 4,
  8: 8,
  16: 16,
  24: 32,
  pill: 9999,
  cardXl:  48,
  cardXxl: 56,
  cardHero:64,
} as const;

export const fontFamily = {
  /* React Native: load 'Inter' via expo-font / Font.loadAsync.
     Web: loaded from Google Fonts in tokens.css. */
  sans: 'Inter',
} as const;

export const fontWeight = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
  extra:    '800',
  black:    '900',
} as const;

/** Type scale — size & lineHeight in px / dp. */
export const type = {
  display1:  { fontSize: 40, lineHeight: 48 },
  display2:  { fontSize: 32, lineHeight: 40 },
  display3:  { fontSize: 24, lineHeight: 32 },
  heading:   { fontSize: 20, lineHeight: 24 },
  body:      { fontSize: 16, lineHeight: 24 },
  bodySmall: { fontSize: 14, lineHeight: 20 },
  caption:   { fontSize: 12, lineHeight: 16 },
} as const;

/** Poster type — the landing's italic-uppercase-900 hero treatment.
 *  React Native equivalent (no italic-900 in Inter? fall back to bold + italic). */
export const poster = {
  base: {
    fontFamily: fontFamily.sans,
    fontStyle: 'italic' as const,
    fontWeight: fontWeight.black,
    textTransform: 'uppercase' as const,
    letterSpacing: -0.02,
    lineHeight: undefined,
  },
  xl: { fontSize: 64, letterSpacing: -1.5 },
  lg: { fontSize: 48 },
  md: { fontSize: 24 },
  sm: { fontSize: 12, letterSpacing: 1.8 },
  xs: { fontSize: 10, letterSpacing: 2 },
} as const;

export const breakpoint = {
  mobileXs:  375,
  mobile:    480,
  mobileMax: 768,
  tablet:    1024,
  desktop:   1440,
} as const;

export const shadow = {
  /** App-chrome card shadow (web). RN-friendly version: see `rnShadow.app`. */
  app:        '0 1px 2px rgba(0,0,0,0.06)',
  orange:     '0 0 50px rgba(233,128,39,0.15)',
  orangeCta:  '0 4px 15px rgba(233,128,39,0.4)',
  platinum:   '0 0 60px rgba(233,128,39,0.25)',
  textOrange: '0 0 20px rgba(233,128,39,0.5)',
} as const;

/** React Native shadow objects (iOS) + elevation (Android). */
export const rnShadow = {
  app: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  orange: {
    shadowColor: '#e98027',
    shadowOpacity: 0.15,
    shadowRadius: 50,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  orangeCta: {
    shadowColor: '#e98027',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
} as const;

export const zIndex = {
  header:    8,
  bottomBar: 9,
  modal:     10,
} as const;

export const tokens = {
  colors,
  light: lightTheme,
  dark:  darkTheme,
  landing: landingTheme,
  space, radius, fontFamily, fontWeight, type, poster,
  breakpoint, shadow, rnShadow, zIndex,
} as const;

export type Tokens = typeof tokens;
export default tokens;
