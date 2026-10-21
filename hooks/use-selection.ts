"use client";

import { useCallback, useEffect, useState } from "react";
import type { CompositionChoices } from "@/lib/composition";
import type { MenuItem } from "@/lib/menu-types";
import {
  addSelectionItem,
  readSelection,
  removeSelectionByUid,
  writeSelection,
  type SelectionEntry,
} from "@/lib/selection-storage";

export function useSelection() {
  const [selection, setSelection] = useState<SelectionEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate once on mount (localStorage)
    setSelection(readSelection());
    setReady(true);
  }, []);

  const add = useCallback(
    (item: MenuItem, composition: CompositionChoices = {}) => {
      const next = addSelectionItem(item, composition);
      setSelection(next);
      return next;
    },
    [],
  );

  const remove = useCallback((uid: string) => {
    const next = removeSelectionByUid(uid);
    setSelection(next);
    return next;
  }, []);

  const clear = useCallback(() => {
    setSelection([]);
    writeSelection([]);
  }, []);

  return { selection, add, remove, clear, ready };
}
