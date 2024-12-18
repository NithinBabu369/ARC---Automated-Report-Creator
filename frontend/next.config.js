/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add this line to support Framer Motion
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': 'framer-motion/dist/framer-motion.es.js',
    };
    return config;
  },
}

module.exports = nextConfig