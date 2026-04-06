import { MenuItem } from '../types';

export const menuData: MenuItem[] = [
  // ========== 🍗 Chicken Wings ==========
  {
    id: 'chicken-wings',
    name: 'Chicken Wings',
    description: 'Crispy fried chicken wings',
    basePrice: 119,
    category: 'chicken-wings',
    popular: true,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    variations: [
      { id: 'cw-4pcs', name: '4 pcs', price: 119 },
      { id: 'cw-6pcs', name: '6 pcs', price: 159 },
      { id: 'cw-12pcs', name: '12 pcs', price: 299 }
    ]
  },

  // ========== 🍚 Extras ==========
  {
    id: 'rice',
    name: 'Rice',
    description: 'Steamed white rice',
    basePrice: 20,
    category: 'extras',
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // ========== 🍔 Burgers ==========
  {
    id: 'classic-burger',
    name: 'Classic Burger',
    description: 'Classic beef burger with fresh toppings',
    basePrice: 109,
    category: 'burger',
    popular: true,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    description: 'Crispy chicken patty burger',
    basePrice: 109,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'smash-burger',
    name: 'Smash Burger',
    description: 'Thin-pressed smash-style burger',
    basePrice: 140,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'cheezy-bacon',
    name: 'Cheezy Bacon',
    description: 'Cheesy burger with crispy bacon',
    basePrice: 130,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'hawaiian-burger',
    name: 'Hawaiian Burger',
    description: 'Burger with grilled pineapple and ham',
    basePrice: 150,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'chili-burger',
    name: 'Chili Burger',
    description: 'Spicy chili-topped burger',
    basePrice: 150,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'burger-steak',
    name: 'Burger Steak',
    description: 'Burger patty served with gravy and rice',
    basePrice: 79,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'philly-cheesteak',
    name: 'Philly-Cheesteak',
    description: 'Philly-style cheesesteak sandwich',
    basePrice: 180,
    category: 'burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // ========== 🌭 Hotdogs ==========
  {
    id: 'chilidog',
    name: 'Chilidog',
    description: 'Classic hotdog with chili sauce',
    basePrice: 99,
    category: 'hotdogs',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'chilidog-jalapeno',
    name: 'Chilidog Jalapeno',
    description: 'Chili hotdog with spicy jalapeno peppers',
    basePrice: 109,
    category: 'hotdogs',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // ========== 🥪 Eggdrop ==========
  {
    id: 'regular-eggylicious',
    name: 'Regular Eggylicious',
    description: 'Classic eggdrop sandwich',
    basePrice: 100,
    category: 'eggdrop',
    image: 'https://images.pexels.com/photos/5920772/pexels-photo-5920772.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'spam-and-cheezzy',
    name: 'Spam and Cheezzy',
    description: 'Eggdrop with spam and melted cheese',
    basePrice: 120,
    category: 'eggdrop',
    image: 'https://images.pexels.com/photos/5920772/pexels-photo-5920772.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'bacon-and-cheezzy',
    name: 'Bacon and Cheezzy',
    description: 'Eggdrop with bacon and melted cheese',
    basePrice: 120,
    category: 'eggdrop',
    image: 'https://images.pexels.com/photos/5920772/pexels-photo-5920772.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'ham-and-cheezzy',
    name: 'Ham and Cheezzy',
    description: 'Eggdrop with ham and melted cheese',
    basePrice: 120,
    category: 'eggdrop',
    image: 'https://images.pexels.com/photos/5920772/pexels-photo-5920772.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'burger-and-cheezzy',
    name: 'Burger and Cheezzy',
    description: 'Eggdrop with burger patty and melted cheese',
    basePrice: 130,
    category: 'eggdrop',
    image: 'https://images.pexels.com/photos/5920772/pexels-photo-5920772.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // ========== 🍝 Pasta ==========
  {
    id: 'spaghetti',
    name: 'Spaghetti',
    description: 'Classic Filipino-style spaghetti',
    basePrice: 89,
    category: 'pasta',
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'carbonara',
    name: 'Carbonara',
    description: 'Creamy carbonara pasta',
    basePrice: 89,
    category: 'pasta',
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'charlie-chan',
    name: 'Charlie Chan',
    description: 'Charlie Chan style pasta',
    basePrice: 89,
    category: 'pasta',
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // ========== 🍟 Snacks ==========
  {
    id: 'nachos',
    name: 'Nachos',
    description: 'Crispy nachos with cheese sauce',
    basePrice: 85,
    category: 'fries-nachos',
    popular: true,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'fries-overload',
    name: 'Fries Overload',
    description: 'Loaded fries with toppings',
    basePrice: 99,
    category: 'fries-nachos',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'fries-flavored',
    name: 'Fries Flavored',
    description: 'Seasoned flavored fries',
    basePrice: 50,
    category: 'fries-nachos',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Crispy battered onion rings',
    basePrice: 70,
    category: 'fries-nachos',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // ========== 🍳 Silog Meals ==========
  {
    id: 'tapsilog',
    name: 'Tapsilog',
    description: 'Tapa with sinangag and itlog',
    basePrice: 115,
    category: 'silog-meals',
    image: 'https://images.pexels.com/photos/5836649/pexels-photo-5836649.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'longsilog',
    name: 'Longsilog',
    description: 'Longganisa with sinangag and itlog',
    basePrice: 115,
    category: 'silog-meals',
    image: 'https://images.pexels.com/photos/5836649/pexels-photo-5836649.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'spamsilog',
    name: 'Spamsilog',
    description: 'Spam with sinangag and itlog',
    basePrice: 95,
    category: 'silog-meals',
    image: 'https://images.pexels.com/photos/5836649/pexels-photo-5836649.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'bacsilog',
    name: 'Bacsilog',
    description: 'Bacon with sinangag and itlog',
    basePrice: 75,
    category: 'silog-meals',
    image: 'https://images.pexels.com/photos/5836649/pexels-photo-5836649.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // ========== 🍔🍗🍟 Combo Meals ==========
  {
    id: 'burger-with-fries',
    name: 'Burger with Fries',
    description: 'Burger served with crispy fries',
    basePrice: 150,
    category: 'combo-meals',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'burger-with-chicken',
    name: 'Burger with Chicken',
    description: 'Burger paired with chicken wings',
    basePrice: 209,
    category: 'combo-meals',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'spaghetti-with-chicken',
    name: 'Spaghetti with Chicken',
    description: 'Spaghetti paired with chicken wings',
    basePrice: 185,
    category: 'combo-meals',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // ========== 🧋 Milk Tea (All ₱70) ==========
  { id: 'pearl-milk-tea', name: 'Pearl Milk Tea', description: 'Classic pearl milk tea with chewy tapioca pearls', basePrice: 70, category: 'milk-tea', popular: true, image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'mocca-mt', name: 'Mocca', description: 'Rich mocca milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'hazelnut-macchiato-mt', name: 'Hazelnut Macchiato', description: 'Hazelnut macchiato milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'coffee-latte-mt', name: 'Coffee Latte MT', description: 'Coffee latte milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'choco-nutella-mt', name: 'Choco Nutella', description: 'Chocolate nutella milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'thai-mt', name: 'Thai MT', description: 'Thai-style milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'cookies-and-cream-mt', name: 'Cookies & Cream', description: 'Cookies and cream milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'choco-hazelnut-mt', name: 'Choco Hazelnut MT', description: 'Chocolate hazelnut milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'wintermelon-latte-mt', name: 'Wintermelon Latte', description: 'Wintermelon latte milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'cappuccino-mt', name: 'Cappuccino MT', description: 'Cappuccino milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'wintermelon-mt', name: 'Wintermelon', description: 'Classic wintermelon milk tea', basePrice: 70, category: 'milk-tea', popular: true, image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'taro-mt', name: 'Taro', description: 'Creamy taro milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'honey-dew-mt', name: 'Honey Dew', description: 'Refreshing honeydew milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'red-velvet-mt', name: 'Red Velvet', description: 'Red velvet flavored milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'salted-caramel-mt', name: 'Salted Caramel MT', description: 'Salted caramel milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'oreo-mt', name: 'Oreo MT', description: 'Oreo cookies milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'white-rabbit-mt', name: 'White Rabbit', description: 'White rabbit candy flavored milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'hersheys-mt', name: "Hershey's", description: "Hershey's chocolate milk tea", basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'caramel-mt', name: 'Caramel MT', description: 'Caramel milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'ube-matcha-mt', name: 'Ube Matcha MT', description: 'Ube matcha milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'blueberry-mt', name: 'Blueberry MT', description: 'Blueberry milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'tiramisu-mt', name: 'Tiramisu', description: 'Tiramisu flavored milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'black-forrest-mt', name: 'Black Forrest MT', description: 'Black forest cake milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'nutella-mt', name: 'Nutella', description: 'Nutella milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'hokkaido-mt', name: 'Hokkaido', description: 'Hokkaido milk tea', basePrice: 70, category: 'milk-tea', popular: true, image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'java-chips-mt', name: 'Java Chips', description: 'Java chips milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'avocado-mt', name: 'Avocado MT', description: 'Avocado milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'okinawa-mt', name: 'Okinawa', description: 'Roasted brown sugar Okinawa milk tea', basePrice: 70, category: 'milk-tea', popular: true, image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'caramel-macchiato-mt', name: 'Caramel Macchiato', description: 'Caramel macchiato milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'dark-choco-mt', name: 'Dark Choco', description: 'Dark chocolate milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'vanilla-mt', name: 'Vanilla', description: 'Vanilla milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'coffee-caramel-mt', name: 'Coffee Caramel MT', description: 'Coffee caramel milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'double-dutch-mt', name: 'Double Dutch', description: 'Double dutch milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'choco-mousse-mt', name: 'Choco Mousse', description: 'Chocolate mousse milk tea', basePrice: 70, category: 'milk-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ========== ☕ Coffee ==========
  { id: 'caramel-machiato', name: 'Caramel Machiato', description: 'Espresso with caramel and steamed milk', basePrice: 80, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'matcha-coffee-latte', name: 'Matcha Coffee Latte', description: 'Matcha blended with espresso', basePrice: 80, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'caramel-sea-salt-latte', name: 'Caramel Sea Salt Latte', description: 'Caramel latte with sea salt foam', basePrice: 95, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'hazelnut-latte', name: 'Hazelnut Latte', description: 'Hazelnut flavored coffee latte', basePrice: 80, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'baileys-coffee', name: 'Baileys Coffee', description: 'Baileys flavored coffee', basePrice: 80, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'butterscotch-coffee', name: 'Butterscotch Coffee', description: 'Butterscotch flavored coffee', basePrice: 80, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'hazelnut-machiato', name: 'Hazelnut Machiato', description: 'Hazelnut macchiato coffee', basePrice: 80, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'cafe-americano', name: 'Cafe Americano', description: 'Rich espresso with hot water', basePrice: 50, category: 'coffee-new', popular: true, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'pistachio-coffee', name: 'Pistachio Coffee', description: 'Premium pistachio flavored coffee', basePrice: 120, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'biscoff-frappe', name: 'Biscoff Frappe', description: 'Biscoff cookie blended frappe', basePrice: 145, category: 'coffee-new', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ========== 🥤 Milkshake ==========
  { id: 'oreo-in-a-cup', name: 'Oreo in a Cup', description: 'Creamy Oreo milkshake', basePrice: 90, category: 'milkshake', image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'kit-kat-ms', name: 'Kit Kat', description: 'Kit Kat milkshake', basePrice: 90, category: 'milkshake', image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'strawberry-ms', name: 'Strawberry MS', description: 'Strawberry milkshake', basePrice: 90, category: 'milkshake', image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'avocado-ms', name: 'Avocado MS', description: 'Avocado milkshake', basePrice: 90, category: 'milkshake', image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'mango-ms', name: 'Mango MS', description: 'Mango milkshake', basePrice: 90, category: 'milkshake', image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'taro-halo-halo', name: 'Taro Halo Halo', description: 'Taro halo-halo milkshake', basePrice: 95, category: 'milkshake', image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ========== 🍰 Cheesecake (All ₱85) ==========
  { id: 'oreo-cheesecake', name: 'Oreo Cheesecake', description: 'Oreo cheesecake drink', basePrice: 85, category: 'cheesecake', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'blueberry-cheesecake', name: 'Blueberry Cheesecake', description: 'Blueberry cheesecake drink', basePrice: 85, category: 'cheesecake', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'mango-cheesecake', name: 'Mango Cheesecake', description: 'Mango cheesecake drink', basePrice: 85, category: 'cheesecake', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'avocado-cheesecake', name: 'Avocado Cheesecake', description: 'Avocado cheesecake drink', basePrice: 85, category: 'cheesecake', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'strawberry-cheesecake', name: 'Strawberry Cheesecake', description: 'Strawberry cheesecake drink', basePrice: 85, category: 'cheesecake', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ========== 🌟 Premiums ==========
  { id: 'meiji-apollo', name: 'Meiji Apollo', description: 'Meiji Apollo chocolate drink', basePrice: 85, category: 'premiums', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'brown-sugar-latte', name: 'Brown Sugar Latte', description: 'Brown sugar latte', basePrice: 100, category: 'premiums', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'milo-g', name: 'Milo G', description: 'Milo godzilla drink', basePrice: 100, category: 'premiums', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ========== 🍹 Fruit Tea (All ₱70) ==========
  { id: 'kiwi-ft', name: 'Kiwi FT', description: 'Kiwi fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'passion-ft', name: 'Passion FT', description: 'Passion fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'peach-mango-ft', name: 'Peach Mango FT', description: 'Peach mango fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'kiwi-lychee-ft', name: 'Kiwi Lychee FT', description: 'Kiwi lychee fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'strawberry-ft', name: 'Strawberry FT', description: 'Strawberry fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'blueberry-ft', name: 'Blueberry FT', description: 'Blueberry fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'lemon-ft', name: 'Lemon FT', description: 'Lemon fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'lychee-ft', name: 'Lychee FT', description: 'Lychee fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'passion-mango-ft', name: 'Passion Mango FT', description: 'Passion mango fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'mango-ft', name: 'Mango FT', description: 'Mango fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'green-apple-ft', name: 'Green Apple FT', description: 'Green apple fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'peach-ft', name: 'Peach FT', description: 'Peach fruit tea', basePrice: 70, category: 'fruit-tea', image: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ========== 🥤 Fruit Soda (All ₱70) ==========
  { id: 'strawberry-soda', name: 'Strawberry Soda', description: 'Strawberry fruit soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'blueberry-soda', name: 'Blueberry Soda', description: 'Blueberry fruit soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'rootbeer', name: 'Rootbeer', description: 'Classic rootbeer soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'bubblegum-soda', name: 'Bubblegum Soda', description: 'Bubblegum flavored soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'lychee-soda', name: 'Lychee', description: 'Lychee soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'green-apple-soda', name: 'Green Apple Soda', description: 'Green apple soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'raspberry-soda', name: 'Raspberry', description: 'Raspberry soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'passion-soda', name: 'Passion', description: 'Passion fruit soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'kiwi-soda', name: 'Kiwi', description: 'Kiwi soda', basePrice: 70, category: 'fruit-soda', image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ========== 🍦 Yogurt (All ₱80) ==========
  { id: 'mango-yogurt', name: 'Mango Yogurt', description: 'Creamy mango yogurt drink', basePrice: 80, category: 'yogurt', image: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'strawberry-yogurt', name: 'Strawberry Yogurt', description: 'Creamy strawberry yogurt drink', basePrice: 80, category: 'yogurt', image: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'blueberry-yogurt', name: 'Blueberry Yogurt', description: 'Creamy blueberry yogurt drink', basePrice: 80, category: 'yogurt', image: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ========== 🍜 Ramen ==========
  { id: 'tantanmen', name: 'Tantanmen', description: 'Spicy sesame-based ramen', basePrice: 199, category: 'ramen', image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'tonkotsu', name: 'Tonkotsu', description: 'Rich pork bone broth ramen', basePrice: 199, category: 'ramen', image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800' }
];

export const categories = [
  { id: 'chicken-wings', name: 'Chicken Wings', icon: '🍗' },
  { id: 'extras', name: 'Extras', icon: '🍚' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'hotdogs', name: 'Hotdogs', icon: '🌭' },
  { id: 'eggdrop', name: 'Eggdrop', icon: '🥪' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'fries-nachos', name: 'Snacks', icon: '🍟' },
  { id: 'silog-meals', name: 'Silog Meals', icon: '🍳' },
  { id: 'combo-meals', name: 'Combo Meals', icon: '🍔🍗🍟' },
  { id: 'milk-tea', name: 'Milk Tea', icon: '🧋' },
  { id: 'coffee-new', name: 'Coffee', icon: '☕' },
  { id: 'milkshake', name: 'Milkshake', icon: '🥤' },
  { id: 'cheesecake', name: 'Cheesecake', icon: '🍰' },
  { id: 'premiums', name: 'Premiums', icon: '🌟' },
  { id: 'fruit-tea', name: 'Fruit Tea', icon: '🍹' },
  { id: 'fruit-soda', name: 'Fruit Soda', icon: '🥤' },
  { id: 'yogurt', name: 'Yogurt', icon: '🍦' },
  { id: 'ramen', name: 'Ramen', icon: '🍜' }
];

export const addOnCategories = [
  { id: 'sinkers', name: 'Sinkers' },
  { id: 'sugar-level', name: 'Sugar Level' },
  { id: 'ice-level', name: 'Ice Level' },
  { id: 'extras', name: 'Extras' }
];