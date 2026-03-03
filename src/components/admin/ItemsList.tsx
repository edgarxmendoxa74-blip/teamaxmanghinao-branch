import React from 'react';
import { ArrowLeft, Coffee, X, Plus, Trash2, Edit, Package } from 'lucide-react';
import { MenuItem } from '../../types';
import { Category } from '../../hooks/useCategories';

interface ItemsListProps {
    menuItems: MenuItem[];
    categories: Category[];
    selectedItems: string[];
    isProcessing: boolean;
    showBulkActions: boolean;
    searchTerm: string;
    onBack: () => void;
    onAddItem: () => void;
    onEditItem: (item: MenuItem) => void;
    onDeleteItem: (id: string) => void;
    onSelectItem: (itemId: string) => void;
    onSelectAll: () => void;
    onBulkRemove: () => void;
    onBulkCategoryChange: (newCategoryId: string) => void;
    setSearchTerm: (term: string) => void;
    setSelectedItems: (items: string[]) => void;
    setShowBulkActions: (show: boolean) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
    menuItems,
    categories,
    selectedItems,
    isProcessing,
    showBulkActions,
    searchTerm,
    onBack,
    onAddItem,
    onEditItem,
    onDeleteItem,
    onSelectItem,
    onSelectAll,
    onBulkRemove,
    onBulkCategoryChange,
    setSearchTerm,
    setSelectedItems,
    setShowBulkActions
}) => {
    // Filter items based on search term
    const filteredItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group items by category
    const groupedItems = categories.reduce((acc, cat) => {
        const itemsInCat = filteredItems.filter(item => item.category === cat.id);
        if (itemsInCat.length > 0) {
            acc[cat.id] = itemsInCat;
        }
        return acc;
    }, {} as Record<string, MenuItem[]>);

    return (
        <div className="min-h-screen bg-teamax-dark">
            <div className="bg-white shadow-sm border-b border-teamax-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onBack}
                                className="flex items-center space-x-2 text-black hover:text-black transition-colors duration-200"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">Dashboard</span>
                            </button>
                            <h1 className="text-xl font-serif font-bold text-black">Menu Items</h1>
                        </div>

                        {/* Enhanced Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Coffee className="h-4 w-4 text-gray-400 rotate-12" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search dishes or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-teamax-border rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none text-sm font-medium"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    title="Clear search"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center space-x-3">
                            {showBulkActions && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                                        {selectedItems.length} selected
                                    </span>
                                    <button
                                        onClick={() => setShowBulkActions(!showBulkActions)}
                                        className="px-4 py-2 bg-black/5 text-black rounded-xl hover:bg-black hover:text-white transition-all duration-200 font-bold uppercase tracking-widest text-[10px]"
                                    >
                                        Bulk Actions
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={onAddItem}
                                className="flex items-center space-x-2 bg-white text-black border border-black px-5 py-2 rounded-xl hover:brightness-110 transition-all font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-black/20"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add New Item</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Bulk Actions Panel */}
                {showBulkActions && selectedItems.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-black">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-medium text-black mb-1">Bulk Actions</h3>
                                <p className="text-sm text-black">{selectedItems.length} item(s) selected</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="bulk-category" className="text-sm font-medium text-black">Change Category:</label>
                                    <select
                                        id="bulk-category"
                                        aria-label="Bulk Category Change"
                                        title="Bulk Category Change"
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                onBulkCategoryChange(e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                        className="px-3 py-2 border border-teamax-border rounded-lg text-sm"
                                        disabled={isProcessing}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={onBulkRemove}
                                    disabled={isProcessing}
                                    title="Remove Selected Items"
                                    className="flex items-center space-x-2 bg-red-100 text-red-600 border border-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span>{isProcessing ? 'Removing...' : 'Remove Selected'}</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedItems([]);
                                        setShowBulkActions(false);
                                    }}
                                    title="Clear Selection"
                                    className="flex items-center space-x-2 bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                >
                                    <X className="h-4 w-4" />
                                    <span>Clear Selection</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-12">
                    {Object.keys(groupedItems).length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-teamax-border shadow-sm">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-teamax-border">
                                <Package className="h-10 w-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-black">No dishes found</h3>
                            <p className="text-black/60 mt-2">Try adjusting your search term</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-6 text-xs font-bold uppercase tracking-widest text-black hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        categories.map(category => {
                            const items = groupedItems[category.id];
                            if (!items) return null;

                            return (
                                <div key={category.id} className="animate-fade-in">
                                    <div className="flex items-center justify-between mb-6 px-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl bg-white p-2.5 rounded-2xl shadow-sm border border-teamax-border">{category.icon}</span>
                                            <div>
                                                <h2 className="text-2xl font-serif font-bold text-black leading-none">{category.name}</h2>
                                                <p className="text-[10px] font-bold text-black/50 uppercase tracking-widest mt-1.5">{items.length} dishes in this category</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const itemIds = items.map(i => i.id);
                                                const allSelected = itemIds.every(id => selectedItems.includes(id));
                                                if (allSelected) {
                                                    setSelectedItems(selectedItems.filter(id => !itemIds.includes(id)));
                                                } else {
                                                    setSelectedItems([...new Set([...selectedItems, ...itemIds])]);
                                                }
                                            }}
                                            className="text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black/5 px-4 py-2 rounded-xl border border-teamax-border transition-all"
                                        >
                                            {items.every(item => selectedItems.includes(item.id)) ? 'Deselect All' : 'Select Category'}
                                        </button>
                                    </div>

                                    <div className="bg-white rounded-[2rem] shadow-sm border border-teamax-border overflow-hidden">
                                        {/* Desktop View */}
                                        <div className="hidden md:block overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50 border-b border-teamax-border">
                                                    <tr>
                                                        <th className="px-8 py-5 text-[10px] font-bold text-black uppercase tracking-widest">
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={onSelectAll}
                                                                    checked={selectedItems.length === menuItems.length && menuItems.length > 0}
                                                                    title="Select All Items"
                                                                    aria-label="Select All Items"
                                                                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                                                />
                                                                <span>Select</span>
                                                            </div>
                                                        </th>
                                                        <th className="px-8 py-5 text-[10px] font-bold text-black uppercase tracking-widest">Product</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold text-black uppercase tracking-widest">Price</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold text-black uppercase tracking-widest">Status</th>
                                                        <th className="px-8 py-5 text-[10px] font-bold text-black uppercase tracking-widest text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {items.map((item) => (
                                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                                            <td className="px-8 py-6">
                                                                <input
                                                                    id={`select-item-${item.id}`}
                                                                    type="checkbox"
                                                                    aria-label={`Select ${item.name}`}
                                                                    title={`Select ${item.name}`}
                                                                    checked={selectedItems.includes(item.id)}
                                                                    onChange={() => onSelectItem(item.id)}
                                                                    className="w-5 h-5 rounded-lg border-2 border-teamax-border text-black focus:ring-black transition-all cursor-pointer"
                                                                />
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 border border-teamax-border flex-shrink-0">
                                                                        {item.image ? (
                                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                        ) : (
                                                                            <div className="w-full h-full flex items-center justify-center text-2xl opacity-20 group-hover:scale-110 transition-transform">☕</div>
                                                                        )}
                                                                    </div>
                                                                    <div className="min-w-0">
                                                                        <div className="font-bold text-black text-base truncate">{item.name}</div>
                                                                        <div className="text-xs text-black/50 line-clamp-1 mt-0.5">{item.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <div className="flex flex-col">
                                                                    {item.isOnDiscount && item.discountPrice ? (
                                                                        <>
                                                                            <span className="text-black font-bold text-base">₱{item.discountPrice.toFixed(2)}</span>
                                                                            <span className="text-black/30 line-through text-[10px] font-bold">₱{item.basePrice.toFixed(2)}</span>
                                                                        </>
                                                                    ) : (
                                                                        <span className="text-black font-bold text-base">₱{item.basePrice.toFixed(2)}</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <div className="flex flex-col gap-1.5">
                                                                    {item.popular && (
                                                                        <span className="w-fit text-[9px] font-bold uppercase tracking-widest bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full border border-orange-200">Popular</span>
                                                                    )}
                                                                    <span className={`w-fit text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${item.available
                                                                        ? 'bg-green-100 text-green-700 border-green-200'
                                                                        : 'bg-red-50 text-red-500 border-red-100'}`}>
                                                                        {item.available ? 'Active' : 'Sold Out'}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6 text-right">
                                                                <div className="flex items-center justify-end space-x-2">
                                                                    <button
                                                                        onClick={() => onEditItem(item)}
                                                                        title="Edit Item"
                                                                        className="p-2.5 text-black hover:bg-black hover:text-white rounded-xl transition-all border border-teamax-border"
                                                                    >
                                                                        <Edit className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => onDeleteItem(item.id)}
                                                                        title="Delete Item"
                                                                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-red-100"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Mobile View */}
                                        <div className="md:hidden divide-y divide-gray-100">
                                            {items.map((item) => (
                                                <div key={item.id} className={`p-6 ${selectedItems.includes(item.id) ? 'bg-black/5' : ''}`}>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <input
                                                                type="checkbox"
                                                                aria-label={`Select ${item.name}`}
                                                                checked={selectedItems.includes(item.id)}
                                                                onChange={() => onSelectItem(item.id)}
                                                                className="w-5 h-5 rounded-lg border-2 border-teamax-border text-black"
                                                            />
                                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-teamax-border">
                                                                {item.image ? (
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-xl opacity-20">☕</div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-black text-sm">{item.name}</h3>
                                                                <p className="text-[10px] text-black/50">₱{item.basePrice.toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => onEditItem(item)} title="Edit Item" className="p-2 border border-teamax-border rounded-lg"><Edit className="h-4 w-4" /></button>
                                                            <button onClick={() => onDeleteItem(item.id)} title="Delete Item" className="p-2 border border-red-100 text-red-500 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemsList;
