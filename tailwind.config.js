module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      50: '50%',
    },
    extend: {
      colors: {
        background: '#242526',
        'bg-accent': '#484a4d',
        'text-color': '#dadce1',
        'bg-hover': '#525357',
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },
      minHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
        s50: '50vh',
      },
      gridTemplateColumns: {
        'grid-cols-auto ': 'repeat(auto-fill,minmax(165px,1fr));',
      },
      gridAutoColumns: {
        'auto-cols-10': 'minmax(165px,1fr)',
      },
      height: {
        65: '10.17rem',
        66: '13.97rem',
        67: '16.57rem',
        poster: '277.50px',
        'poster-90': '249px',
        'poster-3/4': '207px',
        'poster-1/2': '138px',
      },
      width: {
        poster: '185px',
        'poster-90': '166.5px',
        'poster-3/4': '138.75px',
        'poster-1/2': '92.5px',
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    scrollbar: ['dark', 'rounded'],
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
}
