export const BUSINESS = {
  name: "Capo Pizza",
  tagline: "Pizzeria & Restauration rapide",
  phone: "03 55 01 67 39",
  phoneTel: "tel:0355016739",
  phoneHref: "0355016739",
  address: "11 Rue de France, 88300 Neufchâteau",
  addressStreet: "11 Rue de France",
  postalCode: "88300",
  city: "Neufchâteau",
  activity:
    "Sur place, à emporter et livraison à domicile — pizzas artisanales, burgers, tacos, pâtes et spécialités.",
  social: {
    facebook: "https://www.facebook.com/share/1Hv2XTBE5x/",
    instagram: "https://www.instagram.com/capopizza88",
    snapchat: "https://www.snapchat.com/add/Capopizza88",
  },
  mapsQuery: "Capo+Pizza,+11+Rue+de+France,+88300+Neufchâteau",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2645.8!2d5.605!3d48.355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTFrIFJ1ZSBkZSBGcmFuY2UsIDg4MzAwIE5ldWZjaMOidGVhdQ!5e0!3m2!1sfr!2sfr!4v1",
  /** Fallback note Google si data/google-reviews.json n’est pas rafraîchi */
  googleRating: 4.4,
  googleReviewCount: 152,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Capo+Pizza,+11+Rue+de+France,+88300+Neufch%C3%A2teau",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Capo+Pizza,+11+Rue+de+France,+88300+Neufch%C3%A2teau",
} as const;

export const OPENING_SLOTS = [
  { start: { h: 11, m: 0 }, end: { h: 14, m: 30 } },
  { start: { h: 18, m: 0 }, end: { h: 23, m: 0 } },
] as const;

export const OPENING_LABEL =
  "Ouvert 7j/7 — 11h00 – 14h30 et 18h00 – 23h00";

export const OPENING_LINES = [
  "11h00 – 14h30",
  "18h00 – 23h00",
] as const;

/** Offres pizzas (conditions affichées telles quelles sur le support print) */
export const PIZZA_OFFERS = [
  {
    id: "emporter",
    mode: "À emporter",
    title: "2 achetées, la 3ᵉ à −50 %",
    detail:
      "Sauf Margherita. La moins chère est à −50 %. Offre non cumulable.",
  },
  {
    id: "livraison",
    mode: "En livraison",
    title: "3 achetées, la 4ᵉ offerte",
    detail:
      "Sauf Margherita. La moins chère est offerte. Offre non cumulable.",
  },
] as const;

export const PAYMENT_NOTE = "CB acceptée en livraison";
