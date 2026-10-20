"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { PriceTag } from "@/lib/format-price-display";
import type { MenuItem } from "@/lib/menu-types";
import { DIET_FILTERS } from "@/lib/menu-types";

type DishCardProps = {
  item: MenuItem;
  selected: boolean;
  onOpen: () => void;
  onToggleSelection: () => void;
};

export function DishCard({
  item,
  selected,
  onOpen,
  onToggleSelection,
}: DishCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`group card-surface flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)] ${
        item.highlight ? "card-surface--featured" : ""
      }`}
    >
      <button type="button" onClick={onOpen} className="text-left">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-muted)]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition duration-300 group-hover:opacity-95"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          {item.highlight && (
            <span className="badge-signature absolute left-3 top-3">Signature</span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              {item.name}
            </h3>
            <PriceTag item={item} size="sm" />
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {item.description}
          </p>
          {item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => {
                const meta = DIET_FILTERS.find((f) => f.id === tag);
                if (!meta) return null;
                return (
                  <span
                    key={tag}
                    className="rounded-md border border-[var(--border-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]"
                  >
                    {meta.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </button>

      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-3">
        <button
          type="button"
          onClick={onOpen}
          className="text-xs font-semibold uppercase tracking-wide text-brand transition hover:underline"
        >
          Détails
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelection();
          }}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            selected
              ? "bg-[var(--brand-primary)] text-[var(--brand-on-primary)]"
              : "border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-brand-soft"
          }`}
          aria-pressed={selected}
        >
          {selected ? (
            <>
              <Heart className="h-3.5 w-3.5 fill-current" /> Sélectionné
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" /> Ajouter
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
