import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid .next/ on drives where Application Control blocks trace writes
  distDir: "node_modules/.cache/salvado-next",
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
