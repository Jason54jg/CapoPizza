"use client";

import { useCallback, useState } from "react";
import type { MenuItem } from "@/lib/menu-types";
import {
  readSelection,
  toggleSelectionItem,
  type SelectionEntry,
} from "@/lib/selection-storage";

export function useSelection() {
  const [selection, setSelection] = useState<SelectionEntry[]>(() =>
    typeof window === "undefined" ? [] : readSelection(),
  );

  const toggle = useCallback((item: MenuItem) => {
    const next = toggleSelectionItem(item);
    setSelection(next);
    return next;
  }, []);

  const clear = useCallback(() => {
    setSelection([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("capo-pizza-selection");
    }
  }, []);

  return { selection, toggle, clear, ready: true };
}
