/** English overlays for menu items (id → name / description / includes) */
export type MenuEnEntry = {
  name?: string;
  description: string;
  includes?: string;
};

export const MENU_EN: Record<string, MenuEnEntry> = {
  margherita: {
    name: "Margherita / Classic",
    description: "Tomato, mozzarella, oregano.",
    includes: "Senior or Mega sizes",
  },
  napolitaine: {
    name: "Napolitana",
    description: "Tomato, mozzarella, anchovies, olives, capers.",
  },
  reine: {
    name: "Reine",
    description: "Tomato, mozzarella, turkey ham, mushrooms.",
  },
  vegetarienne: {
    name: "Vegetarian",
    description: "Tomato, mozzarella, mushrooms, peppers, onions, olives.",
  },
  orientale: {
    description: "Tomato, mozzarella, merguez, peppers, onions, egg.",
  },
  "quatre-fromages": {
    name: "Four Cheese",
    description: "Tomato, mozzarella, gorgonzola, goat cheese, brie.",
  },
  campione: {
    description: "Tomato, mozzarella, ground beef, mushrooms.",
  },
  bellissima: {
    description: "Tomato, mozzarella, ground beef, chorizo, peppers.",
  },
  "fruits-de-mer": {
    name: "Seafood",
    description: "Tomato, mozzarella, seafood, lemon.",
  },
  "san-pietro": {
    description: "Tomato, mozzarella, merguez, chorizo, mushrooms.",
  },
  "bolognaise-pizza": {
    name: "Bolognese",
    description: "Tomato, mozzarella, ground beef, potatoes, onions.",
  },
  calzone: {
    name: "Calzone (folded)",
    description:
      "Tomato, mozzarella, mushrooms, egg yolk, turkey ham or ground beef.",
  },
  "4-saisons": {
    name: "4 Seasons",
    description:
      "Tomato, mozzarella, turkey ham, mushrooms, peppers, olives.",
  },
  "3-jambons": {
    name: "3 Hams",
    description: "Tomato, mozzarella, turkey ham, lardons, chorizo.",
  },
  fajitas: {
    description: "Tomato, mozzarella, chicken, peppers, onions.",
  },
  neptune: {
    description: "Tomato, mozzarella, tuna, peppers, onions, olives.",
  },
  mexicaine: {
    name: "Mexican",
    description: "Tomato, mozzarella, ground beef, merguez, peppers, onions.",
  },
  pavarotti: {
    description: "Tomato, mozzarella, turkey ham, goat cheese.",
  },
  "kebab-pizza": {
    description: "Tomato, mozzarella, kebab meat, onions.",
  },
  paysanne: {
    name: "Country",
    description: "Tomato, mozzarella, lardons, egg.",
  },
  rimini: {
    description: "Cream, mozzarella, chicken, mushrooms, goat cheese.",
  },
  "chevre-miel": {
    name: "Goat Honey",
    description: "Cream, mozzarella, goat cheese, honey.",
  },
  capo: {
    description:
      "Cream, mozzarella, turkey ham, rocket, parmesan, balsamic.",
  },
  fermiere: {
    name: "Farmhouse",
    description: "Cream, mozzarella, chicken, potatoes.",
  },
  campagnarde: {
    name: "Countryside",
    description: "Cream, mozzarella, lardons, potatoes, egg.",
  },
  "savoyarde-pizza": {
    description:
      "Cream, mozzarella, turkey ham, ground beef, potatoes.",
  },
  raclette: {
    description:
      "Cream, mozzarella, turkey ham, raclette, potatoes, onions.",
  },
  boursin: {
    description:
      "Cream, mozzarella, ground beef, mushrooms, Boursin, onions.",
  },
  calabraise: {
    description: "Cream, mozzarella, ground beef, barbecue sauce.",
  },
  vosgienne: {
    description: "Cream, mozzarella, lardons, bacon, potatoes.",
  },
  tartiflette: {
    description:
      "Cream, mozzarella, reblochon, lardons, potatoes, onions.",
  },
  norvegienne: {
    name: "Norwegian",
    description: "Cream, mozzarella, smoked salmon, lemon.",
  },
  cannibale: {
    name: "Cannibal",
    description:
      "Barbecue sauce, mozzarella, ground beef, chicken, merguez.",
  },
  "pizza-tacos": {
    description:
      "Cream, tikka chicken, potatoes, mozzarella, cheddar, ground beef, cheese sauce, fries.",
  },
  havane: {
    name: "Havana",
    description:
      "Cream, mozzarella, ham, chorizo, gorgonzola, peppers.",
  },
  cheese: {
    description: "1 × 90g steak, cheddar, salad garnish.",
    includes: "Fries + 33 cl drink included",
  },
  "double-cheese": {
    description: "2 × 90g steaks, cheddar, salad garnish.",
    includes: "Fries + 33 cl drink included",
  },
  "burger-m": {
    description:
      "150g steak, raclette cheese, bacon, potato patty, salad garnish.",
    includes: "Fries + 33 cl drink included",
  },
  viking: {
    description: "2 breaded chicken fillets, cheddar, salad garnish.",
    includes: "Fries + 33 cl drink included",
  },
  "mega-burger": {
    description: "180g steak, bacon, cheddar, salad garnish.",
    includes: "Fries + 33 cl drink included",
  },
  "black-burger": {
    description:
      "Double steak, bacon, fried onions, cheddar, salad garnish. Black bun.",
    includes: "Fries + 33 cl drink included",
  },
  "capo-chicken": {
    description: "90g steak, chicken bites, cheddar, salad garnish.",
    includes: "Fries + 33 cl drink included",
  },
  "le-nectar": {
    description: "90g steak, goat honey, cheddar, salad garnish.",
    includes: "Fries + 33 cl drink included",
  },
  "tacos-l-xxl": {
    name: "Tacos (build your own)",
    description:
      "Choose your size (M 1 meat · L 2 · XL 3 · XXL 4), meats and sauce. All tacos come loaded.",
    includes: "Fries + homemade cheese sauce included",
  },
  "kebab-sandwich": {
    description:
      "Sliced kebab, salad garnish. Bread of choice (house, tortilla…).",
    includes: "Fries + 33 cl drink included",
  },
  curry: {
    description: "Curry chicken, salad garnish, cheddar. Bread of choice.",
    includes: "Fries + 33 cl drink included",
  },
  suissard: {
    description:
      "Marinated chicken, cheese sauce, turkey ham, raclette, salad garnish. Bread of choice.",
    includes: "Fries + 33 cl drink included",
  },
  "le-frenchy": {
    description:
      "2 × 90g steaks, goat honey, cheddar, salad garnish. Bread of choice.",
    includes: "Fries + 33 cl drink included",
  },
  americain: {
    name: "American",
    description:
      "2 × 90g steaks, cheddar, salad garnish. Bread of choice.",
    includes: "Fries + 33 cl drink included",
  },
  phenomene: {
    name: "Phenomenon",
    description:
      "1 × 90g steak, cordon bleu, cheddar, salad garnish. Bread of choice.",
    includes: "Fries + 33 cl drink included",
  },
  "full-steak": {
    description:
      "1 × 90g steak, egg, bacon, cheddar, salad garnish. Bread of choice.",
    includes: "Fries + 33 cl drink included",
  },
  farmer: {
    description:
      "1 × 90g steak, potato patty, cheddar, salad garnish. Bread of choice.",
    includes: "Fries + 33 cl drink included",
  },
  "4-fromages-pates": {
    name: "4 Cheese",
    description: "Cream, gorgonzola, brie, goat cheese, parmesan.",
    includes: "Penne or tagliatelle · bread on request",
  },
  bolognaise: {
    name: "Bolognese",
    description: "Tomato sauce, ground beef, parmesan.",
    includes: "Penne or tagliatelle · bread on request",
  },
  carbonara: {
    description: "Cream, grilled lardons, egg yolk, parmesan.",
    includes: "Penne or tagliatelle · bread on request",
  },
  "saumon-pates": {
    name: "Salmon",
    description: "Cream, salmon, lemon, parmesan.",
    includes: "Penne or tagliatelle · bread on request",
  },
  "pates-alfred": {
    name: "Alfredo Pasta",
    description:
      "Cream, mushrooms, chicken, caramelized onions, parmesan.",
    includes: "Penne or tagliatelle · bread on request",
  },
  classic: {
    description: "Salad, tomato, olives.",
  },
  nicoise: {
    name: "Niçoise",
    description: "Salad, tomato, tuna, olives, egg.",
  },
  alaska: {
    description: "Salad, tomato, salmon, avocado, olives.",
  },
  "avocat-crevette": {
    name: "Avocado Shrimp",
    description: "Salad, tomato, shrimp, avocado, corn, olives.",
  },
  "chevre-salade": {
    name: "Goat Cheese",
    description: "Salad, tomato, lardons, goat cheese on toast, olives.",
  },
  cesar: {
    name: "Caesar",
    description:
      "Salad, tomato, chicken, avocado, croutons, potatoes, olives.",
  },
  "savoyarde-salade": {
    description:
      "Salad, tomato, ham, potato, reblochon, olives.",
  },
  "assiette-kebab": {
    name: "Kebab Plate",
    description: "Kebab meat, salad garnish.",
    includes: "Fries included",
  },
  "assiette-chicken": {
    name: "Chicken Plate",
    description: "Curry chicken, salad garnish.",
    includes: "Fries included",
  },
  "assiette-steak": {
    name: "Steak Plate",
    description: "2 × 90g steaks, salad garnish.",
    includes: "Fries included",
  },
  "assiette-mixte": {
    name: "Mixed Plate",
    description: "2 meats of your choice, salad garnish.",
    includes: "Fries included",
  },
  "tex-mex": {
    description:
      "Choose: tenders, wings, nuggets or mozza sticks — 8 or 12 pieces.",
  },
  "menu-enfant": {
    name: "Kids Menu",
    description: "Choice of: burger, 6 nuggets or 4 tenders.",
    includes: "Fries + Capri-Sun included",
  },
  "cheese-naan": {
    description: "1 meat of your choice, salad garnish, sauce of your choice.",
  },
  "baguette-farcie": {
    name: "Stuffed Baguette",
    description:
      "1 meat of your choice, mozzarella, salad garnish, sauce of your choice.",
  },
  panini: {
    description:
      "Choice of: 4 cheeses, ground beef, merguez, salmon, ham, chicken, lardons or kebab.",
    includes: "Fries included",
  },
  bowl: {
    description: "M (1 meat) or L (2 meats) of your choice.",
    includes: "Fries, cheddar, fried onions and cheese sauce included",
  },
  "crousty-tenders": {
    description:
      "White rice, house secret sauce, tenders, crispy onions, parsley — sauce of your choice.",
  },
  "crousty-curry": {
    description:
      "White rice, house secret sauce, curry chicken, crispy onions, parsley — sauce of your choice.",
  },
  "frites-campagnardes": {
    name: "Country Fries",
    description: "Fries, country sauce, cheddar, lardons, fried onions.",
  },
  "barquette-frites": {
    name: "Fries / Potato Wedges Box",
    description: "Fries or potato wedges — medium or large.",
  },
  milkshake: {
    description:
      "Vanilla, strawberry, pistachio or chocolate. Oreo, Kinder, KitKat, M&M's toppings; caramel, Nutella, honey sauces.",
  },
  "tarte-pommes": {
    name: "Apple tart",
    description: "House dessert.",
  },
  "tarte-daims": {
    name: "Daim tart",
    description: "House dessert.",
  },
  tiramisu: {
    description: "House dessert.",
  },
  brownie: {
    description: "House dessert.",
  },
  "glace-haagen": {
    name: "Häagen-Dazs ice cream",
    description: "100 ml or 500 ml tub.",
  },
  boissons: {
    name: "Drinks",
    description: "33 cl, 1.5 L, mineral water, Oasis / Tropico.",
  },
};

