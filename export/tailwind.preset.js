/**
 * Goveo · Tailwind CSS Preset
 *
 * Drop into your Astro project:
 *   // tailwind.config.mjs
 *   import goveo from './export/tailwind.preset.js';
 *   export default { presets: [goveo], content: ['./src/**\/*.{astro,tsx,ts,jsx,js}'] };
 *
 * Brings the full token palette to Tailwind utility classes:
 *   bg-primary-500, text-naranja-goveo, rounded-card-xl,
 *   font-poster, shadow-orange-cta, etc.
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50:'#fff3f0',100:'#ffe4dd',200:'#ffc8bb',300:'#ffa38e',
          400:'#ff7d5e',500:'#f96a3f',600:'#f26134',700:'#eb5a2c',
          800:'#d44d23',900:'#b33d1a',950:'#7c2610',
        },
        'naranja-goveo': '#e98027',
        'naranja-dark':  '#d36d1d',
        neutral: {
          100:'#f5f7f9',200:'#e9e9eb',300:'#c8cbce',400:'#acaeb3',
          500:'#8a8f94',600:'#585b61',700:'#585b61',800:'#3b3f48',
          900:'#292c32',
        },
      },
      fontFamily: {
        sans: ['Inter','system-ui','-apple-system','sans-serif'],
      },
      fontWeight: { black: '900' },
      fontSize: {
        display1: ['2.5rem',  { lineHeight: '3rem'    }],
        display2: ['2rem',    { lineHeight: '2.5rem'  }],
        display3: ['1.5rem',  { lineHeight: '2rem'    }],
        heading:  ['1.25rem', { lineHeight: '1.5rem'  }],
        body:     ['1rem',    { lineHeight: '1.5rem'  }],
        'body-sm':['0.875rem',{ lineHeight: '1.24rem' }],
        caption:  ['0.75rem', { lineHeight: '1rem'    }],
      },
      spacing: {
        4:  '0.25rem', 8:'0.5rem', 16:'1rem', 24:'1.5rem',
        32: '2rem', 40:'2.5rem', 48:'3rem', 64:'4rem',
        80: '5rem', 96:'6rem',
      },
      borderRadius: {
        4:'0.25rem', 8:'0.5rem', 16:'1rem', 24:'2rem',
        'card-xl': '3rem', 'card-xxl': '3.5rem', 'card-hero': '4rem',
      },
      boxShadow: {
        app:         '0 1px 2px rgba(0,0,0,0.06)',
        orange:      '0 0 50px rgba(233,128,39,0.15)',
        'orange-cta':'0 4px 15px rgba(233,128,39,0.4)',
        platinum:    '0 0 60px rgba(233,128,39,0.25)',
      },
      screens: {
        'mobile-xs': '375px', mobile: '480px', 'mobile-max':'768px',
        tablet: '1024px', desktop: '1440px',
      },
    },
  },
  plugins: [],
};
