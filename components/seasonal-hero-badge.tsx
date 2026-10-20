"use client";

import { useDict } from "./locale-provider";
import { useTheme } from "./theme-provider";

export function SeasonalHeroBadge() {
  const { seasonal } = useTheme();
  const dict = useDict();
  if (seasonal === "none") return null;
  const label =
    seasonal === "halloween"
      ? dict.seasonal.halloween
      : dict.seasonal.christmas;

  return <p className="season-ribbon">{label}</p>;
}
