"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ClipboardCopy, Phone, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { BUSINESS } from "@/lib/business";
import { formatComposition } from "@/lib/composition";
import {
  localizeCategories,
  localizeMenuItem,
  translateOption,
} from "@/lib/i18n/localize";
import { MENU_ITEMS } from "@/lib/menu";
import {
  estimateEntryPrice,
  estimateSelectionTotal,
} from "@/lib/selection-pricing";
import {
  formatSelectionForCall,
  type SelectionEntry,
} from "@/lib/selection-storage";
import { useDict, useLocale } from "./locale-provider";
import { UberEatsButton } from "./uber-eats-button";

type SelectionPanelProps = {
  open: boolean;
  onClose: () => void;
  selection: SelectionEntry[];
  onClear: () => void;
  onRemove: (uid: string) => void;
};

export function SelectionPanel({
  open,
  onClose,
  selection,
  onClear,
  onRemove,
}: SelectionPanelProps) {
  const dict = useDict();
  const locale = useLocale();
  const [copied, setCopied] = useState(false);
  const totals = useMemo(
    () => estimateSelectionTotal(selection, locale),
    [selection, locale],
  );
  const categories = useMemo(() => localizeCategories(locale), [locale]);

  const copyRecap = async () => {
    const text = formatSelectionForCall(selection, locale);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-label={dict.composer.close}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative flex h-full w-full max-w-md flex-col border-l border-[var(--border-subtle)] bg-[var(--surface-base)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] p-4">
              <div>
                <h2 className="font-display text-lg font-bold">
                  {dict.selection.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  {selection.length === 0
                    ? dict.selection.subtitle
                    : `${selection.length} ${dict.selection.articles}${selection.length > 1 ? (locale === "en" ? "s" : "s") : ""}`}
                </p>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {selection.length === 0 ? (
                <p className="rounded-xl border border-dashed border-[var(--border-subtle)] p-6 text-center text-sm text-[var(--text-muted)]">
                  {dict.selection.empty}
                </p>
              ) : (
                <ul className="space-y-3">
                  {selection.map((entry) => {
                    const source = MENU_ITEMS.find((i) => i.id === entry.id);
                    const localized = source
                      ? localizeMenuItem(source, locale)
                      : null;
                    const name = localized?.name ?? entry.name;
                    const cat = categories.find((c) => c.id === entry.category);
                    const detail = formatComposition(
                      entry.composition,
                      dict.fields,
                      (v) => translateOption(v, locale),
                    );
                    const price = estimateEntryPrice(entry, locale);
                    return (
                      <li
                        key={entry.uid}
                        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium text-[var(--text-primary)]">
                                {name}
                              </p>
                              <p className="shrink-0 text-sm font-semibold tabular-nums text-brand">
                                {price.label}
                              </p>
                            </div>
                            <p className="text-xs text-[var(--text-muted)]">
                              {cat?.emoji} {cat?.label}
                            </p>
                            {detail ? (
                              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                                {detail}
                              </p>
                            ) : null}
                            {price.extrasLabel ? (
                              <p className="mt-1 text-[11px] font-medium text-brand">
                                {price.extrasLabel}
                              </p>
                            ) : null}
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemove(entry.uid)}
                            className="shrink-0 rounded-full p-1.5 text-[var(--text-muted)] transition hover:bg-red-500/10 hover:text-red-500"
                            aria-label={`${dict.selection.remove} ${name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="space-y-3 border-t border-[var(--border-subtle)] p-4">
              {selection.length > 0 && (
                <div className="rounded-xl bg-brand-muted px-4 py-3">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                        {dict.selection.total}
                      </p>
                      {totals.hasUnknown ? (
                        <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                          {dict.selection.totalHint}
                        </p>
                      ) : null}
                    </div>
                    <p className="font-display text-2xl font-bold tabular-nums text-[var(--text-primary)]">
                      {totals.totalLabel}
                    </p>
                  </div>
                  <p className="mt-2 text-[10px] leading-snug text-[var(--text-muted)]">
                    {dict.priceDisclaimer}
                  </p>
                </div>
              )}

              <button
                type="button"
                disabled={!selection.length}
                onClick={copyRecap}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] py-3 text-sm font-semibold disabled:opacity-40"
              >
                <ClipboardCopy className="h-4 w-4" />
                {copied ? dict.selection.copied : dict.selection.copy}
              </button>
              <a
                href={BUSINESS.phoneTel}
                className="btn-primary w-full py-3 text-sm disabled:opacity-40"
                aria-disabled={!selection.length}
              >
                <Phone className="h-4 w-4" />
                {dict.selection.call}
              </a>
              <UberEatsButton className="w-full py-3 text-sm" />
              {selection.length > 0 && (
                <button
                  type="button"
                  onClick={onClear}
                  className="flex w-full items-center justify-center gap-2 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {dict.selection.clear}
                </button>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
