"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ListChecks, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelection } from "@/hooks/use-selection";
import { MENU_ITEMS, searchMenuItems } from "@/lib/menu";
import type { DietTag, MenuCategoryId, MenuItem } from "@/lib/menu-types";
import {
  localizeCategories,
  localizeDietFilters,
  localizeMenuItem,
  localizeMenuItems,
} from "@/lib/i18n/localize";
import { estimateSelectionTotal } from "@/lib/selection-pricing";
import { countInSelection } from "@/lib/selection-storage";
import { DishCard } from "./dish-card";
import { DishModal } from "./dish-modal";
import { useDict, useLocale } from "./locale-provider";
import { SelectionPanel } from "./selection-panel";

type MenuExplorerProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: MenuCategoryId;
  onCategoryChange: (id: MenuCategoryId) => void;
};

export function MenuExplorer({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: MenuExplorerProps) {
  const dict = useDict();
  const locale = useLocale();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [dietFilters, setDietFilters] = useState<DietTag[]>([]);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [selectionOpen, setSelectionOpen] = useState(false);
  const { selection, add, remove, clear } = useSelection();

  const categories = useMemo(() => localizeCategories(locale), [locale]);
  const dietOptions = useMemo(() => localizeDietFilters(locale), [locale]);
  const localizedMenu = useMemo(
    () => localizeMenuItems(MENU_ITEMS, locale),
    [locale],
  );

  const selectionTotal = useMemo(
    () => estimateSelectionTotal(selection, locale),
    [selection, locale],
  );

  // Centrer l’onglet actif horizontalement — pas au 1er montage
  // (sinon scrollIntoView descend la page dès l’arrivée sur le site).
  const categoryScrollReady = useRef(false);
  useEffect(() => {
    if (!categoryScrollReady.current) {
      categoryScrollReady.current = true;
      return;
    }
    const tab = tabsRef.current?.querySelector<HTMLElement>(
      `[data-category="${activeCategory}"]`,
    );
    tab?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeCategory]);

  const displayItems = useMemo(() => {
    let items: MenuItem[];
    if (searchQuery.trim()) {
      items = searchMenuItems(searchQuery, localizedMenu);
      if (
        items.length &&
        items.every((i) => i.category === activeCategory) === false
      ) {
        // keep global search results
      } else if (!items.length) {
        items = searchMenuItems(searchQuery, MENU_ITEMS).map((i) =>
          localizeMenuItem(i, locale),
        );
      }
    } else {
      items = localizedMenu.filter((i) => i.category === activeCategory);
    }
    if (dietFilters.length) {
      items = items.filter((i) =>
        dietFilters.every((tag) => i.tags.includes(tag)),
      );
    }
    return items;
  }, [
    activeCategory,
    searchQuery,
    dietFilters,
    localizedMenu,
    locale,
  ]);

  const globalSearchActive = searchQuery.trim().length > 0;

  const toggleDiet = (tag: DietTag) => {
    setDietFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const isPizzaSection =
    activeCategory === "pizzas-tomate" || activeCategory === "pizzas-creme";

  return (
    <section id="menu" className="scroll-mt-24 py-12 md:scroll-mt-28 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative mb-6 lg:hidden">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={dict.nav.searchPlaceholder}
            className="input-field py-3 pl-10 pr-4 text-sm"
            aria-label={dict.nav.search}
          />
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-2">
              {isPizzaSection ? dict.menu.specialty : dict.menu.card}
            </p>
            <h2 className="font-display text-3xl text-[var(--text-primary)] md:text-4xl">
              {globalSearchActive
                ? dict.menu.searchResults
                : isPizzaSection
                  ? dict.menu.artisanPizzas
                  : dict.menu.menuTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">
              {dict.menu.intro}
            </p>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              {dict.priceDisclaimer}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectionOpen(true)}
            className="btn-secondary self-start px-4 py-2.5 text-sm"
          >
            <ListChecks className="h-4 w-4" />
            {dict.menu.mySelection}
            {selection.length > 0 && (
              <>
                <span className="rounded-md bg-[var(--brand-primary)] px-2 py-0.5 text-xs text-[var(--brand-on-primary)]">
                  {selection.length}
                </span>
                <span className="text-xs font-semibold tabular-nums text-brand">
                  {selectionTotal.totalLabel}
                </span>
              </>
            )}
          </button>
        </div>

        {!globalSearchActive && (
          <div className="relative mb-4">
            <div
              ref={tabsRef}
              className="flex flex-wrap gap-1.5 sm:gap-2"
              role="tablist"
              aria-label={dict.menu.categoriesAria}
            >
              {categories.map((cat) => {
                const active = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    data-category={cat.id}
                    aria-selected={active}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm ${
                      active
                        ? "tab-active"
                        : "border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span className="md:hidden">{cat.shortLabel}</span>
                    <span className="hidden md:inline">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-1.5">
          {dietOptions.map((filter) => {
            const active = dietFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => toggleDiet(filter.id)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                  active
                    ? "bg-[var(--text-primary)] text-[var(--surface-base)]"
                    : "border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                }`}
              >
                {filter.label}
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
              {dict.menu.empty}
            </motion.p>
          ) : (
            <motion.div
              key={`${activeCategory}-${searchQuery}-${dietFilters.join(",")}-${locale}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
            >
              {displayItems.map((item) => (
                <DishCard
                  key={item.id}
                  item={item}
                  selectedCount={countInSelection(item.id, selection)}
                  onOpen={() => setModalItem(item)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DishModal
        item={modalItem}
        selectedCount={
          modalItem ? countInSelection(modalItem.id, selection) : 0
        }
        onClose={() => setModalItem(null)}
        onAdd={(composition) => {
          if (modalItem) {
            const source =
              MENU_ITEMS.find((i) => i.id === modalItem.id) ?? modalItem;
            add(source, composition);
          }
        }}
      />

      <SelectionPanel
        open={selectionOpen}
        onClose={() => setSelectionOpen(false)}
        selection={selection}
        onClear={clear}
        onRemove={remove}
      />
    </section>
  );
}
