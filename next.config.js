/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  swcMinify: false, // Disables the compiler's strict syntax checker
  output: 'standalone',
};
module.exports = nextConfig;
