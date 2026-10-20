import type { MenuCategoryId } from "./menu-types";

/**
 * Tarifs publics Capo Pizza (11 Rue de France, Neufchâteau) —
 * source principale : carte Uber Eats du restaurant (même adresse).
 */
export const PRICE_DISCLAIMER =
  "Tarifs indicatifs (carte en ligne / sur place). Tailles et suppléments : confirmez au 03 55 01 67 39.";

const PIZZA_PRICE = 16;

/** Prix par identifiant plat (€ TTC) */
export const MENU_PRICE_BY_ID: Partial<
  Record<string, number | { label: string }>
> = {
  "tacos-l-xxl": { label: "L · 11,70 € — XXL · 15,90 €" },
  "kebab-sandwich": 11.05,
  "tex-mex": 13,
};

const CATEGORY_DEFAULT: Partial<Record<MenuCategoryId, number>> = {
  "pizzas-tomate": PIZZA_PRICE,
  "pizzas-creme": PIZZA_PRICE,
};

export function resolveMenuPrice(
  id: string,
  category: MenuCategoryId,
): { amount?: number; label?: string } {
  const entry = MENU_PRICE_BY_ID[id];
  if (typeof entry === "object" && entry !== null && "label" in entry) {
    return { label: entry.label };
  }
  if (typeof entry === "number") {
    return { amount: entry };
  }
  const fallback = CATEGORY_DEFAULT[category];
  if (fallback !== undefined) {
    return { amount: fallback };
  }
  return {};
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
