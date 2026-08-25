/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Folk woodblock on crushed-shell paper: four inks on one ground.
        paper: {
          DEFAULT: '#f4efe4', // shell paper
          deep: '#e9e1cf', // second sheet / ledger rows
          white: '#fbf8f1', // pinned label boxes
        },
        ink: {
          DEFAULT: '#111111', // black keyblock
          soft: '#2f2b27', // body copy
          mute: '#6b655c', // secondary copy (4.6:1 on paper)
          // Legacy aliases (dark-theme scale) — kept so untouched pages compile
          // during the redesign; do not use in new work.
          50: '#1c1c20',
          100: '#151517',
          200: '#100f12',
          300: '#0c0c0e',
        },
        red: {
          DEFAULT: '#c8102e',
          deep: '#9c0f26',
        },
        navy: {
          DEFAULT: '#0a3161',
          deep: '#061a33',
        },
        brass: {
          DEFAULT: '#b8952a',
          deep: '#8c6f18',
          pale: '#e8d9a8',
          // legacy alias
          soft: '#b8952a',
        },
        // Legacy aliases so not-yet-rewritten pages keep compiling.
        bone: { DEFAULT: '#2f2b27', muted: '#3a3632', dim: '#6b655c' },
        flag: {
          red: '#c8102e',
          redSoft: '#c8102e',
          redDeep: '#9c0f26',
          navy: '#0a3161',
          navyLight: '#0a3161',
          navyDeep: '#061a33',
        },
      },
      fontFamily: {
        display: ['"Anton"', '"Arial Narrow"', 'Impact', 'sans-serif'],
        condensed: ['"Barlow Condensed"', '"Arial Narrow"', 'sans-serif'],
        sans: ['"Barlow"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderWidth: {
        3: '3px',
      },
      transitionTimingFunction: {
        // "Register": snaps into place with a one-frame overshoot, like a block
        // landing on the paper.
        register: 'cubic-bezier(0.2, 1.35, 0.4, 1)',
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        register: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.985)' },
          '70%': { opacity: '1', transform: 'translateY(-2px) scale(1.005)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        register: 'register 0.42s cubic-bezier(0.2, 1.35, 0.4, 1) both',
        'fade-up': 'fade-up 0.35s cubic-bezier(0.2, 1.35, 0.4, 1) both',
        'fade-in': 'fade-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
