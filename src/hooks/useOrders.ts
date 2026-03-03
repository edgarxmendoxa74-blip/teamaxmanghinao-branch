import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Order } from '../types';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            setOrders(data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            if (err && typeof err === 'object' && 'message' in err) {
                console.error('Detailed Supabase Error:', JSON.stringify(err, null, 2));
            }
            setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    }, []);

    const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'status'>) => {
        try {
            const { error: createError } = await supabase
                .from('orders')
                .insert([{
                    customer_name: orderData.customer_name,
                    contact_number: orderData.contact_number,
                    service_type: orderData.service_type,
                    address: orderData.address,
                    landmark: orderData.landmark,
                    pickup_time: orderData.pickup_time,
                    payment_method: orderData.payment_method,
                    total_price: orderData.total_price,
                    notes: orderData.notes,
                    items: orderData.items,
                    status: 'pending'
                }]);

            if (createError) throw createError;

            // Optional: only fetch if we expect to have permission
            // but fetchOrders has its own error handling so it's safe to call
            await fetchOrders();
            return true;
        } catch (err) {
            console.error('Error creating order:', err);
            throw err;
        }
    };

    const updateOrderStatus = async (id: string, status: Order['status']) => {
        try {
            const { error: updateError } = await supabase
                .from('orders')
                .update({ status })
                .eq('id', id);

            if (updateError) throw updateError;

            await fetchOrders();
        } catch (err) {
            console.error('Error updating order status:', err);
            throw err;
        }
    };

    const deleteOrder = async (id: string) => {
        try {
            const { error: deleteError } = await supabase
                .from('orders')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            await fetchOrders();
        } catch (err) {
            console.error('Error deleting order:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        loading,
        error,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        refetch: fetchOrders
    };
};
