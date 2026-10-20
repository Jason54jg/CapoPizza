import type { MenuItem } from "./menu-types";

export type CompositionFieldKind =
  | "single"
  | "multi"
  | "toggle"
  | "note";

export type CompositionField = {
  id: string;
  label: string;
  kind: CompositionFieldKind;
  options?: string[];
  /** Pour multi : nombre max (fixe ou selon autre champ) */
  max?: number;
  /** Pour multi : nombre min */
  min?: number;
  /** Clé d’un champ single dont la valeur détermine le max */
  maxFrom?: string;
  maxByValue?: Record<string, number>;
  required?: boolean;
  placeholder?: string;
};

export type CompositionSchema = {
  fields: CompositionField[];
  hint?: string;
};

export type CompositionChoices = Record<string, string | string[] | boolean>;

export const MEATS = [
  "Viande hachée",
  "Poulet",
  "Poulet curry",
  "Poulet tikka",
  "Kebab",
  "Merguez",
  "Cordon bleu",
  "Nuggets",
  "Tenders",
  "Steak",
  "Lardons",
  "Jambon de dinde",
  "Bacon",
  "Saumon",
  "Végétarien",
] as const;

export const SAUCES = [
  "Blanche",
  "Fromagère",
  "Algérienne",
  "Samouraï",
  "Barbecue",
  "Curry",
  "Ketchup",
  "Mayonnaise",
  "Andalouse",
  "Biggy",
  "Harissa",
  "Poivre",
] as const;

export const BREADS = ["Pain maison", "Tortilla", "Galette"] as const;

export const PIZZA_SIZES = ["Senior", "Méga"] as const;
export const TACOS_SIZES = ["M", "L", "XL", "XXL"] as const;
export const PASTA_TYPES = ["Penne", "Tagliatelle"] as const;

const TACOS_MEAT_COUNT: Record<string, number> = {
  M: 1,
  L: 2,
  XL: 3,
  XXL: 4,
};

const TACOS_EXTRAS = [
  "Cheddar",
  "Raclette",
  "Œuf",
  "Champignons",
  "Oignons frits",
  "Poivrons",
  "Salade",
];

function noteField(placeholder = "Précisions (sans oignons, bien cuit…)"): CompositionField {
  return {
    id: "note",
    label: "Précisions",
    kind: "note",
    placeholder,
  };
}

export function getCompositionSchema(item: MenuItem): CompositionSchema {
  const isPizza =
    item.category === "pizzas-tomate" || item.category === "pizzas-creme";

  if (isPizza) {
    return {
      hint: "Choisissez la taille — le tarif est confirmé au téléphone.",
      fields: [
        {
          id: "size",
          label: "Taille",
          kind: "single",
          options: [...PIZZA_SIZES],
          required: true,
        },
        noteField("Extras ou ingrédients à retirer"),
      ],
    };
  }

  if (item.id === "tacos-l-xxl") {
    return {
      hint: "M 1 viande · L 2 · XL 3 · XXL 4. Extras +1 €, gratiné +2 €.",
      fields: [
        {
          id: "size",
          label: "Taille",
          kind: "single",
          options: [...TACOS_SIZES],
          required: true,
        },
        {
          id: "meats",
          label: "Viandes",
          kind: "multi",
          options: [...MEATS],
          required: true,
          min: 1,
          maxFrom: "size",
          maxByValue: TACOS_MEAT_COUNT,
        },
        {
          id: "sauces",
          label: "Sauces",
          kind: "multi",
          options: [...SAUCES],
          required: true,
          min: 1,
          max: 2,
        },
        {
          id: "extras",
          label: "Extras (+1 €)",
          kind: "multi",
          options: TACOS_EXTRAS,
          max: 3,
        },
        {
          id: "gratine",
          label: "Gratiné (+2 €)",
          kind: "toggle",
        },
        noteField(),
      ],
    };
  }

  if (item.category === "sandwichs-tacos") {
    return {
      fields: [
        {
          id: "bread",
          label: "Pain",
          kind: "single",
          options: [...BREADS],
          required: true,
        },
        {
          id: "sauces",
          label: "Sauce",
          kind: "multi",
          options: [...SAUCES],
          max: 2,
        },
        noteField(),
      ],
    };
  }

  if (item.category === "burgers") {
    return {
      fields: [
        {
          id: "sauces",
          label: "Sauce",
          kind: "multi",
          options: [...SAUCES],
          max: 2,
        },
        noteField("Cuisson, sans cornichons…"),
      ],
    };
  }

  if (item.category === "pates") {
    return {
      fields: [
        {
          id: "pasta",
          label: "Pâtes",
          kind: "single",
          options: [...PASTA_TYPES],
          required: true,
        },
        noteField(),
      ],
    };
  }

  if (item.id === "assiette-mixte") {
    return {
      fields: [
        {
          id: "meats",
          label: "2 viandes",
          kind: "multi",
          options: [...MEATS],
          required: true,
          min: 2,
          max: 2,
        },
        {
          id: "sauces",
          label: "Sauce",
          kind: "multi",
          options: [...SAUCES],
          max: 2,
        },
        noteField(),
      ],
    };
  }

  if (item.id === "tex-mex") {
    return {
      fields: [
        {
          id: "product",
          label: "Produit",
          kind: "single",
          options: ["Tenders", "Wings", "Nuggets", "Mozza sticks"],
          required: true,
        },
        {
          id: "format",
          label: "Format",
          kind: "single",
          options: ["8 pièces", "12 pièces"],
          required: true,
        },
        {
          id: "sauces",
          label: "Sauce",
          kind: "multi",
          options: [...SAUCES],
          max: 2,
        },
      ],
    };
  }

  if (item.id === "menu-enfant") {
    return {
      fields: [
        {
          id: "main",
          label: "Plat",
          kind: "single",
          options: ["Burger", "6 nuggets", "4 tenders"],
          required: true,
        },
        {
          id: "sauces",
          label: "Sauce",
          kind: "multi",
          options: [...SAUCES],
          max: 1,
        },
      ],
    };
  }

  if (item.id === "cheese-naan" || item.id === "baguette-farcie") {
    return {
      fields: [
        {
          id: "meats",
          label: "Viande",
          kind: "multi",
          options: [...MEATS],
          required: true,
          min: 1,
          max: 1,
        },
        {
          id: "sauces",
          label: "Sauce",
          kind: "multi",
          options: [...SAUCES],
          required: true,
          min: 1,
          max: 1,
        },
        noteField(),
      ],
    };
  }

  if (item.id === "panini") {
    return {
      fields: [
        {
          id: "filling",
          label: "Garniture",
          kind: "single",
          options: [
            "4 fromages",
            "Viande hachée",
            "Merguez",
            "Saumon",
            "Jambon",
            "Poulet",
            "Lardons",
            "Kebab",
          ],
          required: true,
        },
        noteField(),
      ],
    };
  }

  if (item.id === "bowl") {
    return {
      hint: "M = 1 viande · L = 2 viandes",
      fields: [
        {
          id: "size",
          label: "Taille",
          kind: "single",
          options: ["M", "L"],
          required: true,
        },
        {
          id: "meats",
          label: "Viandes",
          kind: "multi",
          options: [...MEATS],
          required: true,
          min: 1,
          maxFrom: "size",
          maxByValue: { M: 1, L: 2 },
        },
        {
          id: "sauces",
          label: "Sauce",
          kind: "multi",
          options: [...SAUCES],
          max: 2,
        },
        noteField(),
      ],
    };
  }

  if (
    item.id === "crousty-tenders" ||
    item.id === "crousty-curry" ||
    item.category === "assiettes"
  ) {
    return {
      fields: [
        {
          id: "sauces",
          label: "Sauce",
          kind: "multi",
          options: [...SAUCES],
          max: 2,
        },
        noteField(),
      ],
    };
  }

  // Défaut : précisions libres
  return {
    fields: [noteField()],
  };
}

