import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} Lebanon`,
    short_name: SITE_NAME,
    description:
      "Premium safes, vault doors, fire-rated safes, and security solutions in Lebanon.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#c9a227",
    lang: "en-LB",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    id: SITE_URL,
  };
}
