import type { MenuItem } from "./menu-types";

const pizzaTomato =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80";
const pizzaCream =
  "https://images.unsplash.com/photo-1574071318508-1cdbab80b002?auto=format&fit=crop&w=800&q=80";
const burgerImg =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
const tacoImg =
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80";
const pastaImg =
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80";
const saladImg =
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80";
const plateImg =
  "https://images.unsplash.com/photo-1630384060420-cbbad5fabc04?auto=format&fit=crop&w=800&q=80";

type ItemInput = {
  id: string;
  name: string;
  description: string;
  tags?: MenuItem["tags"];
  highlight?: boolean;
};

function item(
  partial: ItemInput,
  category: MenuItem["category"],
  image: string,
): MenuItem {
  return {
    ...partial,
    category,
    image,
    tags: partial.tags ?? [],
  };
}

export const MENU_ITEMS: MenuItem[] = [
  // Base Sauce Tomate
  item(
    {
      id: "margherita",
      name: "Margherita / Classique",
      description: "Tomate, mozzarella, origan.",
      tags: ["vegetarian", "gourmet"],
      highlight: true,
    },
    "pizzas-tomate",
    pizzaTomato,
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
    pizzaTomato,
  ),
  item(
    {
      id: "napolitaine",
      name: "Napolitaine",
      description: "Tomate, mozzarella, anchois, olives, câpres.",
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "vegetarienne",
      name: "Végétarienne",
      description: "Tomate, mozzarella, champignons, poivrons, oignons, olives.",
      tags: ["vegetarian"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "orientale",
      name: "Orientale",
      description: "Tomate, mozzarella, merguez, poivrons, oignons.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "3-jambons",
      name: "3 Jambons",
      description: "Tomate, mozzarella, jambon de dinde, lardons, chorizo.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "kebab-pizza",
      name: "Kebab",
      description: "Tomate, mozzarella, viande de kebab, oignons.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "paysanne",
      name: "Paysanne",
      description: "Tomate, mozzarella, lardons, œuf.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "quatre-fromages",
      name: "Quatre Fromages",
      description: "Tomate, mozzarella, gorgonzola, chèvre, brie.",
      tags: ["vegetarian", "gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "campione",
      name: "Campione",
      description: "Tomate, mozzarella, viande hachée, champignons.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "bellissima",
      name: "Bellissima",
      description: "Tomate, mozzarella, chorizo, viande hachée, poivrons.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "fruits-de-mer",
      name: "Fruits de Mer",
      description: "Tomate, mozzarella, fruits de mer, citron.",
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "calzone",
      name: "Calzone (chausson)",
      description:
        "Tomate, mozzarella, champignons, œuf, jambon de dinde, viande hachée.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "4-saisons",
      name: "4 Saisons",
      description: "Tomate, mozzarella, jambon, champignons, poivrons, olives.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "fajitas",
      name: "Fajitas",
      description: "Tomate, mozzarella, poulet, poivrons, oignons.",
      tags: ["spicy"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "mexicaine",
      name: "Mexicaine",
      description:
        "Tomate, mozzarella, viandes hachées, merguez, poivrons, oignons.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),
  item(
    {
      id: "pavarotti",
      name: "Pavarotti",
      description: "Tomate, mozzarella, jambon de dinde, chèvre.",
      tags: ["gourmet"],
    },
    "pizzas-tomate",
    pizzaTomato,
  ),

  // Base Crème Fraîche
  item(
    {
      id: "fermiere",
      name: "Fermière",
      description: "Crème, mozzarella, pommes de terre, poulet.",
    },
    "pizzas-creme",
    pizzaCream,
  ),
  item(
    {
      id: "rimini",
      name: "Rimini",
      description: "Crème, mozzarella, poulet, champignons, chèvre.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
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
    pizzaCream,
  ),
  item(
    {
      id: "campagnarde",
      name: "Campagnarde",
      description: "Crème, mozzarella, lardons, pommes de terre, œuf.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
  ),
  item(
    {
      id: "savoyarde-pizza",
      name: "Savoyarde",
      description: "Crème, mozzarella, jambon, viande hachée, pommes de terre.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
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
    pizzaCream,
  ),
  item(
    {
      id: "boursin",
      name: "Boursin",
      description: "Crème, mozzarella, viande hachée, champignons, Boursin, oignons.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
  ),
  item(
    {
      id: "calabraise",
      name: "Calabraise",
      description: "Crème, mozzarella, viande hachée, sauce barbecue.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
  ),
  item(
    {
      id: "tartiflette",
      name: "Tartiflette",
      description:
        "Crème, mozzarella, lardons, pommes de terre, reblochon, oignons.",
      tags: ["gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
  ),
  item(
    {
      id: "norvegienne",
      name: "Norvégienne",
      description: "Crème, mozzarella, saumon fumé, citron.",
    },
    "pizzas-creme",
    pizzaCream,
  ),
  item(
    {
      id: "cannibale",
      name: "Cannibale",
      description: "Sauce barbecue, mozzarella, viande hachée, merguez, poulet.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
  ),
  item(
    {
      id: "bollywood",
      name: "Bollywood",
      description:
        "Sauce barbecue, mozzarella, poulet tikka, champignons, poivrons, oignons, olives.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
  ),
  item(
    {
      id: "havane",
      name: "Havane",
      description:
        "Crème, mozzarella, jambon de dinde, chorizo, gorgonzola, poivrons.",
      tags: ["spicy", "gourmet"],
    },
    "pizzas-creme",
    pizzaCream,
  ),

  // Burgers
  item(
    {
      id: "cheese",
      name: "Cheese",
      description: "1 steak 90g, cheddar, crudités. Servi avec frites et boisson au choix.",
    },
    "burgers",
    burgerImg,
  ),
  item(
    {
      id: "double-cheese",
      name: "Double Cheese",
      description: "2 steaks 90g, cheddar, crudités. Servi avec frites et boisson au choix.",
      tags: ["gourmet"],
    },
    "burgers",
    burgerImg,
  ),
  item(
    {
      id: "black-burger",
      name: "Black Burger",
      description:
        "Double steak, bacon, oignons frits, cheddar, crudités. Servi avec frites et boisson au choix.",
      tags: ["gourmet"],
    },
    "burgers",
    burgerImg,
  ),
  item(
    {
      id: "capo-chicken",
      name: "Capo Chicken",
      description:
        "1 steak 90g, beignets de poulet, cheddar, crudités. Servi avec frites et boisson au choix.",
      tags: ["gourmet"],
    },
    "burgers",
    burgerImg,
  ),
  item(
    {
      id: "mega-burger",
      name: "Mega Burger",
      description: "1 steak 180g, bacon, cheddar, crudités. Servi avec frites et boisson au choix.",
      tags: ["gourmet"],
    },
    "burgers",
    burgerImg,
  ),
  item(
    {
      id: "burger-m",
      name: "M",
      description:
        "1 steak 150g, fromage raclette, bacon, galette de pommes de terre, crudités. Servi avec frites et boisson au choix.",
      tags: ["gourmet"],
    },
    "burgers",
    burgerImg,
  ),
  item(
    {
      id: "viking",
      name: "Viking",
      description: "2 poulets panés, cheddar, crudités. Servi avec frites et boisson au choix.",
      tags: ["gourmet"],
    },
    "burgers",
    burgerImg,
  ),
  item(
    {
      id: "le-nectar",
      name: "Le Nectar",
      description: "Steak 90g, chèvre miel, cheddar, crudités. Servi avec frites et boisson au choix.",
      tags: ["gourmet"],
    },
    "burgers",
    burgerImg,
  ),

  // Sandwichs & Tacos
  item(
    { id: "kebab-sandwich", name: "Kebab", description: "Émincé de kebab, crudités." },
    "sandwichs-tacos",
    tacoImg,
  ),
  item(
    {
      id: "duo",
      name: "Duo",
      description: "Deux steaks 90g, cheddar, crudités.",
      tags: ["gourmet"],
    },
    "sandwichs-tacos",
    tacoImg,
  ),
  item(
    {
      id: "suissard",
      name: "Suissard",
      description: "Poulet mariné, sauce fromagère, jambon de dinde, raclette, crudités.",
      tags: ["gourmet"],
    },
    "sandwichs-tacos",
    tacoImg,
  ),
  item(
    {
      id: "curry",
      name: "Curry",
      description: "Poulet curry, crudités, cheddar.",
      tags: ["spicy"],
    },
    "sandwichs-tacos",
    tacoImg,
  ),
  item(
    {
      id: "phenomene",
      name: "Phénomène",
      description: "1 steak 90g, cordon bleu, cheddar, crudités.",
      tags: ["gourmet"],
    },
    "sandwichs-tacos",
    tacoImg,
  ),
  item(
    {
      id: "farmer",
      name: "Farmer",
      description: "1 steak 90g, galette de pommes de terre, cheddar, crudités.",
    },
    "sandwichs-tacos",
    tacoImg,
  ),
  item(
    {
      id: "full-steak",
      name: "Full Steak",
      description: "1 steak 90g, œuf, bacon, cheddar, crudités.",
      tags: ["gourmet"],
    },
    "sandwichs-tacos",
    tacoImg,
  ),
  item(
    {
      id: "le-frenchy",
      name: "Le Frenchy",
      description: "2 steaks 90g, chèvre miel, cheddar, crudités.",
      tags: ["gourmet"],
    },
    "sandwichs-tacos",
    tacoImg,
  ),
  item(
    {
      id: "tacos-l-xxl",
      name: "Tacos L / XXL",
      description: "Tailles L et XXL disponibles.",
    },
    "sandwichs-tacos",
    tacoImg,
  ),

  // Pâtes
  item(
    {
      id: "carbonara",
      name: "Carbonara",
      description: "Crème, lardons grillés, jaune d'œuf, parmesan.",
      tags: ["gourmet"],
    },
    "pates",
    pastaImg,
  ),
  item(
    {
      id: "4-fromages-pates",
      name: "4 Fromages",
      description: "Crème fraîche, gorgonzola, brie, chèvre, parmesan.",
      tags: ["vegetarian", "gourmet"],
    },
    "pates",
    pastaImg,
  ),
  item(
    {
      id: "bolognaise",
      name: "Bolognaise",
      description: "Sauce tomate, viande hachée, parmesan.",
    },
    "pates",
    pastaImg,
  ),
  item(
    {
      id: "saumon-pates",
      name: "Saumon",
      description: "Crème, saumon, citron, parmesan.",
    },
    "pates",
    pastaImg,
  ),
  item(
    {
      id: "poulet-tikka-pates",
      name: "Poulet Tikka",
      description: "Crème, poulet, champignons, oignons, parmesan.",
      tags: ["spicy"],
    },
    "pates",
    pastaImg,
  ),

  // Salades
  item(
    {
      id: "classic",
      name: "Classic",
      description: "Salade, tomate, olives.",
      tags: ["vegetarian"],
    },
    "salades",
    saladImg,
  ),
  item(
    { id: "nicoise", name: "Niçoise", description: "Salade, tomate, thon, olives, œuf." },
    "salades",
    saladImg,
  ),
  item(
    { id: "iska", name: "Iska", description: "Salade, tomate, saumon, avocat, olives." },
    "salades",
    saladImg,
  ),
  item(
    {
      id: "avocat-crevette",
      name: "Avocat Crevette",
      description: "Salade, tomate, crevettes, avocat, maïs, olives.",
    },
    "salades",
    saladImg,
  ),
  item(
    {
      id: "chevre-salade",
      name: "Chèvre",
      description: "Salade, tomate, chèvre sur toast, olives.",
      tags: ["vegetarian", "gourmet"],
    },
    "salades",
    saladImg,
  ),
  item(
    {
      id: "cesar",
      name: "César",
      description: "Salade, tomate, poulet, avocat, croûtons, pommes de terre, olives.",
    },
    "salades",
    saladImg,
  ),
  item(
    {
      id: "savoyarde-salade",
      name: "Savoyarde",
      description: "Salade, tomate, jambon, pomme de terre, reblochon, olives.",
      tags: ["gourmet"],
    },
    "salades",
    saladImg,
  ),

  // Assiettes & Tex-Mex
  item(
    {
      id: "assiette-kebab",
      name: "Assiette Kebab",
      description: "Viande de kebab, crudités, frites.",
    },
    "assiettes",
    plateImg,
  ),
  item(
    {
      id: "assiette-chicken",
      name: "Assiette Chicken",
      description: "Tenders ou nuggets, poulet curry, crudités, frites.",
      tags: ["spicy"],
    },
    "assiettes",
    plateImg,
  ),
  item(
    {
      id: "assiette-steak",
      name: "Assiette Steak",
      description: "2 steaks 90g, cheddar, crudités, frites.",
      tags: ["gourmet"],
    },
    "assiettes",
    plateImg,
  ),
  item(
    {
      id: "assiette-mixte",
      name: "Assiette Mixte",
      description: "2 viandes au choix, crudités, frites.",
    },
    "assiettes",
    plateImg,
  ),
  item(
    {
      id: "tex-mex",
      name: "Tex-Mex",
      description: "Crousty tenders, wings, nuggets, mozzas sticks.",
      tags: ["gourmet"],
    },
    "assiettes",
    plateImg,
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
