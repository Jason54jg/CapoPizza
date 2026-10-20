"use client";

import { motion } from "framer-motion";
import { CreditCard, ShoppingBag, Truck } from "lucide-react";
import { BUSINESS, PAYMENT_NOTE, PIZZA_OFFERS } from "@/lib/business";

const MODE_ICON = {
  emporter: ShoppingBag,
  livraison: Truck,
} as const;

export function OffersSection() {
  return (
    <section
      id="offres"
      className="scroll-mt-24 relative overflow-hidden border-y border-[var(--border-subtle)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(165deg,var(--surface-muted)_0%,var(--surface-base)_45%,color-mix(in_srgb,var(--brand-primary)_6%,var(--surface-base))_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[var(--brand-primary)] opacity-[0.07] blur-3xl"
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
          <p className="eyebrow mb-3">Ouvert 7j/7 · Pizzas</p>
          <h2 className="font-display text-4xl leading-tight text-[var(--text-primary)] md:text-5xl lg:text-[3.25rem]">
            Nos offres du moment
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-[var(--text-secondary)] md:text-lg">
            À emporter ou en livraison — dites-le au{" "}
            <a
              href={BUSINESS.phoneTel}
              className="font-semibold text-brand hover:underline"
            >
              {BUSINESS.phone}
            </a>
            .
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {PIZZA_OFFERS.map((offer, i) => {
            const Icon = MODE_ICON[offer.id];
            return (
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
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_srgb,var(--brand-primary)_16%,transparent),transparent_55%)] transition-opacity group-hover:opacity-100"
                />
                <div className="relative">
                  <p className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                    <Icon className="h-3.5 w-3.5" />
                    {offer.mode} 7j/7
                  </p>
                  <h3 className="mt-5 font-display text-3xl leading-[1.15] text-[var(--text-primary)] md:text-[2.15rem]">
                    {offer.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                    {offer.detail}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)]"
        >
          <CreditCard className="h-4 w-4 shrink-0 text-brand" />
          {PAYMENT_NOTE}
        </motion.p>
      </div>
    </section>
  );
}
