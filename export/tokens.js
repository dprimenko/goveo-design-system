/**
 * Goveo Design Tokens — plain JS (CommonJS / ESM compatible).
 * Identical shape to tokens.ts, without types. Use in plain-JS
 * projects or when you don't want to compile TS.
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
};

export const lightTheme = {
  bg: '#ffffff', bgElevated: '#f5f7f9', bgOverlay: 'rgba(84,84,84,0.5)',
  fg: '#292c32', fgMuted: '#585b61', fgSubtle: '#acaeb3',
  fgOnPrimary: '#ffffff', border: '#e9e9eb', borderStrong: '#c8cbce',
  accent: '#f96a3f', accentHover: '#eb5a2c',
};

export const darkTheme = {
  bg: '#000000', bgElevated: '#18181b', bgOverlay: 'rgba(84,84,84,0.5)',
  fg: '#ffffff', fgMuted: '#a1a1aa', fgSubtle: '#71717a',
  fgOnPrimary: '#ffffff', border: '#27272a', borderStrong: '#3f3f46',
  accent: '#f96a3f', accentHover: '#eb5a2c',
};

export const landingTheme = {
  bg: '#09090b', bgSoft: 'rgba(255,255,255,0.05)',
  bgSection: 'rgba(24,24,27,0.40)', border: 'rgba(255,255,255,0.10)',
  borderStrong: 'rgba(255,255,255,0.20)', fg: '#ffffff',
  fgMuted: '#a1a1aa', fgSubtle: '#71717a',
  accent: '#e98027', accentHover: '#d36d1d',
};

export const space = { 4:4, 8:8, 16:16, 24:24, 32:32, 40:40, 48:48, 64:64, 80:80, 96:96 };
export const radius = { 4:4, 8:8, 16:16, 24:32, pill:9999, cardXl:48, cardXxl:56, cardHero:64 };

export const fontFamily = { sans: 'Inter' };
export const fontWeight = {
  regular:'400', medium:'500', semibold:'600',
  bold:'700', extra:'800', black:'900',
};

export const type = {
  display1:  { fontSize: 40, lineHeight: 48 },
  display2:  { fontSize: 32, lineHeight: 40 },
  display3:  { fontSize: 24, lineHeight: 32 },
  heading:   { fontSize: 20, lineHeight: 24 },
  body:      { fontSize: 16, lineHeight: 24 },
  bodySmall: { fontSize: 14, lineHeight: 20 },
  caption:   { fontSize: 12, lineHeight: 16 },
};

export const poster = {
  base: { fontFamily:'Inter', fontStyle:'italic', fontWeight:'900',
          textTransform:'uppercase', letterSpacing:-0.02 },
  xl: { fontSize:64, letterSpacing:-1.5 },
  lg: { fontSize:48 }, md:{ fontSize:24 },
  sm: { fontSize:12, letterSpacing:1.8 },
  xs: { fontSize:10, letterSpacing:2 },
};

export const breakpoint = {
  mobileXs:375, mobile:480, mobileMax:768, tablet:1024, desktop:1440,
};

export const shadow = {
  app:'0 1px 2px rgba(0,0,0,0.06)',
  orange:'0 0 50px rgba(233,128,39,0.15)',
  orangeCta:'0 4px 15px rgba(233,128,39,0.4)',
  platinum:'0 0 60px rgba(233,128,39,0.25)',
  textOrange:'0 0 20px rgba(233,128,39,0.5)',
};

export const rnShadow = {
  app:        { shadowColor:'#000',     shadowOpacity:0.06, shadowRadius:2,  shadowOffset:{width:0,height:1}, elevation:1 },
  orange:     { shadowColor:'#e98027',  shadowOpacity:0.15, shadowRadius:50, shadowOffset:{width:0,height:0}, elevation:8 },
  orangeCta:  { shadowColor:'#e98027',  shadowOpacity:0.4,  shadowRadius:15, shadowOffset:{width:0,height:4}, elevation:6 },
};

export const zIndex = { header:8, bottomBar:9, modal:10 };

export const tokens = {
  colors, light:lightTheme, dark:darkTheme, landing:landingTheme,
  space, radius, fontFamily, fontWeight, type, poster,
  breakpoint, shadow, rnShadow, zIndex,
};
export default tokens;
