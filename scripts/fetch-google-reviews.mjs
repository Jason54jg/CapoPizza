/**
 * Rafraîchit data/google-reviews.json :
 * 1) avis + note via Google Maps (Playwright, sans clé API)
 * 2) repli note seule via page Rankeat
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { shouldKeepMapsAggregate } from "./review-aggregate.mjs";
import { scrapeGoogleReviewsBrowser } from "./scrape-google-reviews-browser.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../data/google-reviews.json");
const RANKEAT_URL =
  process.env.GOOGLE_REVIEWS_PAGE_URL ||
  "https://rankeat.fr/restaurants/capo-pizza-neufchateau";

const FALLBACK = {
  rating: 4.4,
  reviewCount: 151,
  placeId: "ChIJQ6K6DjCz7EcR54iI-g5TfHA",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query_place_id=ChIJQ6K6DjCz7EcR54iI-g5TfHA&query=Capo+Pizza",
  updatedAt: null,
  source: "fallback",
  reviews: [],
};

function readExisting() {
  if (!existsSync(OUT)) return null;
  try {
    return JSON.parse(readFileSync(OUT, "utf8"));
  } catch {
    return null;
  }
}

function pickAggregate(node) {
  if (!node || typeof node !== "object") return null;
  if (node.aggregateRating && typeof node.aggregateRating === "object") {
    return node.aggregateRating;
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = pickAggregate(item);
      if (found) return found;
    }
  }
  return null;
}

function parseGoogleRatingFromHtml(html) {
  const blocks = [
    ...html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  for (const m of blocks) {
    try {
      const data = JSON.parse(m[1]);
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
      /* ignore */
    }
  }
  return null;
}

function writeSnapshot(data) {
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(
    `[google-reviews] OK — ${data.rating}/5 · ${data.reviewCount} avis · ${data.reviews?.length ?? 0} extraits (${data.source})`,
  );
}

async function fetchRankeatRating() {
  const res = await fetch(RANKEAT_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; CapoPizzaSite/1.0; +https://github.com)",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) throw new Error(`Rankeat HTTP ${res.status}`);
  const html = await res.text();
  const parsed = parseGoogleRatingFromHtml(html);
  if (!parsed) throw new Error("Rankeat: parse impossible");
  return parsed;
}

// Maps time-out de temps en temps depuis les runners GitHub → on réessaie
// avant de se replier sur Rankeat.
async function scrapeWithRetry(attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      return await scrapeGoogleReviewsBrowser(3);
    } catch (err) {
      if (i >= attempts) throw err;
      console.warn(
        `[google-reviews] Tentative ${i}/${attempts} échouée:`,
        err.message || err,
      );
      await new Promise((r) => setTimeout(r, 5000 * i));
    }
  }
}

async function main() {
  const existing = readExisting();
  const skipBrowser = process.env.SKIP_BROWSER_REVIEWS === "1";

  if (!skipBrowser) {
    try {
      console.log("[google-reviews] Scraping Google Maps (navigateur)…");
      const scraped = await scrapeWithRetry();

      // Maps = source de vérité pour le total. Rankeat est souvent en retard
      // (ex. 96 alors que Maps affiche 151) → ne l’utiliser qu’en secours.
      let rating = scraped.rating;
      let reviewCount = scraped.reviewCount;
      const mapsCountOk =
        Number.isFinite(reviewCount) &&
        reviewCount > (scraped.reviews?.length ?? 0);

      if (!mapsCountOk || !Number.isFinite(rating) || rating <= 0) {
        try {
          const rk = await fetchRankeatRating();
          if (!Number.isFinite(rating) || rating <= 0) {
            rating = rk.rating || rating;
          }
          if (!mapsCountOk) {
            reviewCount = rk.reviewCount || reviewCount;
          }
        } catch {
          /* ignore */
        }
      }

      if (!Number.isFinite(reviewCount) || reviewCount <= 0) {
        reviewCount =
          existing?.reviewCount || FALLBACK.reviewCount;
      }

      writeSnapshot({
        rating,
        reviewCount,
        placeId: scraped.placeId,
        mapsUrl: scraped.mapsUrl,
        updatedAt: new Date().toISOString(),
        source: scraped.source,
        reviews: scraped.reviews,
      });
      return;
    } catch (err) {
      console.error(
        "[google-reviews] Navigateur échoué:",
        err.message || err,
      );
    }
  }

  try {
    const parsed = await fetchRankeatRating();
    // Maps reste prioritaire. Entre snapshots Rankeat, accepter aussi une baisse.
    const keepExisting = shouldKeepMapsAggregate(existing);
    writeSnapshot({
      rating: keepExisting ? existing.rating : parsed.rating,
      reviewCount: keepExisting ? existing.reviewCount : parsed.reviewCount,
      placeId: existing?.placeId ?? FALLBACK.placeId,
      mapsUrl: existing?.mapsUrl || FALLBACK.mapsUrl,
      updatedAt: new Date().toISOString(),
      source: "rankeat-page",
      reviews: existing?.reviews ?? [],
    });
  } catch (err) {
    console.error("[google-reviews] Échec Rankeat:", err.message || err);
    if (existing) {
      console.warn("[google-reviews] Conservation du snapshot précédent.");
      process.exit(0);
    }
    writeSnapshot(FALLBACK);
  }
}

main();
