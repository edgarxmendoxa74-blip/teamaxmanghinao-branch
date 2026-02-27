-- Add Chicken Wings category and menu item with flavor options

DO $$
DECLARE
    v_wings_cat_id text := 'chicken-wings';
    v_item_id uuid;
BEGIN
    -- 1. Create Chicken Wings category
    INSERT INTO categories (id, name, icon, sort_order, active)
    VALUES (v_wings_cat_id, 'Chicken Wings', '🍗', 9, true)
    ON CONFLICT (id) DO NOTHING;

    -- 2. Insert Chicken Wings menu item with flavors
    INSERT INTO menu_items (name, description, base_price, category, popular, available, flavors)
    VALUES (
        'Chicken Wings',
        'Crispy fried chicken wings with your choice of flavor',
        149,
        v_wings_cat_id,
        true,
        true,
        ARRAY['Buffalo Hot', 'Soy Garlic', 'Honey BBQ', 'Sweet Chili', 'Garlic Parmesan']
    )
    RETURNING id INTO v_item_id;

    -- 3. Add variations (6pcs and 12pcs)
    --    Note: 12pcs triggers the 2-flavor picker in the UI
    INSERT INTO variations (menu_item_id, name, price) VALUES
    (v_item_id, '6pcs', 149),
    (v_item_id, '12pcs', 269);

END $$;
