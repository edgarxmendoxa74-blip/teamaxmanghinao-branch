import React from 'react';
import { Category } from '../../hooks/useCategories';

interface CategoryStatsProps {
    categories: (Category & { count: number })[];
}

const CategoryStats: React.FC<CategoryStatsProps> = ({ categories }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-teamax-border">
            <h3 className="text-lg font-serif font-bold text-black mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-black rounded-full"></div>
                Categories
            </h3>
            <div className="space-y-4">
                {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-4 bg-teamax-surface rounded-2xl border border-teamax-border/50">
                        <div className="flex items-center space-x-3">
                            <span className="text-xl bg-white p-2 rounded-xl shadow-sm border border-teamax-border/30">{category.icon}</span>
                            <span className="font-bold text-black text-sm">{category.name}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-white px-2 py-1 rounded-lg border border-teamax-border/30">
                            {category.count} items
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryStats;
