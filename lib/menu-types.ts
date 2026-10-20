export type DietTag = "vegetarian" | "spicy" | "gourmet";

export type MenuCategoryId =
  | "pizzas-tomate"
  | "pizzas-creme"
  | "burgers"
  | "sandwichs-tacos"
  | "pates"
  | "salades"
  | "assiettes"
  | "specialites"
  | "desserts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategoryId;
  tags: DietTag[];
  /** Photo produit — absente en attendant des visuels HD */
  image?: string;
  highlight?: boolean;
  /** Badge « Nouveau » comme sur la carte papier */
  isNew?: boolean;
  /** Ce qui est compris dans le prix (ex. frites + boisson) */
  includes?: string;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
  emoji: string;
};

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "pizzas-tomate", label: "Pizzas Tomate", shortLabel: "Tomate", emoji: "🍅" },
  { id: "pizzas-creme", label: "Pizzas Crème", shortLabel: "Crème", emoji: "🧀" },
  { id: "burgers", label: "Burgers", shortLabel: "Burgers", emoji: "🍔" },
  {
    id: "sandwichs-tacos",
    label: "Sandwichs & Tacos",
    shortLabel: "Tacos",
    emoji: "🌮",
  },
  { id: "pates", label: "Pâtes", shortLabel: "Pâtes", emoji: "🍝" },
  { id: "salades", label: "Salades", shortLabel: "Salades", emoji: "🥗" },
  {
    id: "assiettes",
    label: "Assiettes & Tex-Mex",
    shortLabel: "Assiettes",
    emoji: "🍟",
  },
  {
    id: "specialites",
    label: "Spécialités",
    shortLabel: "Spécialités",
    emoji: "⭐",
  },
  {
    id: "desserts",
    label: "Desserts",
    shortLabel: "Desserts",
    emoji: "🍦",
  },
];

export const DIET_FILTERS: { id: DietTag; label: string; emoji: string }[] = [
  { id: "vegetarian", label: "Végétarien", emoji: "🌿" },
  { id: "spicy", label: "Épicé", emoji: "🌶️" },
  { id: "gourmet", label: "Gourmand", emoji: "🧀" },
];
