import "server-only";

const PLACE_ID = "ChIJa5L8Zes9HxUR_AvNpwcSnR0";

type GoogleReview = {
  author_name: string;
  relative_time_description: string;
  rating: number;
  text: string;
};

type GooglePlaceDetails = {
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
};

export type GoogleReviewsSnapshot = {
  rating: number;
  reviewCount: number;
  reviews: { name: string; when: string; text: string }[];
};

const REVALIDATE_SECONDS = 60 * 60 * 6;

export async function fetchGoogleReviewsSnapshot(): Promise<GoogleReviewsSnapshot | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  const placeId = process.env.GOOGLE_PLACE_ID ?? PLACE_ID;
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set(
    "fields",
    "rating,user_ratings_total,reviews.author_name,reviews.relative_time_description,reviews.rating,reviews.text",
  );
  url.searchParams.set("key", key);

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;

    const data = (await res.json()) as { result?: GooglePlaceDetails; status?: string };
    if (data.status !== "OK" || !data.result) return null;

    const { rating, user_ratings_total, reviews = [] } = data.result;
    if (rating == null || user_ratings_total == null) return null;

    return {
      rating,
      reviewCount: user_ratings_total,
      reviews: reviews
        .filter((r) => r.text?.trim() && r.rating >= 4)
        .map((r) => ({
          name: r.author_name,
          when: r.relative_time_description,
          text: r.text.trim(),
        })),
    };
  } catch {
    return null;
  }
}

const AVATAR_COLORS = [
  "bg-slate-600",
  "bg-indigo-600",
  "bg-rose-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-teal-600",
  "bg-violet-600",
  "bg-sky-600",
  "bg-orange-600",
  "bg-fuchsia-600",
  "bg-cyan-600",
  "bg-lime-600",
];

export function avatarColorForName(name: string, fallbackIndex = 0): string {
  let hash = fallbackIndex;
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i) * (i + 1)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[hash] ?? AVATAR_COLORS[0];
}

export function mergeReviewCards(
  curated: { name: string; when: string; text: string; color: string }[],
  google: GoogleReviewsSnapshot | null,
) {
  const seen = new Set<string>();
  const merged: { name: string; when: string; text: string; color: string }[] = [];

  const add = (review: { name: string; when: string; text: string; color: string }) => {
    const key = review.name.trim().toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    merged.push(review);
  };

  if (google) {
    google.reviews.forEach((r, i) =>
      add({
        ...r,
        color: avatarColorForName(r.name, i),
      }),
    );
  }

  curated.forEach(add);
  return merged;
}
