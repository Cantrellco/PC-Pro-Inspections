/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black canvas with layered elevated surfaces.
        ink: {
          DEFAULT: '#0a0a0b',
          50: '#1c1c20',
          100: '#151517',
          200: '#100f12',
          300: '#0c0c0e',
        },
        // Warm off-white for an editorial, premium feel.
        bone: {
          DEFAULT: '#f5f3ee',
          muted: '#c7c4bd',
          dim: '#928f88',
        },
        flag: {
          // Heritage palette: Old Glory crimson + navy, with legible soft tints.
          red: '#c8102e',
          redSoft: '#ef4a63',
          redDeep: '#9c0f26',
          navy: '#0a3161',
          navyLight: '#3a5fa8',
          navyDeep: '#061a33',
        },
        // Restrained antique-brass accent for hairlines, seals, fine detail.
        brass: {
          DEFAULT: '#c9a227',
          soft: '#e0c469',
          deep: '#8c6f18',
        },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'Cambria', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 10px 30px -12px rgba(0,0,0,0.7)',
        lift: '0 1px 0 rgba(255,255,255,0.07) inset, 0 28px 60px -20px rgba(0,0,0,0.75)',
        red: '0 10px 30px -10px rgba(200,16,46,0.55)',
        brass: '0 0 0 1px rgba(201,162,39,0.35)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};
