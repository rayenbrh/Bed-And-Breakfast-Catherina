/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['Cinzel', 'Georgia', 'serif'],
      },
      colors: {
        terracotta: {
          DEFAULT: '#C8724A',
          light: '#D4895F',
        },
        ink: {
          DEFAULT: '#1A1208',
          muted: '#6B5B4E',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          soft: '#F5EFE6',
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(180, 120, 80, 0.15)',
        glow: '0 0 24px rgba(200, 114, 74, 0.35)',
      },
      borderRadius: {
        card: '20px',
        image: '16px',
        icon: '18px',
      },
      spacing: {
        18: '4.5rem',
      },
      animation: {
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}
