import React from 'react';
import { Package, TrendingUp, Coffee, Users } from 'lucide-react';

interface DashboardStatsProps {
    totalItems: number;
    availableItems: number;
    popularItems: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ totalItems, availableItems, popularItems }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-teamax-border">
                <div className="flex items-center">
                    <div className="p-3 bg-black/5 rounded-xl">
                        <Package className="h-6 w-6 text-black" />
                    </div>
                    <div className="ml-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black">Total Items</p>
                        <p className="text-2xl font-bold text-black">{totalItems}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-teamax-border">
                <div className="flex items-center">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black">Available</p>
                        <p className="text-2xl font-bold text-black">{availableItems}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-teamax-border">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <Coffee className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black">Popular</p>
                        <p className="text-2xl font-bold text-black">{popularItems}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-teamax-border">
                <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black">Status</p>
                        <p className="text-2xl font-bold text-black">Online</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
