import React from 'react';
import { Plus, ShoppingBag, Package, FolderOpen, CreditCard, Settings } from 'lucide-react';

interface QuickActionsProps {
    onAddItem: () => void;
    onViewOrders: () => void;
    onViewItems: () => void;
    onViewCategories: () => void;
    onViewPayments: () => void;
    onViewSettings: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
    onAddItem,
    onViewOrders,
    onViewItems,
    onViewCategories,
    onViewPayments,
    onViewSettings
}) => {
    return (
        <div className="md:col-span-2 bg-white rounded-3xl shadow-sm p-8 border border-teamax-border">
            <h3 className="text-lg font-serif font-bold text-black mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-black rounded-full"></div>
                Quick Management
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    onClick={onAddItem}
                    className="group flex items-center gap-4 p-5 text-left border border-teamax-border rounded-2xl hover:border-black hover:bg-black/5 transition-all duration-300"
                >
                    <div className="p-3 bg-black/5 rounded-xl group-hover:bg-black group-hover:text-white transition-all">
                        <Plus className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-black text-sm group-hover:text-black transition-colors">Add New Item</span>
                        <span className="text-[10px] text-black uppercase tracking-widest opacity-60">Create Menu Entry</span>
                    </div>
                </button>

                <button
                    onClick={onViewOrders}
                    className="group flex items-center gap-4 p-5 text-left border border-teamax-border rounded-2xl hover:border-black hover:bg-black/5 transition-all duration-300"
                >
                    <div className="p-3 bg-black/5 rounded-xl group-hover:bg-black group-hover:text-white transition-all">
                        <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-black text-sm group-hover:text-black transition-colors">Manage Orders</span>
                        <span className="text-[10px] text-black uppercase tracking-widest opacity-60">View Customer Orders</span>
                    </div>
                </button>

                <button
                    onClick={onViewItems}
                    className="group flex items-center gap-4 p-5 text-left border border-teamax-border rounded-2xl hover:border-black hover:bg-black/5 transition-all duration-300"
                >
                    <div className="p-3 bg-black/5 rounded-xl group-hover:bg-black group-hover:text-white transition-all">
                        <Package className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-black text-sm group-hover:text-black transition-colors">Manage Menu</span>
                        <span className="text-[10px] text-black uppercase tracking-widest opacity-60">Edit & Update All</span>
                    </div>
                </button>

                <button
                    onClick={onViewCategories}
                    className="group flex items-center gap-4 p-5 text-left border border-teamax-border rounded-2xl hover:border-black hover:bg-black/5 transition-all duration-300"
                >
                    <div className="p-3 bg-black/5 rounded-xl group-hover:bg-black group-hover:text-white transition-all">
                        <FolderOpen className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-black text-sm group-hover:text-black transition-colors">Categories</span>
                        <span className="text-[10px] text-black uppercase tracking-widest opacity-60">Organize Menu</span>
                    </div>
                </button>

                <button
                    onClick={onViewPayments}
                    className="group flex items-center gap-4 p-5 text-left border border-teamax-border rounded-2xl hover:border-black hover:bg-black/5 transition-all duration-300"
                >
                    <div className="p-3 bg-black/5 rounded-xl group-hover:bg-black group-hover:text-white transition-all">
                        <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-black text-sm group-hover:text-black transition-colors">Payments</span>
                        <span className="text-[10px] text-black uppercase tracking-widest opacity-60">Payout Methods</span>
                    </div>
                </button>

                <button
                    onClick={onViewSettings}
                    className="group flex items-center gap-4 p-5 text-left border border-teamax-border rounded-2xl hover:border-black hover:bg-black/5 transition-all duration-300 sm:col-span-2"
                >
                    <div className="p-3 bg-black/5 rounded-xl group-hover:bg-black group-hover:text-white transition-all">
                        <Settings className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-black text-sm group-hover:text-black transition-colors">System Settings</span>
                        <span className="text-[10px] text-black uppercase tracking-widest opacity-60">Store & UI Configuration</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default QuickActions;
