/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        popUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pop-up": "popUp 1s ease-out",
      },
      transitionProperty: { width: "width" },
      translate: { 70: "70%", 50: "50%" },
    },
  },
  plugins: [],
};
