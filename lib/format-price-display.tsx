import type { MenuItem } from "./menu-types";
import { formatPrice, resolveMenuPrice } from "./menu-prices";

export function getPriceDisplay(item: MenuItem) {
  return resolveMenuPrice(item.id, item.category);
}

export function PriceTag({
  item,
  className = "",
  size = "md",
  detailed = false,
}: {
  item: MenuItem;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Affiche le détail complet (modal) plutôt que le libellé court */
  detailed?: boolean;
}) {
  const { amount, label, detail } = getPriceDisplay(item);
  const text = detailed && detail ? detail : label ?? (amount !== undefined ? formatPrice(amount) : null);
  if (!text) return null;

  const sizeClass =
    size === "lg"
      ? "text-sm font-semibold"
      : size === "sm"
        ? "text-[11px] font-semibold leading-snug"
        : "text-xs font-semibold leading-snug";

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-md bg-brand-muted px-2 py-0.5 text-brand tabular-nums ${sizeClass} ${className}`}
      title={detail}
    >
      <span className="min-w-0 break-words text-right">{text}</span>
    </span>
  );
}
