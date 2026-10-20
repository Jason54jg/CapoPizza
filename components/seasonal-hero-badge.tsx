"use client";

import { SEASONAL_THEME_LABEL } from "@/lib/site-theme";
import { useTheme } from "./theme-provider";

export function SeasonalHeroBadge() {
  const { seasonal } = useTheme();
  const label = SEASONAL_THEME_LABEL[seasonal];
  if (!label) return null;

  return <p className="season-ribbon">{label}</p>;
}
