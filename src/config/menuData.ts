/**
 * Stafford Brewers — OFFICIAL MENU (prices in RWF as supplied by the owner).
 * To edit: change a line in `sections` below — [name, price, description?].
 * Use `null` as price when it isn't confirmed ("Ask for price" is shown).
 * Add `{ id, name, group, image, items }` blocks to create new categories.
 * Republish the site after editing so all visitors see the change.
 */
import coffee from "@/assets/coffee.jpg";
import tea from "@/assets/tea.jpg";
import drink from "@/assets/drink.jpg";
import breakfast from "@/assets/breakfast.jpg";
import mains from "@/assets/mains.jpg";
import sandwich from "@/assets/sandwich.jpg";
import burger from "@/assets/burger.jpg";
import fries from "@/assets/fries.jpg";
import samosa from "@/assets/samosa.jpg";
import chickenWrap from "@/assets/chicken-wrap.jpg";
import africanCoffee from "@/assets/african-coffee.jpg";
import passionJuice from "@/assets/passion-juice.png";
import chickenCurry from "@/assets/chicken-curry.png";
import tilapiaPlate from "@/assets/tilapia-plate.png";
import beefSteak from "@/assets/beef-steak.jpg";

export type Availability = "available" | "ask" | "unavailable";
export type Tag = "bestseller" | "offer" | "chef";
export type Group = "drinks" | "food";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number | null;
  priceLabel?: string;
  category: string;
  image: string;
  availability: Availability;
  tags?: Tag[];
  featured?: boolean;
}

type Row = [name: string, price: number | null, description?: string | undefined, extra?: Partial<MenuItem>];
interface Section { id: string; name: string; group: Group; image: string; note?: string; items: Row[] }

const chef: Partial<MenuItem> = { tags: ["chef"], featured: true };
const pick: Partial<MenuItem> = { featured: true };

