import type { MenuItem } from "./menu-types";

type ItemInput = {
  id: string;
  name: string;
  description: string;
  tags?: MenuItem["tags"];
  highlight?: boolean;
  isNew?: boolean;
  includes?: string;
};

const INCLUDES = {
  burgerMenu: "Frites + boisson 33 cl incluses",
  sandwichMenu: "Frites + boisson 33 cl incluses",
  tacos: "Frites + sauce fromagère maison incluses",
  panini: "Frites incluses",
  bowl: "Frites, cheddar, oignons frits et sauce fromagère inclus",
  enfant: "Frites + Capri-Sun inclus",
  pates: "Penne ou tagliatelle · pain offert sur demande",
  pizza: "Tailles Senior ou Méga",
} as const;

function item(
  partial: ItemInput,
  category: MenuItem["category"],
): MenuItem {
  const isPizza = category === "pizzas-tomate" || category === "pizzas-creme";
  return {
    ...partial,
    category,
    tags: partial.tags ?? [],
    includes: partial.includes ?? (isPizza ? INCLUDES.pizza : undefined),
  };
}

export const MENU_ITEMS: MenuItem[] = [
  // ——— Pizzas sauce tomate ———
  item(
    {
      id: "margherita",
      name: "Margherita / Classique",
      description: "Tomate, mozzarella, origan.",
      tags: ["vegetarian", "gourmet"],
      highlight: true,
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "napolitaine",
      name: "Napolitaine",
      description: "Tomate, mozzarella, anchois, olives, câpres.",
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "reine",
      name: "Reine",
      description: "Tomate, mozzarella, jambon de dinde, champignons.",
      tags: ["gourmet"],
      highlight: true,
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "vegetarienne",
      name: "Végétarienne",
      description: "Tomate, mozzarella, champignons, poivrons, oignons, olives.",
      tags: ["vegetarian"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "orientale",
      name: "Orientale",
      description: "Tomate, mozzarella, merguez, poivrons, oignons, œuf.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "quatre-fromages",
      name: "Quatre Fromages",
      description: "Tomate, mozzarella, gorgonzola, chèvre, brie.",
      tags: ["vegetarian", "gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "campione",
      name: "Campione",
      description: "Tomate, mozzarella, viande hachée, champignons.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "bellissima",
      name: "Bellissima",
      description: "Tomate, mozzarella, viande hachée, chorizo, poivrons.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "fruits-de-mer",
      name: "Fruits de Mer",
      description: "Tomate, mozzarella, fruits de mer, citron.",
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "san-pietro",
      name: "San Pietro",
      description: "Tomate, mozzarella, merguez, chorizo, champignons.",
      tags: ["spicy"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "bolognaise-pizza",
      name: "Bolognaise",
      description: "Tomate, mozzarella, viande hachée, pommes de terre, oignons.",
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "calzone",
      name: "Calzone (chausson)",
      description:
        "Tomate, mozzarella, champignons, jaune d'œuf, jambon de dinde ou viande hachée.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "4-saisons",
      name: "4 Saisons",
      description: "Tomate, mozzarella, jambon de dinde, champignons, poivrons, olives.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "3-jambons",
      name: "3 Jambons",
      description: "Tomate, mozzarella, jambon de dinde, lardons, chorizo.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "fajitas",
      name: "Fajitas",
      description: "Tomate, mozzarella, poulet, poivrons, oignons.",
      tags: ["spicy"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "neptune",
      name: "Neptune",
      description: "Tomate, mozzarella, thon, poivrons, oignons, olives.",
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "mexicaine",
      name: "Mexicaine",
      description:
        "Tomate, mozzarella, viande hachée, merguez, poivrons, oignons.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "pavarotti",
      name: "Pavarotti",
      description: "Tomate, mozzarella, jambon de dinde, chèvre.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "kebab-pizza",
      name: "Kebab",
      description: "Tomate, mozzarella, viande de kebab, oignons.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
  ),
  item(
    {
      id: "paysanne",
      name: "Paysanne",
      description: "Tomate, mozzarella, lardons, œuf.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
  ),

  // ——— Pizzas crème ———
  item(
    {
      id: "rimini",
      name: "Rimini",
      description: "Crème, mozzarella, poulet, champignons, chèvre.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "chevre-miel",
      name: "Chèvre Miel",
      description: "Crème, mozzarella, chèvre, miel.",
      tags: ["vegetarian", "gourmet"],
      highlight: true,
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "capo",
      name: "Capo",
      description:
        "Crème, mozzarella, jambon de dinde, roquette, parmesan, balsamique.",
      tags: ["gourmet"],
      highlight: true,
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "fermiere",
      name: "Fermière",
      description: "Crème, mozzarella, poulet, pommes de terre.",
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "campagnarde",
      name: "Campagnarde",
      description: "Crème, mozzarella, lardons, pommes de terre, œuf.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "savoyarde-pizza",
      name: "Savoyarde",
      description: "Crème, mozzarella, jambon de dinde, viande hachée, pommes de terre.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "raclette",
      name: "Raclette",
      description:
        "Crème, mozzarella, jambon de dinde, raclette, pommes de terre, oignons.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "boursin",
      name: "Boursin",
      description: "Crème, mozzarella, viande hachée, champignons, Boursin, oignons.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "calabraise",
      name: "Calabraise",
      description: "Crème, mozzarella, viande hachée, sauce barbecue.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "vosgienne",
      name: "Vosgienne",
      description: "Crème, mozzarella, lardons, bacon, pommes de terre.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "tartiflette",
      name: "Tartiflette",
      description:
        "Crème, mozzarella, reblochon, lardons, pommes de terre, oignons.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "norvegienne",
      name: "Norvégienne",
      description: "Crème, mozzarella, saumon fumé, citron.",
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "cannibale",
      name: "Cannibale",
      description: "Sauce barbecue, mozzarella, viande hachée, poulet, merguez.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "pizza-tacos",
      name: "Pizza Tacos",
      description:
        "Crème, poulet tikka, pommes de terre, mozzarella, cheddar, viande hachée, sauce fromagère, frites.",
      tags: ["spicy", "gourmet"],
      highlight: true,
      isNew: true,
    },
    "pizzas-creme",
  ),
  item(
    {
      id: "havane",
      name: "Havane",
      description:
        "Crème, mozzarella, jambon, chorizo, gorgonzola, poivrons.",
      tags: ["spicy", "gourmet"],
      isNew: true,
    },
    "pizzas-creme",
  ),

  // ——— Burgers ———
  item(
    {
      id: "cheese",
      name: "Cheese",
      description: "1 steak 90g, cheddar, crudités.",
      includes: INCLUDES.burgerMenu,
    },
    "burgers",
  ),
  item(
    {
      id: "double-cheese",
      name: "Double Cheese",
      description: "2 steaks 90g, cheddar, crudités.",
      tags: ["gourmet"],
      includes: INCLUDES.burgerMenu,
    },
    "burgers",
  ),
  item(
    {
      id: "burger-m",
      name: "M",
      description:
        "Steak 150g, fromage raclette, bacon, galette de pommes de terre, crudités.",
      tags: ["gourmet"],
      includes: INCLUDES.burgerMenu,
    },
    "burgers",
  ),
  item(
    {
      id: "viking",
      name: "Viking",
      description: "2 poulets panés, cheddar, crudités.",
      tags: ["gourmet"],
      includes: INCLUDES.burgerMenu,
    },
    "burgers",
  ),
  item(
    {
      id: "mega-burger",
      name: "Mega Burger",
      description: "Steak 180g, bacon, cheddar, crudités.",
      tags: ["gourmet"],
      includes: INCLUDES.burgerMenu,
    },
    "burgers",
  ),
  item(
    {
      id: "black-burger",
      name: "Black Burger",
      description:
        "Double steak, bacon, oignons frits, cheddar, crudités. Pain noir.",
      tags: ["gourmet"],
      includes: INCLUDES.burgerMenu,
    },
    "burgers",
  ),
  item(
    {
      id: "capo-chicken",
      name: "Capo Chicken",
      description: "Steak 90g, beignets de poulet, cheddar, crudités.",
      tags: ["gourmet"],
      includes: INCLUDES.burgerMenu,
    },
    "burgers",
  ),
  item(
    {
      id: "le-nectar",
      name: "Le Nectar",
      description: "Steak 90g, chèvre miel, cheddar, crudités.",
      tags: ["gourmet"],
      includes: INCLUDES.burgerMenu,
    },
    "burgers",
  ),

  // ——— Sandwichs & Tacos ———
  item(
    {
      id: "tacos-l-xxl",
      name: "Tacos (compose ton tacos)",
      description:
        "Compose ta taille (M à XXL), tes viandes et ta sauce. Tous les tacos sont garnis.",
      highlight: true,
      includes: INCLUDES.tacos,
    },
    "sandwichs-tacos",
  ),
  item(
    {
      id: "kebab-sandwich",
      name: "Kebab",
      description: "Émincé de kebab, crudités. Pain au choix (maison, tortilla…).",
      includes: INCLUDES.sandwichMenu,
    },
    "sandwichs-tacos",
  ),
  item(
    {
      id: "curry",
      name: "Curry",
      description: "Poulet curry, crudités, cheddar. Pain au choix.",
      tags: ["spicy"],
      includes: INCLUDES.sandwichMenu,
    },
    "sandwichs-tacos",
  ),
  item(
    {
      id: "suissard",
      name: "Suissard",
      description:
        "Poulet mariné, sauce fromagère, jambon de dinde, raclette, crudités. Pain au choix.",
      tags: ["gourmet"],
      includes: INCLUDES.sandwichMenu,
    },
    "sandwichs-tacos",
  ),
  item(
    {
      id: "le-frenchy",
      name: "Le Frenchy",
      description: "2 steaks 90g, chèvre miel, cheddar, crudités. Pain au choix.",
      tags: ["gourmet"],
      includes: INCLUDES.sandwichMenu,
    },
    "sandwichs-tacos",
  ),
  item(
    {
      id: "americain",
      name: "Américain",
      description: "2 steaks 90g, cheddar, crudités. Pain au choix.",
      tags: ["gourmet"],
      includes: INCLUDES.sandwichMenu,
    },
    "sandwichs-tacos",
  ),
  item(
    {
      id: "phenomene",
      name: "Phénomène",
      description: "1 steak 90g, cordon bleu, cheddar, crudités. Pain au choix.",
      tags: ["gourmet"],
      includes: INCLUDES.sandwichMenu,
    },
    "sandwichs-tacos",
  ),
  item(
    {
      id: "full-steak",
      name: "Full Steak",
      description: "1 steak 90g, œuf, bacon, cheddar, crudités. Pain au choix.",
      tags: ["gourmet"],
      includes: INCLUDES.sandwichMenu,
    },
    "sandwichs-tacos",
  ),
  item(
    {
      id: "farmer",
      name: "Farmer",
      description:
        "1 steak 90g, galette de pommes de terre, cheddar, crudités. Pain au choix.",
      includes: INCLUDES.sandwichMenu,
    },
    "sandwichs-tacos",
  ),

  // ——— Pâtes ———
  item(
    {
      id: "4-fromages-pates",
      name: "4 Fromages",
      description: "Crème fraîche, gorgonzola, brie, chèvre, parmesan.",
      tags: ["vegetarian", "gourmet"],
      includes: INCLUDES.pates,
    },
    "pates",
  ),
  item(
    {
      id: "bolognaise",
      name: "Bolognaise",
      description: "Sauce tomate, viande hachée, parmesan.",
      includes: INCLUDES.pates,
    },
    "pates",
  ),
  item(
    {
      id: "carbonara",
      name: "Carbonara",
      description: "Crème, lardons grillés, jaune d'œuf, parmesan.",
      tags: ["gourmet"],
      includes: INCLUDES.pates,
    },
    "pates",
  ),
  item(
    {
      id: "saumon-pates",
      name: "Saumon",
      description: "Crème, saumon, citron, parmesan.",
      includes: INCLUDES.pates,
    },
    "pates",
  ),
  item(
    {
      id: "pates-alfred",
      name: "Pâtes Alfred",
      description: "Crème, champignons, poulet, oignons caramélisés, parmesan.",
      tags: ["spicy"],
      includes: INCLUDES.pates,
    },
    "pates",
  ),

  // ——— Salades ———
  item(
    {
      id: "classic",
      name: "Classic",
      description: "Salade, tomate, olives.",
      tags: ["vegetarian"],
    },
    "salades",
  ),
  item(
    { id: "nicoise", name: "Niçoise", description: "Salade, tomate, thon, olives, œuf." },
    "salades",
  ),
  item(
    {
      id: "alaska",
      name: "Alaska",
      description: "Salade, tomate, saumon, avocat, olives.",
    },
    "salades",
  ),
  item(
    {
      id: "avocat-crevette",
      name: "Avocat Crevette",
      description: "Salade, tomate, crevettes, avocat, maïs, olives.",
    },
    "salades",
  ),
  item(
    {
      id: "chevre-salade",
      name: "Chèvre",
      description: "Salade, tomate, lardons, chèvre sur toast, olives.",
      tags: ["gourmet"],
    },
    "salades",
  ),
  item(
    {
      id: "cesar",
      name: "César",
      description: "Salade, tomate, poulet, avocat, croûtons, pommes de terre, olives.",
    },
    "salades",
  ),
  item(
    {
      id: "savoyarde-salade",
      name: "Savoyarde",
      description: "Salade, tomate, jambon, pomme de terre, reblochon, olives.",
      tags: ["gourmet"],
    },
    "salades",
  ),

  // ——— Assiettes & Tex-Mex ———
  item(
    {
      id: "assiette-kebab",
      name: "Assiette Kebab",
      description: "Viande de kebab, crudités.",
      includes: "Frites incluses",
    },
    "assiettes",
  ),
  item(
    {
      id: "assiette-chicken",
      name: "Assiette Chicken",
      description: "Poulet curry, crudités.",
      tags: ["spicy"],
      includes: "Frites incluses",
    },
    "assiettes",
  ),
  item(
    {
      id: "assiette-steak",
      name: "Assiette Steak",
      description: "2 steaks 90g, crudités.",
      tags: ["gourmet"],
      includes: "Frites incluses",
    },
    "assiettes",
  ),
  item(
    {
      id: "assiette-mixte",
      name: "Assiette Mixte",
      description: "2 viandes au choix, crudités.",
      includes: "Frites incluses",
    },
    "assiettes",
  ),
  item(
    {
      id: "tex-mex",
      name: "Tex-Mex",
      description:
        "Au choix : tenders, wings, nuggets ou mozza sticks — format 8 ou 12 pièces.",
      tags: ["gourmet"],
    },
    "assiettes",
  ),

  // ——— Spécialités & menu enfant ———
  item(
    {
      id: "menu-enfant",
      name: "Menu Enfant",
      description:
        "Au choix : burger, 6 nuggets ou 4 tenders.",
      highlight: true,
      includes: INCLUDES.enfant,
    },
    "specialites",
  ),
  item(
    {
      id: "cheese-naan",
      name: "Cheese Naan",
      description: "1 viande au choix, crudités, sauce au choix.",
      tags: ["gourmet"],
      highlight: true,
      isNew: true,
    },
    "specialites",
  ),
  item(
    {
      id: "baguette-farcie",
      name: "Baguette Farcie",
      description: "1 viande au choix, mozzarella, crudités, sauce au choix.",
      tags: ["gourmet"],
    },
    "specialites",
  ),
  item(
    {
      id: "panini",
      name: "Panini",
      description:
        "Au choix : 4 fromages, viande hachée, merguez, saumon, jambon, poulet, lardons ou kebab.",
      includes: INCLUDES.panini,
    },
    "specialites",
  ),
  item(
    {
      id: "bowl",
      name: "Bowl",
      description: "M (1 viande) ou L (2 viandes) au choix.",
      tags: ["gourmet"],
      includes: INCLUDES.bowl,
    },
    "specialites",
  ),
  item(
    {
      id: "crousty-tenders",
      name: "Crousty Tenders",
      description:
        "Riz blanc, sauce secrète maison, tenders, oignons crispy, persil — sauce au choix.",
      highlight: true,
      isNew: true,
    },
    "specialites",
  ),
  item(
    {
      id: "crousty-curry",
      name: "Crousty Curry",
      description:
        "Riz blanc, sauce secrète maison, poulet curry, oignons crispy, persil — sauce au choix.",
      tags: ["spicy"],
      highlight: true,
      isNew: true,
    },
    "specialites",
  ),
  item(
    {
      id: "frites-campagnardes",
      name: "Frites Campagnardes",
      description: "Frites, sauce campagnarde, cheddar, lardons, oignons frits.",
      tags: ["gourmet"],
    },
    "specialites",
  ),
  item(
    {
      id: "barquette-frites",
      name: "Barquette Frites / Potatoes",
      description: "Frites ou potatoes — moyenne ou grande.",
    },
    "specialites",
  ),

  // ——— Desserts & boissons ———
  item(
    {
      id: "milkshake",
      name: "Milk-shake",
      description:
        "Vanille, fraise, pistache ou chocolat. Suppléments Oreo, Kinder, KitKat, M&M's ; nappages caramel, Nutella, miel.",
      highlight: true,
      isNew: true,
    },
    "desserts",
  ),
  item(
    {
      id: "tarte-pommes",
      name: "Tarte aux pommes",
      description: "Dessert maison.",
    },
    "desserts",
  ),
  item(
    {
      id: "tarte-daims",
      name: "Tarte aux daims",
      description: "Dessert maison.",
    },
    "desserts",
  ),
  item(
    {
      id: "tiramisu",
      name: "Tiramisu",
      description: "Dessert maison.",
    },
    "desserts",
  ),
  item(
    {
      id: "brownie",
      name: "Brownie",
      description: "Dessert maison.",
    },
    "desserts",
  ),
  item(
    {
      id: "glace-haagen",
      name: "Glace Häagen-Dazs",
      description: "Pot 100 ml ou 500 ml.",
    },
    "desserts",
  ),
  item(
    {
      id: "boissons",
      name: "Boissons",
      description: "33 cl, maxi 1,5 L, eau minérale, Oasis / Tropico.",
    },
    "desserts",
  ),
];

export function searchMenuItems(query: string, items = MENU_ITEMS) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q),
  );
}
