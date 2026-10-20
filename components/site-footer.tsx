import { BUSINESS } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-28 border-t border-[var(--border-subtle)] bg-[var(--surface-muted)] py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold text-[var(--text-primary)]">
              Capo Pizza
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Pizzeria & restauration rapide à Neufchâteau (88300). Pizzas en
              priorité, burgers, tacos, pâtes et plus encore.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              <li>{BUSINESS.address}</li>
              <li>
                <a href={BUSINESS.phoneTel} className="font-semibold hover:text-[#e85d2c]">
                  {BUSINESS.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Réseaux sociaux
            </p>
            <ul className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
              <li>
                <a
                  href={BUSINESS.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 transition hover:border-[#e85d2c]/50"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 transition hover:border-[#e85d2c]/50"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.social.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 transition hover:border-[#e85d2c]/50"
                >
                  Snapchat {BUSINESS.social.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-center text-xs text-[var(--text-muted)]">
          © Capo Pizza — Pizzeria Neufchâteau · Pizza Neufchâteau 88300
        </p>
      </div>
    </footer>
  );
}
