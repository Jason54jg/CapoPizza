import { spawn } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google-reviews";
import {
  parseGoogleRatingFromHtml,
  RANKEAT_CAPO_URL,
} from "@/lib/parse-google-rating";

export const dynamic = "force-dynamic";

const STALE_MS = 6 * 60 * 60 * 1000; // 6 h
const DATA_PATH = resolve(process.cwd(), "data/google-reviews.json");

let scrapeRunning = false;

function readDiskSnapshot() {
  if (!existsSync(DATA_PATH)) return getGoogleReviews();
  try {
    return JSON.parse(readFileSync(DATA_PATH, "utf8"));
  } catch {
    return getGoogleReviews();
  }
}

function isStale(updatedAt: string | null | undefined) {
  if (!updatedAt) return true;
  const t = Date.parse(updatedAt);
  if (!Number.isFinite(t)) return true;
  return Date.now() - t > STALE_MS;
}

/** Lance le scrape navigateur en arrière-plan (ne bloque pas la réponse). */
function kickoffBrowserScrape() {
  if (scrapeRunning) return;
  scrapeRunning = true;
  const child = spawn(
    process.execPath,
    ["scripts/fetch-google-reviews.mjs"],
    {
      cwd: process.cwd(),
      env: { ...process.env, SKIP_BROWSER_REVIEWS: "0" },
      stdio: "ignore",
      detached: true,
      windowsHide: true,
    },
  );
  child.unref();
  child.on("exit", () => {
    scrapeRunning = false;
  });
  // Sécurité si le process ne se termine pas
  setTimeout(() => {
    scrapeRunning = false;
  }, 5 * 60 * 1000);
}

/** Live — disponible en local (`next dev` / `next start`). */
export async function GET() {
  const disk = readDiskSnapshot();
  const fallback = getGoogleReviews();

  // Note fraîche depuis Rankeat (rapide, sans navigateur)
  let rating = typeof disk.rating === "number" ? disk.rating : fallback.rating;
  let reviewCount =
    typeof disk.reviewCount === "number"
      ? disk.reviewCount
      : fallback.reviewCount;

  try {
    const res = await fetch(RANKEAT_CAPO_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; CapoPizzaSite/1.0; +https://github.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });
    if (res.ok) {
      const html = await res.text();
      const parsed = parseGoogleRatingFromHtml(html);
      if (parsed) {
        rating = parsed.rating;
        reviewCount = parsed.reviewCount;
      }
    }
  } catch {
    /* garder snapshot */
  }

  if (isStale(disk.updatedAt) || !disk.reviews?.length) {
    kickoffBrowserScrape();
  }

  return NextResponse.json({
    rating,
    reviewCount,
    placeId: disk.placeId ?? fallback.placeId,
    mapsUrl: disk.mapsUrl || fallback.mapsUrl,
    updatedAt: disk.updatedAt ?? new Date().toISOString(),
    source: disk.source || fallback.source,
    reviews: Array.isArray(disk.reviews) ? disk.reviews : fallback.reviews,
    scrapeQueued: scrapeRunning || isStale(disk.updatedAt),
  });
}
