/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com"
      }
    ]
  }
};

module.exports = nextConfig;
