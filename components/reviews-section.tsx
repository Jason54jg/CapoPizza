"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { IS_STATIC_EXPORT } from "@/lib/base-path";
import {
  getGoogleReviews,
  type GoogleReviewItem,
} from "@/lib/google-reviews";
import { useDict, useLocale } from "./locale-provider";

const POLL_MS = 5 * 60 * 1000;

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const px = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <span key={i} className={`relative inline-block ${px}`}>
            <Star className={`${px} fill-stone-300 text-stone-300 dark:fill-stone-600 dark:text-stone-600`} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${px} fill-[#fbbc04] text-[#fbbc04]`} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReviewItem }) {
  const initial = review.author.trim().charAt(0).toUpperCase() || "?";
  return (
    <article className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-3">
        {review.profilePhotoUrl ? (
          <img
            src={review.profilePhotoUrl}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-muted)] font-display text-sm font-semibold text-[var(--text-primary)]">
            {initial}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {review.author}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-2">
            <Stars rating={review.rating} size="sm" />
            {review.relativeTime ? (
              <span className="text-[11px] text-[var(--text-muted)]">
                {review.relativeTime}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      {review.text ? (
        <p className="line-clamp-6 text-sm leading-relaxed text-[var(--text-secondary)]">
          {review.text}
        </p>
      ) : null}
    </article>
  );
}

export function ReviewsSection() {
  const dict = useDict();
  const locale = useLocale();
  const initial = getGoogleReviews();
  const [rating, setRating] = useState(initial.rating);
  const [count, setCount] = useState(initial.reviewCount);
  const [updatedAt, setUpdatedAt] = useState<string | null>(initial.updatedAt);
  const [reviews, setReviews] = useState<GoogleReviewItem[]>(initial.reviews);
  const mapsUrl = initial.mapsUrl;

  useEffect(() => {
    // Export statique : pas d’/api, on garde le snapshot du build
    // (rafraîchi chaque jour par le workflow GitHub Pages).
    if (IS_STATIC_EXPORT) return;

    let cancelled = false;

    async function refresh() {
      try {
        const res = await fetch("/api/google-reviews", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as {
          rating?: number;
          reviewCount?: number;
          updatedAt?: string | null;
          reviews?: GoogleReviewItem[];
        };
        if (
          cancelled ||
          typeof data.rating !== "number" ||
          typeof data.reviewCount !== "number"
        ) {
          return;
        }
        setRating(data.rating);
        setCount(data.reviewCount);
        setUpdatedAt(data.updatedAt ?? new Date().toISOString());
        if (Array.isArray(data.reviews) && data.reviews.length) {
          setReviews(data.reviews);
        }
      } catch {
        /* serveur indisponible : garder le snapshot */
      }
    }

    void refresh();
    const id = window.setInterval(() => void refresh(), POLL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const ratingLabel =
    locale === "en"
      ? rating.toFixed(1)
      : rating.toFixed(1).replace(".", ",");

  const highlights = [
    dict.reviews.highlightTaste,
    dict.reviews.highlightService,
    dict.reviews.highlightValue,
  ];

  const shownReviews = reviews.slice(0, 3);

  return (
    <section
      id="avis"
      className="scroll-mt-28 border-t border-[var(--border-subtle)] py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="mb-10 md:mb-12 md:max-w-2xl"
        >
          <p className="eyebrow mb-3">{dict.reviews.eyebrow}</p>
          <h2 className="font-display text-3xl text-[var(--text-primary)] md:text-4xl">
            {dict.reviews.title}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">{dict.reviews.lead}</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[1.35rem] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-7 shadow-[var(--shadow-soft)] md:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#fbbc04]/15 blur-2xl"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex flex-col items-start">
                <p className="font-display text-6xl font-bold tabular-nums leading-none text-[var(--text-primary)] md:text-7xl">
                  {ratingLabel}
                </p>
                <div className="mt-3">
                  <Stars rating={rating} size="lg" />
                </div>
                <p className="mt-3 text-sm font-medium text-[var(--text-secondary)]">
                  {dict.reviews.basedOn.replace("{count}", String(count))}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </p>
              </div>

              <div className="min-w-0 flex-1 space-y-3 border-t border-[var(--border-subtle)] pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                {highlights.map((text) => (
                  <div key={text} className="flex items-start gap-2.5">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 fill-[#fbbc04] text-[#fbbc04]" />
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="flex flex-col justify-between gap-6 rounded-[1.35rem] border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-7 md:p-8"
          >
            <div>
              <h3 className="font-display text-2xl text-[var(--text-primary)]">
                {dict.reviews.ctaTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {dict.reviews.ctaLead}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full px-5 py-3 text-sm"
              >
                {dict.reviews.seeAll}
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full px-5 py-3 text-sm"
              >
                {dict.reviews.leaveReview}
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {dict.reviews.disclaimer}
              {updatedAt
                ? ` · ${new Date(updatedAt).toLocaleDateString(
                    locale === "en" ? "en-GB" : "fr-FR",
                  )}`
                : ""}
            </p>
          </motion.div>
        </div>

        {shownReviews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-8 md:mt-10"
          >
            <h3 className="mb-6 font-display text-xl text-[var(--text-primary)] md:text-2xl">
              {dict.reviews.latestTitle}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownReviews.map((review, i) => (
                <ReviewCard
                  key={`${review.author}-${review.relativeTime}-${i}`}
                  review={review}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
