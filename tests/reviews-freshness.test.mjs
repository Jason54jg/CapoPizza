import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import * as url from "node:url";
import { SourceTextModule, SyntheticModule, createContext } from "node:vm";
import test from "node:test";

const scriptUrl = new URL("../scripts/fetch-google-reviews.mjs", import.meta.url);
const source = (await readFile(scriptUrl, "utf8")).replace(/main\(\);\s*$/, "await main();");
const oldDate = "2026-01-01T12:00:00.000Z";
const existing = {
  rating: 4.4,
  reviewCount: 151,
  updatedAt: oldDate,
  source: "google-maps-browser",
  reviews: [{ author: "Client", text: "Bon", rating: 5 }],
};

async function refresh({ saved = existing, rankeat = null, maps = null } = {}) {
  let output;
  const context = createContext({
    console: { log() {}, warn() {}, error() {} },
    process: { env: {}, exit(code) { throw new Error(`exit ${code}`); } },
    // Retries remain covered without waiting 15 seconds in an offline test.
    setTimeout(callback) { callback(); },
    fetch: async () => {
      if (!rankeat) throw new Error("offline");
      return { ok: true, text: async () => `<script type="application/ld+json">${JSON.stringify({ aggregateRating: rankeat })}</script>` };
    },
  });
  const modules = {
    "node:fs": {
      existsSync: () => saved !== null,
      readFileSync: () => JSON.stringify(saved),
      writeFileSync: (_file, contents) => { output = JSON.parse(contents); },
    },
    "node:path": { resolve: path.resolve, dirname: path.dirname },
    "node:url": { fileURLToPath: url.fileURLToPath },
    "./scrape-google-reviews-browser.mjs": {
      scrapeGoogleReviewsBrowser: async () => {
        if (!maps) throw new Error("offline");
        return maps;
      },
    },
  };
  const script = new SourceTextModule(source, {
    context,
    initializeImportMeta(meta) { meta.url = scriptUrl.href; },
  });
  await script.link(async (specifier) => {
    const exports = modules[specifier];
    if (!exports && specifier.startsWith("./")) {
      return new SourceTextModule(await readFile(new URL(specifier, scriptUrl), "utf8"), { context });
    }
    assert.ok(exports, `Unexpected module: ${specifier}`);
    return new SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await script.evaluate();
  return output;
}

test("un repli qui conserve Maps ne rajeunit ni le total ni les extraits", async () => {
  const result = await refresh({ rankeat: { ratingValue: 4.2, reviewCount: 96 } });
  assert.equal(result.updatedAt, oldDate);
  assert.equal(result.reviewsUpdatedAt, oldDate);
  assert.equal(result.source, existing.source);
  assert.equal(result.reviewCount, 151);
  assert.ok(Date.parse(result.lastAttemptAt) > Date.parse(oldDate));
});

test("un échec complet conserve la date réelle et enregistre la tentative", async () => {
  const result = await refresh();
  assert.equal(result.updatedAt, oldDate);
  assert.equal(result.rating, existing.rating);
  assert.deepEqual(result.reviews, existing.reviews);
  assert.ok(Date.parse(result.lastAttemptAt) > Date.parse(oldDate));
});

test("un nouveau total Rankeat ne change pas la date des extraits Maps conservés", async () => {
  const result = await refresh({ saved: { ...existing, source: "rankeat-page" }, rankeat: { ratingValue: 4.5, reviewCount: 160 } });
  assert.notEqual(result.updatedAt, oldDate);
  assert.equal(result.reviewsUpdatedAt, oldDate);
});

test("un succès Maps renouvelle le total et les extraits", async () => {
  const result = await refresh({ maps: { ...existing, source: "google-maps-browser", reviews: [{ author: "Nouveau", text: "Très bon", rating: 5 }] } });
  assert.notEqual(result.updatedAt, oldDate);
  assert.notEqual(result.reviewsUpdatedAt, oldDate);
  assert.equal(result.reviews[0].author, "Nouveau");
});

test("sans snapshot et sans réseau, aucune date de donnée n’est inventée", async () => {
  const result = await refresh({ saved: null });
  assert.equal(result.updatedAt, null);
  assert.equal(result.source, "fallback");
  assert.ok(Date.parse(result.lastAttemptAt));
});
