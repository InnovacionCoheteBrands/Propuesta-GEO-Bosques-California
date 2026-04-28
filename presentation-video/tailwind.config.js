/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1E3D2F', // Deep Forest Green (Primary)
        sage: '#8F9B86', // Lighter Sage/Olive (Secondary)
        gold: '#C5A059', // Soft Gold/Sand (Accent)
        'off-white': '#F5F5F0', // Warm Alabaster (Background)
        'text-main': '#2C332D', // Dark Green-Grey (Text)
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

