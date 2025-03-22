/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EAF2FC",
          100: "#D4E4F9",
          200: "#A9C9F3",
          300: "#7EAFED",
          400: "#5394E7",
          500: "#3366CC", // Main
          600: "#2A52A3",
          700: "#213D7A",
          800: "#182951",
          900: "#0F1428",
          950: "#080A14",
        },
        secondary: {
          50: "#E5F6F4",
          100: "#CCECE9",
          200: "#99D9D3",
          300: "#66C5BD",
          400: "#33B2A7",
          500: "#009688", // Main
          600: "#00786C",
          700: "#005A50",
          800: "#003C34",
          900: "#001E1A",
          950: "#000F0D",
        },
        accent: {
          50: "#FFF4E5",
          100: "#FFE9CC",
          200: "#FFD399",
          300: "#FFBD66",
          400: "#FFA733",
          500: "#FF9800", // Main
          600: "#CC7A00",
          700: "#995B00",
          800: "#663D00",
          900: "#331E00",
          950: "#190F00",
        },
        success: {
          50: "#E8F5E9",
          100: "#D0EAD3",
          200: "#A1D5A7",
          300: "#72C07B",
          400: "#43AB4F",
          500: "#4CAF50", // Main
          600: "#3D8A40",
          700: "#2E6830",
          800: "#1F4620",
          900: "#102310",
          950: "#081208",
        },
        warning: {
          50: "#FFF8E1",
          100: "#FFEDB3",
          200: "#FFDB66",
          300: "#FFC733",
          400: "#FFB300",
          500: "#FFC107", // Main
          600: "#CC9A00",
          700: "#997300",
          800: "#664C00",
          900: "#332600",
          950: "#191300",
        },
        error: {
          50: "#FDECEA",
          100: "#F9D6D3",
          200: "#F3ADA7",
          300: "#ED857B",
          400: "#E75C4F",
          500: "#F44336", // Main
          600: "#C3362B",
          700: "#92291F",
          800: "#621C14",
          900: "#310E0A",
          950: "#180705",
        },
        info: {
          50: "#E8F4FD",
          100: "#D1E9FB",
          200: "#A3D3F7",
          300: "#75BDF3",
          400: "#47A7EF",
          500: "#2196F3", // Main
          600: "#1B78C2",
          700: "#155A92",
          800: "#0E3C61",
          900: "#071E31",
          950: "#030F18",
        },
        text: {
          main: "#212121",
          body: "#4F4F4F",
        },
        background: {
          main: "#F9FAFB",
          card: "#FFFFFF",
        },
        border: {
          main: "#E0E0E0",
        },
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"], // For headlines & branding
        secondary: ["Roboto", "sans-serif"], // For body text & descriptions
        accent: ["Space Grotesk", "sans-serif"], // For emphasis & decorative use
      },
    },
  },
  plugins: [],
};
