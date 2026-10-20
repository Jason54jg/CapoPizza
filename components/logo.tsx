export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black text-white shadow-lg"
        style={{ boxShadow: "0 8px 24px var(--brand-glow)" }}
        aria-hidden
      >
        C
      </span>
      <div className="leading-tight">
        <p className="font-display text-lg font-bold tracking-tight text-[var(--text-primary)]">
          Capo Pizza
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Neufchâteau
        </p>
      </div>
    </div>
  );
}
