/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['links.papareact.com', 'api.dicebear.com'],
  },
};

module.exports = nextConfig;
