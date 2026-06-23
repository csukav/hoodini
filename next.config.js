/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
    resolveAlias: {
      css: require.resolve("./app/globals.css"),
    },
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
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
