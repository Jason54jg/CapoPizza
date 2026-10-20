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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border-subtle)] bg-[var(--surface-glass)] shadow-lg shadow-black/5 backdrop-blur-xl"
          : "bg-[var(--surface-glass)]/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 md:gap-4 md:px-6">
        <Link href="#" className="min-w-0 shrink-0" onClick={() => window.scrollTo({ top: 0 })}>
          <Logo />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
          <div className="relative min-w-0 flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher une pizza, un ingrédient…"
              className="w-full rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] py-2 pl-10 pr-4 text-sm outline-none ring-[#e85d2c]/0 transition focus:border-[#e85d2c]/50 focus:ring-2 focus:ring-[#e85d2c]/25"
              aria-label="Recherche instantanée dans la carte"
            />
          </div>
          <OpenStatusBadge compact />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <OpenStatusBadge mobile />
        </div>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNav(item.category)}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface-elevated)]"
            aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <a
            href={BUSINESS.phoneTel}
            className="brand-gradient hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            Commander
          </a>

          <button
            type="button"
            className="rounded-full border border-[var(--border-subtle)] p-2 lg:hidden"
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
          className="border-t border-[var(--border-subtle)] bg-[var(--surface-glass)] px-4 py-3 backdrop-blur-xl lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium"
                  onClick={() => handleNav(item.category)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={BUSINESS.phoneTel}
                className="brand-gradient mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" />
                📞 Commander au {BUSINESS.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
