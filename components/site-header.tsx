"use client";

import { Menu, Moon, Phone, Search, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/business";
import type { MenuCategoryId } from "@/lib/menu-types";
import { Logo } from "./logo";
import { OpenStatusBadge } from "./open-status-badge";
import { useTheme } from "./theme-provider";

const NAV: { label: string; href: string; category?: MenuCategoryId }[] = [
  { label: "Pizzas", href: "#menu", category: "pizzas-tomate" },
  { label: "Burgers & Tacos", href: "#menu", category: "burgers" },
  { label: "Pâtes", href: "#menu", category: "pates" },
  { label: "Salades & Assiettes", href: "#menu", category: "salades" },
  { label: "Infos & Horaires", href: "#infos" },
  { label: "Contact", href: "#contact" },
];

type SiteHeaderProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNavigateCategory?: (category: MenuCategoryId) => void;
};

export function SiteHeader({
  searchQuery,
  onSearchChange,
  onNavigateCategory,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (category?: MenuCategoryId) => {
    setMobileOpen(false);
    if (category && onNavigateCategory) {
      onNavigateCategory(category);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-md"
          : "border-transparent bg-[var(--surface-glass)]/90 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 md:gap-4 md:px-6">
        <Link href="#" className="min-w-0 shrink-0" onClick={() => window.scrollTo({ top: 0 })}>
          <Logo />
        </Link>

        <div className="hidden min-w-0 flex-1 lg:block">
          <div className="relative min-w-0 max-w-md overflow-hidden">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher une pizza, un ingrédient…"
              className="input-field py-2 pl-10 pr-4 text-sm"
              aria-label="Recherche instantanée dans la carte"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <OpenStatusBadge mobile />
        </div>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNav(item.category)}
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden lg:block">
            <OpenStatusBadge compact />
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)]"
            aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <a href={BUSINESS.phoneTel} className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
            <Phone className="h-4 w-4" />
            Commander
          </a>

          <button
            type="button"
            className="rounded-lg border border-[var(--border-subtle)] p-2 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-3 lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-0.5">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-primary)]"
                  onClick={() => handleNav(item.category)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={BUSINESS.phoneTel}
                className="btn-primary mt-2 w-full py-3 text-sm"
              >
                <Phone className="h-4 w-4" />
                Commander · {BUSINESS.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
