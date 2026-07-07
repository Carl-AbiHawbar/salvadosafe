import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { SiteProvider } from "@/components/site-provider";
import { GoogleTags } from "@/components/google-tags";
import { getFeaturedCategories, getSecondaryCategories } from "@/lib/catalog";
import { getSite } from "@/lib/site-server";
import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_URL, absoluteImageUrl } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const defaultDescription =
  "Lebanon's leading showroom for high-security safes, fire-rated safes, vault doors, secure rooms, luxury safes, and cash-handling solutions. Certified products, European-standard installation, and premium after-sales support in Zalka, Lebanon.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Salvado Safe Lebanon | Premium Safes, Vaults and Security Solutions",
    template: "%s | Salvado Safe",
  },
  description: defaultDescription,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: "Salvado Safe", url: SITE_URL }],
  creator: "Salvado Safe",
  publisher: "Salvado Safe",
  alternates: { canonical: `${SITE_URL}/` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Salvado Safe Lebanon | High-Security Safes and Vault Solutions",
    description: defaultDescription,
    type: "website",
    url: SITE_URL,
    siteName: "Salvado Safe",
    locale: "en_LB",
    images: [{ url: absoluteImageUrl(DEFAULT_OG_IMAGE)!, width: 1200, height: 630, alt: "Salvado Safe showroom in Zalka, Lebanon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salvado Safe Lebanon | Premium Safes and Vaults",
    description: defaultDescription,
    images: [absoluteImageUrl(DEFAULT_OG_IMAGE)!],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSite();
  const featuredCategories = getFeaturedCategories();
  const secondaryCategories = getSecondaryCategories();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <head>
        <GoogleTags />
      </head>
      <body className="flex min-h-full flex-col bg-white">
        <SiteProvider site={site}>
          <SiteShell featuredCategories={featuredCategories} secondaryCategories={secondaryCategories}>
            {children}
          </SiteShell>
        </SiteProvider>
      </body>
    </html>
  );
}
