/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primaryBgColor: "#FFF2DE",
        secondaryBgColor: "#FCDEAF",
        redColor: "#9D0C10",
        goldColor: "#CC9A2F",
        greyColor: "#6b7688",
        bgGold: "rgba(204, 154, 47, 0.5)"
      },
    },
  },
  plugins: [],
}