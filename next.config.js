const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  // ? https://github.com/vercel/next.js/issues/7755#issuecomment-812805708
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },

  // ? https://nextjs.org/docs/advanced-features/compiler#why-swc
  swcMinify: true,
  // ? https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  output: 'standalone',
};

module.exports = withPlugins(
  [
    withOptimizedImages({
      optimizeImages: false,
    }),
  ],
  nextConfig
);
