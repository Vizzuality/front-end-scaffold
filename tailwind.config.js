/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');

const lineClamp = require('./lib/tailwind/line-clamp');

module.exports = {
  content: ['./components/**/*.@(tsx|ts)', './containers/**/*.@(tsx|ts)', './pages/**/*.tsx'],
  plugins: [forms, lineClamp],
};
