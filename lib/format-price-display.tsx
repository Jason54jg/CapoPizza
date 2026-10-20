import type { MenuItem } from "./menu-types";
import { formatPrice, resolveMenuPrice } from "./menu-prices";

export function getPriceDisplay(item: MenuItem) {
  return resolveMenuPrice(item.id, item.category);
}

export function PriceTag({
  item,
  className = "",
  size = "md",
}: {
  item: MenuItem;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { amount, label } = getPriceDisplay(item);
  if (amount === undefined && !label) return null;

  const sizeClass =
    size === "lg"
      ? "text-xl font-bold"
      : size === "sm"
        ? "text-xs font-semibold"
        : "text-sm font-bold";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full bg-[var(--brand-glow)] px-2.5 py-1 text-[var(--brand-from)] ${sizeClass} ${className}`}
    >
      {label ?? formatPrice(amount!)}
    </span>
  );
}
