import type { Locale } from "./config";

export type Dictionary = {
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    ogTitle: string;
  };
  nav: {
    offers: string;
    menu: string;
    hours: string;
    contact: string;
    order: string;
    mainNav: string;
    mobileNav: string;
    search: string;
    searchPlaceholder: string;
    searchPlaceholderShort: string;
    openSearch: string;
    lightMode: string;
    darkMode: string;
    menuButton: string;
  };
  hero: {
    eyebrow: string;
    lead: string;
    ctaMenu: string;
    imageAlt: string;
    modes: string;
  };
  offers: {
    eyebrow: string;
    title: string;
    leadBefore: string;
    leadAfter: string;
    emporterMode: string;
    emporterTitle: string;
    emporterDetail: string;
    livraisonMode: string;
    livraisonTitle: string;
    livraisonDetail: string;
    payment: string;
  };
  menu: {
    specialty: string;
    card: string;
    artisanPizzas: string;
    menuTitle: string;
    searchResults: string;
    intro: string;
    mySelection: string;
    empty: string;
    categoriesAria: string;
    compose: string;
    add: string;
    selected: string;
    details: string;
    signature: string;
    includes: string;
    new: string;
  };
  composer: {
    title: string;
    chooseSizeFirst: string;
    addToSelection: string;
    call: string;
    alreadyIn: string;
    alreadyInSuffix: string;
    close: string;
  };
  selection: {
    title: string;
    subtitle: string;
    empty: string;
    articles: string;
    total: string;
    totalHint: string;
    copy: string;
    copied: string;
    call: string;
    clear: string;
    remove: string;
  };
  info: {
    eyebrow: string;
    title: string;
    open7: string;
    address: string;
    openMaps: string;
    phone: string;
    phoneHint: string;
    payment: string;
    mapsTitle: string;
  };
  footer: {
    blurb: string;
    contact: string;
    networks: string;
  };
  status: {
    open: string;
    closed: string;
    hours: string;
    openNow: string;
    closesAt: string;
    opensAt: string;
    opensTomorrow: string;
  };
  diet: {
    vegetarian: string;
    spicy: string;
    gourmet: string;
  };
  categories: Record<
    string,
    { label: string; shortLabel: string }
  >;
  fields: Record<string, string>;
  priceDisclaimer: string;
  seasonal: {
    halloween: string;
    christmas: string;
  };
  lang: {
    switchTo: string;
    fr: string;
    en: string;
  };
};

