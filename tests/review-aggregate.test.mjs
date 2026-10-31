import assert from "node:assert/strict";
import test from "node:test";
import { shouldKeepMapsAggregate } from "../scripts/review-aggregate.mjs";

test("une baisse Rankeat peut remplacer un ancien total Rankeat", () => {
  assert.equal(shouldKeepMapsAggregate({ source: "rankeat-page", rating: 4.4, reviewCount: 151 }), false);
});
test("le repli ne remplace pas un total Maps fiable, même par un total supérieur", () => {
  assert.equal(shouldKeepMapsAggregate({ source: "google-maps-browser", rating: 4.4, reviewCount: 151 }), true);
});
test("un total Maps invalide ne bloque pas le secours", () => {
  for (const reviewCount of [0, -1, NaN, 1.5]) {
    assert.equal(shouldKeepMapsAggregate({ source: "google-maps-browser", rating: 4.4, reviewCount }), false);
  }
  assert.equal(shouldKeepMapsAggregate(null), false);
});
