/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        primary: "#1D4ED8", 
        secondary: "#9333EA",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest"],
  },
}