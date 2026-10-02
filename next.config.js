/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The contact page was replaced by the form on the home page
    return [
      {
        source: "/contact-us",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/:locale(en|sl)/contact-us",
        destination: "/:locale#contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
