/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      mobile: "375px",
      desktop: "744px",
    },
    extend: {
      colors: {
        primary: "",
        secondary: "",
      },
      backgroundImage: (theme) => ({
        "logo-primary": "url()",
      }),
    },
  },
  plugins: [require("flowbite/plugin")],
};
