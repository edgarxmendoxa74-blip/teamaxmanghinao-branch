-- Full Menu Sync Migration
-- Date: 2026-04-06
-- This migration ensures all menu items match the latest menu sheet exactly.

DO $$
BEGIN

    -- =====================================================
    -- 1. ENSURE ALL CATEGORIES EXIST
    -- =====================================================
    INSERT INTO categories (id, name, icon, sort_order, active) VALUES
      ('chicken-wings', 'Chicken Wings', '🍗', 1, true),
      ('extras', 'Extras', '🍚', 2, true),
      ('burger', 'Burgers', '🍔', 3, true),
      ('hotdogs', 'Hotdogs', '🌭', 4, true),
      ('eggdrop', 'Eggdrop', '🥪', 5, true),
      ('pasta', 'Pasta', '🍝', 6, true),
      ('fries-nachos', 'Snacks', '🍟', 7, true),
      ('silog-meals', 'Silog Meals', '🍳', 8, true),
      ('combo-meals', 'Combo Meals', '🍔🍗🍟', 9, true),
      ('milk-tea', 'Milk Tea', '🧋', 10, true),
      ('coffee-new', 'Coffee', '☕', 11, true),
      ('milkshake', 'Milkshake', '🥤', 12, true),
      ('cheesecake', 'Cheesecake', '🍰', 13, true),
      ('premiums', 'Premiums', '🌟', 14, true),
      ('fruit-tea', 'Fruit Tea', '🍹', 15, true),
      ('fruit-soda', 'Fruit Soda', '🥤', 16, true),
      ('yogurt', 'Yogurt', '🍦', 17, true),
      ('ramen', 'Ramen', '🍜', 18, true)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      icon = EXCLUDED.icon,
      sort_order = EXCLUDED.sort_order,
      active = true;

    -- =====================================================
    -- 2. CHICKEN WINGS — Update price and variations
    -- =====================================================
    UPDATE menu_items SET base_price = 119 WHERE name = 'Chicken Wings' AND category = 'chicken-wings';

    DELETE FROM variations WHERE menu_item_id IN (SELECT id FROM menu_items WHERE name = 'Chicken Wings' AND category = 'chicken-wings');

    INSERT INTO variations (menu_item_id, name, price)
    SELECT id, '4 pcs', 119 FROM menu_items WHERE name = 'Chicken Wings' AND category = 'chicken-wings';
    INSERT INTO variations (menu_item_id, name, price)
    SELECT id, '6 pcs', 159 FROM menu_items WHERE name = 'Chicken Wings' AND category = 'chicken-wings';
    INSERT INTO variations (menu_item_id, name, price)
    SELECT id, '12 pcs', 299 FROM menu_items WHERE name = 'Chicken Wings' AND category = 'chicken-wings';

    -- =====================================================
    -- 3. EXTRAS — Rice
    -- =====================================================
    INSERT INTO menu_items (name, description, base_price, category, popular, available)
    SELECT 'Rice', 'Steamed white rice', 20, 'extras', false, true
    WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Rice' AND category = 'extras');
    UPDATE menu_items SET base_price = 20 WHERE name = 'Rice' AND category = 'extras';

    -- =====================================================
    -- 4. BURGERS
    -- =====================================================
    -- Upsert all burger items
    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Classic Burger', 'Classic beef burger with fresh toppings', 109, 'burger', true, true),
      ('Chicken Burger', 'Crispy chicken patty burger', 109, 'burger', false, true),
      ('Smash Burger', 'Thin-pressed smash-style burger', 140, 'burger', false, true),
      ('Cheezy Bacon', 'Cheesy burger with crispy bacon', 130, 'burger', false, true),
      ('Hawaiian Burger', 'Burger with grilled pineapple and ham', 150, 'burger', false, true),
      ('Chili Burger', 'Spicy chili-topped burger', 150, 'burger', false, true),
      ('Burger Steak', 'Burger patty served with gravy and rice', 79, 'burger', false, true),
      ('Philly-Cheesteak', 'Philly-style cheesesteak sandwich', 180, 'burger', false, true)
    ON CONFLICT DO NOTHING;

    -- Make sure prices are correct for any existing items
    UPDATE menu_items SET base_price = 109 WHERE name = 'Classic Burger' AND category = 'burger';
    UPDATE menu_items SET base_price = 109 WHERE name = 'Chicken Burger' AND category = 'burger';
    UPDATE menu_items SET base_price = 140 WHERE name = 'Smash Burger' AND category = 'burger';
    UPDATE menu_items SET base_price = 130 WHERE name = 'Cheezy Bacon' AND category = 'burger';
    UPDATE menu_items SET base_price = 130 WHERE name = 'Cheesy Bacon' AND category = 'burger';
    UPDATE menu_items SET base_price = 150 WHERE name = 'Hawaiian Burger' AND category = 'burger';
    UPDATE menu_items SET base_price = 150 WHERE name = 'Chili Burger' AND category = 'burger';
    UPDATE menu_items SET base_price = 79 WHERE name = 'Burger Steak' AND category = 'burger';
    UPDATE menu_items SET base_price = 79, name = 'Burger Steak' WHERE name = '1 pc Burger Steak' AND category = 'burger';
    UPDATE menu_items SET base_price = 180 WHERE name = 'Philly-Cheesteak' AND category = 'burger';

    -- =====================================================
    -- 5. HOTDOGS
    -- =====================================================
    UPDATE menu_items SET base_price = 99, name = 'Chilidog' WHERE category = 'hotdogs' AND (name = 'Chili-Dog Classic' OR name = 'Chilidog');
    UPDATE menu_items SET base_price = 109, name = 'Chilidog Jalapeno' WHERE category = 'hotdogs' AND (name = 'Chili-Dog Jalapeno' OR name = 'Chilidog Jalapeno');

    INSERT INTO menu_items (name, description, base_price, category, popular, available)
    SELECT 'Chilidog', 'Classic hotdog with chili sauce', 99, 'hotdogs', false, true
    WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Chilidog' AND category = 'hotdogs');

    INSERT INTO menu_items (name, description, base_price, category, popular, available)
    SELECT 'Chilidog Jalapeno', 'Chili hotdog with spicy jalapeno peppers', 109, 'hotdogs', false, true
    WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Chilidog Jalapeno' AND category = 'hotdogs');

    -- =====================================================
    -- 6. EGGDROP
    -- =====================================================
    UPDATE menu_items SET base_price = 100, name = 'Regular Eggylicious' WHERE category = 'eggdrop' AND (name = 'Regular Egglicious' OR name = 'Regular Eggylicious');
    UPDATE menu_items SET base_price = 120, name = 'Spam and Cheezzy' WHERE category = 'eggdrop' AND (name ILIKE '%spam%');
    UPDATE menu_items SET base_price = 120, name = 'Bacon and Cheezzy' WHERE category = 'eggdrop' AND (name ILIKE '%bacon%');
    UPDATE menu_items SET base_price = 120, name = 'Ham and Cheezzy' WHERE category = 'eggdrop' AND (name ILIKE '%ham%');
    UPDATE menu_items SET base_price = 130, name = 'Burger and Cheezzy' WHERE category = 'eggdrop' AND (name ILIKE '%burger%');

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Regular Eggylicious', 'Classic eggdrop sandwich', 100, 'eggdrop', false, true),
      ('Spam and Cheezzy', 'Eggdrop with spam and melted cheese', 120, 'eggdrop', false, true),
      ('Bacon and Cheezzy', 'Eggdrop with bacon and melted cheese', 120, 'eggdrop', false, true),
      ('Ham and Cheezzy', 'Eggdrop with ham and melted cheese', 120, 'eggdrop', false, true),
      ('Burger and Cheezzy', 'Eggdrop with burger patty and melted cheese', 130, 'eggdrop', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 7. PASTA
    -- =====================================================
    UPDATE menu_items SET base_price = 89 WHERE name = 'Spaghetti' AND category = 'pasta';
    UPDATE menu_items SET base_price = 89, name = 'Carbonara' WHERE category = 'pasta' AND (name = 'Creamy Carbonara' OR name = 'Carbonara');
    UPDATE menu_items SET base_price = 89, name = 'Charlie Chan' WHERE category = 'pasta' AND (name = 'Charlie-Chan' OR name = 'Charlie Chan');

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Spaghetti', 'Classic Filipino-style spaghetti', 89, 'pasta', false, true),
      ('Carbonara', 'Creamy carbonara pasta', 89, 'pasta', false, true),
      ('Charlie Chan', 'Charlie Chan style pasta', 89, 'pasta', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 8. SNACKS
    -- =====================================================
    UPDATE menu_items SET base_price = 85 WHERE name = 'Nachos' AND category = 'fries-nachos';
    UPDATE menu_items SET base_price = 99 WHERE name = 'Fries Overload' AND category = 'fries-nachos';
    UPDATE menu_items SET base_price = 50, name = 'Fries Flavored' WHERE category = 'fries-nachos' AND (name = 'Cheese Fries' OR name = 'Fries Flavored');
    UPDATE menu_items SET base_price = 70 WHERE name = 'Onion Rings' AND category = 'fries-nachos';

    DELETE FROM menu_items WHERE name = 'BBQ Fries' AND category = 'fries-nachos';
    DELETE FROM menu_items WHERE name = 'Spicy BBQ Fries' AND category = 'fries-nachos';

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Nachos', 'Crispy nachos with cheese sauce', 85, 'fries-nachos', true, true),
      ('Fries Overload', 'Loaded fries with toppings', 99, 'fries-nachos', false, true),
      ('Fries Flavored', 'Seasoned flavored fries', 50, 'fries-nachos', false, true),
      ('Onion Rings', 'Crispy battered onion rings', 70, 'fries-nachos', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 9. SILOG MEALS
    -- =====================================================
    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Tapsilog', 'Tapa with sinangag and itlog', 115, 'silog-meals', false, true),
      ('Longsilog', 'Longganisa with sinangag and itlog', 115, 'silog-meals', false, true),
      ('Spamsilog', 'Spam with sinangag and itlog', 95, 'silog-meals', false, true),
      ('Bacsilog', 'Bacon with sinangag and itlog', 75, 'silog-meals', false, true)
    ON CONFLICT DO NOTHING;

    UPDATE menu_items SET base_price = 115 WHERE name = 'Tapsilog' AND category = 'silog-meals';
    UPDATE menu_items SET base_price = 115 WHERE name = 'Longsilog' AND category = 'silog-meals';
    UPDATE menu_items SET base_price = 95 WHERE name = 'Spamsilog' AND category = 'silog-meals';
    UPDATE menu_items SET base_price = 75 WHERE name = 'Bacsilog' AND category = 'silog-meals';

    -- =====================================================
    -- 10. COMBO MEALS
    -- =====================================================
    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Burger with Fries', 'Burger served with crispy fries', 150, 'combo-meals', false, true),
      ('Burger with Chicken', 'Burger paired with chicken wings', 209, 'combo-meals', false, true),
      ('Spaghetti with Chicken', 'Spaghetti paired with chicken wings', 185, 'combo-meals', false, true)
    ON CONFLICT DO NOTHING;

    UPDATE menu_items SET base_price = 150 WHERE name = 'Burger with Fries' AND category = 'combo-meals';
    UPDATE menu_items SET base_price = 209 WHERE name = 'Burger with Chicken' AND category = 'combo-meals';
    UPDATE menu_items SET base_price = 185 WHERE name = 'Spaghetti with Chicken' AND category = 'combo-meals';

    -- =====================================================
    -- 11. MILK TEA — All ₱70
    -- =====================================================
    UPDATE menu_items SET base_price = 70 WHERE category = 'milk-tea';

    -- Insert all milk tea flavors
    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Pearl Milk Tea', 'Classic pearl milk tea with chewy tapioca pearls', 70, 'milk-tea', true, true),
      ('Mocca', 'Rich mocca milk tea', 70, 'milk-tea', false, true),
      ('Hazelnut Macchiato', 'Hazelnut macchiato milk tea', 70, 'milk-tea', false, true),
      ('Coffee Latte MT', 'Coffee latte milk tea', 70, 'milk-tea', false, true),
      ('Choco Nutella', 'Chocolate nutella milk tea', 70, 'milk-tea', false, true),
      ('Thai MT', 'Thai-style milk tea', 70, 'milk-tea', false, true),
      ('Cookies & Cream', 'Cookies and cream milk tea', 70, 'milk-tea', false, true),
      ('Choco Hazelnut MT', 'Chocolate hazelnut milk tea', 70, 'milk-tea', false, true),
      ('Wintermelon Latte', 'Wintermelon latte milk tea', 70, 'milk-tea', false, true),
      ('Cappuccino MT', 'Cappuccino milk tea', 70, 'milk-tea', false, true),
      ('Wintermelon', 'Classic wintermelon milk tea', 70, 'milk-tea', true, true),
      ('Taro', 'Creamy taro milk tea', 70, 'milk-tea', false, true),
      ('Honey Dew', 'Refreshing honeydew milk tea', 70, 'milk-tea', false, true),
      ('Red Velvet', 'Red velvet flavored milk tea', 70, 'milk-tea', false, true),
      ('Salted Caramel MT', 'Salted caramel milk tea', 70, 'milk-tea', false, true),
      ('Oreo MT', 'Oreo cookies milk tea', 70, 'milk-tea', false, true),
      ('White Rabbit', 'White rabbit candy flavored milk tea', 70, 'milk-tea', false, true),
      ('Hershey''s', 'Hershey''s chocolate milk tea', 70, 'milk-tea', false, true),
      ('Caramel MT', 'Caramel milk tea', 70, 'milk-tea', false, true),
      ('Ube Matcha MT', 'Ube matcha milk tea', 70, 'milk-tea', false, true),
      ('Blueberry MT', 'Blueberry milk tea', 70, 'milk-tea', false, true),
      ('Tiramisu', 'Tiramisu flavored milk tea', 70, 'milk-tea', false, true),
      ('Black Forrest MT', 'Black forest cake milk tea', 70, 'milk-tea', false, true),
      ('Nutella', 'Nutella milk tea', 70, 'milk-tea', false, true),
      ('Hokkaido', 'Hokkaido milk tea', 70, 'milk-tea', true, true),
      ('Java Chips', 'Java chips milk tea', 70, 'milk-tea', false, true),
      ('Avocado MT', 'Avocado milk tea', 70, 'milk-tea', false, true),
      ('Okinawa', 'Roasted brown sugar Okinawa milk tea', 70, 'milk-tea', true, true),
      ('Caramel Macchiato', 'Caramel macchiato milk tea', 70, 'milk-tea', false, true),
      ('Dark Choco', 'Dark chocolate milk tea', 70, 'milk-tea', false, true),
      ('Vanilla', 'Vanilla milk tea', 70, 'milk-tea', false, true),
      ('Coffee Caramel MT', 'Coffee caramel milk tea', 70, 'milk-tea', false, true),
      ('Double Dutch', 'Double dutch milk tea', 70, 'milk-tea', false, true),
      ('Choco Mousse', 'Chocolate mousse milk tea', 70, 'milk-tea', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 12. COFFEE
    -- =====================================================
    -- Remove items not in the new menu
    DELETE FROM menu_items WHERE name = 'Thai Coffee' AND category = 'coffee-new';
    DELETE FROM menu_items WHERE name = 'Choco Coffee' AND category = 'coffee-new';

    -- Rename existing coffee items to match new menu
    UPDATE menu_items SET name = 'Caramel Machiato', base_price = 80 WHERE name = 'Caramel Macchiato Coffee' AND category = 'coffee-new';
    UPDATE menu_items SET name = 'Caramel Machiato', base_price = 80 WHERE name = 'Caramel Machiato' AND category = 'coffee-new';
    UPDATE menu_items SET base_price = 80 WHERE name = 'Matcha Coffee Latte' AND category = 'coffee-new';
    UPDATE menu_items SET base_price = 95 WHERE name = 'Caramel Sea Salt Latte' AND category = 'coffee-new';
    UPDATE menu_items SET base_price = 80 WHERE name = 'Hazelnut Latte' AND category = 'coffee-new';
    UPDATE menu_items SET name = 'Baileys Coffee', base_price = 80 WHERE category = 'coffee-new' AND (name = 'Baileys' OR name = 'Baileys Coffee');
    UPDATE menu_items SET name = 'Butterscotch Coffee', base_price = 80 WHERE category = 'coffee-new' AND (name = 'Butterscotch' OR name = 'Butterscotch Coffee');
    UPDATE menu_items SET name = 'Hazelnut Machiato', base_price = 80 WHERE category = 'coffee-new' AND (name = 'Hazelnut Macchiato Coffee' OR name = 'Hazelnut Machiato');
    UPDATE menu_items SET base_price = 50, name = 'Cafe Americano' WHERE category = 'coffee-new' AND (name = 'Iced Americano' OR name = 'Cafe Americano');
    UPDATE menu_items SET base_price = 120 WHERE name = 'Pistachio Coffee' AND category = 'coffee-new';
    UPDATE menu_items SET base_price = 145 WHERE name = 'Biscoff Frappe' AND category = 'coffee-new';

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Caramel Machiato', 'Espresso with caramel and steamed milk', 80, 'coffee-new', false, true),
      ('Matcha Coffee Latte', 'Matcha blended with espresso', 80, 'coffee-new', false, true),
      ('Caramel Sea Salt Latte', 'Caramel latte with sea salt foam', 95, 'coffee-new', false, true),
      ('Hazelnut Latte', 'Hazelnut flavored coffee latte', 80, 'coffee-new', false, true),
      ('Baileys Coffee', 'Baileys flavored coffee', 80, 'coffee-new', false, true),
      ('Butterscotch Coffee', 'Butterscotch flavored coffee', 80, 'coffee-new', false, true),
      ('Hazelnut Machiato', 'Hazelnut macchiato coffee', 80, 'coffee-new', false, true),
      ('Cafe Americano', 'Rich espresso with hot water', 50, 'coffee-new', true, true),
      ('Pistachio Coffee', 'Premium pistachio flavored coffee', 120, 'coffee-new', false, true),
      ('Biscoff Frappe', 'Biscoff cookie blended frappe', 145, 'coffee-new', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 13. MILKSHAKE
    -- =====================================================
    UPDATE menu_items SET name = 'Oreo in a Cup', base_price = 90 WHERE category = 'milkshake' AND (name = 'Oreo in a Cup');
    UPDATE menu_items SET name = 'Kit Kat', base_price = 90 WHERE category = 'milkshake' AND (name = 'Kitkat' OR name = 'Kit Kat');
    UPDATE menu_items SET name = 'Strawberry MS', base_price = 90 WHERE category = 'milkshake' AND (name = 'Strawberry Shake' OR name = 'Strawberry MS');
    UPDATE menu_items SET name = 'Avocado MS', base_price = 90 WHERE category = 'milkshake' AND (name = 'Avocado Shake' OR name = 'Avocado MS');
    UPDATE menu_items SET name = 'Mango MS', base_price = 90 WHERE category = 'milkshake' AND (name = 'Mango Shake' OR name = 'Mango MS');
    UPDATE menu_items SET name = 'Taro Halo Halo', base_price = 95 WHERE (name = 'Taro Halo-Halo' OR name = 'Taro Halo Halo');

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Oreo in a Cup', 'Creamy Oreo milkshake', 90, 'milkshake', false, true),
      ('Kit Kat', 'Kit Kat milkshake', 90, 'milkshake', false, true),
      ('Strawberry MS', 'Strawberry milkshake', 90, 'milkshake', false, true),
      ('Avocado MS', 'Avocado milkshake', 90, 'milkshake', false, true),
      ('Mango MS', 'Mango milkshake', 90, 'milkshake', false, true),
      ('Taro Halo Halo', 'Taro halo-halo milkshake', 95, 'milkshake', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 14. CHEESECAKE — All ₱85
    -- =====================================================
    UPDATE menu_items SET base_price = 85 WHERE category = 'cheesecake';

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Oreo Cheesecake', 'Oreo cheesecake drink', 85, 'cheesecake', false, true),
      ('Blueberry Cheesecake', 'Blueberry cheesecake drink', 85, 'cheesecake', false, true),
      ('Mango Cheesecake', 'Mango cheesecake drink', 85, 'cheesecake', false, true),
      ('Avocado Cheesecake', 'Avocado cheesecake drink', 85, 'cheesecake', false, true),
      ('Strawberry Cheesecake', 'Strawberry cheesecake drink', 85, 'cheesecake', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 15. PREMIUMS
    -- =====================================================
    UPDATE menu_items SET base_price = 85 WHERE name = 'Meiji Apollo' AND category = 'premiums';
    UPDATE menu_items SET base_price = 100 WHERE name = 'Brown Sugar Latte' AND category = 'premiums';
    UPDATE menu_items SET base_price = 100 WHERE name = 'Milo G' AND category = 'premiums';

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Meiji Apollo', 'Meiji Apollo chocolate drink', 85, 'premiums', false, true),
      ('Brown Sugar Latte', 'Brown sugar latte', 100, 'premiums', false, true),
      ('Milo G', 'Milo godzilla drink', 100, 'premiums', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 16. FRUIT TEA — All ₱70
    -- =====================================================
    UPDATE menu_items SET base_price = 70 WHERE category = 'fruit-tea';

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Kiwi FT', 'Kiwi fruit tea', 70, 'fruit-tea', false, true),
      ('Passion FT', 'Passion fruit tea', 70, 'fruit-tea', false, true),
      ('Peach Mango FT', 'Peach mango fruit tea', 70, 'fruit-tea', false, true),
      ('Kiwi Lychee FT', 'Kiwi lychee fruit tea', 70, 'fruit-tea', false, true),
      ('Strawberry FT', 'Strawberry fruit tea', 70, 'fruit-tea', false, true),
      ('Blueberry FT', 'Blueberry fruit tea', 70, 'fruit-tea', false, true),
      ('Lemon FT', 'Lemon fruit tea', 70, 'fruit-tea', false, true),
      ('Lychee FT', 'Lychee fruit tea', 70, 'fruit-tea', false, true),
      ('Passion Mango FT', 'Passion mango fruit tea', 70, 'fruit-tea', false, true),
      ('Mango FT', 'Mango fruit tea', 70, 'fruit-tea', false, true),
      ('Green Apple FT', 'Green apple fruit tea', 70, 'fruit-tea', false, true),
      ('Peach FT', 'Peach fruit tea', 70, 'fruit-tea', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 17. FRUIT SODA — All ₱70
    -- =====================================================
    UPDATE menu_items SET base_price = 70 WHERE category = 'fruit-soda';
    -- Rename existing items to match
    UPDATE menu_items SET name = 'Rootbeer' WHERE name = 'Rootbeer Float' AND category = 'fruit-soda';
    UPDATE menu_items SET name = 'Lychee' WHERE name = 'Lychee Soda' AND category = 'fruit-soda';
    UPDATE menu_items SET name = 'Raspberry' WHERE name = 'Raspberry Soda' AND category = 'fruit-soda';
    UPDATE menu_items SET name = 'Passion' WHERE name = 'Passion Soda' AND category = 'fruit-soda';
    UPDATE menu_items SET name = 'Kiwi' WHERE name = 'Kiwi Soda' AND category = 'fruit-soda';

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Strawberry Soda', 'Strawberry fruit soda', 70, 'fruit-soda', false, true),
      ('Blueberry Soda', 'Blueberry fruit soda', 70, 'fruit-soda', false, true),
      ('Rootbeer', 'Classic rootbeer soda', 70, 'fruit-soda', false, true),
      ('Bubblegum Soda', 'Bubblegum flavored soda', 70, 'fruit-soda', false, true),
      ('Lychee', 'Lychee soda', 70, 'fruit-soda', false, true),
      ('Green Apple Soda', 'Green apple soda', 70, 'fruit-soda', false, true),
      ('Raspberry', 'Raspberry soda', 70, 'fruit-soda', false, true),
      ('Passion', 'Passion fruit soda', 70, 'fruit-soda', false, true),
      ('Kiwi', 'Kiwi soda', 70, 'fruit-soda', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 18. YOGURT — All ₱80
    -- =====================================================
    UPDATE menu_items SET base_price = 80 WHERE category = 'yogurt';

    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Mango Yogurt', 'Creamy mango yogurt drink', 80, 'yogurt', false, true),
      ('Strawberry Yogurt', 'Creamy strawberry yogurt drink', 80, 'yogurt', false, true),
      ('Blueberry Yogurt', 'Creamy blueberry yogurt drink', 80, 'yogurt', false, true)
    ON CONFLICT DO NOTHING;

    -- =====================================================
    -- 19. RAMEN
    -- =====================================================
    INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
      ('Tantanmen', 'Spicy sesame-based ramen', 199, 'ramen', false, true),
      ('Tonkotsu', 'Rich pork bone broth ramen', 199, 'ramen', false, true)
    ON CONFLICT DO NOTHING;

    UPDATE menu_items SET base_price = 199 WHERE name = 'Tantanmen' AND category = 'ramen';
    UPDATE menu_items SET base_price = 199 WHERE name = 'Tonkotsu' AND category = 'ramen';

    RAISE NOTICE 'Full menu sync completed successfully!';
END $$;
