import { SITE_THEME_CONFIG } from "@/site.theme.config";

export type SeasonalTheme = "none" | "halloween" | "christmas";

const VALID: SeasonalTheme[] = ["none", "halloween", "christmas"];

export function getActiveSeasonalTheme(): SeasonalTheme {
  const fromEnv = process.env.NEXT_PUBLIC_SEASONAL_THEME?.trim().toLowerCase();
  if (fromEnv && VALID.includes(fromEnv as SeasonalTheme)) {
    return fromEnv as SeasonalTheme;
  }
  return SITE_THEME_CONFIG.seasonal;
}

export function isSeasonalThemeActive(theme: SeasonalTheme): theme is "halloween" | "christmas" {
  return theme === "halloween" || theme === "christmas";
}

export const SEASONAL_THEME_LABEL: Record<SeasonalTheme, string | null> = {
  none: null,
  halloween: "Halloween",
  christmas: "Fêtes de fin d’année",
};
