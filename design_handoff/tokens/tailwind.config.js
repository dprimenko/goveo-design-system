/** @type {import('tailwindcss').Config} */
/**
 * Goveo Design System — Tailwind config v1.1
 *
 * Drop-in replacement for goveo-expo/tailwind.config.js.
 * Superset of the current config; the existing primary/neutral palette
 * is preserved (no breaking changes), just expanded.
 *
 * After replacing, run `npx expo start --clear` to flush NativeWind cache.
 */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './modules/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff3f0',
          100: '#ffe4dd',
          200: '#ffc8bb',
          300: '#ffa38e',
          400: '#ff7d5e',
          500: '#f96a3f',
          600: '#f26134',
          700: '#eb5a2c',
          DEFAULT: '#eb5a2c',
          800: '#d44d23',
          900: '#b33d1a',
          950: '#7c2610',
        },
        neutral: {
          100: '#F5F7F9',
          200: '#E9E9EB',
          300: '#C8CBCE',
          400: '#ACAEB3',
          500: '#8A8F94',
          600: '#585B61',
          700: '#585B61',
          800: '#3B3F48',
          900: '#292C32',
        },
        zinc: {
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        // Landing surface tokens (when the RN app needs marketing-style screens)
        'naranja-goveo': '#e98027',
        'naranja-dark':  '#d36d1d',
      },
      fontFamily: {
        // Inter weights are loaded in app/_layout.tsx via @expo-google-fonts/inter
        sans: ['Inter_400Regular', 'system-ui', 'sans-serif'],
        'sans-medium':   ['Inter_500Medium'],
        'sans-semibold': ['Inter_600SemiBold'],
        'sans-bold':     ['Inter_700Bold'],
        'sans-extra':    ['Inter_800ExtraBold'],
      },
      fontSize: {
        display1: ['40px', { lineHeight: '48px' }],
        display2: ['32px', { lineHeight: '40px' }],
        display3: ['24px', { lineHeight: '32px' }],
        heading:  ['20px', { lineHeight: '24px' }],
        body:     ['16px', { lineHeight: '24px' }],
        'body-sm':['14px', { lineHeight: '20px' }],
        caption:  ['12px', { lineHeight: '16px' }],
      },
      spacing: {
        4:  '4px',  8:  '8px',  16: '16px', 24: '24px',
        32: '32px', 40: '40px', 48: '48px', 64: '64px',
        80: '80px', 96: '96px',
      },
      borderRadius: {
        4:  '4px',  8:  '8px',  16: '16px', 24: '32px',
        'card-xl':   '48px',
        'card-xxl':  '56px',
        'card-hero': '64px',
        pill: '9999px',
      },
      boxShadow: {
        app:         '0 1px 2px rgba(0,0,0,0.06)',
        orange:      '0 0 50px rgba(233,128,39,0.15)',
        'orange-cta':'0 4px 15px rgba(233,128,39,0.4)',
      },
    },
  },
  plugins: [],
};
