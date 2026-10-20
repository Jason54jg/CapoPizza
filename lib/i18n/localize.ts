import type { MenuItem, MenuCategory } from "@/lib/menu-types";
import { MENU_CATEGORIES, DIET_FILTERS } from "@/lib/menu-types";
import type { Locale } from "./config";
import { getDictionary } from "./dictionary";
import {
  COMPOSITION_OPTION_EN,
  MENU_EN,
} from "./menu-en";

export function localizeMenuItem(item: MenuItem, locale: Locale): MenuItem {
  if (locale === "fr") return item;
  const en = MENU_EN[item.id];
  if (!en) return item;
  return {
    ...item,
    name: en.name ?? item.name,
    description: en.description,
    includes: en.includes ?? item.includes,
  };
}

export function localizeMenuItems(
  items: MenuItem[],
  locale: Locale,
): MenuItem[] {
  return items.map((item) => localizeMenuItem(item, locale));
}

export function localizeCategories(locale: Locale): MenuCategory[] {
  const dict = getDictionary(locale);
  return MENU_CATEGORIES.map((cat) => ({
    ...cat,
    label: dict.categories[cat.id]?.label ?? cat.label,
    shortLabel: dict.categories[cat.id]?.shortLabel ?? cat.shortLabel,
  }));
}

export function localizeDietFilters(locale: Locale) {
  const dict = getDictionary(locale);
  return DIET_FILTERS.map((f) => ({
    ...f,
    label: dict.diet[f.id],
  }));
}

export function translateOption(label: string, locale: Locale): string {
  if (locale === "fr") return label;
  return COMPOSITION_OPTION_EN[label] ?? label;
}

export function localizeOptions(
  options: string[] | undefined,
  locale: Locale,
): string[] | undefined {
  if (!options) return options;
  return options.map((o) => translateOption(o, locale));
}
