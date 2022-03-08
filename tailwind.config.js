module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        translateOpacity: {
          '0%': { opacity:'0' },
          '70%':{transform: 'translateY(30px)',opacity:'0'},
          '80%':{opacity:'0.3'},
          '100%': { transform: 'translateY(0px)',opacity:'1' },
        },
        slideOpacity: {
          '0%': { opacity:'0' },
          '100%':{opacity:'1' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 