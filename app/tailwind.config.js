/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
    },
  },
  variants: {
    extend: {
      opacity: [
        "disabled"
      ],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
