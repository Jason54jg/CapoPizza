"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Heart, Phone, Plus, X } from "lucide-react";
import { useState } from "react";
import { BUSINESS } from "@/lib/business";
import type { CompositionChoices } from "@/lib/composition";
import { PriceTag } from "@/lib/format-price-display";
import {
  localizeCategories,
  localizeDietFilters,
} from "@/lib/i18n/localize";
import type { MenuItem } from "@/lib/menu-types";
import { DishComposer } from "./dish-composer";
import { useDict, useLocale } from "./locale-provider";

type DishModalProps = {
  item: MenuItem | null;
  selectedCount: number;
  onClose: () => void;
  onAdd: (composition: CompositionChoices) => void;
};

export function DishModal({
  item,
  selectedCount,
  onClose,
  onAdd,
}: DishModalProps) {
  const dict = useDict();
  const locale = useLocale();
  const [choices, setChoices] = useState<CompositionChoices>({});
  // Réinitialisé par DishComposer (key={item.id}) qui renvoie ses choix au montage
  const [valid, setValid] = useState(false);

  const categoryLabel = item
    ? localizeCategories(locale).find((c) => c.id === item.category)?.label
    : null;
  const dietFilters = localizeDietFilters(locale);

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
            aria-label={dict.composer.close}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-[var(--border-subtle)] bg-[var(--surface-base)] shadow-2xl sm:rounded-3xl"
          >
            {item.image ? (
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
            ) : (
              <div className="flex items-center justify-end px-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)]"
                  aria-label={dict.composer.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                {categoryLabel ? (
                  <p className="eyebrow">{categoryLabel}</p>
                ) : null}
                {item.isNew ? (
                  <span className="badge-new">{dict.menu.new}</span>
                ) : null}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <h2
                  id="dish-modal-title"
                  className="font-display text-2xl font-bold text-[var(--text-primary)]"
                >
                  {item.name}
                </h2>
                <PriceTag item={item} size="lg" detailed />
              </div>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>

              {item.includes ? (
                <p className="mt-4 rounded-xl border border-[var(--brand-primary)]/25 bg-brand-muted px-3 py-2.5 text-sm font-semibold text-brand">
                  {dict.menu.includes} : {item.includes}
                </p>
              ) : null}

              {item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => {
                    const meta = dietFilters.find((f) => f.id === tag);
                    if (!meta) return null;
                    return (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs font-medium"
                      >
                        {meta.label}
                      </span>
                    );
                  })}
                </div>
              )}

              {selectedCount > 0 && (
                <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-brand">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  {dict.composer.alreadyIn} {selectedCount}
                  {dict.composer.alreadyInSuffix}
                </p>
              )}

              <DishComposer
                key={item.id}
                item={item}
                onChange={(next, isValid) => {
                  setChoices(next);
                  setValid(isValid);
                }}
              />

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled={!valid}
                  data-track={`add-pizza:${item.id}`}
                  onClick={() => {
                    onAdd(choices);
                    onClose();
                  }}
                  className="btn-primary flex-1 px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                  {dict.composer.addToSelection}
                </button>
                <a
                  href={BUSINESS.phoneTel}
                  data-track="call"
                  className="btn-secondary flex-1 px-4 py-3 text-sm"
                >
                  <Phone className="h-4 w-4" />
                  {dict.composer.call}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
