/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fef6ee",
          100: "#fdead7",
          200: "#f9d2af",
          300: "#f5b27c",
          400: "#f18c4d",
          500: "#ed6822",
          600: "#de4f18",
          700: "#b83a16",
          800: "#933019",
          900: "#762a18",
          950: "#40120a",
        },
        slate: {
          50: "#f6f6f9",
          100: "#ecedf2",
          200: "#d4d6e3",
          300: "#aeb1cb",
          400: "#8389ad",
          500: "#636a94",
          600: "#4f547a",
          700: "#404364",
          800: "#383b54",
          900: "#35374c",
          950: "#212230",
        },
      },
      fontFamily: {
        primary: ["sofia-pro", "sans-serif"],
        rounded: ["sofia-pro-soft", "sans-serif"],
      },
      ringColor: {
        DEFAULT: "#f18c4d",
      },
    },
  },
  plugins: [],
};