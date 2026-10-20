import type { SeasonalTheme } from "@/lib/site-theme";
import { isSeasonalThemeActive } from "@/lib/site-theme";

type SeasonalAmbienceProps = {
  seasonal: SeasonalTheme;
};

export function SeasonalAmbience({ seasonal }: SeasonalAmbienceProps) {
  if (!isSeasonalThemeActive(seasonal)) return null;

  if (seasonal === "halloween") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-[0.35] dark:opacity-[0.45]"
        aria-hidden
      >
        <span className="season-float absolute left-[8%] top-[18%] text-2xl">🎃</span>
        <span className="season-float season-float-delay-1 absolute right-[12%] top-[28%] text-xl">
          🦇
        </span>
        <span className="season-float season-float-delay-2 absolute left-[20%] bottom-[30%] text-lg">
          👻
        </span>
        <span className="season-float season-float-delay-3 absolute right-[18%] bottom-[22%] text-2xl">
          🎃
        </span>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-[0.3] dark:opacity-[0.4]"
      aria-hidden
    >
      <span className="season-snow absolute left-[10%] top-[-10%] text-lg text-white/80">
        ❄
      </span>
      <span className="season-snow season-snow-delay-1 absolute left-[30%] top-[-10%] text-sm text-white/70">
        ❅
      </span>
      <span className="season-snow season-snow-delay-2 absolute left-[55%] top-[-10%] text-xl text-white/80">
        ❄
      </span>
      <span className="season-snow season-snow-delay-3 absolute left-[75%] top-[-10%] text-sm text-white/70">
        ❅
      </span>
      <span className="season-snow season-snow-delay-4 absolute left-[90%] top-[-10%] text-lg text-white/80">
        ❄
      </span>
    </div>
  );
}
