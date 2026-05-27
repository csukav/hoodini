/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // Disable Turbopack temporarily to avoid high CPU / freeze issues on some systems
  turbopack: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
