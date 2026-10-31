"use client";

import { useCallback, useEffect, useState } from "react";
import type { CompositionChoices } from "@/lib/composition";
import type { MenuItem } from "@/lib/menu-types";
import {
  createSelectionEntry,
  readSelection,
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

  useEffect(() => {
    if (ready) writeSelection(selection);
  }, [selection, ready]);

  const add = useCallback(
    (item: MenuItem, composition: CompositionChoices = {}) => {
      const entry = createSelectionEntry(item, composition);
      setSelection((current) => [...current, entry]);
    },
    [],
  );

  const remove = useCallback((uid: string) => {
    setSelection((current) => current.filter((entry) => entry.uid !== uid));
  }, []);

  const clear = useCallback(() => {
    setSelection([]);
  }, []);

  return { selection, add, remove, clear, ready };
}
