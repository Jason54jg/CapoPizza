"use client";

import { Menu, Moon, Phone, Search, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/business";
import type { MenuCategoryId } from "@/lib/menu-types";
import { LanguageSwitcher } from "./language-switcher";
import { useDict, useLocale } from "./locale-provider";
import { Logo } from "./logo";
import { OpenStatusBadge } from "./open-status-badge";
import { useTheme } from "./theme-provider";
import { UberEatsButton } from "./uber-eats-button";

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
  const dict = useDict();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  const nav = [
    { label: dict.nav.offers, href: "#offres" },
    {
      label: dict.nav.menu,
      href: "#menu",
      category: "pizzas-tomate" as MenuCategoryId,
    },
    { label: dict.nav.reviews, href: "#avis" },
    { label: dict.nav.hours, href: "#infos" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (category?: MenuCategoryId) => {
    setMobileOpen(false);
    setSearchOpen(false);
    if (category && onNavigateCategory) {
      onNavigateCategory(category);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || mobileOpen || searchOpen
          ? "border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-md"
          : "border-[var(--border-subtle)]/60 bg-[var(--surface-glass)]/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-4 md:gap-4 md:px-6">
        <Link
          href={`/${locale}/`}
          className="min-w-0 shrink"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <Logo size="md" hideWordmarkOnMobile />
        </Link>

        <nav
          className="ml-2 hidden items-center gap-1 md:flex"
          aria-label={dict.nav.mainNav}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNav(item.category)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center lg:flex">
            {searchOpen ? (
              <div className="relative w-52 xl:w-60">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="search"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) setSearchOpen(false);
                  }}
                  placeholder={dict.nav.searchPlaceholderShort}
                  className="input-field h-9 w-full py-0 pl-9 pr-3 text-sm"
                  aria-label={dict.nav.search}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                aria-label={dict.nav.openSearch}
              >
                <Search className="h-4 w-4" />
              </button>
            )}
          </div>

          <LanguageSwitcher className="hidden md:inline-flex" />

          <OpenStatusBadge />

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)]"
            aria-label={
              theme === "dark" ? dict.nav.lightMode : dict.nav.darkMode
            }
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <a
            href={BUSINESS.phoneTel}
            data-track="call"
            className="btn-primary hidden h-9 items-center gap-2 px-4 text-sm font-semibold md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {dict.nav.order}
          </a>

          <UberEatsButton
            short
            className="hidden h-9 px-4 text-sm lg:inline-flex"
          />

          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={dict.nav.menuButton}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-4 md:hidden"
          aria-label={dict.nav.mobileNav}
        >
          <div className="mb-3 flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={dict.nav.searchPlaceholder}
              className="input-field py-2.5 pl-10 pr-4 text-sm"
              aria-label={dict.nav.search}
            />
          </div>
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
                  onClick={() => handleNav(item.category)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={BUSINESS.phoneTel}
                data-track="call"
                className="btn-primary w-full py-3 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" />
                {dict.nav.order} · {BUSINESS.phone}
              </a>
            </li>
            <li>
              <UberEatsButton className="w-full py-3 text-sm" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
