import type { NextConfig } from "next";
import { getLegacyRedirects } from "./lib/legacy-redirects";

const useLocalCacheDir = !process.env.VERCEL;

const nextConfig: NextConfig = {
  // Custom distDir only for local Windows dev (Application Control blocks .next/ writes).
  // Vercel must use the default ".next" output directory.
  ...(useLocalCacheDir ? { distDir: "node_modules/.cache/salvado-next" } : {}),
  turbopack: {},
  async redirects() {
    return getLegacyRedirects();
  },
};

export default nextConfig;
