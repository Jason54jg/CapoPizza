"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { useDict } from "./locale-provider";
import { SeasonalHeroBadge } from "./seasonal-hero-badge";

const HERO_IMAGE = "/images/capo-store-hero.jpeg";

type HeroSectionProps = {
  onDiscoverPizzas: () => void;
};

export function HeroSection({ onDiscoverPizzas }: HeroSectionProps) {
  const dict = useDict();

  return (
    <section className="relative border-b border-[var(--border-subtle)] pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SeasonalHeroBadge />
          <p className="eyebrow mb-4">{dict.hero.eyebrow}</p>
          <h1 className="font-display text-[2.35rem] leading-[1.12] text-[var(--text-primary)] md:text-5xl lg:text-[3.125rem]">
            Capo Pizza
          </h1>
          <p className="mt-3 text-lg text-[var(--text-secondary)] md:text-xl">
            {dict.hero.lead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onDiscoverPizzas}
              className="btn-primary px-6 py-3.5 text-base"
            >
              {dict.hero.ctaMenu}
            </button>
            <a
              href={BUSINESS.phoneTel}
              className="btn-secondary px-6 py-3.5 text-base"
            >
              <Phone className="h-5 w-5 text-brand" />
              {BUSINESS.phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative mx-auto w-full max-w-lg md:max-w-none"
        >
          <div className="card-surface relative aspect-[4/3] overflow-hidden p-0">
            <Image
              src={HERO_IMAGE}
              alt={dict.hero.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-5 pb-5 pt-16">
              <p className="text-sm font-medium text-white/95">
                {dict.hero.modes}
              </p>
              <p className="mt-0.5 text-xs text-white/75">{BUSINESS.address}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
