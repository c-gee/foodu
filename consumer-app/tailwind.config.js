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
      }
    }
  },
  plugins: []
};
