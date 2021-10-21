module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#242526',
        accent: '#484a4d',
        'text-color': '#dadce1',
        'bg-hover': '#525357',
      },
      keyframes: {
        dropdown: {
          to: { transform: 'rotate(-180deg)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
