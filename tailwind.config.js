const aspectRatio = require('@tailwindcss/aspect-ratio');
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./**/*.ts', './**/*.tsx'],
  plugins: [aspectRatio, forms, lineClamp],
};
