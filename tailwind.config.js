/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          50: '#1a1a1a',
          100: '#141414',
          200: '#0f0f0f',
        },
        bone: {
          DEFAULT: '#f5f5f4',
          muted: '#cfcfcd',
          dim: '#9a9a98',
        },
        flag: {
          red: '#d4263a',
          redSoft: '#ef4458',
          redDeep: '#a51d2d',
          navy: '#1d3a8a',
          navyLight: '#3358c4',
          navyDeep: '#0f234d',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 6px 24px rgba(0,0,0,0.45)',
        red: '0 4px 16px rgba(212,38,58,0.4)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
