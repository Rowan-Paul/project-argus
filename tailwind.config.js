module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-dark": "#ffffff",
        "secondary-dark": "#7e52a0",
        "accent-dark": "#012a36",
        "primary-bg-dark": "#0b2027",
        "secondary-bg-dark": "#d295bf",

        "primary-light": "#000000",
        "secondary-light": "#d2e3ca",
        "accent-light": "#56cbf9",
        "primary-bg-light": "#ffffff",
        "secondary-bg-light": "#eee8ed",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
