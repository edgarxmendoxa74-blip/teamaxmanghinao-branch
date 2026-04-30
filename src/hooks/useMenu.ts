import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { MenuItem } from '../types';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch menu items with their variations and add-ons
      const { data: items, error: itemsError } = await supabase
        .from('menu_items')
        .select(`
          *,
          variations (*),
          add_ons (*)
        `)
        .order('created_at', { ascending: true });

      if (itemsError) throw itemsError;

      const formattedItems: MenuItem[] = items?.map(item => {
        // Calculate if discount is currently active
        const now = new Date();
        const discountStart = item.discount_start_date ? new Date(item.discount_start_date) : null;
        const discountEnd = item.discount_end_date ? new Date(item.discount_end_date) : null;

        const isDiscountActive = item.discount_active &&
          (!discountStart || now >= discountStart) &&
          (!discountEnd || now <= discountEnd);

        // Calculate effective price
        const effectivePrice = isDiscountActive && item.discount_price ? item.discount_price : item.base_price;

        return {
          id: item.id,
          name: item.name,
          description: item.description,
          basePrice: item.base_price,
          category: item.category,
          popular: item.popular,
          available: item.available ?? true,
          image: item.image_url || undefined,
          discountPrice: item.discount_price || undefined,
          discountStartDate: item.discount_start_date || undefined,
          discountEndDate: item.discount_end_date || undefined,
          discountActive: item.discount_active || false,
          effectivePrice,
          isOnDiscount: isDiscountActive,
          variations: item.variations?.map(v => ({
            id: v.id,
            name: v.name,
            price: v.price
          })) || [],
          addOns: item.add_ons?.map(a => ({
            id: a.id,
            name: a.name,
            price: a.price,
            category: a.category
          })) || [],
          flavors: item.flavors || []
        };
      }) || [];

      setMenuItems(formattedItems);
      setError(null);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      // Insert menu item
      const insertData = {
        name: item.name,
        description: item.description,
        base_price: Number(item.basePrice) || 0,
        price: Number(item.basePrice) || 0,
        category: item.category,
        popular: !!item.popular,
        available: item.available ?? true,
        image_url: item.image || null,
        discount_price: item.discountPrice ? Number(item.discountPrice) : null,
        discount_start_date: item.discountStartDate || null,
        discount_end_date: item.discountEndDate || null,
        discount_active: !!item.discountActive,
        flavors: item.flavors || []
      };

      const { data: menuItem, error: itemError } = await supabase
        .from('menu_items')
        .insert(insertData)
        .select()
        .single();

      if (itemError) {
        console.error('Supabase error adding item:', JSON.stringify(itemError, null, 2));
        throw itemError;
      }

      if (!menuItem) {
        throw new Error('Failed to create menu item - no data returned');
      }

      // Insert variations if any
      if (item.variations && item.variations.length > 0) {
        const { error: variationsError } = await supabase
          .from('variations')
          .insert(
            item.variations.map(v => ({
              menu_item_id: menuItem.id,
              name: v.name,
              price: Number(v.price) || 0
            }))
          );

        if (variationsError) {
          console.error('Error adding variations:', variationsError);
          // We don't throw here to avoid losing the main item, but maybe we should?
          // For now, let's throw to be safe and consistent with previous behavior
          throw variationsError;
        }
      }

      // Insert add-ons if any
      if (item.addOns && item.addOns.length > 0) {
        const { error: addOnsError } = await supabase
          .from('add_ons')
          .insert(
            item.addOns.map(a => ({
              menu_item_id: menuItem.id,
              name: a.name,
              price: Number(a.price) || 0,
              category: a.category
            }))
          );

        if (addOnsError) {
          console.error('Error adding add-ons:', addOnsError);
          throw addOnsError;
        }
      }

      await fetchMenuItems();
      return menuItem;
    } catch (err) {
      console.error('Error in addMenuItem:', JSON.stringify(err, null, 2));
      throw err;
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      // Construct update object carefully to only include defined fields
      const updateData: any = {};
      
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.basePrice !== undefined) {
        const p = Number(updates.basePrice) || 0;
        updateData.base_price = p;
        updateData.price = p;
      }
      if (updates.category !== undefined) updateData.category = updates.category;
      if (updates.popular !== undefined) updateData.popular = !!updates.popular;
      if (updates.available !== undefined) updateData.available = !!updates.available;
      if (updates.image !== undefined) updateData.image_url = updates.image || null;
      if (updates.discountPrice !== undefined) updateData.discount_price = updates.discountPrice ? Number(updates.discountPrice) : null;
      if (updates.discountStartDate !== undefined) updateData.discount_start_date = updates.discountStartDate || null;
      if (updates.discountEndDate !== undefined) updateData.discount_end_date = updates.discountEndDate || null;
      if (updates.discountActive !== undefined) updateData.discount_active = !!updates.discountActive;
      if (updates.flavors !== undefined) updateData.flavors = updates.flavors || [];

      const { error: itemError } = await supabase
        .from('menu_items')
        .update(updateData)
        .eq('id', id);

      if (itemError) {
        console.error('Supabase error updating item:', JSON.stringify(itemError, null, 2));
        throw itemError;
      }

      // Handle variations and add-ons if they were provided in the updates
      // This part is a bit tricky since they are in separate tables
      if (updates.variations !== undefined) {
        // Delete existing variations
        const { error: delVarError } = await supabase.from('variations').delete().eq('menu_item_id', id);
        if (delVarError) console.warn('Error deleting old variations:', delVarError);

        // Insert new variations
        if (updates.variations.length > 0) {
          const { error: variationsError } = await supabase
            .from('variations')
            .insert(
              updates.variations.map(v => ({
                menu_item_id: id,
                name: v.name,
                price: Number(v.price) || 0
              }))
            );
          if (variationsError) throw variationsError;
        }
      }

      if (updates.addOns !== undefined) {
        // Delete existing add-ons
        const { error: delAddOnError } = await supabase.from('add_ons').delete().eq('menu_item_id', id);
        if (delAddOnError) console.warn('Error deleting old add-ons:', delAddOnError);

        // Insert new add-ons
        if (updates.addOns.length > 0) {
          const { error: addOnsError } = await supabase
            .from('add_ons')
            .insert(
              updates.addOns.map(a => ({
                menu_item_id: id,
                name: a.name,
                price: Number(a.price) || 0,
                category: a.category
              }))
            );
          if (addOnsError) throw addOnsError;
        }
      }

      await fetchMenuItems();
    } catch (err) {
      console.error('Error in updateMenuItem:', JSON.stringify(err, null, 2));
      throw err;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchMenuItems();
    } catch (err) {
      console.error('Error deleting menu item:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    menuItems,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refetch: fetchMenuItems
  };
};