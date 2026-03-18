import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'cursive'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          red:    '#e63946',
          red2:   '#ff4d5a',
          green:  '#39d353',
          accent: '#ff6b35',
        },
        dark: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#181818',
          600: '#1e1e1e',
          500: '#252525',
          400: '#2a2a2a',
          300: '#333333',
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
        'fade-up':   'fadeUp 0.4s ease forwards',
        'blink':     'blink 0.5s ease-in-out infinite',
      },
      keyframes: {
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        fadeUp:   { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        blink:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at 70% 50%, rgba(230,57,70,0.15), transparent 60%)',
      },
    },
  },
  plugins: [],
}
export default config
