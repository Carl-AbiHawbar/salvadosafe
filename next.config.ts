import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid .next/ on drives where Application Control blocks trace writes
  distDir: "node_modules/.cache/salvado-next",
};

export default nextConfig;
