"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { SeasonalHeroBadge } from "./seasonal-hero-badge";

const HERO_IMAGE = "/images/capo-store-hero.jpeg";

type HeroSectionProps = {
  onDiscoverPizzas: () => void;
};

export function HeroSection({ onDiscoverPizzas }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-32 top-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "var(--brand-glow)" }}
        />
        <div
          className="absolute -right-20 bottom-0 h-80 w-80 rounded-full blur-3xl opacity-80"
          style={{ background: "var(--brand-glow)" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SeasonalHeroBadge />
          <p className="mb-3 inline-flex rounded-full border border-[var(--brand-from)]/30 bg-[var(--brand-glow)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand-from)]">
            Pizzas artisanales · 7j/7
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-[3.25rem]">
            Pizzeria Capo Pizza à Neufchâteau
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Pizzas artisanales, burgers, tacos, pâtes et spécialités à emporter ou
            en livraison à domicile.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onDiscoverPizzas}
              className="brand-gradient inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold text-white shadow-xl transition hover:scale-[1.02] hover:brightness-110"
              style={{ boxShadow: "0 20px 40px var(--brand-glow)" }}
            >
              Découvrir nos Pizzas
            </button>
            <a
              href={BUSINESS.phoneTel}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-6 py-3.5 text-base font-semibold transition hover:border-[var(--brand-from)]/40"
            >
              <Phone className="h-5 w-5 text-[var(--brand-from)]" />
              {BUSINESS.phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-lg md:max-w-none"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-2xl shadow-black/20">
            <Image
              src={HERO_IMAGE}
              alt="Pizza artisanale Capo Pizza"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/45 p-4 backdrop-blur-md">
              <p className="text-sm font-medium text-white/90">
                Sur place · À emporter · Livraison
              </p>
              <p className="text-xs text-white/70">{BUSINESS.address}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
