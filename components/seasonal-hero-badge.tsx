"use client";

import { SEASONAL_THEME_LABEL } from "@/lib/site-theme";
import { useTheme } from "./theme-provider";

export function SeasonalHeroBadge() {
  const { seasonal } = useTheme();
  const label = SEASONAL_THEME_LABEL[seasonal];
  if (!label) return null;

  const emoji = seasonal === "halloween" ? "🎃" : "🎄";

  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--season-accent)]/40 bg-[var(--brand-glow)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--season-accent)]">
      <span aria-hidden>{emoji}</span>
      {label}
    </p>
  );
}
