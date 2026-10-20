"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus } from "@/lib/opening-hours";

const PLACEHOLDER: ReturnType<typeof getOpeningStatus> = {
  isOpen: false,
  label: "Horaires",
  nextChangeLabel: "11h00 – 23h00",
};

export function OpenStatusBadge({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState(PLACEHOLDER);

  useEffect(() => {
    const tick = () => setStatus(getOpeningStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${
        status.isOpen
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
      }`}
      aria-live="polite"
    >
      <span aria-hidden>{status.isOpen ? "🟢" : "🔴"}</span>
      <span>
        {status.isOpen ? status.label : `Fermé – ${status.nextChangeLabel}`}
      </span>
      {!compact && (
        <span className="hidden text-[11px] opacity-70 sm:inline">
          · {status.nextChangeLabel}
        </span>
      )}
    </div>
  );
}
