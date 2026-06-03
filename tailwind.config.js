/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          gold: '#D4AF37',
          rose: '#E0115F',
          dark: '#0F0F0F',
          slate: '#1A1A1A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { 'text-shadow': '0 0 10px rgba(212, 175, 55, 0.5)' },
          '100%': { 'text-shadow': '0 0 20px rgba(212, 175, 55, 1), 0 0 30px rgba(224, 17, 95, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
