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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[var(--surface-elevated)] transition-shadow hover:shadow-xl hover:shadow-[#e85d2c]/10 ${
        item.highlight
          ? "border-[#e85d2c]/40 ring-1 ring-[#e85d2c]/20"
          : "border-[var(--border-subtle)]"
      }`}
    >
      <button type="button" onClick={onOpen} className="text-left">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          {item.highlight && (
            <span className="absolute left-3 top-3 rounded-full bg-[#e85d2c] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Signature
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
              {item.name}
            </h3>
            <PriceTag item={item} size="sm" />
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
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
                    className="rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]"
                  >
                    {meta.emoji} {meta.label}
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
          className="text-xs font-semibold uppercase tracking-wide text-[#e85d2c] transition hover:underline"
        >
          Voir détails
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelection();
          }}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            selected
              ? "bg-[#e85d2c] text-white"
              : "border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#e85d2c]/50"
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
