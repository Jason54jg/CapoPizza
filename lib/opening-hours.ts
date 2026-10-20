import { OPENING_SLOTS } from "./business";
import type { Locale } from "./i18n/config";
import { getDictionary } from "./i18n/dictionary";

export type OpeningStatus = {
  isOpen: boolean;
  label: string;
  nextChangeLabel: string;
};

function toMinutes(h: number, m: number) {
  return h * 60 + m;
}

function formatTime(h: number, m: number, locale: Locale) {
  if (locale === "en") {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

/** Opening status (Europe/Paris). */
export function getOpeningStatus(
  now = new Date(),
  locale: Locale = "fr",
): OpeningStatus {
  const dict = getDictionary(locale);
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const current = toMinutes(hour, minute);

  const slots = OPENING_SLOTS.map((slot) => ({
    start: toMinutes(slot.start.h, slot.start.m),
    end: toMinutes(slot.end.h, slot.end.m),
    startLabel: formatTime(slot.start.h, slot.start.m, locale),
    endLabel: formatTime(slot.end.h, slot.end.m, locale),
  }));

  for (const slot of slots) {
    if (current >= slot.start && current < slot.end) {
      return {
        isOpen: true,
        label: dict.status.openNow,
        nextChangeLabel: `${dict.status.closesAt} ${slot.endLabel}`,
      };
    }
  }

  const upcoming = slots.find((slot) => current < slot.start);
  if (upcoming) {
    return {
      isOpen: false,
      label: dict.status.closed,
      nextChangeLabel: `${dict.status.opensAt} ${upcoming.startLabel}`,
    };
  }

  return {
    isOpen: false,
    label: dict.status.closed,
    nextChangeLabel: dict.status.opensTomorrow,
  };
}
