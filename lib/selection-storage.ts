import { formatComposition, type CompositionChoices } from "./composition";
import {
  estimateEntryPrice,
  estimateSelectionTotal,
} from "./selection-pricing";
import type { MenuItem } from "./menu-types";

export type SelectionEntry = {
  /** Identifiant unique de cette ligne (plusieurs fois le même plat possible) */
  uid: string;
  id: string;
  name: string;
  category: MenuItem["category"];
  addedAt: number;
  composition: CompositionChoices;
};

const STORAGE_KEY = "capo-pizza-selection";

function newUid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeEntry(raw: unknown): SelectionEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const e = raw as Partial<SelectionEntry>;
  if (!e.id || !e.name || !e.category) return null;
  return {
    uid: typeof e.uid === "string" ? e.uid : newUid(),
    id: e.id,
    name: e.name,
    category: e.category,
    addedAt: typeof e.addedAt === "number" ? e.addedAt : Date.now(),
    composition:
      e.composition && typeof e.composition === "object" ? e.composition : {},
  };
}

export function readSelection(): SelectionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeEntry)
      .filter((e): e is SelectionEntry => e !== null);
  } catch {
    return [];
  }
}

export function writeSelection(entries: SelectionEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addSelectionItem(
  item: MenuItem,
  composition: CompositionChoices = {},
): SelectionEntry[] {
  const current = readSelection();
  const next: SelectionEntry[] = [
    ...current,
    {
      uid: newUid(),
      id: item.id,
      name: item.name,
      category: item.category,
      addedAt: Date.now(),
      composition,
    },
  ];
  writeSelection(next);
  return next;
}

export function removeSelectionByUid(uid: string): SelectionEntry[] {
  const current = readSelection();
  const next = current.filter((e) => e.uid !== uid);
  writeSelection(next);
  return next;
}

export function isInSelection(id: string, entries: SelectionEntry[]) {
  return entries.some((e) => e.id === id);
}

export function countInSelection(id: string, entries: SelectionEntry[]) {
  return entries.filter((e) => e.id === id).length;
}

export function formatSelectionForCall(entries: SelectionEntry[]) {
  if (!entries.length) return "";
  const lines = entries.map((e, i) => {
    const comp = formatComposition(e.composition);
    const price = estimateEntryPrice(e);
    const bits = [comp, price.label].filter(Boolean);
    return bits.length
      ? `${i + 1}. ${e.name} (${bits.join(" · ")})`
      : `${i + 1}. ${e.name}`;
  });
  const { totalLabel } = estimateSelectionTotal(entries);
  return `Bonjour, je souhaite commander : ${lines.join(" ; ")}. Total estimé : ${totalLabel}.`;
}
