"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus } from "@/lib/opening-hours";

const PLACEHOLDER: ReturnType<typeof getOpeningStatus> = {
  isOpen: false,
  label: "Horaires",
  nextChangeLabel: "11h00 – 23h00",
};

type OpenStatusBadgeProps = {
  compact?: boolean;
  /** Sur mobile : texte court pour éviter les chevauchements */
  mobile?: boolean;
};

export function OpenStatusBadge({
  compact = false,
  mobile = false,
}: OpenStatusBadgeProps) {
  const [status, setStatus] = useState(PLACEHOLDER);

  useEffect(() => {
    const tick = () => setStatus(getOpeningStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const fullLabel = status.isOpen
    ? `${status.label} · ${status.nextChangeLabel}`
    : `Fermé · ${status.nextChangeLabel}`;

  if (mobile) {
    return (
      <div
        className={`inline-flex max-w-[5.5rem] items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold leading-none sm:max-w-none sm:px-3 sm:text-xs ${
          status.isOpen
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
        }`}
        aria-live="polite"
        title={fullLabel}
      >
        <span aria-hidden>{status.isOpen ? "🟢" : "🔴"}</span>
        <span className="truncate">{status.isOpen ? "Ouvert" : "Fermé"}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm sm:gap-2 ${
        status.isOpen
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
      }`}
      aria-live="polite"
    >
      <span aria-hidden>{status.isOpen ? "🟢" : "🔴"}</span>
      <span className="truncate">
        {status.isOpen ? status.label : `Fermé – ${status.nextChangeLabel}`}
      </span>
      {!compact && (
        <span className="hidden text-[11px] opacity-70 md:inline">
          · {status.nextChangeLabel}
        </span>
      )}
    </div>
  );
}
