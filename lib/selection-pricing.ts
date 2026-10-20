import type { CompositionChoices } from "./composition";
import { formatPrice, MENU_PRICE_BY_ID, resolveMenuPrice } from "./menu-prices";
import type { SelectionEntry } from "./selection-storage";
import type { MenuCategoryId } from "./menu-types";

const PIZZA_SIZE_PRICE: Record<string, number> = {
  Senior: 13,
  Méga: 17,
};

const TACOS_SIZE_PRICE: Record<string, number> = {
  M: 8,
  L: 9,
  XL: 11,
  XXL: 13,
};

const BOWL_SIZE_PRICE: Record<string, number> = {
  M: 9,
  L: 11,
};

/** Estimations tex-mex (fourchette carte → prix moyen affiché) */
const TEX_MEX_PRICE: Record<string, Record<string, number>> = {
  Tenders: { "8 pièces": 9, "12 pièces": 12 },
  Wings: { "8 pièces": 9, "12 pièces": 12 },
  Nuggets: { "8 pièces": 8.5, "12 pièces": 11.5 },
  "Mozza sticks": { "8 pièces": 10, "12 pièces": 14 },
};

export type LinePrice = {
  amount: number | null;
  label: string;
  /** Suppléments détaillés (extras, gratiné…) */
  extrasLabel?: string;
};

function sizeOf(composition: CompositionChoices): string {
  return String(composition.size ?? "").trim();
}

function extrasCount(composition: CompositionChoices): number {
  const extras = composition.extras;
  return Array.isArray(extras) ? extras.length : 0;
}

export function estimateEntryPrice(entry: SelectionEntry): LinePrice {
  const { id, category, composition } = entry;
  const size = sizeOf(composition);

  const isPizza =
    category === "pizzas-tomate" || category === "pizzas-creme";
  if (isPizza) {
    const amount = PIZZA_SIZE_PRICE[size] ?? null;
    if (amount != null) {
      return { amount, label: formatPrice(amount) };
    }
    return { amount: null, label: "13–17 €" };
  }

  if (id === "tacos-l-xxl") {
    const base = TACOS_SIZE_PRICE[size] ?? null;
    if (base == null) {
      return { amount: null, label: "dès 8 €" };
    }
    const extras = extrasCount(composition);
    const gratine = composition.gratine === true ? 2 : 0;
    const extrasTotal = extras * 1 + gratine;
    const amount = base + extrasTotal;
    const bits: string[] = [];
    if (extras > 0) bits.push(`+${extras} extra${extras > 1 ? "s" : ""}`);
    if (gratine) bits.push("gratiné");
    return {
      amount,
      label: formatPrice(amount),
      extrasLabel: bits.length ? bits.join(" · ") : undefined,
    };
  }

  if (id === "bowl") {
    const amount = BOWL_SIZE_PRICE[size] ?? null;
    if (amount != null) return { amount, label: formatPrice(amount) };
    return { amount: null, label: "9–11 €" };
  }

  if (id === "tex-mex") {
    const product = String(composition.product ?? "");
    const format = String(composition.format ?? "");
    const amount = TEX_MEX_PRICE[product]?.[format] ?? null;
    if (amount != null) return { amount, label: formatPrice(amount) };
    return { amount: null, label: "dès 8,50 €" };
  }

  const resolved = resolveMenuPrice(id, category as MenuCategoryId);
  if (resolved.amount != null) {
    return { amount: resolved.amount, label: formatPrice(resolved.amount) };
  }

  // Fallback : prix min d’une fourchette connue
  const entryPrice = MENU_PRICE_BY_ID[id];
  if (typeof entryPrice === "object" && entryPrice?.short) {
    return { amount: null, label: entryPrice.short };
  }

  return { amount: null, label: "—" };
}

export type SelectionTotals = {
  knownTotal: number;
  hasUnknown: boolean;
  lineCount: number;
  /** Libellé du total (ex. « 42,00 € » ou « dès 42,00 € ») */
  totalLabel: string;
};

export function estimateSelectionTotal(
  entries: SelectionEntry[],
): SelectionTotals {
  let knownTotal = 0;
  let hasUnknown = false;
  for (const entry of entries) {
    const { amount } = estimateEntryPrice(entry);
    if (amount == null) hasUnknown = true;
    else knownTotal += amount;
  }
  const formatted = formatPrice(knownTotal);
  return {
    knownTotal,
    hasUnknown,
    lineCount: entries.length,
    totalLabel: hasUnknown && knownTotal > 0
      ? `dès ${formatted}`
      : hasUnknown && knownTotal === 0
        ? "À confirmer"
        : formatted,
  };
}
