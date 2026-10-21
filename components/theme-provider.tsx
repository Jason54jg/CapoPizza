"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SeasonalTheme } from "@/lib/site-theme";

type ColorTheme = "dark" | "light";

type ThemeContextValue = {
  theme: ColorTheme;
  seasonal: SeasonalTheme;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "capo-pizza-theme";

function readInitialColorTheme(): ColorTheme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* stockage bloqué (navigation privée) */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyDocumentClasses(color: ColorTheme, seasonal: SeasonalTheme) {
  const root = document.documentElement;
  root.classList.toggle("dark", color === "dark");
  root.classList.toggle("light", color === "light");
  root.classList.toggle("season-halloween", seasonal === "halloween");
  root.classList.toggle("season-christmas", seasonal === "christmas");
}

type ThemeProviderProps = {
  children: React.ReactNode;
  seasonal: SeasonalTheme;
};

export function ThemeProvider({ children, seasonal }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ColorTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = readInitialColorTheme();
    applyDocumentClasses(initial, seasonal);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate once on mount
    setTheme(initial);
    setMounted(true);
  }, [seasonal]);

  useEffect(() => {
    if (!mounted) return;
    applyDocumentClasses(theme, seasonal);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* stockage bloqué : thème non mémorisé */
    }
  }, [theme, mounted, seasonal]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, seasonal, toggleTheme, mounted }),
    [theme, seasonal, toggleTheme, mounted],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
