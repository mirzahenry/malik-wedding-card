/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFDF7',
        champagne: '#D4AF6A',
        'soft-gold': '#E8D3A8',
        emerald: '#123C35',
        'dark-text': '#24332F',
        beige: '#F5EFE3',
        'gold-light': '#F0E0B0',
        'gold-dark': '#B8922A',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'petal-fall': 'petalFall 8s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'gold-glow': 'goldGlow 3s ease-in-out infinite',
        'line-draw': 'lineDraw 2s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        goldGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212,175,106,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212,175,106,0.6), 0 0 40px rgba(212,175,106,0.2)' },
        },
        lineDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, #D4AF6A 0%, #F0E0B0 40%, #D4AF6A 60%, #B8922A 100%)',
        'ivory-texture': "url('/textures/paper.png')",
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
