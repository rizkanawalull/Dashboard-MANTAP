import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Ensure src directory is used
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default nextConfig;
