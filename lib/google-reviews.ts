import reviewsData from "@/data/google-reviews.json";
import { BUSINESS } from "@/lib/business";

export type GoogleReviewItem = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string | null;
  profilePhotoUrl: string | null;
};

export type GoogleReviewsSnapshot = {
  rating: number;
  reviewCount: number;
  placeId: string | null;
  mapsUrl: string;
  updatedAt: string | null;
  reviewsUpdatedAt?: string | null;
  lastAttemptAt?: string | null;
  source: string;
  reviews: GoogleReviewItem[];
};

const FALLBACK: GoogleReviewsSnapshot = {
  rating: BUSINESS.googleRating,
  reviewCount: BUSINESS.googleReviewCount,
  placeId: "ChIJQ6K6DjCz7EcR54iI-g5TfHA",
  mapsUrl: BUSINESS.googleReviewsUrl,
  updatedAt: null,
  source: "fallback",
  reviews: [],
};

function normalizeReviews(raw: unknown): GoogleReviewItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const r = item as Record<string, unknown>;
      const author = typeof r.author === "string" ? r.author : "";
      const rating = Number(r.rating);
      const text = typeof r.text === "string" ? r.text : "";
      if (!author && !text) return null;
      if (!Number.isFinite(rating) || rating < 1) return null;
      return {
        author: author || "Client Google",
        rating,
        text,
        relativeTime:
          typeof r.relativeTime === "string" ? r.relativeTime : null,
        profilePhotoUrl:
          typeof r.profilePhotoUrl === "string" ? r.profilePhotoUrl : null,
      };
    })
    .filter((x): x is GoogleReviewItem => x !== null);
}

/** Snapshot build-time (fichier data/google-reviews.json). */
export function getGoogleReviews(): GoogleReviewsSnapshot {
  const data = reviewsData as Partial<GoogleReviewsSnapshot>;
  return {
    rating:
      typeof data.rating === "number" && data.rating > 0
        ? data.rating
        : FALLBACK.rating,
    reviewCount:
      typeof data.reviewCount === "number" && data.reviewCount > 0
        ? data.reviewCount
        : FALLBACK.reviewCount,
    placeId: data.placeId ?? FALLBACK.placeId,
    mapsUrl: data.mapsUrl || FALLBACK.mapsUrl,
    updatedAt: data.updatedAt ?? null,
    reviewsUpdatedAt: data.reviewsUpdatedAt ?? data.updatedAt ?? null,
    lastAttemptAt: data.lastAttemptAt ?? null,
    source: data.source || FALLBACK.source,
    reviews: normalizeReviews(data.reviews),
  };
}
