"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { PriceTag } from "@/lib/format-price-display";
import type { MenuItem } from "@/lib/menu-types";
import { localizeDietFilters } from "@/lib/i18n/localize";
import { useDict, useLocale } from "./locale-provider";

type DishCardProps = {
  item: MenuItem;
  selectedCount: number;
  onOpen: () => void;
};

export function DishCard({ item, selectedCount, onOpen }: DishCardProps) {
  const dict = useDict();
  const locale = useLocale();
  const selected = selectedCount > 0;
  const dietFilters = localizeDietFilters(locale);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`group card-surface flex h-full min-w-0 flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)] ${
        item.highlight ? "card-surface--featured" : ""
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 flex-col text-left"
      >
        {item.image ? (
          <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[var(--surface-muted)]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition duration-300 group-hover:opacity-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {item.isNew ? (
                <span className="badge-new">{dict.menu.new}</span>
              ) : null}
              {item.highlight ? (
                <span className="badge-signature">{dict.menu.signature}</span>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-col gap-2 p-4">
          <div className="flex min-w-0 flex-wrap items-start justify-between gap-x-2 gap-y-1.5">
            <h3 className="min-w-0 font-display text-lg font-semibold leading-snug text-[var(--text-primary)] sm:text-xl">
              {item.name}
            </h3>
            <PriceTag item={item} size="sm" className="shrink-0" />
          </div>

          {!item.image && (item.isNew || item.highlight) ? (
            <div className="flex flex-wrap gap-1.5">
              {item.isNew ? (
                <span className="badge-new w-fit">{dict.menu.new}</span>
              ) : null}
              {item.highlight ? (
                <span className="badge-signature w-fit">
                  {dict.menu.signature}
                </span>
              ) : null}
            </div>
          ) : null}

          <p className="line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {item.description}
          </p>

          {item.includes ? (
            <p className="text-xs font-semibold text-brand">
              {dict.menu.includes} : {item.includes}
            </p>
          ) : null}

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => {
                const meta = dietFilters.find((f) => f.id === tag);
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

      <div className="mt-auto flex shrink-0 items-center justify-between border-t border-[var(--border-subtle)] px-4 py-2.5">
        <button
          type="button"
          onClick={onOpen}
          className="text-xs font-semibold uppercase tracking-wide text-brand transition hover:underline"
        >
          {dict.menu.compose}
        </button>
        <button
          type="button"
          onClick={onOpen}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            selected
              ? "bg-[var(--brand-primary)] text-[var(--brand-on-primary)]"
              : "border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-brand-soft"
          }`}
          aria-pressed={selected}
        >
          {selected ? (
            <>
              <Heart className="h-3.5 w-3.5 fill-current" />
              {selectedCount > 1 ? `${selectedCount}×` : dict.menu.selected}
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" /> {dict.menu.add}
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
