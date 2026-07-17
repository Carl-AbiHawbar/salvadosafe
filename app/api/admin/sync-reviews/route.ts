import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import {
  fetchGoogleReviewsSnapshot,
  GOOGLE_REVIEWS_CACHE_TAG,
} from "@/lib/google-reviews";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    return NextResponse.json(
      {
        error:
          "GOOGLE_PLACES_API_KEY is not set. Add it in Vercel Environment Variables (Places API enabled).",
      },
      { status: 503 },
    );
  }

  const snapshot = await fetchGoogleReviewsSnapshot({ force: true });
  revalidateTag(GOOGLE_REVIEWS_CACHE_TAG, "max");
  revalidatePath("/");

  if (!snapshot) {
    return NextResponse.json(
      { error: "Google Places API returned no review data. Check Place ID and API key restrictions." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    rating: snapshot.rating,
    reviewCount: snapshot.reviewCount,
    reviewCards: snapshot.reviews.length,
    placeName: snapshot.placeName,
    fetchedAt: snapshot.fetchedAt,
    reviews: snapshot.reviews,
  });
}
