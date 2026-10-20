type PizzaLoaderProps = {
  label?: string;
  fullscreen?: boolean;
};

export function PizzaLoader({
  label = "Chargement",
  fullscreen = false,
}: PizzaLoaderProps) {
  return (
    <div
      className={
        fullscreen
          ? "flex flex-col items-center justify-center gap-6"
          : "flex flex-col items-center justify-center gap-4 py-16"
      }
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="pizza-loader" aria-hidden>
        <svg viewBox="0 0 120 120" className="h-24 w-24 md:h-28 md:w-28">
          <circle cx="60" cy="60" r="54" className="pizza-loader__crust" />
          <circle cx="60" cy="60" r="46" className="pizza-loader__base" />
          <g className="pizza-loader__slice">
            <line x1="60" y1="60" x2="60" y2="14" />
            <line x1="60" y1="60" x2="102" y2="78" />
            <line x1="60" y1="60" x2="18" y2="78" />
          </g>
          <circle cx="44" cy="48" r="4" className="pizza-loader__topping" />
          <circle cx="72" cy="42" r="3.5" className="pizza-loader__topping" />
          <circle cx="68" cy="68" r="4" className="pizza-loader__topping" />
          <circle cx="42" cy="72" r="3" className="pizza-loader__topping" />
          <circle cx="60" cy="56" r="3" className="pizza-loader__topping" />
        </svg>
      </div>
      <div className="text-center">
        <p className="font-display text-xl text-[var(--text-primary)]">Capo Pizza</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
}