const fr: Dictionary = {
  meta: {
    title: "Capo Pizza | Pizzeria Neufchâteau (88300)",
    titleTemplate: "%s | Capo Pizza Neufchâteau",
    description:
      "Capo Pizza, pizzeria à Neufchâteau (88300) : pizzas artisanales, burgers, tacos et pâtes. Commander pizza Neufchâteau — à emporter et livraison. Appelez le 03 55 01 67 39.",
    ogTitle: "Capo Pizza — Pizzeria à Neufchâteau",
  },
  nav: {
    offers: "Offres",
    menu: "La carte",
    hours: "Horaires",
    contact: "Contact",
    order: "Commander",
    mainNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    search: "Recherche dans la carte",
    searchPlaceholder: "Rechercher une pizza, un burger…",
    searchPlaceholderShort: "Pizza, burger…",
    openSearch: "Ouvrir la recherche",
    lightMode: "Activer le mode clair",
    darkMode: "Activer le mode sombre",
    menuButton: "Menu",
  },
  hero: {
    eyebrow: "Pizzeria · Neufchâteau · 7j/7",
    lead: "Pizzas artisanales, burgers, tacos et pâtes — sur place, à emporter ou en livraison.",
    ctaMenu: "Voir la carte",
    imageAlt: "Devanture Capo Pizza, Neufchâteau",
    modes: "Sur place · À emporter · Livraison",
  },
  offers: {
    eyebrow: "Ouvert 7j/7 · Pizzas",
    title: "Nos offres du moment",
    leadBefore: "À emporter ou en livraison — dites-le au",
    leadAfter: ".",
    emporterMode: "À emporter 7j/7",
    emporterTitle: "2 achetées, la 3ᵉ à −50 %",
    emporterDetail:
      "Sauf Margherita. La moins chère est à −50 %. Offre non cumulable.",
    livraisonMode: "En livraison 7j/7",
    livraisonTitle: "3 achetées, la 4ᵉ offerte",
    livraisonDetail:
      "Sauf Margherita. La moins chère est offerte. Offre non cumulable.",
    payment: "CB acceptée en livraison",
  },
  menu: {
    specialty: "Spécialité",
    card: "Carte",
    artisanPizzas: "Nos Pizzas Artisanales",
    menuTitle: "Menu Capo Pizza",
    searchResults: "Résultats de recherche",
    intro:
      "Filtrez par catégorie, ingrédient ou envie. Commandez par téléphone — pas de paiement en ligne, simplicité et rapidité.",
    mySelection: "Ma sélection",
    empty:
      "Aucun plat ne correspond à votre recherche. Essayez un autre mot-clé ou retirez les filtres.",
    categoriesAria: "Catégories du menu",
    compose: "Composer",
    add: "Ajouter",
    selected: "Sélectionné",
    details: "Détails",
    signature: "Signature",
    includes: "Inclus",
    new: "Nouveau",
  },
  composer: {
    title: "Composer votre commande",
    chooseSizeFirst: "Choisissez d'abord la taille.",
    addToSelection: "Ajouter à ma sélection",
    call: "Appeler",
    alreadyIn: "Déjà",
    alreadyInSuffix: "× dans votre sélection — vous pouvez en ajouter un autre.",
    close: "Fermer",
  },
  selection: {
    title: "Ma sélection",
    subtitle: "Composez votre commande avant d’appeler",
    empty:
      "Composez un plat (taille, viandes, sauces…) puis ajoutez-le à votre sélection.",
    articles: "article",
    total: "Total estimé",
    totalHint: "Certains tarifs se confirment au téléphone",
    copy: "Copier le récapitulatif",
    copied: "Recap copié !",
    call: "Appeler pour commander",
    clear: "Vider la sélection",
    remove: "Retirer",
  },
  info: {
    eyebrow: "Infos pratiques",
    title: "Horaires & accès",
    open7: "Ouvert 7j/7",
    address: "Adresse",
    openMaps: "Ouvrir dans Google Maps",
    phone: "Téléphone",
    phoneHint: "Sur place, à emporter et livraison",
    payment: "Paiement",
    mapsTitle: "Capo Pizza sur Google Maps",
  },
  footer: {
    blurb: "Pizza au feu de bois — Neufchâteau (88300). Ouvert 7j/7.",
    contact: "Contact",
    networks: "Réseaux",
  },
  status: {
    open: "Ouvert",
    closed: "Fermé",
    hours: "Horaires",
    openNow: "Ouvert actuellement",
    closesAt: "Ferme à",
    opensAt: "Ouvre à",
    opensTomorrow: "Ouvre demain à 11h00",
  },
  diet: {
    vegetarian: "Végétarien",
    spicy: "Épicé",
    gourmet: "Gourmand",
  },
  categories: {
    "pizzas-tomate": { label: "Pizzas Tomate", shortLabel: "Tomate" },
    "pizzas-creme": { label: "Pizzas Crème", shortLabel: "Crème" },
    burgers: { label: "Burgers", shortLabel: "Burgers" },
    "sandwichs-tacos": { label: "Sandwichs & Tacos", shortLabel: "Tacos" },
    pates: { label: "Pâtes", shortLabel: "Pâtes" },
    salades: { label: "Salades", shortLabel: "Salades" },
    assiettes: { label: "Assiettes & Tex-Mex", shortLabel: "Assiettes" },
    specialites: { label: "Spécialités", shortLabel: "Spécialités" },
    desserts: { label: "Desserts", shortLabel: "Desserts" },
  },
  fields: {
    size: "Taille",
    meats: "Viandes",
    sauces: "Sauces",
    extras: "Extras (+1 €)",
    gratine: "Gratiné (+2 €)",
    bread: "Pain",
    pasta: "Pâtes",
    product: "Produit",
    format: "Format",
    main: "Plat",
    filling: "Garniture",
    note: "Précisions",
  },
  priceDisclaimer:
    "Tarifs indicatifs (carte / sur place). Tailles et suppléments : confirmez au 03 55 01 67 39.",
  seasonal: {
    halloween: "Halloween",
    christmas: "Fêtes de fin d’année",
  },
  lang: {
    switchTo: "Language",
    fr: "FR",
    en: "EN",
  },
};

