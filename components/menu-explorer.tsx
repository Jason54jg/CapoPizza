"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ListChecks } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelection } from "@/hooks/use-selection";
import { MENU_ITEMS, searchMenuItems } from "@/lib/menu";
import {
  DIET_FILTERS,
  MENU_CATEGORIES,
  type DietTag,
  type MenuCategoryId,
  type MenuItem,
} from "@/lib/menu-types";
import { isInSelection } from "@/lib/selection-storage";
import { DishCard } from "./dish-card";
import { DishModal } from "./dish-modal";
import { SelectionPanel } from "./selection-panel";

type MenuExplorerProps = {
  searchQuery: string;
  activeCategory: MenuCategoryId;
  onCategoryChange: (id: MenuCategoryId) => void;
};

export function MenuExplorer({
  searchQuery,
  activeCategory,
  onCategoryChange,
}: MenuExplorerProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [dietFilters, setDietFilters] = useState<DietTag[]>([]);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [selectionOpen, setSelectionOpen] = useState(false);
  const { selection, toggle, clear } = useSelection();

  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>(
      `[data-category="${activeCategory}"]`,
    );
    tab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS.filter((i) => i.category === activeCategory);
    if (searchQuery.trim()) {
      items = searchMenuItems(searchQuery, MENU_ITEMS).filter(
        (i) => i.category === activeCategory,
      );
      if (!items.length) {
        items = searchMenuItems(searchQuery, MENU_ITEMS);
      }
    }
    if (dietFilters.length) {
      items = items.filter((i) =>
        dietFilters.every((tag) => i.tags.includes(tag)),
      );
    }
    return items;
  }, [activeCategory, searchQuery, dietFilters]);

  const globalSearchActive = searchQuery.trim().length > 0;
  const displayItems = useMemo(() => {
    if (!globalSearchActive) return filteredItems;
    const fromSearch = searchMenuItems(searchQuery, MENU_ITEMS);
    if (dietFilters.length) {
      return fromSearch.filter((i) =>
        dietFilters.every((tag) => i.tags.includes(tag)),
      );
    }
    return fromSearch;
  }, [filteredItems, globalSearchActive, searchQuery, dietFilters]);

  const toggleDiet = (tag: DietTag) => {
    setDietFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleToggleSelection = useCallback(
    (item: MenuItem) => {
      toggle(item);
    },
    [toggle],
  );

  const isPizzaSection =
    activeCategory === "pizzas-tomate" || activeCategory === "pizzas-creme";

  return (
    <section id="menu" className="scroll-mt-28 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d2c]">
              {isPizzaSection ? "Notre spécialité" : "Carte complète"}
            </p>
            <h2 className="font-display mt-1 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              {globalSearchActive
                ? "Résultats de recherche"
                : isPizzaSection
                  ? "Nos Pizzas Artisanales"
                  : "Menu Capo Pizza"}
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">
              Filtrez par catégorie, ingrédient ou envie. Commandez par téléphone
              — pas de paiement en ligne, simplicité et rapidité.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectionOpen(true)}
            className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm font-semibold transition hover:border-[#e85d2c]/40"
          >
            <ListChecks className="h-4 w-4" />
            Ma sélection
            {selection.length > 0 && (
              <span className="rounded-full bg-[#e85d2c] px-2 py-0.5 text-xs text-white">
                {selection.length}
              </span>
            )}
          </button>
        </div>

        {!globalSearchActive && (
          <div
            ref={tabsRef}
            className="mb-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Catégories du menu"
          >
            {MENU_CATEGORIES.map((cat) => {
              const active = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  data-category={cat.id}
                  aria-selected={active}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-gradient-to-r from-[#e85d2c] to-[#c41e1e] text-white shadow-lg shadow-orange-900/20"
                      : "border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="mr-1.5">{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {DIET_FILTERS.map((filter) => {
            const active = dietFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => toggleDiet(filter.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-[var(--text-primary)] text-[var(--surface-base)]"
                    : "border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                }`}
              >
                {filter.emoji} {filter.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          {displayItems.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-[var(--border-subtle)] p-10 text-center text-[var(--text-muted)]"
            >
              Aucun plat ne correspond à votre recherche. Essayez un autre mot-clé
              ou retirez les filtres.
            </motion.p>
          ) : (
            <motion.div
              key={`${activeCategory}-${searchQuery}-${dietFilters.join(",")}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`grid gap-4 ${
                isPizzaSection && !globalSearchActive
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {displayItems.map((item) => (
                <DishCard
                  key={item.id}
                  item={item}
                  selected={isInSelection(item.id, selection)}
                  onOpen={() => setModalItem(item)}
                  onToggleSelection={() => handleToggleSelection(item)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DishModal
        item={modalItem}
        selected={modalItem ? isInSelection(modalItem.id, selection) : false}
        onClose={() => setModalItem(null)}
        onToggleSelection={() => {
          if (modalItem) handleToggleSelection(modalItem);
        }}
      />

      <SelectionPanel
        open={selectionOpen}
        onClose={() => setSelectionOpen(false)}
        selection={selection}
        onClear={clear}
      />
    </section>
  );
}
