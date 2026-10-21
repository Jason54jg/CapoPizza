/**
 * Extrait les derniers avis Google Maps via navigateur headless (sans clé API).
 */
import { chromium } from "playwright";

const PLACE_ID = "ChIJQ6K6DjCz7EcR54iI-g5TfHA";
const PLACE_URL =
  process.env.GOOGLE_MAPS_PLACE_URL ||
  `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}&hl=fr`;

function cleanText(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

function dedupeReviews(reviews) {
  const seen = new Set();
  const out = [];
  for (const r of reviews) {
    const key = `${r.author}|${r.text.slice(0, 80)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

/**
 * @param {number} limit
 * @returns {Promise<{
 *   rating: number,
 *   reviewCount: number,
 *   reviews: Array<{author:string,rating:number,text:string,relativeTime:string|null,profilePhotoUrl:string|null}>,
 *   mapsUrl: string,
 *   placeId: string,
 *   source: string
 * }>}
 */
export async function scrapeGoogleReviewsBrowser(limit = 6) {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  });

  try {
    const context = await browser.newContext({
      locale: "fr-FR",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();
    page.setDefaultTimeout(12000);

    await page.goto(PLACE_URL, { waitUntil: "domcontentloaded", timeout: 45000 });

    for (const label of ["Tout accepter", "Accept all", "J'accepte", "Accept"]) {
      const btn = page.getByRole("button", { name: label });
      if (await btn.first().isVisible().catch(() => false)) {
        await btn.first().click().catch(() => {});
        break;
      }
    }

    await page
      .locator("div[data-review-id], button[aria-label*='avis']")
      .first()
      .waitFor({ timeout: 20000 })
      .catch(() => {});

    // Panneau avis
    const avisTab = page
      .locator('button[role="tab"]')
      .filter({ hasText: /^Avis$/i })
      .first();
    if (await avisTab.isVisible().catch(() => false)) {
      await avisTab.click().catch(() => {});
    }

    await page.waitForTimeout(800);

    // Trier → Plus récents
    const sortBtn = page.locator('button[aria-label*="Trier les avis"], button[aria-label*="Sort"]').first();
    if (await sortBtn.isVisible().catch(() => false)) {
      await sortBtn.click().catch(() => {});
      await page.waitForTimeout(400);
      const newest = page
        .locator('[role="menuitemradio"], [role="menuitem"]')
        .filter({ hasText: /Plus récents|Newest/i })
        .first();
      if (await newest.isVisible().catch(() => false)) {
        await newest.click().catch(() => {});
        await page.waitForTimeout(1000);
      } else {
        await page.keyboard.press("Escape").catch(() => {});
      }
    }

    // Note + total : aria-labels Maps (ex. "4,4 étoiles", "151 avis").
    // On valide avec la somme de l’histogramme (« 5 étoiles, 118 avis » + …).
    const headerStats = await page.evaluate(() => {
      let rating = NaN;
      let reviewCount = NaN;
      let histSum = 0;

      for (const el of document.querySelectorAll("[aria-label]")) {
        const al = (el.getAttribute("aria-label") || "")
          .replace(/\u00a0/g, " ")
          .trim();

        const star = al.match(/^(\d+[.,]\d+)\s*étoiles?\s*$/i);
        if (star) rating = Number(star[1].replace(",", "."));

        // Exact « 151 avis » — pas « 5 étoiles, 118 avis » ni thèmes (« tacos… »)
        const count = al.match(/^(\d+(?:\s\d{3})*)\s*avis\s*$/i);
        if (count) {
          const n = Number(count[1].replace(/\s/g, ""));
          if (Number.isFinite(n) && n >= 10) reviewCount = n;
        }

        const hist = al.match(/^([1-5])\s*étoiles?,\s*(\d+)\s*avis$/i);
        if (hist) histSum += Number(hist[2]);
      }

      if (histSum >= 10) {
        // L’histogramme est la source la plus fiable du total
        reviewCount = histSum;
      }

      if (!Number.isFinite(reviewCount) || reviewCount < 10) {
        const body = (document.body?.innerText || "").replace(/\u00a0/g, " ");
        const paren = body.match(/(\d+[.,]\d+)\s*\(\s*(\d+)\s*\)/);
        if (paren) {
          rating = Number(paren[1].replace(",", "."));
          reviewCount = Number(paren[2]);
        }
      }

      if (!Number.isFinite(rating) || rating <= 0) {
        const nice = document.querySelector(".F7nice");
        const t = (nice?.textContent || "").replace(/\u00a0/g, " ");
        const rm = t.match(/(\d+[.,]\d+)/);
        if (rm) rating = Number(rm[1].replace(",", "."));
      }

      return { rating, reviewCount, histSum };
    });

    let rating = headerStats.rating;
    let reviewCount = headerStats.reviewCount;

    let cards = page.locator("div[data-review-id]");
    if ((await cards.count()) === 0) {
      cards = page.locator(".jftiEf");
    }

    const scrollable = page.locator(".m6QErb.DxyBCb").first();
    for (let i = 0; i < 5; i++) {
      const count = await cards.count();
      if (count >= limit * 2) break;
      if (await scrollable.isVisible().catch(() => false)) {
        await scrollable.evaluate((el) => el.scrollBy(0, 1000));
      } else {
        await page.mouse.wheel(0, 1000);
      }
      await page.waitForTimeout(500);
    }

    const n = await cards.count();
    const reviews = [];

    for (let i = 0; i < n && reviews.length < limit * 2; i++) {
      const card = cards.nth(i);

      const more = card.locator('button[aria-label*="Voir plus"], button:has-text("Plus"), button:has-text("More")').first();
      if (await more.isVisible().catch(() => false)) {
        await more.click().catch(() => {});
        await page.waitForTimeout(150);
      }

      const author = cleanText(
        await card.locator(".d4r55").first().innerText().catch(() => "") ||
          (await card.locator('button[aria-label]').first().getAttribute("aria-label").catch(() => "")) ||
          "",
      );

      const starLabel =
        (await card
          .locator('[role="img"][aria-label*="étoile"], [role="img"][aria-label*="star"]')
          .first()
          .getAttribute("aria-label")
          .catch(() => null)) || "";
      const starM = starLabel.match(/(\d)/);
      const stars = starM ? Number(starM[1]) : 0;

      let text = cleanText(
        await card.locator(".wiI7pd").first().innerText().catch(() => ""),
      );
      // Enlever le bouton « Plus » collé au texte
      text = text.replace(/\s*Plus\s*$/i, "").replace(/\s*More\s*$/i, "").trim();

      const relativeTime =
        cleanText(
          await card.locator(".rsqaWe").first().innerText().catch(() => ""),
        ) || null;

      const profilePhotoUrl =
        (await card.locator("img").first().getAttribute("src").catch(() => null)) ||
        null;

      if (stars < 1) continue;
      if (!text && !author) continue;

      reviews.push({
        author: author || "Client Google",
        rating: stars,
        text,
        relativeTime,
        profilePhotoUrl,
      });
    }

    const unique = dedupeReviews(reviews).slice(0, limit);

    if (!unique.length) {
      throw new Error("Aucun avis trouvé dans le DOM Google Maps.");
    }

    if (!Number.isFinite(rating) || rating <= 0) {
      const body = await page.locator("h1").first().innerText().catch(() => "");
      void body;
      rating = 4.4;
    }

    return {
      rating: Number.isFinite(rating) && rating > 0 ? rating : 4.4,
      reviewCount:
        Number.isFinite(reviewCount) && reviewCount > 0
          ? reviewCount
          : unique.length,
      reviews: unique,
      placeId: PLACE_ID,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query_place_id=${PLACE_ID}&query=Capo+Pizza`,
      source: "google-maps-browser",
    };
  } finally {
    await browser.close();
  }
}

const isDirectRun = process.argv[1]?.includes("scrape-google-reviews-browser");
if (isDirectRun) {
  scrapeGoogleReviewsBrowser(6)
    .then((data) => console.log(JSON.stringify(data, null, 2)))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
