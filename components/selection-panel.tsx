"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ClipboardCopy, Phone, Trash2, X } from "lucide-react";
import { useState } from "react";
import { BUSINESS } from "@/lib/business";
import { formatSelectionForCall, type SelectionEntry } from "@/lib/selection-storage";
import { MENU_CATEGORIES } from "@/lib/menu-types";

type SelectionPanelProps = {
  open: boolean;
  onClose: () => void;
  selection: SelectionEntry[];
  onClear: () => void;
};

export function SelectionPanel({
  open,
  onClose,
  selection,
  onClear,
}: SelectionPanelProps) {
  const [copied, setCopied] = useState(false);

  const copyRecap = async () => {
    const text = formatSelectionForCall(selection);
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
            aria-label="Fermer la sélection"
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
                <h2 className="font-display text-lg font-bold">Ma sélection</h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Composez votre commande avant d&apos;appeler
                </p>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {selection.length === 0 ? (
                <p className="rounded-xl border border-dashed border-[var(--border-subtle)] p-6 text-center text-sm text-[var(--text-muted)]">
                  Ajoutez des plats avec le bouton « Ajouter » pour préparer votre
                  commande.
                </p>
              ) : (
                <ul className="space-y-3">
                  {selection.map((entry) => {
                    const cat = MENU_CATEGORIES.find((c) => c.id === entry.category);
                    return (
                      <li
                        key={entry.id}
                        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3"
                      >
                        <p className="font-medium text-[var(--text-primary)]">
                          {entry.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {cat?.emoji} {cat?.label}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="space-y-2 border-t border-[var(--border-subtle)] p-4">
              <button
                type="button"
                disabled={!selection.length}
                onClick={copyRecap}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] py-3 text-sm font-semibold disabled:opacity-40"
              >
                <ClipboardCopy className="h-4 w-4" />
                {copied ? "Recap copié !" : "Copier le récapitulatif"}
              </button>
              <a
                href={BUSINESS.phoneTel}
                className="brand-gradient flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white disabled:opacity-40"
                aria-disabled={!selection.length}
              >
                <Phone className="h-4 w-4" />
                Appeler pour commander
              </a>
              {selection.length > 0 && (
                <button
                  type="button"
                  onClick={onClear}
                  className="flex w-full items-center justify-center gap-2 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Vider la sélection
                </button>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
