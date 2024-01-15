/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? "https://revelo-web.b-cdn.net" : undefined,
};

export default nextConfig;
