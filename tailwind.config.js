/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
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
      keyframes: {
        point: {
          "0%": { transform: "translateX(0)", left: 0 },
          "50%": { transform: "translateX(-100%)", left: "-100%" },
          "100%": { transform: "translateX(0)", left: "0%" },
        },
      },
      animation: {
        point: "point 1s ease-in-out loop",
      },
    },
  },
  variants: {
    extend: {
      animation: ["group-hover"],
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
