import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Disable strict mode to prevent double rendering
  // Ensure src directory is used
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default nextConfig;
