/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We can add custom colors and utilities specific to wave visualization
      colors: {
        'wave': {
          'primary': '#999',
          'progress': '#555'
        }
      }
    },
  },
  plugins: [],
}
