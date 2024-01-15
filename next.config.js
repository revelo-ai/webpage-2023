/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://revelo-web.b-cdn.net"
      : undefined,
};

export default nextConfig;
