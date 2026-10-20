import type { MenuCategoryId } from "./menu-types";

/**
 * Tarifs publics Capo Pizza (11 Rue de France, Neufchâteau) —
 * source : carte du restaurant.
 */
export const PRICE_DISCLAIMER =
  "Tarifs indicatifs (carte / sur place). Tailles et suppléments : confirmez au 03 55 01 67 39.";

type PriceEntry = number | { short: string; detail?: string };

/** Prix par identifiant plat (€ TTC) */
export const MENU_PRICE_BY_ID: Partial<Record<string, PriceEntry>> = {
  // Pizzas
  margherita: { short: "13–17 €", detail: "Senior 13 € · Méga 17 €" },
  // Burgers
  cheese: 7,
  "double-cheese": 8,
  "burger-m": 10,
  viking: 9,
  "mega-burger": 9.5,
  "black-burger": 9.5,
  "capo-chicken": 9,
  "le-nectar": 9,
  // Sandwichs & tacos
  "tacos-l-xxl": { short: "dès 8 €", detail: "M 8 € · L 9 € · XL 11 € · XXL 13 €" },
  "kebab-sandwich": 8.5,
  curry: 9,
  suissard: 10.5,
  "le-frenchy": 10.5,
  americain: 9.5,
  phenomene: 9,
  "full-steak": 9,
  farmer: 9,
  // Pâtes
  "4-fromages-pates": 9,
  bolognaise: 9,
  carbonara: 9,
  "saumon-pates": 9,
  "pates-alfred": 9,
  // Salades
  classic: 6,
  nicoise: 8,
  alaska: 8,
  "avocat-crevette": 8,
  "chevre-salade": 8,
  cesar: 8,
  "savoyarde-salade": 8,
  // Assiettes
  "assiette-kebab": 10,
  "assiette-chicken": 11,
  "assiette-steak": 11,
  "assiette-mixte": 12.5,
  "tex-mex": { short: "dès 8,50 €", detail: "8 pcs dès 8,50 € · 12 pcs dès 11,50 €" },
  // Spécialités
  "menu-enfant": 7,
  "cheese-naan": 11.5,
  "baguette-farcie": 11.5,
  panini: 8,
  bowl: { short: "9–11 €", detail: "M 9 € · L 11 €" },
  "crousty-tenders": 10,
  "crousty-curry": 10,
  "frites-campagnardes": 6,
  "barquette-frites": { short: "dès 4 €", detail: "Frites 4–5,50 € · Potatoes 5–6 €" },
  // Desserts
  milkshake: 5,
  "tarte-pommes": 3,
  "tarte-daims": 3,
  tiramisu: 3,
  brownie: 2,
  "glace-haagen": { short: "dès 3,50 €", detail: "100 ml 3,50 € · 500 ml 7,50 €" },
  boissons: { short: "dès 1 €", detail: "33 cl 2 € · 1,5 L 3,50 € · Eau 1 €" },
};

const CATEGORY_DEFAULT: Partial<Record<MenuCategoryId, PriceEntry>> = {
  "pizzas-tomate": { short: "13–17 €", detail: "Senior 13 € · Méga 17 €" },
  "pizzas-creme": { short: "13–17 €", detail: "Senior 13 € · Méga 17 €" },
};

export function resolveMenuPrice(
  id: string,
  category: MenuCategoryId,
): { amount?: number; label?: string; detail?: string } {
  const entry = MENU_PRICE_BY_ID[id] ?? CATEGORY_DEFAULT[category];
  if (typeof entry === "number") {
    return { amount: entry };
  }
  if (typeof entry === "object" && entry !== null) {
    return { label: entry.short, detail: entry.detail };
  }
  return {};
}

export function formatPrice(amount: number, locale: "fr" | "en" = "fr") {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
