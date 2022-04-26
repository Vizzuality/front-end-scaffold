/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');

const lineClamp = require('./lib/tailwind/line-clamp');
const styles = require('./styles.config');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./**/*.ts', './**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    ...styles,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [forms, lineClamp],
};
