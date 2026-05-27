/**
 * Goveo color tokens — RN/TS module.
 * Don't edit by hand — sync from `tokens/tokens.json`.
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

/** Semantic — app light surface (chrome). */
export const light = {
  bg:           colors.basic.white,
  bgElevated:   colors.neutral[100],
  bgOverlay:    'rgba(84,84,84,0.5)',
  fg:           colors.neutral[900],
  fgMuted:      colors.neutral[600],
  fgSubtle:     colors.neutral[400],
  fgOnPrimary:  colors.basic.white,
  border:       colors.neutral[200],
  borderStrong: colors.neutral[300],
  accent:       colors.primary[500],
  accentHover:  colors.primary[700],
} as const;

/** Semantic — landing dark surface (marketing). */
export const landing = {
  bg:           colors.zinc[950],
  bgSoft:       'rgba(255,255,255,0.05)',
  border:       'rgba(255,255,255,0.10)',
  borderStrong: 'rgba(255,255,255,0.20)',
  fg:           colors.basic.white,
  fgMuted:      colors.zinc[400],
  fgSubtle:     colors.zinc[500],
  accent:       colors.naranja.goveo,
  accentHover:  colors.naranja.dark,
} as const;
