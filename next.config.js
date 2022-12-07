/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://e-shop-server-z043.onrender.com/api/:path*`, // Proxy to Backend
      },
    ];
  },
};
