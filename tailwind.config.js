/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        terracota: '#C84B31',
        sol: '#ECB365',
        oceano: '#2D6E7E',
        creme: '#FFF7EC',
        carvao: '#2B2B2B',
        salvia: '#7FA98C'
      },
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};
