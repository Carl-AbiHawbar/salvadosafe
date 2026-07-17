import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import {
  fetchGoogleReviewsSnapshot,
  GOOGLE_REVIEWS_CACHE_TAG,
} from "@/lib/google-reviews";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // If no secret is configured, allow only in non-production (local testing).
  if (!secret) return process.env.NODE_ENV !== "production";

  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  if (url.searchParams.get("secret") === secret) return true;

  return false;
}

async function refresh() {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    return {
      ok: false as const,
      error: "GOOGLE_PLACES_API_KEY is not set",
    };
  }

  const snapshot = await fetchGoogleReviewsSnapshot({ force: true });
  revalidateTag(GOOGLE_REVIEWS_CACHE_TAG, "max");
  revalidatePath("/");

  if (!snapshot) {
    return {
      ok: false as const,
      error: "Google Places API returned no review data",
    };
  }

  return {
    ok: true as const,
    rating: snapshot.rating,
    reviewCount: snapshot.reviewCount,
    reviewCards: snapshot.reviews.length,
    placeName: snapshot.placeName,
    fetchedAt: snapshot.fetchedAt,
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await refresh();
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

export async function POST(request: Request) {
  return GET(request);
}
