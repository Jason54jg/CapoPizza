/** Parse note + nombre d’avis depuis le HTML Rankeat (JSON-LD schema.org). */

export type ParsedGoogleRating = {
  rating: number;
  reviewCount: number;
};

export const RANKEAT_CAPO_URL =
  "https://rankeat.fr/restaurants/capo-pizza-neufchateau";

function pickAggregate(
  node: unknown,
): { ratingValue?: unknown; reviewCount?: unknown; ratingCount?: unknown } | null {
  if (!node || typeof node !== "object") return null;
  const obj = node as Record<string, unknown>;
  if (obj.aggregateRating && typeof obj.aggregateRating === "object") {
    return obj.aggregateRating as {
      ratingValue?: unknown;
      reviewCount?: unknown;
      ratingCount?: unknown;
    };
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = pickAggregate(item);
      if (found) return found;
    }
  }
  return null;
}

/** Extrait aggregateRating Capo Pizza depuis les blocs application/ld+json. */
export function parseGoogleRatingFromHtml(html: string): ParsedGoogleRating | null {
  const blocks = [
    ...html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];

  for (const m of blocks) {
    try {
      const data = JSON.parse(m[1]) as unknown;
      const agg = pickAggregate(data);
      if (!agg) continue;

      const rating = Number(agg.ratingValue);
      const reviewCount = Number(agg.reviewCount ?? agg.ratingCount);
      if (
        Number.isFinite(rating) &&
        rating >= 1 &&
        rating <= 5 &&
        Number.isFinite(reviewCount) &&
        reviewCount > 0
      ) {
        return { rating, reviewCount };
      }
    } catch {
      /* bloc JSON invalide */
    }
  }

  // Repli texte (onglet « Avis Google » + note affichée)
  const countMatch =
    html.match(/Avis Google\s*<em>(\d+)<\/em>/i) ||
    html.match(/<b>(\d+)<\/b>\s*avis Google/i);
  const ratingMatch = html.match(
    /rk-reviews-summary[\s\S]{0,400}?(\d+[.,]\d+)/i,
  );
  if (countMatch) {
    const reviewCount = Number(countMatch[1]);
    const rating = ratingMatch
      ? Number(ratingMatch[1].replace(",", "."))
      : NaN;
    if (
      Number.isFinite(reviewCount) &&
      reviewCount > 0 &&
      Number.isFinite(rating) &&
      rating >= 1 &&
      rating <= 5
    ) {
      return { rating, reviewCount };
    }
  }

  return null;
}
