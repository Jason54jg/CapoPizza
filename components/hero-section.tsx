"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1604384847932-cff2a0b4cb64?auto=format&fit=crop&w=1200&q=80";

type HeroSectionProps = {
  onDiscoverPizzas: () => void;
};

export function HeroSection({ onDiscoverPizzas }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#e85d2c]/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#c41e1e]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 inline-flex rounded-full border border-[#e85d2c]/30 bg-[#e85d2c]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#e85d2c]">
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
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#e85d2c] to-[#c41e1e] px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-orange-900/30 transition hover:scale-[1.02] hover:brightness-110"
            >
              Découvrir nos Pizzas
            </button>
            <a
              href={BUSINESS.phoneTel}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-6 py-3.5 text-base font-semibold transition hover:border-[#e85d2c]/40"
            >
              <Phone className="h-5 w-5 text-[#e85d2c]" />
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
