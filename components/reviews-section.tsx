import { ReviewsCarousel } from "@/components/reviews";
import { getPagesContent } from "@/lib/content";
import { fetchGoogleReviewsSnapshot, mergeReviewCards } from "@/lib/google-reviews";
import { getSite } from "@/lib/site-server";

function parseReviewCount(value: string | number): number {
  if (typeof value === "number") return value;
  const match = value.match(/\d[\d,]*/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}

export async function ReviewsSection() {
  const pages = getPagesContent();
  const site = getSite();
  const google = await fetchGoogleReviewsSnapshot();

  const meta = pages.reviewsMeta;
  const fallbackCount = parseReviewCount(meta.reviewCount);
  const ratingValue = google ? google.rating.toFixed(1) : meta.ratingValue ?? "5.0";
  const reviewCount = google?.reviewCount ?? fallbackCount;
  const reviews = mergeReviewCards(pages.reviews, google);

  return (
    <ReviewsCarousel
      reviews={reviews}
      ratingValue={ratingValue}
      ratingLabel={meta.ratingLabel}
      reviewCount={reviewCount}
      mapsUrl={site.mapsReviews ?? site.maps}
    />
  );
}
