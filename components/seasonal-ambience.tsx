import type { SeasonalTheme } from "@/lib/site-theme";
import { isSeasonalThemeActive } from "@/lib/site-theme";

type SeasonalAmbienceProps = {
  seasonal: SeasonalTheme;
};

/** Fond lumineux discret — pas d’emojis ni d’animations décoratives. */
export function SeasonalAmbience({ seasonal }: SeasonalAmbienceProps) {
  if (!isSeasonalThemeActive(seasonal)) return null;
  return <div className="season-backdrop" aria-hidden />;
}
