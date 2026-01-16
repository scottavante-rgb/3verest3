import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All components and utilities are in the apps/web directory
  // No external packages to transpile

  // Disable the Next.js dev indicator (N logo in bottom left)
  devIndicators: false,
};

export default nextConfig;
