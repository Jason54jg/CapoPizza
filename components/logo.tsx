export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-primary)] font-display text-lg font-bold text-[var(--brand-on-primary)]"
        aria-hidden
      >
        C
      </span>
      <div className="leading-tight">
        <p className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)]">
          Capo Pizza
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Neufchâteau
        </p>
      </div>
    </div>
  );
}
