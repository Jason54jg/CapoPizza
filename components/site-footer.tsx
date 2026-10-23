"use client";

import { BUSINESS } from "@/lib/business";
import { useDict } from "./locale-provider";
import { Logo } from "./logo";

export function SiteFooter() {
  const dict = useDict();

  return (
    <footer
      id="contact"
      className="scroll-mt-28 py-12"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo size="lg" />
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {dict.footer.blurb}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">{dict.footer.contact}</p>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>{BUSINESS.address}</li>
              <li>
                <a
                  href={BUSINESS.phoneTel}
                  className="font-semibold text-[var(--text-primary)] hover:text-brand"
                >
                  {BUSINESS.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">{dict.footer.networks}</p>
            <ul className="flex flex-col gap-2 text-sm font-medium">
              <li>
                <a
                  href={BUSINESS.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-brand"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-brand"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.social.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-brand"
                >
                  Snapchat
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 pt-6 text-center text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} Capo Pizza — Neufchâteau (88300).{" "}
          {dict.footer.rights}
        </p>
        <p className="mt-2 text-center text-xs text-[var(--text-muted)]">
          {dict.footer.madeBy}{" "}
          <a
            href="https://github.com/Jason54jg"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--text-secondary)] hover:text-brand"
          >
            Jason
          </a>
        </p>
      </div>
    </footer>
  );
}