const sections: Section[] = [
  { id: "breakfast", name: "Breakfast", group: "food", image: breakfast, items: [
    ["Rolex", 4000, "Plain omelet in chapatti.", pick],
    ["Rolex with Chips", 6000, "Plain omelet in chapatti served with chips."],
    ["Plain Omelet", 4000],
    ["Spanish Omelet", 5000, "Beaten eggs with diced onions, tomatoes and green peppers."],
    ["ST4D On The Go", 10000, "Beaten eggs, chicken strips with chips, diced onions, tomatoes and green peppers."],
    ["Fruit Cut Salad", 7000],
    ["Musambira Breakfast", 12000],
    ["Fried Egg & Avocado on Toast", 6000],
  ]},
  { id: "soup", name: "Soup", group: "food", image: "", items: [
    ["Mushroom Soup", 6000, "Fresh mushroom, onions, garlic, ginger and fresh cream, served with garlic bread."],
    ["Vegetable Soup", 5000, "Carrots, onions, baby marrow, leeks, celery, pumpkin and fresh cream, served with garlic bread."],
    ["Chicken and Matooke Broth", 8000, "Chicken cubes and boiled green bananas, vegetables, garnished with coriander."],
    ["Pumpkin Soup", 6000],
  ]},
  { id: "salad", name: "Salad", group: "food", image: "", items: [
    ["STA4 Salad", 10000, "Lettuce, cucumber, onions, carrots, tomatoes, beef and chicken strips, eggs, cheese batonnets, white dressing.", chef],
    ["Fresh Garden Salad", 5000, "Lettuce, carrots, cucumber, tomatoes, avocados, white dressing and toasted bread."],
    ["Chicken Salad", 10000, "Lettuce, carrots, cucumber, tomatoes, onions, avocados, chicken strips, grilled pineapple and banana."],
    ["Chicken Caesar Salad", 8000, "Grilled chicken on soft lettuce, cheese, croutons, dressing of your choice."],
  ]},
  { id: "lunch", name: "Lunch", group: "food", image: mains, items: [
    ["Meatballs Stew", null], ["Musambira Beef Pasta", null], ["ST4D Platter", null],
    ["Spaghetti Arrabbiata – Indian Style", null], ["Chicken Rice", null],
    ["Grilled Tilapia Fillet", 12000, "Marinated tilapia fillet with chips, rice or boiled potatoes and vegetables.", { featured: true, image: tilapiaPlate }],
    ["Roasted Chicken Leg", 10000, "Marinated chicken leg with chips and vegetables."],
    ["Grilled Beef Steak", 15000, "Boneless beef fillet with chips and vegetables.", { ...chef, image: beefSteak }],
    ["Chicken / Fish Stroganoff", 12000, "Tender meat in creamy mushroom sauce and vegetables, with rice and chips or boiled potatoes."],
    ["Chicken / Veg Stew (Gatogo)", 12000, "Chicken cooked with vegetables, garden peas and potatoes or green bananas."],
    ["Beef / Chicken Brochette (2 pc)", 12000, "Grilled brochettes with mushroom, tomato or pepper sauce, served with chips."],
    ["Chicken Wings", 10000, "Six pieces of marinated fried wings served with chips and kachumbari."],
    ["Full Chicken", 30000], ["Chicken Nuggets", 10000], ["Fish Finger", 10000],
  ]},
  { id: "sandwich", name: "Sandwiches & Burgers", group: "food", image: sandwich, items: [
    ["Chicken Club Sandwich", 12000, "Marinated chicken, cheese, onions, tomatoes, lettuce in toasted bread, served with chips.", pick],
    ["Ham and Cheese Sandwich", 6000, "Ham and cheese melted in toast bread, served with chips or salad."],
    ["Croque Madame", 5500, "Ham, melted cheese on sliced bread with optional fried egg."],
    ["Vegetable Sandwich", 7000],
    ["Chicken Tramezzini", 12000, "Marinated chicken, mayonnaise, avocado, cheese, tomatoes on focaccia, served with chips."],
    ["Veggie Tramezzini", 7000, "Stir-fried vegetables and avocado on focaccia, served with chips."],
    ["Steak Onion Sandwich", 10000, "Grilled beef fillet, caramelised onions, fresh tomato in toasted bread, served with chips."],
    ["Beef Cheese Burger", 10000, "Beef patty, cheese, onions, tomatoes, lettuce, served with chips.", { featured: true, image: burger }],
    ["Chicken Cheese Burger", 10000, "Chicken patty, cheese, onions, tomatoes, lettuce, served with chips.", { image: burger }],
    ["Veggie Burger", 8000, "Veggie patty, caramelised onions, tomatoes, lettuce, served with chips.", { image: burger }],
    ["STA4 Sweet Bread Sandwich", 2500],
  ]},
  { id: "sides", name: "Side Dish", group: "food", image: fries, items: [
    ["Side Salad", 2500], ["Steamed Rice", 2500], ["French Fries / Green Banana", 3000], ["Vegetables", 3000], ["Avocado Salad", 2000],
    ["Sautéed Potatoes", null], ["Fried Vegetable Rice", null], ["Vegetable Ratatouille", null], ["Rice Biryani", null],
    ["Pilau Rice", null], ["Mashed Potatoes or Bananas", null], ["Pomme Croquette", null], ["Boiled Eggs", null],
  ]},
  { id: "sauces", name: "Sauces", group: "food", image: "", note: "Sauce options for brochettes — no separate price", items: [
    ["Mushroom Sauce", null, undefined, { priceLabel: "Included" }],
    ["Tomato Sauce", null, undefined, { priceLabel: "Included" }],
    ["Pepper Sauce", null, undefined, { priceLabel: "Included" }],
  ]},
  { id: "indian", name: "Indian Dishes", group: "food", image: mains, items: [
    ["Fish Curry", 12000, "Tender boneless fish in curry sauce, served with rice and chips."],
    ["Chicken Curry", 12000, "Tender boneless chicken in curry sauce, served with rice and chips.", { featured: true, image: chickenCurry }],
    ["Veggies Curry", 6000, "Mixed vegetables in curry sauce, served with rice and chips."],
  ]},
  { id: "pasta", name: "Pasta", group: "food", image: "", items: [
    ["Spaghetti Bolognese", 5000, "Spaghetti with seasoned bolognese sauce and melted cheese."],
    ["Spaghetti / Penne Napolitana", 7500, "Spaghetti or penne with seasoned tomato sauce."],
    ["Musambira Beef Pasta", null], ["Spaghetti Arrabbiata – Indian Style", null],
  ]},
  { id: "wraps", name: "Wrap", group: "food", image: "", items: [
    ["Chicken / Fish / Beef Wrap", 9000], ["Chicken Wrap Plain", 7000, undefined, { image: chickenWrap }], ["Fish Wrap Plain", 9000],
    ["Fish Wrap Plain with Chips", 10000], ["Beef Wrap Plain", 9000],
    ["Stir-Fried Chicken / Beef Wrap", 10000, "Stir-fried vegetables with strips of meat, served with chips."],
    ["Sautéed Vegetable Wrap", 6000, "Sautéed carrots, onions, zucchini, avocado and coriander in a fresh chapati."],
    ["Chicken & Mushroom Wrap", null], ["Spaghetti Veg Wrap", null],
  ]},
  { id: "dessert", name: "Desserts", group: "food", image: "", items: [
    ["Cake of Your Choice", null], ["Fresh Cut Fruits", null], ["Scoop of Three Types of Ice Cream", null],
    ["Sliced Banana Cake", 1000], ["Sliced Lemon Cake", 1000], ["Sliced Carrot Cake", 1000],
    ["Half Carrot Cake", 6000], ["Full Carrot Cake", 9000], ["Half Lemon Cake", 6000], ["Full Lemon Cake", 9000],
    ["Marble Muffins", 1000], ["Cinnamon Rolls", 1000],
  ]},
  { id: "snacks", name: "Snacks & Bakery", group: "food", image: samosa, items: [
    ["Chapatti", 1000], ["Beef / Veggie Samosa", 1000, undefined, pick],
  ]},
  { id: "coffee", name: "Coffee", group: "drinks", image: coffee, note: "All coffees available as Grab & Go", items: [
    ["Espresso", 2000], ["Espresso Macchiato", 3000], ["Espresso Con Panna", 3000], ["Espresso Romano", 3000],
    ["Lungo", 3000], ["Regular Coffee", 3000], ["Cappuccino", 3000, undefined, pick], ["Café Latte", 3000],
    ["Flat White", 3000], ["Cortado", 3000], ["Affogato", 3000], ["Café Au Lait", 3000],
  ]},
  { id: "flavored-coffee", name: "Flavored Coffee", group: "drinks", image: coffee, items: [
    ["Caramel Latte / Cappuccino", 5500], ["Coconut Latte / Cappuccino", 5500], ["Caramel Macchiato", 5500],
    ["Vanilla Latte / Cappuccino", 5500], ["Hazelnut Latte / Cappuccino", 5500], ["Strawberry Latte / Cappuccino", 5500],
    ["Almond Latte / Cappuccino", 5500], ["Tiramisu Latte / Cappuccino", 5500], ["Oat Latte / Cappuccino", 6000],
    ["Cinnamon Latte", 5500], ["Chai Latte", 5500], ["Ginger Latte", 5500],
  ]},
  { id: "special-coffee", name: "Special Coffee", group: "drinks", image: coffee, items: [
    ["African Coffee", 3500, undefined, { featured: true, image: africanCoffee }], ["Irish Coffee", 3500], ["Irish Coffee", 6000],
    ["Irish Spice Coffee", 8000], ["For Long Journey Coffee", 6000],
  ]},
  { id: "iced-coffee", name: "Iced Coffee", group: "drinks", image: drink, note: "Grab & Go available", items: [
    ["Iced Americano", 3500], ["Iced Latte / Cappuccino", 4000], ["Iced Mocha", 5000], ["Iced Chocolate", 4500],
    ["Iced Caramel Latte", 6000], ["Iced Coconut Latte", 6000], ["Iced Caramel Macchiato", 6000], ["Iced Vanilla Latte", 6000],
    ["Iced Hazelnut Latte", 6000], ["Iced Cinnamon Latte", 6000], ["Iced Almond Latte", 5500],
    ["Iced Tiramisu Latte / Cappuccino", 6000], ["Iced Oat Latte / Cappuccino", 6000], ["Iced Almond Latte / Cappuccino", 6500],
    ["Iced Tiramisu Latte / Cappuccino (large)", 6500], ["Iced Oat Latte / Cappuccino (large)", 6500],
    ["Iced White Mocha", 6000], ["Iced Strawberry Latte", 6000], ["Iced Soya Latte", 6500], ["V60", null],
  ]},
  { id: "kawaccino", name: "Blended Coffee (Kawaccino)", group: "drinks", image: "", items: [
    ["Caramel Drizzle Kawaccino", 7000, undefined, pick], ["Mochamania Kawaccino", 7000], ["White Mochamania Kawaccino", 7000],
    ["Vanilla Drizzle Kawaccino", 7000], ["Strawberry Kawaccino", 7000],
  ]},
  { id: "frappuccino", name: "Frappuccino (Iced)", group: "drinks", image: "", items: [
    ["Banana Frappuccino", 5000], ["Strawberry Frappuccino", 5000], ["Passion Frappuccino", 5000],
    ["Stafford Special Frappuccino", 6000, undefined, chef],
  ]},
  { id: "tea", name: "Tea", group: "drinks", image: tea, items: [
    ["African Tea", 3000, undefined, pick], ["Spiced Tea", 3000], ["Ginger Tea", 3000], ["Cinnamon Tea", 3000],
    ["Masala Tea", 3000], ["Lemon Tea", 3000], ["Umucyayicyayi Tea", 3000], ["Umwenya Tea", 6000],
    ["Green Tea", 3000], ["Black Tea", 2500], ["Hibiscus Tea", 6000], ["Hot Chocolate", 3000],
  ]},
  { id: "iced-tea", name: "Iced Tea", group: "drinks", image: tea, items: [
    ["Iced African Tea", 3500], ["Iced Spiced Tea", 3500], ["Iced Ginger Tea", 6000], ["Iced Cinnamon Tea", 3500],
    ["Iced Masala Tea", 3500], ["Iced Lemon Tea", 3500], ["Iced Umucyayicyayi Tea", 3500], ["Iced Umwenya Tea", 3500],
  ]},
  { id: "milkshakes", name: "Milkshakes", group: "drinks", image: "", items: [
    ["Oreo Milkshake", 6000, undefined, pick], ["Strawberry Shake", 6000], ["Chocolate Shake", 6000],
    ["Double Shake", 6000], ["Peanut Butter Shake", 6000], ["Vanilla Milkshake", 6000],
  ]},
  { id: "smoothies", name: "Smoothies", group: "drinks", image: "", items: [
    ["Mango Breeze", 6000], ["Mango Banana Smoothie", 6000], ["Mango Pineapple Smoothie", 6000], ["Avocado Banana Smoothie", 6000],
    ["Avocado Smoothie", 5000], ["Tropical Smoothie", 5000], ["Strawberry Smoothie", 5000],
    ["Stafford Special Smoothie", 7000, undefined, chef], ["Banana Smoothie", 5000], ["Create Your Own Smoothie", 7000],
  ]},
  { id: "juices", name: "Fresh Juices", group: "drinks", image: drink, items: [
    ["Mango Juice", 10000], ["Mango & Beetroot Juice", 10000], ["Pineapple Juice", 6000], ["Lemonade", 6000],
    ["Papaya Juice", 6000], ["Apple Juice", 7000], ["Tree Tomato Juice", 6000], ["Passion Juice", 6000, undefined, { featured: true, image: passionJuice }],
    ["Carrot Juice", 7000], ["Orange Juice", 7000], ["Avocado Juice", 6000], ["Cocktail Juice", 6000],
    ["Beetroot & Pineapple Juice", 6000], ["Create Your Own Juice", 7000],
  ]},
  { id: "mojito", name: "Mojito", group: "drinks", image: "", items: [
    ["Passion Mojito", 7500], ["Strawberry Mojito", 7500], ["Mixed Mojito", 7500], ["Blue Mojito", 7500], ["Mint Mojito", 7500],
  ]},
  { id: "detox", name: "Healthy Detox Drinks", group: "drinks", image: "", items: [
    ["Detox Tea", 3000, "Ginger, honey, lemon, umwenya, umucyayicyayi, umuravumba.", { priceLabel: "3,000–3,500 RWF" }],
    ["Cold Juice Detox", 7000, "Ginger, honey, lemon, apple, carrot, cucumber, mango, spinach, pineapple."],
    ["Immunity Detox", 4000, "Ginger, honey, lemon, apple, carrot, cucumber, mango, spinach, pineapple."],
  ]},
];

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const categories = sections.map(({ id, name, group, image, note }) => ({ id, name, group, image, note }));

export const menuItems: MenuItem[] = sections.flatMap((s) =>
  s.items.map(([name, price, description, extra], i) => ({
    id: `${s.id}-${slug(name)}-${i}`,
    name,
    price,
    description: description ?? "",
    category: s.id,
    image: s.image,
    availability: price === null ? "ask" : "available",
    ...extra,
  })),
);

export const availabilityLabel: Record<Availability, string> = {
  available: "On the menu",
  ask: "Ask our team",
  unavailable: "Not available",
};

export const tagLabel: Record<Tag, string> = {
  bestseller: "Favourite",
  offer: "Special offer",
  chef: "House special",
};
