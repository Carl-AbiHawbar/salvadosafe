import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { SiteProvider } from "@/components/site-provider";
import { getFeaturedCategories, getSecondaryCategories } from "@/lib/catalog";
import { getSite } from "@/lib/site-server";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://salvadosafe.com"),
  title: {
    default: "Salvado Safe Lebanon | Premium Safes, Vaults and Security Solutions",
    template: "%s | Salvado Safe",
  },
  description:
    "Lebanon's leading showroom for high-security safes, fire-rated safes, vault doors, secure rooms, luxury safes, and cash-handling solutions. Certified products, European-standard installation, and premium after-sales support.",
  keywords: [
    "safe Lebanon", "safes Lebanon", "fireproof safe Lebanon", "vault Lebanon",
    "security safe Lebanon", "home safe Lebanon", "luxury safes Lebanon", "Salvado Safe",
  ],
  openGraph: {
    title: "Salvado Safe Lebanon | High-Security Safes and Vault Solutions",
    description:
      "Protect what matters most with Salvado Safe. Premium certified safes, vaults, and security solutions in Lebanon.",
    type: "website",
    url: "https://salvadosafe.com",
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
