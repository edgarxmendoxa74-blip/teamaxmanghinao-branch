import React from 'react';
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../../types';
import { Category } from '../../hooks/useCategories';
import { addOnCategories } from '../../data/menuData';
import ImageUpload from '../ImageUpload';

interface ItemFormProps {
    currentView: 'add' | 'edit';
    formData: Partial<MenuItem>;
    categories: Category[];
    onCancel: () => void;
    onSave: () => void;
    setFormData: (data: Partial<MenuItem>) => void;
    addVariation: () => void;
    updateVariation: (index: number, field: keyof Variation, value: string | number) => void;
    removeVariation: (index: number) => void;
    addFlavor: () => void;
    updateFlavor: (index: number, value: string) => void;
    removeFlavor: (index: number) => void;
    addAddOn: () => void;
    updateAddOn: (index: number, field: keyof AddOn, value: string | number) => void;
    removeAddOn: (index: number) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
    currentView,
    formData,
    categories,
    onCancel,
    onSave,
    setFormData,
    addVariation,
    updateVariation,
    removeVariation,
    addFlavor,
    updateFlavor,
    removeFlavor,
    addAddOn,
    updateAddOn,
    removeAddOn
}) => {
    return (
        <div className="min-h-screen bg-teamax-dark">
            <div className="bg-white shadow-sm border-b border-teamax-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onCancel}
                                className="flex items-center space-x-2 text-black hover:text-black transition-colors duration-200"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">Back</span>
                            </button>
                            <h1 className="text-xl font-serif font-bold text-black">
                                {currentView === 'add' ? 'Add New Item' : 'Edit Item'}
                            </h1>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={onCancel}
                                className="px-5 py-2 border border-teamax-border rounded-xl hover:bg-teamax-surface transition-colors duration-200 flex items-center space-x-2 font-bold uppercase tracking-widest text-[10px] text-black"
                            >
                                <X className="h-4 w-4" />
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={onSave}
                                className="px-5 py-2 bg-white text-black border border-black rounded-xl hover:brightness-110 transition-colors duration-200 flex items-center space-x-2 font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-black/20"
                            >
                                <Save className="h-4 w-4" />
                                <span>Save Item</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label htmlFor="item-name" className="block text-sm font-medium text-black mb-2">Item Name *</label>
                            <input
                                id="item-name"
                                type="text"
                                title="Item Name"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="Enter item name"
                            />
                        </div>

                        <div>
                            <label htmlFor="base-price" className="block text-sm font-medium text-black mb-2">Base Price *</label>
                            <input
                                id="base-price"
                                type="number"
                                title="Base Price"
                                value={formData.basePrice || ''}
                                onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-black mb-2">Category *</label>
                            <select
                                id="category"
                                aria-label="Category"
                                title="Category"
                                value={formData.category || ''}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.popular || false}
                                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm font-medium text-black">Mark as Popular</span>
                            </label>
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.available ?? true}
                                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm font-medium text-black">Available for Order</span>
                            </label>
                        </div>
                    </div>

                    {/* Discount Pricing Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-serif font-medium text-black mb-4">Discount Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="discount-price" className="block text-sm font-medium text-black mb-2">Discount Price</label>
                                <input
                                    id="discount-price"
                                    type="number"
                                    title="Discount Price"
                                    value={formData.discountPrice || ''}
                                    onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) || undefined })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="Enter discount price"
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.discountActive || false}
                                        onChange={(e) => setFormData({ ...formData, discountActive: e.target.checked })}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <span className="text-sm font-medium text-black">Enable Discount</span>
                                </label>
                            </div>

                            <div>
                                <label htmlFor="discount-start" className="block text-sm font-medium text-black mb-2">Discount Start Date</label>
                                <input
                                    id="discount-start"
                                    type="datetime-local"
                                    title="Discount Start Date"
                                    value={formData.discountStartDate || ''}
                                    onChange={(e) => setFormData({ ...formData, discountStartDate: e.target.value || undefined })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="discount-end" className="block text-sm font-medium text-black mb-2">Discount End Date</label>
                                <input
                                    id="discount-end"
                                    type="datetime-local"
                                    title="Discount End Date"
                                    value={formData.discountEndDate || ''}
                                    onChange={(e) => setFormData({ ...formData, discountEndDate: e.target.value || undefined })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                        </div>
                        <p className="text-sm text-black mt-2">
                            Leave dates empty for indefinite discount period. Discount will only be active if "Enable Discount" is checked and current time is within the date range.
                        </p>
                    </div>

                    <div className="mb-8">
                        <label htmlFor="description" className="block text-sm font-medium text-black mb-2">Description *</label>
                        <textarea
                            id="description"
                            title="Item Description"
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter item description"
                            rows={3}
                        />
                    </div>

                    <div className="mb-8">
                        <ImageUpload
                            currentImage={formData.image}
                            onImageChange={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
                        />
                    </div>

                    {/* Variations Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-serif font-medium text-black">Variations</h3>
                            <button
                                onClick={addVariation}
                                className="flex items-center space-x-2 px-3 py-2 bg-cream-100 text-black rounded-lg hover:bg-cream-200 transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Variation</span>
                            </button>
                        </div>

                        {formData.variations?.map((variation, index) => (
                            <div key={variation.id} className="flex items-center space-x-3 mb-3 p-4 bg-gray-50 rounded-lg">
                                <label htmlFor={`var-name-${index}`} className="sr-only">Variation Name</label>
                                <input
                                    id={`var-name-${index}`}
                                    type="text"
                                    aria-label="Variation Name"
                                    title="Variation Name"
                                    value={variation.name}
                                    onChange={(e) => updateVariation(index, 'name', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Variation name (e.g., Small, Medium, Large)"
                                />
                                <label htmlFor={`var-price-${index}`} className="sr-only">Variation Price</label>
                                <input
                                    id={`var-price-${index}`}
                                    type="number"
                                    aria-label="Variation Price"
                                    title="Variation Price"
                                    value={variation.price}
                                    onChange={(e) => updateVariation(index, 'price', Number(e.target.value))}
                                    className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Price"
                                />
                                <button
                                    onClick={() => removeVariation(index)}
                                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                                    title="Remove Variation"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Flavors Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-serif font-medium text-black">Choose Flavors (Optional)</h3>
                            <button
                                onClick={addFlavor}
                                className="flex items-center space-x-2 px-3 py-2 bg-cream-100 text-black rounded-lg hover:bg-cream-200 transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Flavor</span>
                            </button>
                        </div>

                        {(!formData.flavors || formData.flavors.length === 0) && (
                            <p className="text-sm text-black italic">No flavors added yet.</p>
                        )}

                        {formData.flavors?.map((flavor, index) => (
                            <div key={index} className="flex items-center space-x-3 mb-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="text"
                                    value={flavor}
                                    onChange={(e) => updateFlavor(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Flavor name (e.g., Chocolate, Vanilla)"
                                />
                                <button
                                    onClick={() => removeFlavor(index)}
                                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                                    title="Remove Flavor"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add-ons Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-serif font-medium text-black">Add-ons</h3>
                            <button
                                onClick={addAddOn}
                                className="flex items-center space-x-2 px-3 py-2 bg-cream-100 text-black rounded-lg hover:bg-cream-200 transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Add-on</span>
                            </button>
                        </div>

                        {formData.addOns?.map((addOn, index) => (
                            <div key={addOn.id} className="flex items-center space-x-3 mb-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="text"
                                    value={addOn.name}
                                    onChange={(e) => updateAddOn(index, 'name', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Add-on name"
                                />
                                <select
                                    id={`addon-category-${index}`}
                                    aria-label="Add-on Category"
                                    title="Add-on Category"
                                    value={addOn.category}
                                    onChange={(e) => updateAddOn(index, 'category', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    {addOnCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={addOn.price}
                                    onChange={(e) => updateAddOn(index, 'price', Number(e.target.value))}
                                    className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Price"
                                />
                                <button
                                    onClick={() => removeAddOn(index)}
                                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                                    title="Remove Add-on"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemForm;
