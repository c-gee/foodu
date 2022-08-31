/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: ["Urbanist_400Regular"],
        medium: ["Urbanist_500Medium"],
        semibold: ["Urbanist_600SemiBold"],
        bold: ["Urbanist_700Bold"]
      },
      fontSize: {
        tiny: ["8px", "11px"],
        xxs: ["10px", "13px"]
      },
      colors: {
        primary: "#1BAC4B",
        secondary: "#FFD300",
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E0E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121"
        },
        dark: {
          1: "#181A20",
          2: "#1F222A",
          3: "#35383F"
        }
      }
    }
  },
  plugins: []
};
