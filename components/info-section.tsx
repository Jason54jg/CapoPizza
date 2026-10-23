"use client";

import { Clock, CreditCard, MapPin, Phone } from "lucide-react";
import { BUSINESS, OPENING_LINES } from "@/lib/business";
import { useDict } from "./locale-provider";

export function InfoSection() {
  const dict = useDict();

  return (
    <section
      id="infos"
      className="scroll-mt-28 py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 md:max-w-xl">
          <p className="eyebrow mb-3">{dict.info.eyebrow}</p>
          <h2 className="font-display text-3xl text-[var(--text-primary)] md:text-4xl">
            {dict.info.title}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="card-surface p-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {dict.info.open7}
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
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {dict.info.address}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {BUSINESS.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`}
                    data-track="directions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
                  >
                    {dict.info.openMaps}
                  </a>
                </div>
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {dict.info.phone}
                  </h3>
                  <a
                    href={BUSINESS.phoneTel}
                    data-track="call"
                    className="mt-1 block text-lg font-semibold text-[var(--text-primary)] hover:text-brand"
                  >
                    {BUSINESS.phone}
                  </a>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {dict.info.phoneHint}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface p-5">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {dict.info.payment}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {dict.offers.payment}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[min(360px,55vh)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
            <iframe
              title={dict.info.mapsTitle}
              src={`https://maps.google.com/maps?q=${BUSINESS.mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
