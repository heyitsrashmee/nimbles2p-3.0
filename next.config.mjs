/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.wordpress.com" },
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
};

export default nextConfig;
