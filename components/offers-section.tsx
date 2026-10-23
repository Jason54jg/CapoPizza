"use client";

import { motion } from "framer-motion";
import { CreditCard, ShoppingBag, Truck } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { useDict } from "./locale-provider";

export function OffersSection() {
  const dict = useDict();

  const offers = [
    {
      id: "emporter" as const,
      Icon: ShoppingBag,
      mode: dict.offers.emporterMode,
      title: dict.offers.emporterTitle,
      detail: dict.offers.emporterDetail,
    },
    {
      id: "livraison" as const,
      Icon: Truck,
      mode: dict.offers.livraisonMode,
      title: dict.offers.livraisonTitle,
      detail: dict.offers.livraisonDetail,
    },
  ];

  return (
    <section
      id="offres"
      className="scroll-mt-24 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--brand-primary)] opacity-[0.08] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[var(--accent-secondary)] opacity-[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center md:mb-12"
        >
          <p className="eyebrow mb-3">{dict.offers.eyebrow}</p>
          <h2 className="font-display text-4xl leading-tight text-[var(--text-primary)] md:text-5xl lg:text-[3.25rem]">
            {dict.offers.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-[var(--text-secondary)] md:text-lg">
            {dict.offers.leadBefore}{" "}
            <a
              href={BUSINESS.phoneTel}
              data-track="call"
              className="font-semibold text-brand hover:underline"
            >
              {BUSINESS.phone}
            </a>
            {dict.offers.leadAfter}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {offers.map((offer, i) => (
            <motion.article
              key={offer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="group relative overflow-hidden rounded-[1.35rem] border-2 border-[color-mix(in_srgb,var(--brand-primary)_45%,var(--border-subtle))] bg-[var(--surface-elevated)] p-7 shadow-[var(--shadow-lift)] md:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--brand-primary)_16%,transparent),transparent_55%)]"
              />
              <div className="relative">
                <p className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  <offer.Icon className="h-3.5 w-3.5" />
                  {offer.mode}
                </p>
                <h3 className="mt-5 font-display text-3xl leading-[1.15] text-[var(--text-primary)] md:text-[2.15rem]">
                  {offer.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                  {offer.detail}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)]"
        >
          <CreditCard className="h-4 w-4 shrink-0 text-brand" />
          {dict.offers.payment}
        </motion.p>
      </div>
    </section>
  );
}
