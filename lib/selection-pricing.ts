import type { CompositionChoices } from "./composition";
import type { Locale } from "./i18n/config";
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

const TEX_MEX_PRICE: Record<string, Record<string, number>> = {
  Tenders: { "8 pièces": 9, "12 pièces": 12 },
  Wings: { "8 pièces": 9, "12 pièces": 12 },
  Nuggets: { "8 pièces": 8.5, "12 pièces": 11.5 },
  "Mozza sticks": { "8 pièces": 10, "12 pièces": 14 },
};

export type LinePrice = {
  amount: number | null;
  label: string;
  extrasLabel?: string;
};

function sizeOf(composition: CompositionChoices): string {
  return String(composition.size ?? "").trim();
}

function extrasCount(composition: CompositionChoices): number {
  const extras = composition.extras;
  return Array.isArray(extras) ? extras.length : 0;
}

export function estimateEntryPrice(
  entry: SelectionEntry,
  locale: Locale = "fr",
): LinePrice {
  const { id, category, composition } = entry;
  const size = sizeOf(composition);
  const from = locale === "en" ? "from" : "dès";

  const isPizza =
    category === "pizzas-tomate" || category === "pizzas-creme";
  if (isPizza) {
    const amount = PIZZA_SIZE_PRICE[size] ?? null;
    if (amount != null) {
      return { amount, label: formatPrice(amount, locale) };
    }
    return { amount: null, label: "13–17 €" };
  }

  if (id === "tacos-l-xxl") {
    const base = TACOS_SIZE_PRICE[size] ?? null;
    if (base == null) {
      return { amount: null, label: `${from} 8 €` };
    }
    const extras = extrasCount(composition);
    const gratine = composition.gratine === true ? 2 : 0;
    const amount = base + extras * 1 + gratine;
    const bits: string[] = [];
    if (extras > 0) {
      bits.push(
        locale === "en"
          ? `+${extras} extra${extras > 1 ? "s" : ""}`
          : `+${extras} extra${extras > 1 ? "s" : ""}`,
      );
    }
    if (gratine) bits.push(locale === "en" ? "gratiné" : "gratiné");
    return {
      amount,
      label: formatPrice(amount, locale),
      extrasLabel: bits.length ? bits.join(" · ") : undefined,
    };
  }

  if (id === "bowl") {
    const amount = BOWL_SIZE_PRICE[size] ?? null;
    if (amount != null) return { amount, label: formatPrice(amount, locale) };
    return { amount: null, label: "9–11 €" };
  }

  if (id === "tex-mex") {
    const product = String(composition.product ?? "");
    const format = String(composition.format ?? "");
    const amount = TEX_MEX_PRICE[product]?.[format] ?? null;
    if (amount != null) return { amount, label: formatPrice(amount, locale) };
    return { amount: null, label: `${from} 8.50 €` };
  }

  const resolved = resolveMenuPrice(id, category as MenuCategoryId);
  if (resolved.amount != null) {
    return {
      amount: resolved.amount,
      label: formatPrice(resolved.amount, locale),
    };
  }

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
  totalLabel: string;
};

export function estimateSelectionTotal(
  entries: SelectionEntry[],
  locale: Locale = "fr",
): SelectionTotals {
  let knownTotal = 0;
  let hasUnknown = false;
  for (const entry of entries) {
    const { amount } = estimateEntryPrice(entry, locale);
    if (amount == null) hasUnknown = true;
    else knownTotal += amount;
  }
  const formatted = formatPrice(knownTotal, locale);
  const from = locale === "en" ? "from" : "dès";
  const confirm = locale === "en" ? "To confirm" : "À confirmer";
  return {
    knownTotal,
    hasUnknown,
    lineCount: entries.length,
    totalLabel:
      hasUnknown && knownTotal > 0
        ? `${from} ${formatted}`
        : hasUnknown && knownTotal === 0
          ? confirm
          : formatted,
  };
}
