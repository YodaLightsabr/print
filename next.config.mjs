/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/:slug(\\w{5})",
      destination: "/files/:slug",
      permanent: false
    }
  ]
};

export default nextConfig;
