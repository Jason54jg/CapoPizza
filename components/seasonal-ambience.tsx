import type { SeasonalTheme } from "@/lib/site-theme";

type SeasonalAmbienceProps = {
  seasonal: SeasonalTheme;
};

/**
 * Lueur d’ambiance fixe.
 * - Base (none) : halo four discret
 * - Halloween / Noël : couches colorées via CSS .season-*
 */
export function SeasonalAmbience({ seasonal }: SeasonalAmbienceProps) {
  return (
    <div
      className="season-backdrop"
      aria-hidden
      data-season={seasonal}
    />
  );
}
