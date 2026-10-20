export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e85d2c] to-[#c41e1e] text-lg font-black text-white shadow-lg shadow-orange-900/30"
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
