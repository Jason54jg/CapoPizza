import type { MenuItem } from "./menu-types";

export type SelectionEntry = {
  id: string;
  name: string;
  category: MenuItem["category"];
  addedAt: number;
};

const STORAGE_KEY = "capo-pizza-selection";

export function readSelection(): SelectionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SelectionEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeSelection(entries: SelectionEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function toggleSelectionItem(item: MenuItem): SelectionEntry[] {
  const current = readSelection();
  const exists = current.find((e) => e.id === item.id);
  const next = exists
    ? current.filter((e) => e.id !== item.id)
    : [
        ...current,
        {
          id: item.id,
          name: item.name,
          category: item.category,
          addedAt: Date.now(),
        },
      ];
  writeSelection(next);
  return next;
}

export function isInSelection(id: string, entries: SelectionEntry[]) {
  return entries.some((e) => e.id === id);
}

export function formatSelectionForCall(entries: SelectionEntry[]) {
  if (!entries.length) return "";
  const lines = entries.map((e, i) => `${i + 1}. ${e.name}`);
  return `Bonjour, je souhaite commander : ${lines.join(" ; ")}.`;
}
