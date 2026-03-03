import React, { useState } from 'react';
import { useMenu } from '../hooks/useMenu';
import { useCategories } from '../hooks/useCategories';
import CategoryManager from './CategoryManager';
import PaymentMethodManager from './PaymentMethodManager';
import SiteSettingsManager from './SiteSettingsManager';
import OrderManager from './OrderManager';
import { initializeDatabase } from '../utils/initializeDatabase';
import { MenuItem, Variation, AddOn } from '../types';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

// Sub-components
import AdminHeader from './admin/AdminHeader';
import DashboardStats from './admin/DashboardStats';
import CategoryStats from './admin/CategoryStats';
import QuickActions from './admin/QuickActions';
import ItemForm from './admin/ItemForm';
import ItemsList from './admin/ItemsList';
import AdminLogin from './admin/AdminLogin';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('teamax_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { menuItems, loading, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const { categories } = useCategories();
  const [currentView, setCurrentView] = useState<'dashboard' | 'items' | 'add' | 'edit' | 'categories' | 'payments' | 'settings' | 'orders'>('dashboard');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    basePrice: 0,
    category: 'hot-coffee',
    popular: false,
    available: true,
    variations: [],
    addOns: []
  });

  // Update bulk actions visibility when selection changes
  React.useEffect(() => {
    setShowBulkActions(selectedItems.length > 0);
  }, [selectedItems]);

  const handleAddItem = () => {
    setCurrentView('add');
    const defaultCategory = categories.length > 0 ? categories[0].id : 'milk-tea';
    setFormData({
      name: '',
      description: '',
      basePrice: 0,
      category: defaultCategory,
      popular: false,
      available: true,
      variations: [],
      addOns: []
    });
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setCurrentView('edit');
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      try {
        setIsProcessing(true);
        await deleteMenuItem(id);
      } catch (error) {
        alert('Failed to delete item. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSaveItem = async () => {
    if (!formData.name || !formData.description || !formData.basePrice) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, formData);
      } else {
        await addMenuItem(formData as Omit<MenuItem, 'id'>);
      }

      // Show success notification
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);

      setCurrentView('items');
      setEditingItem(null);
    } catch (error) {
      alert('Failed to save item');
    }
  };

  const handleCancel = () => {
    setCurrentView(currentView === 'add' || currentView === 'edit' ? 'items' : 'dashboard');
    setEditingItem(null);
    setSelectedItems([]);
  };

  const handleBulkRemove = async () => {
    if (selectedItems.length === 0) {
      alert('Please select items to delete');
      return;
    }

    const itemNames = selectedItems.map(id => {
      const item = menuItems.find(i => i.id === id);
      return item ? item.name : 'Unknown Item';
    }).slice(0, 5);

    const displayNames = itemNames.join(', ');
    const moreItems = selectedItems.length > 5 ? ` and ${selectedItems.length - 5} more items` : '';

    if (confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?\n\nItems to delete: ${displayNames}${moreItems}\n\nThis action cannot be undone.`)) {
      try {
        setIsProcessing(true);
        for (const itemId of selectedItems) {
          await deleteMenuItem(itemId);
        }
        setSelectedItems([]);
        setShowBulkActions(false);
        alert(`Successfully deleted ${selectedItems.length} item(s).`);
      } catch (error) {
        alert('Failed to delete some items. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleBulkCategoryChange = async (newCategoryId: string) => {
    if (selectedItems.length === 0) {
      alert('Please select items to update');
      return;
    }

    const categoryName = categories.find(cat => cat.id === newCategoryId)?.name;
    if (confirm(`Are you sure you want to change the category of ${selectedItems.length} item(s) to "${categoryName}"?`)) {
      try {
        setIsProcessing(true);
        for (const itemId of selectedItems) {
          const item = menuItems.find(i => i.id === itemId);
          if (item) {
            await updateMenuItem(itemId, { ...item, category: newCategoryId });
          }
        }
        setSelectedItems([]);
        setShowBulkActions(false);
        alert(`Successfully updated category for ${selectedItems.length} item(s)`);
      } catch (error) {
        alert('Failed to update some items');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === menuItems.length) {
      setSelectedItems([]);
      setShowBulkActions(false);
    } else {
      setSelectedItems(menuItems.map(item => item.id));
      setShowBulkActions(true);
    }
  };

  const addVariation = () => {
    const newVariation: Variation = {
      id: `var-${Date.now()}`,
      name: '',
      price: 0
    };
    setFormData({
      ...formData,
      variations: [...(formData.variations || []), newVariation]
    });
  };

  const updateVariation = (index: number, field: keyof Variation, value: string | number) => {
    const updatedVariations = [...(formData.variations || [])];
    updatedVariations[index] = { ...updatedVariations[index], [field]: value };
    setFormData({ ...formData, variations: updatedVariations });
  };

  const removeVariation = (index: number) => {
    const updatedVariations = formData.variations?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, variations: updatedVariations });
  };

  const addFlavor = () => {
    setFormData({
      ...formData,
      flavors: [...(formData.flavors || []), '']
    });
  };

  const updateFlavor = (index: number, value: string) => {
    const updatedFlavors = [...(formData.flavors || [])];
    updatedFlavors[index] = value;
    setFormData({ ...formData, flavors: updatedFlavors });
  };

  const removeFlavor = (index: number) => {
    const updatedFlavors = (formData.flavors || []).filter((_, i) => i !== index);
    setFormData({ ...formData, flavors: updatedFlavors });
  };

  const addAddOn = () => {
    const newAddOn: AddOn = {
      id: `addon-${Date.now()}`,
      name: '',
      price: 0,
      category: 'extras'
    };
    setFormData({
      ...formData,
      addOns: [...(formData.addOns || []), newAddOn]
    });
  };

  const updateAddOn = (index: number, field: keyof AddOn, value: string | number) => {
    const updatedAddOns = [...(formData.addOns || [])];
    updatedAddOns[index] = { ...updatedAddOns[index], [field]: value };
    setFormData({ ...formData, addOns: updatedAddOns });
  };

  const removeAddOn = (index: number) => {
    const updatedAddOns = formData.addOns?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, addOns: updatedAddOns });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'TeaMax@Admin!2025') {
      setIsAuthenticated(true);
      localStorage.setItem('teamax_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('teamax_admin_auth');
    setPassword('');
    setCurrentView('dashboard');
  };

  const totalItemsCount = menuItems.length;
  const popularItemsCount = menuItems.filter(item => item.popular).length;
  const availableItemsCount = menuItems.filter(item => item.available).length;
  const categoryStats = categories.map(cat => ({
    ...cat,
    count: menuItems.filter(item => item.category === cat.id).length
  }));

  if (!isAuthenticated) {
    return <AdminLogin password={password} loginError={loginError} setPassword={setPassword} onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-teamax-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black font-serif">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'add' || currentView === 'edit') {
    return (
      <ItemForm
        currentView={currentView}
        formData={formData}
        categories={categories}
        onCancel={handleCancel}
        onSave={handleSaveItem}
        setFormData={setFormData}
        addVariation={addVariation}
        updateVariation={updateVariation}
        removeVariation={removeVariation}
        addFlavor={addFlavor}
        updateFlavor={updateFlavor}
        removeFlavor={removeFlavor}
        addAddOn={addAddOn}
        updateAddOn={updateAddOn}
        removeAddOn={removeAddOn}
      />
    );
  }

  if (currentView === 'items') {
    return (
      <ItemsList
        menuItems={menuItems}
        categories={categories}
        selectedItems={selectedItems}
        isProcessing={isProcessing}
        showBulkActions={showBulkActions}
        searchTerm={searchTerm}
        onBack={() => setCurrentView('dashboard')}
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        onBulkRemove={handleBulkRemove}
        onBulkCategoryChange={handleBulkCategoryChange}
        setSearchTerm={setSearchTerm}
        setSelectedItems={setSelectedItems}
        setShowBulkActions={setShowBulkActions}
      />
    );
  }

  if (currentView === 'categories') {
    return <CategoryManager onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'payments') {
    return <PaymentMethodManager onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'orders') {
    return <OrderManager onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'settings') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center space-x-2 text-black hover:text-black transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <h1 className="text-2xl font-serif font-semibold text-black">Site Settings</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <SiteSettingsManager />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teamax-dark">
      <AdminHeader onLogout={handleLogout} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DashboardStats
          totalItems={totalItemsCount}
          availableItems={availableItemsCount}
          popularItems={popularItemsCount}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <QuickActions
            onAddItem={handleAddItem}
            onViewOrders={() => setCurrentView('orders')}
            onViewItems={() => setCurrentView('items')}
            onViewCategories={() => setCurrentView('categories')}
            onViewPayments={() => setCurrentView('payments')}
            onViewSettings={() => setCurrentView('settings')}
          />
          <CategoryStats categories={categoryStats} />
        </div>
      </div>

      {showSaveSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce-gentle">
          <div className="bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md">
            <div className="bg-green-500 rounded-full p-1">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">Changes Saved Successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
