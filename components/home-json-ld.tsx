import { JsonLd } from "@/components/json-ld";
import { getPagesContent } from "@/lib/content";
import { fetchGoogleReviewsSnapshot } from "@/lib/google-reviews";
import {
  localBusinessSchema,
  organizationSchema,
  webSiteSchema,
} from "@/lib/seo";
import { getSite } from "@/lib/site-server";

function parseReviewCount(value: string | number): number {
  if (typeof value === "number") return value;
  const match = value.match(/\d[\d,]*/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}

export async function HomeJsonLd() {
  const site = getSite();
  const pages = getPagesContent();
  const meta = pages.reviewsMeta;
  const google = await fetchGoogleReviewsSnapshot();

  const ratingValue = google ? google.rating.toFixed(1) : meta.ratingValue ?? "5.0";
  const reviewCount = google?.reviewCount ?? parseReviewCount(meta.reviewCount);

  const description =
    "Lebanon's leading showroom for high-security safes, fire-rated safes, vault doors, secure rooms, luxury safes, and cash-handling solutions.";

  return (
    <JsonLd
      data={[
        organizationSchema({
          name: site.name,
          description,
          email: site.email,
          phone: site.phones.landline.tel,
          instagram: site.socials.instagram,
          facebook: site.socials.facebook,
        }),
        webSiteSchema(),
        localBusinessSchema({
          name: "Salvado Safes",
          description,
          address: site.address,
          email: site.email,
          phone: site.phones.landline.tel,
          mapsUrl: site.maps,
          ratingValue,
          reviewCount,
        }),
      ]}
    />
  );
}
