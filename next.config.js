/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "**.bonto.run",
      },
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
      },
    ],
  },
};

module.exports = nextConfig;
