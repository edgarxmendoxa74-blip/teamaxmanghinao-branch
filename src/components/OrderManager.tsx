import React, { useState } from 'react';
import { ArrowLeft, Trash2, Clock, Package, User, Phone, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { Order } from '../types';

interface OrderManagerProps {
    onBack: () => void;
}

const OrderManager: React.FC<OrderManagerProps> = ({ onBack }) => {
    const { orders, loading, error, updateOrderStatus, deleteOrder, refetch } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-teamax-dark pb-20">
            <div className="bg-white shadow-sm border-b border-teamax-border sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onBack}
                                className="flex items-center space-x-2 text-black hover:text-black transition-colors duration-200"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">Back</span>
                            </button>
                            <h1 className="text-xl font-serif font-bold text-black">Customer Orders</h1>
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="flex items-center space-x-2 text-black hover:text-black transition-colors duration-200"
                        >
                            <span className="font-bold uppercase tracking-widest text-[10px]">Refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium flex items-center justify-between">
                        <span>Error: {error}</span>
                        <button onClick={() => refetch()} className="underline font-bold">Try Again</button>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Orders List */}
                    <div className="lg:col-span-2 space-y-4">
                        {orders.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border border-teamax-border shadow-sm">
                                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-serif font-bold text-black">No orders found</h3>
                                <p className="text-black/60 mt-2">New customer orders will appear here.</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => setSelectedOrder(order)}
                                    className={`bg-white rounded-2xl shadow-sm p-6 border transition-all cursor-pointer hover:shadow-md ${selectedOrder?.id === order.id ? 'border-black ring-1 ring-black' : 'border-teamax-border'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-black opacity-40 uppercase tracking-tighter">Order #{order.id.slice(0, 8)}</span>
                                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-black text-lg">{order.customer_name}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-black">₱{Number(order.total_price).toFixed(2)}</p>
                                            <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">
                                                {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-black/60">
                                        <div className="flex items-center gap-1.5">
                                            <ShoppingBag className="h-4 w-4" />
                                            <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CreditCard className="h-4 w-4" />
                                            <span className="capitalize">{order.payment_method}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Package className="h-4 w-4" />
                                            <span className="capitalize">{order.service_type}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Details Sidebar */}
                    <div className="lg:col-span-1">
                        {selectedOrder ? (
                            <div className="bg-white rounded-3xl shadow-sm border border-teamax-border p-8 sticky top-24">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-xl font-serif font-bold text-black">Order Details</h3>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this order?')) {
                                                deleteOrder(selectedOrder.id);
                                                setSelectedOrder(null);
                                            }
                                        }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        title="Delete Order"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="space-y-6 mb-8">
                                    <section>
                                        <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-3">Customer Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-3">
                                                <User className="h-4 w-4 text-black mt-0.5" />
                                                <span className="text-sm font-medium text-black">{selectedOrder.customer_name}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Phone className="h-4 w-4 text-black mt-0.5" />
                                                <span className="text-sm font-medium text-black">{selectedOrder.contact_number}</span>
                                            </div>
                                            {selectedOrder.service_type === 'delivery' && (
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="h-4 w-4 text-black mt-0.5" />
                                                    <div className="text-sm font-medium text-black">
                                                        <p>{selectedOrder.address}</p>
                                                        {selectedOrder.landmark && <p className="text-xs opacity-60">Landmark: {selectedOrder.landmark}</p>}
                                                    </div>
                                                </div>
                                            )}
                                            {selectedOrder.service_type === 'pickup' && (
                                                <div className="flex items-start gap-3">
                                                    <Clock className="h-4 w-4 text-black mt-0.5" />
                                                    <span className="text-sm font-medium text-black">Pickup: {selectedOrder.pickup_time}</span>
                                                </div>
                                            )}
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-3">Order Items</h4>
                                        <div className="space-y-3">
                                            {selectedOrder.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <div className="flex-1">
                                                        <p className="font-bold text-black">{item.quantity}x {item.name}</p>
                                                        {item.selectedVariation && <p className="text-[10px] text-black/50">Variation: {item.selectedVariation.name}</p>}
                                                        {item.selectedFlavor && <p className="text-[10px] text-black/50">Flavor: {item.selectedFlavor}</p>}
                                                        {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                                                            <p className="text-[10px] text-black/50">Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}</p>
                                                        )}
                                                    </div>
                                                    <span className="font-bold text-black">₱{item.totalPrice * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-lg font-serif font-bold text-black">Total Paid</span>
                                            <span className="text-2xl font-serif font-bold text-black">₱{Number(selectedOrder.total_price).toFixed(2)}</span>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-3">Update Status</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['pending', 'preparing', 'completed', 'cancelled'].map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => updateOrderStatus(selectedOrder.id, status as Order['status'])}
                                                        className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedOrder.status === status
                                                            ? 'bg-black text-white border-black shadow-md scale-[1.02]'
                                                            : 'bg-white text-black border-teamax-border hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </section>

                                    {selectedOrder.notes && (
                                        <section className="bg-gray-50 p-4 rounded-2xl border border-teamax-border">
                                            <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">Special Notes</h4>
                                            <p className="text-sm text-black italic">"{selectedOrder.notes}"</p>
                                        </section>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-sm border border-teamax-border p-8 text-center text-black/40 font-serif italic">
                                Select an order to view details
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManager;
