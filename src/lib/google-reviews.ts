// ============================================================================
// Live Google Business Profile rating + reviews (Places API (New))
// ============================================================================
//
// Server-only. Rating and review count are never typed into the site — they
// come from Google, cached for a day (ISR) so the number on the page equals
// the number on Maps. Without a key the helpers return null and every caller
// renders its no-data fallback (nothing typed, no dead links).
//
// Env (Vercel → Project → Settings → Environment Variables):
//   PLACES_API_KEY   server key restricted to "Places API (New)"
//   GOOGLE_PLACE_ID  optional — skips the text search when set

import { siteConfig } from "@/data/site";

const BASE = "https://places.googleapis.com/v1";
const REVALIDATE = 60 * 60 * 24; // seconds

export interface GoogleReview {
  id: string;
  author: string;
  authorUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
}

export interface GoogleRating {
  placeId: string;
  rating: number;
  reviewCount: number;
  mapsUrl: string | null;
  writeReviewUrl: string;
  reviews: GoogleReview[];
}

interface RawReview {
  name?: string;
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: { displayName?: string; uri?: string };
}

interface RawPlace {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: RawReview[];
}

const FIELDS = "id,rating,userRatingCount,googleMapsUri,reviews";

function toRating(raw: RawPlace): GoogleRating | null {
  if (!raw.id || typeof raw.rating !== "number") return null;
  const reviews: GoogleReview[] = (raw.reviews ?? [])
    .filter((r) => typeof r.rating === "number" && r.text?.text)
    .map((r, i) => ({
      id: r.name ?? `review-${i}`,
      author: r.authorAttribution?.displayName ?? "Google user",
      authorUrl: r.authorAttribution?.uri ?? null,
      rating: r.rating as number,
      text: r.text?.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime ?? "",
    }));
  return {
    placeId: raw.id,
    rating: raw.rating,
    reviewCount: raw.userRatingCount ?? 0,
    mapsUrl: raw.googleMapsUri ?? null,
    writeReviewUrl: `https://search.google.com/local/writereview?placeid=${raw.id}`,
    reviews,
  };
}

/**
 * The live rating for the business, or null when no key is configured or
 * Google could not identify the place. Never throws — a Places outage must
 * not take the page down.
 */
export async function getGoogleRating(): Promise<GoogleRating | null> {
  const key = process.env.PLACES_API_KEY;
  if (!key) return null;
  const placeId = process.env.GOOGLE_PLACE_ID;
  try {
    if (placeId) {
      const r = await fetch(`${BASE}/places/${encodeURIComponent(placeId)}`, {
        headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELDS },
        next: { revalidate: REVALIDATE },
      });
      if (!r.ok) return null;
      return toRating((await r.json()) as RawPlace);
    }
    const r = await fetch(`${BASE}/places:searchText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": FIELDS.split(",").map((f) => `places.${f}`).join(","),
      },
      body: JSON.stringify({ textQuery: siteConfig.google.placeQuery, maxResultCount: 1 }),
      next: { revalidate: REVALIDATE },
    });
    if (!r.ok) return null;
    const d = (await r.json()) as { places?: RawPlace[] };
    return d.places?.[0] ? toRating(d.places[0]) : null;
  } catch {
    return null;
  }
}