export const COMPOSITION_OPTION_EN: Record<string, string> = {
  Senior: "Senior",
  Méga: "Mega",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
  "Viande hachée": "Ground beef",
  Poulet: "Chicken",
  "Poulet curry": "Curry chicken",
  "Poulet tikka": "Tikka chicken",
  Kebab: "Kebab",
  Merguez: "Merguez",
  "Cordon bleu": "Cordon bleu",
  Nuggets: "Nuggets",
  Tenders: "Tenders",
  Steak: "Steak",
  Lardons: "Lardons",
  "Jambon de dinde": "Turkey ham",
  Bacon: "Bacon",
  Saumon: "Salmon",
  Végétarien: "Vegetarian",
  Blanche: "White",
  Fromagère: "Cheese",
  Algérienne: "Algerian",
  Samouraï: "Samurai",
  Barbecue: "Barbecue",
  Curry: "Curry",
  Ketchup: "Ketchup",
  Mayonnaise: "Mayonnaise",
  Andalouse: "Andalouse",
  Biggy: "Biggy",
  Harissa: "Harissa",
  Poivre: "Pepper",
  Cheddar: "Cheddar",
  Raclette: "Raclette",
  Œuf: "Egg",
  Champignons: "Mushrooms",
  "Oignons frits": "Fried onions",
  Poivrons: "Peppers",
  Salade: "Salad",
  "Pain maison": "House bread",
  Tortilla: "Tortilla",
  Galette: "Flatbread",
  Penne: "Penne",
  Tagliatelle: "Tagliatelle",
  Wings: "Wings",
  "Mozza sticks": "Mozza sticks",
  "8 pièces": "8 pieces",
  "12 pièces": "12 pieces",
  Burger: "Burger",
  "6 nuggets": "6 nuggets",
  "4 tenders": "4 tenders",
  "4 fromages": "4 cheeses",
  Jambon: "Ham",
};

export const COMPOSITION_HINT_EN: Record<string, string> = {
  pizza: "Choose your size — price confirmed by phone.",
  tacos: "M 1 meat · L 2 · XL 3 · XXL 4. Extras +€1, gratiné +€2.",
  bowl: "M = 1 meat · L = 2 meats",
};

export const COMPOSITION_NOTE_PLACEHOLDER_EN: Record<string, string> = {
  default: "Notes (no onions, well done…)",
  pizza: "Extras or ingredients to remove",
  burger: "Cooking, no pickles…",
};
