"use client";

import { ShoppingBag } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { useDict } from "./locale-provider";

type UberEatsButtonProps = {
  className?: string;
  /** Libellé court « Uber Eats » (barres étroites) */
  short?: boolean;
};

export function UberEatsButton({
  className = "",
  short = false,
}: UberEatsButtonProps) {
  const dict = useDict();

  return (
    <a
      href={BUSINESS.uberEatsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-ubereats ${className}`}
      aria-label={dict.nav.uberEats}
    >
      <ShoppingBag className="h-4 w-4 shrink-0" />
      <span className="truncate">
        {short ? dict.nav.uberEatsShort : dict.nav.uberEats}
      </span>
    </a>
  );
}
