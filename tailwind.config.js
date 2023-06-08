/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const typography = require('@tailwindcss/typography');

/**
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    './src/components/**/*.@(tsx|ts)',
    './src/containers/**/*.@(tsx|ts)',
    // Remove this line if the documentation is not used
    './src/doc-containers/**/*.@(tsx|ts)',
    './src/layouts/**/*.@(tsx|ts)',
    './src/pages/**/*.@(tsx|ts)',
  ],
  plugins: [forms, lineClamp, typography],
};
