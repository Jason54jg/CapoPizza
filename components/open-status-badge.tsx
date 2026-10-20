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
  mobile?: boolean;
};

function StatusDot({ open }: { open: boolean }) {
  return (
    <span
      className={`h-1.5 w-1.5 shrink-0 rounded-full ${open ? "bg-emerald-500" : "bg-stone-400"}`}
      aria-hidden
    />
  );
}

export function OpenStatusBadge({ compact = false, mobile = false }: OpenStatusBadgeProps) {
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
        className="inline-flex max-w-[5.25rem] items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2 py-1 text-[10px] font-medium text-[var(--text-secondary)]"
        aria-live="polite"
        title={fullLabel}
      >
        <StatusDot open={status.isOpen} />
        <span className="truncate">{status.isOpen ? "Ouvert" : "Fermé"}</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]"
      aria-live="polite"
      title={fullLabel}
    >
      <StatusDot open={status.isOpen} />
      <span className="whitespace-nowrap">
        {status.isOpen ? status.label : `Fermé – ${status.nextChangeLabel}`}
      </span>
      {!compact && (
        <span className="hidden whitespace-nowrap text-[11px] text-[var(--text-muted)] md:inline">
          · {status.nextChangeLabel}
        </span>
      )}
    </div>
  );
}
