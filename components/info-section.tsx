import { Clock, MapPin, Phone } from "lucide-react";
import { BUSINESS, OPENING_LABEL } from "@/lib/business";

export function InfoSection() {
  return (
    <section id="infos" className="scroll-mt-28 border-t border-[var(--border-subtle)] py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#e85d2c]">
            Infos pratiques
          </p>
          <h2 className="font-display mt-1 text-3xl font-bold text-[var(--text-primary)]">
            Horaires & accès
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#e85d2c]" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Horaires</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {OPENING_LABEL}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#e85d2c]" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Adresse</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {BUSINESS.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-[#e85d2c] hover:underline"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#e85d2c]" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">Téléphone</h3>
                  <a
                    href={BUSINESS.phoneTel}
                    className="mt-1 block text-lg font-bold text-[var(--text-primary)] hover:text-[#e85d2c]"
                  >
                    {BUSINESS.phone}
                  </a>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Sur place, à emporter et livraison
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] shadow-xl">
            <iframe
              title="Capo Pizza sur Google Maps"
              src={`https://maps.google.com/maps?q=${BUSINESS.mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="h-[min(420px,60vh)] w-full grayscale-[30%] contrast-[1.05] dark:invert-[0.85] dark:hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
