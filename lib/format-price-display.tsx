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
      ? "text-lg font-semibold tabular-nums"
      : size === "sm"
        ? "text-xs font-semibold tabular-nums"
        : "text-sm font-semibold tabular-nums";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md bg-brand-muted px-2 py-0.5 text-brand ${sizeClass} ${className}`}
    >
      {label ?? formatPrice(amount!)}
    </span>
  );
}
