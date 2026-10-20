import { OPENING_SLOTS } from "./business";

export type OpeningStatus = {
  isOpen: boolean;
  label: string;
  nextChangeLabel: string;
};

function toMinutes(h: number, m: number) {
  return h * 60 + m;
}

function formatTime(h: number, m: number) {
  return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

/** Statut d'ouverture basé sur l'heure locale du navigateur (Neufchâteau, fuseau Europe/Paris). */
export function getOpeningStatus(now = new Date()): OpeningStatus {
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
    startLabel: formatTime(slot.start.h, slot.start.m),
    endLabel: formatTime(slot.end.h, slot.end.m),
  }));

  for (const slot of slots) {
    if (current >= slot.start && current < slot.end) {
      return {
        isOpen: true,
        label: "Ouvert actuellement",
        nextChangeLabel: `Ferme à ${slot.endLabel}`,
      };
    }
  }

  const upcoming = slots.find((slot) => current < slot.start);
  if (upcoming) {
    return {
      isOpen: false,
      label: "Fermé",
      nextChangeLabel: `Ouvre à ${upcoming.startLabel}`,
    };
  }

  return {
    isOpen: false,
    label: "Fermé",
    nextChangeLabel: "Ouvre demain à 11h00",
  };
}
