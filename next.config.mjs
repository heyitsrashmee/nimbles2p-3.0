/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel project still has Output Directory = dist from the Vite setup.
  distDir: "dist",
};

export default nextConfig;
