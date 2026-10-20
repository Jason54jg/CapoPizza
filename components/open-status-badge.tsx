"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus } from "@/lib/opening-hours";
import { useDict, useLocale } from "./locale-provider";

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
  const dict = useDict();
  const locale = useLocale();
  const [status, setStatus] = useState(() =>
    getOpeningStatus(new Date(), locale),
  );

  useEffect(() => {
    const tick = () => setStatus(getOpeningStatus(new Date(), locale));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [locale]);

  const fullLabel = status.isOpen
    ? `${status.label} · ${status.nextChangeLabel}`
    : `${dict.status.closed} · ${status.nextChangeLabel}`;

  if (mobile) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2 py-1 text-[11px] font-semibold text-[var(--text-secondary)] ${className}`}
        aria-live="polite"
        title={fullLabel}
      >
        <StatusDot open={status.isOpen} />
        <span>{status.isOpen ? dict.status.open : dict.status.closed}</span>
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
        {status.isOpen ? dict.status.open : dict.status.closed}
      </span>
      {!compact && (
        <span className="hidden whitespace-nowrap text-[11px] font-medium text-[var(--text-muted)] lg:inline">
          · {status.nextChangeLabel}
        </span>
      )}
    </a>
  );
}