export function emptyChoices(schema: CompositionSchema): CompositionChoices {
  const choices: CompositionChoices = {};
  for (const field of schema.fields) {
    if (field.kind === "multi") choices[field.id] = [];
    else if (field.kind === "toggle") choices[field.id] = false;
    else choices[field.id] = "";
  }
  return choices;
}

export function getMultiMax(
  field: CompositionField,
  choices: CompositionChoices,
): number {
  if (field.maxFrom && field.maxByValue) {
    const key = String(choices[field.maxFrom] ?? "");
    return field.maxByValue[key] ?? field.max ?? 1;
  }
  return field.max ?? Infinity;
}

export function isCompositionValid(
  schema: CompositionSchema,
  choices: CompositionChoices,
): boolean {
  for (const field of schema.fields) {
    if (!field.required) continue;
    const value = choices[field.id];
    if (field.kind === "single") {
      if (!value || String(value).trim() === "") return false;
    } else if (field.kind === "multi") {
      const arr = Array.isArray(value) ? value : [];
      const max = getMultiMax(field, choices);
      const min = field.min ?? 1;
      if (arr.length < min || arr.length > max) return false;
    }
  }
  // Enforce max on optional multis too
  for (const field of schema.fields) {
    if (field.kind !== "multi") continue;
    const arr = Array.isArray(choices[field.id])
      ? (choices[field.id] as string[])
      : [];
    const max = getMultiMax(field, choices);
    if (arr.length > max) return false;
  }
  return true;
}

export function formatComposition(
  choices: CompositionChoices,
  fieldLabels?: Record<string, string>,
  translateValue?: (value: string) => string,
): string {
  const parts: string[] = [];
  const labels: Record<string, string> = {
    size: "Taille",
    meats: "Viandes",
    sauces: "Sauces",
    extras: "Extras",
    gratine: "Gratiné",
    bread: "Pain",
    pasta: "Pâtes",
    product: "Produit",
    format: "Format",
    main: "Plat",
    filling: "Garniture",
    note: "Note",
    ...fieldLabels,
  };
  const t = translateValue ?? ((v: string) => v);

  for (const [key, value] of Object.entries(choices)) {
    if (value === false || value === "" || value == null) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    const label = labels[key] ?? key;
    if (typeof value === "boolean") {
      if (value) parts.push(label);
    } else if (Array.isArray(value)) {
      parts.push(`${label} : ${value.map(t).join(", ")}`);
    } else {
      parts.push(`${label} : ${t(String(value))}`);
    }
  }
  return parts.join(" · ");
}
