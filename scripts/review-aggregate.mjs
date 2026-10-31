/** Un repli tiers ne doit pas écraser un total obtenu directement sur Maps. */
export function shouldKeepMapsAggregate(snapshot) {
  return snapshot?.source === "google-maps-browser" &&
    Number.isFinite(snapshot.rating) && snapshot.rating >= 1 && snapshot.rating <= 5 &&
    Number.isInteger(snapshot.reviewCount) && snapshot.reviewCount > 0;
}
