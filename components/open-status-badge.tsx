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
  className?: string;
};

function StatusDot({ open }: { open: boolean }) {
  return (
    <span
      className={`h-1.5 w-1.5 shrink-0 rounded-full ${open ? "bg-emerald-500" : "bg-stone-400"}`}
      aria-hidden
    />
  );
}

export function OpenStatusBadge({
  compact = false,
  mobile = false,
  className = "",
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
        className={`inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2 py-1 text-[11px] font-semibold text-[var(--text-secondary)] ${className}`}
        aria-live="polite"
        title={fullLabel}
      >
        <StatusDot open={status.isOpen} />
        <span>{status.isOpen ? "Ouvert" : "Fermé"}</span>
      </div>
    );
  }

  return (
    <a
      href="#infos"
      className={`inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] ${className}`}
      aria-live="polite"
      title={fullLabel}
    >
      <StatusDot open={status.isOpen} />
      <span className="whitespace-nowrap">
        {status.isOpen ? "Ouvert" : "Fermé"}
      </span>
      {!compact && (
        <span className="hidden whitespace-nowrap text-[11px] font-medium text-[var(--text-muted)] lg:inline">
          · {status.nextChangeLabel}
        </span>
      )}
    </a>
  );
}
