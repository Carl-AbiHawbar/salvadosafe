import type { NextConfig } from "next";

const useLocalCacheDir = !process.env.VERCEL;

const nextConfig: NextConfig = {
  // Custom distDir only for local Windows dev (Application Control blocks .next/ writes).
  // Vercel must use the default ".next" output directory.
  ...(useLocalCacheDir ? { distDir: "node_modules/.cache/salvado-next" } : {}),
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/api/admin/content/:file",
        destination: "/api/admin/json?file=:file",
      },
    ];
  },
};

export default nextConfig;
