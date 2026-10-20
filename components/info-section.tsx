import { Clock, CreditCard, MapPin, Phone } from "lucide-react";
import { BUSINESS, OPENING_LINES, PAYMENT_NOTE } from "@/lib/business";

export function InfoSection() {
  return (
    <section id="infos" className="scroll-mt-28 border-t border-[var(--border-subtle)] bg-[var(--surface-muted)] py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 md:max-w-xl">
          <p className="eyebrow mb-3">Infos pratiques</p>
          <h2 className="font-display text-3xl text-[var(--text-primary)] md:text-4xl">
            Horaires & accès
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="card-surface p-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    Ouvert 7j/7
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
                    {OPENING_LINES.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Adresse</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {BUSINESS.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Téléphone</h3>
                  <a
                    href={BUSINESS.phoneTel}
                    className="mt-1 block text-lg font-semibold text-[var(--text-primary)] hover:text-brand"
                  >
                    {BUSINESS.phone}
                  </a>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Sur place, à emporter et livraison
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Paiement</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {PAYMENT_NOTE}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-surface overflow-hidden p-0">
            <iframe
              title="Capo Pizza sur Google Maps"
              src={`https://maps.google.com/maps?q=${BUSINESS.mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="h-[min(420px,60vh)] w-full grayscale-[20%] contrast-[1.02] dark:invert-[0.88] dark:hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
