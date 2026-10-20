"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Heart, Phone, X } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { PriceTag } from "@/lib/format-price-display";
import type { MenuItem } from "@/lib/menu-types";
import { DIET_FILTERS, MENU_CATEGORIES } from "@/lib/menu-types";

type DishModalProps = {
  item: MenuItem | null;
  selected: boolean;
  onClose: () => void;
  onToggleSelection: () => void;
};

export function DishModal({
  item,
  selected,
  onClose,
  onToggleSelection,
}: DishModalProps) {
  const categoryLabel = item
    ? MENU_CATEGORIES.find((c) => c.id === item.category)?.label
    : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Fermer"
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-[var(--border-subtle)] bg-[var(--surface-base)] shadow-2xl sm:rounded-3xl"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="512px"
                priority
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {categoryLabel && (
                <p className="text-xs font-semibold uppercase tracking-wider text-[#e85d2c]">
                  {categoryLabel}
                </p>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <h2
                  id="dish-modal-title"
                  className="font-display text-2xl font-bold text-[var(--text-primary)]"
                >
                  {item.name}
                </h2>
                <PriceTag item={item} size="lg" />
              </div>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>

              {item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => {
                    const meta = DIET_FILTERS.find((f) => f.id === tag);
                    if (!meta) return null;
                    return (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs font-medium"
                      >
                        {meta.emoji} {meta.label}
                      </span>
                    );
                  })}
                </div>
              )}

              {(item.category === "pizzas-tomate" ||
                item.category === "pizzas-creme") && (
                <p className="mt-5 rounded-xl bg-[var(--surface-muted)] p-3 text-sm text-[var(--text-secondary)]">
                  Indiquez la taille souhaitée lors de votre appel — notre équipe
                  vous confirmera les options disponibles.
                </p>
              )}

              {item.id === "tacos-l-xxl" && (
                <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                  Tailles L et XXL disponibles.
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onToggleSelection}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
                    selected
                      ? "bg-[#e85d2c] text-white"
                      : "border border-[var(--border-subtle)]"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${selected ? "fill-current" : ""}`} />
                  {selected ? "Dans ma sélection" : "Ajouter à ma sélection"}
                </button>
                <a
                  href={BUSINESS.phoneTel}
                  className="brand-gradient inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4" />
                  Appeler pour commander
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