const en: Dictionary = {
  meta: {
    title: "Capo Pizza | Pizzeria in Neufchâteau (88300)",
    titleTemplate: "%s | Capo Pizza Neufchâteau",
    description:
      "Capo Pizza, pizzeria in Neufchâteau (88300): wood-fired pizzas, burgers, tacos and pasta. Order for takeaway or delivery. Call 03 55 01 67 39.",
    ogTitle: "Capo Pizza — Pizzeria in Neufchâteau",
  },
  nav: {
    offers: "Offers",
    menu: "Menu",
    hours: "Hours",
    contact: "Contact",
    order: "Order",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    search: "Search the menu",
    searchPlaceholder: "Search for a pizza, burger…",
    searchPlaceholderShort: "Pizza, burger…",
    openSearch: "Open search",
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
    menuButton: "Menu",
  },
  hero: {
    eyebrow: "Pizzeria · Neufchâteau · Open 7 days",
    lead: "Wood-fired pizzas, burgers, tacos and pasta — dine in, takeaway or delivery.",
    ctaMenu: "See the menu",
    imageAlt: "Capo Pizza storefront, Neufchâteau",
    modes: "Dine in · Takeaway · Delivery",
  },
  offers: {
    eyebrow: "Open 7 days · Pizzas",
    title: "Current pizza deals",
    leadBefore: "Takeaway or delivery — tell us when you call",
    leadAfter: ".",
    emporterMode: "Takeaway 7 days",
    emporterTitle: "Buy 2, get the 3rd at −50%",
    emporterDetail:
      "Except Margherita. The cheapest pizza is −50%. Offer not combinable.",
    livraisonMode: "Delivery 7 days",
    livraisonTitle: "Buy 3, get the 4th free",
    livraisonDetail:
      "Except Margherita. The cheapest pizza is free. Offer not combinable.",
    payment: "Card accepted on delivery",
  },
  menu: {
    specialty: "Specialty",
    card: "Menu",
    artisanPizzas: "Our Artisan Pizzas",
    menuTitle: "Capo Pizza Menu",
    searchResults: "Search results",
    intro:
      "Filter by category, ingredient or craving. Order by phone — no online payment, simple and fast.",
    mySelection: "My selection",
    empty:
      "No dish matches your search. Try another keyword or clear the filters.",
    categoriesAria: "Menu categories",
    compose: "Customize",
    add: "Add",
    selected: "Selected",
    details: "Details",
    signature: "Signature",
    includes: "Includes",
    new: "New",
  },
  composer: {
    title: "Customize your order",
    chooseSizeFirst: "Choose a size first.",
    addToSelection: "Add to my selection",
    call: "Call",
    alreadyIn: "Already",
    alreadyInSuffix: "× in your selection — you can add another.",
    close: "Close",
  },
  selection: {
    title: "My selection",
    subtitle: "Build your order before calling",
    empty:
      "Customize a dish (size, meats, sauces…) then add it to your selection.",
    articles: "item",
    total: "Estimated total",
    totalHint: "Some prices are confirmed by phone",
    copy: "Copy order summary",
    copied: "Summary copied!",
    call: "Call to order",
    clear: "Clear selection",
    remove: "Remove",
  },
  info: {
    eyebrow: "Practical info",
    title: "Hours & location",
    open7: "Open 7 days a week",
    address: "Address",
    openMaps: "Open in Google Maps",
    phone: "Phone",
    phoneHint: "Dine in, takeaway and delivery",
    payment: "Payment",
    mapsTitle: "Capo Pizza on Google Maps",
  },
  footer: {
    blurb: "Wood-fired pizza — Neufchâteau (88300). Open 7 days.",
    contact: "Contact",
    networks: "Social",
  },
  status: {
    open: "Open",
    closed: "Closed",
    hours: "Hours",
    openNow: "Open now",
    closesAt: "Closes at",
    opensAt: "Opens at",
    opensTomorrow: "Opens tomorrow at 11:00",
  },
  diet: {
    vegetarian: "Vegetarian",
    spicy: "Spicy",
    gourmet: "Gourmet",
  },
  categories: {
    "pizzas-tomate": { label: "Tomato pizzas", shortLabel: "Tomato" },
    "pizzas-creme": { label: "Cream pizzas", shortLabel: "Cream" },
    burgers: { label: "Burgers", shortLabel: "Burgers" },
    "sandwichs-tacos": { label: "Sandwiches & Tacos", shortLabel: "Tacos" },
    pates: { label: "Pasta", shortLabel: "Pasta" },
    salades: { label: "Salads", shortLabel: "Salads" },
    assiettes: { label: "Plates & Tex-Mex", shortLabel: "Plates" },
    specialites: { label: "Specials", shortLabel: "Specials" },
    desserts: { label: "Desserts", shortLabel: "Desserts" },
  },
  fields: {
    size: "Size",
    meats: "Meats",
    sauces: "Sauces",
    extras: "Extras (+€1)",
    gratine: "Gratiné (+€2)",
    bread: "Bread",
    pasta: "Pasta",
    product: "Product",
    format: "Format",
    main: "Main",
    filling: "Filling",
    note: "Notes",
  },
  priceDisclaimer:
    "Indicative prices (menu / dine-in). Sizes and extras: confirm on 03 55 01 67 39.",
  seasonal: {
    halloween: "Halloween",
    christmas: "Holiday season",
  },
  lang: {
    switchTo: "Langue",
    fr: "FR",
    en: "EN",
  },
};

const DICTS: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTS[locale] ?? fr;
}
