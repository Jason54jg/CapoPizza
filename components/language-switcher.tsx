"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { useDict, useLocale } from "./locale-provider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const dict = useDict();
  const pathname = usePathname() || "/";

  const hrefFor = (next: Locale) => {
    const parts = pathname.split("/").filter(Boolean);
    // [locale] or [basePath, locale] — with basePath Next strips it from usePathname
    if (parts.length && LOCALES.includes(parts[0] as Locale)) {
      parts[0] = next;
      return `/${parts.join("/")}/`;
    }
    return `/${next}/`;
  };

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-[var(--border-subtle)] p-0.5 text-xs font-bold ${className}`}
      role="group"
      aria-label={dict.lang.switchTo}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={hrefFor(code)}
            className={`rounded-md px-2 py-1 transition ${
              active
                ? "bg-[var(--brand-primary)] text-[var(--brand-on-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
          >
            {code === "fr" ? dict.lang.fr : dict.lang.en}
          </Link>
        );
      })}
    </div>
  );
}
