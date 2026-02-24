export interface Variation {
  id: string;
  name: string;
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
  image?: string;
  popular?: boolean;
  available?: boolean;
  variations?: Variation[];
  addOns?: AddOn[];
  // Discount pricing fields
  discountPrice?: number;
  discountStartDate?: string;
  discountEndDate?: string;
  discountActive?: boolean;
  // Computed effective price (calculated in the app)
  effectivePrice?: number;
  isOnDiscount?: boolean;
  flavors?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedVariation?: Variation;
  selectedFlavor?: string;
  selectedAddOns?: AddOn[];
  totalPrice: number;
}

export interface OrderData {
  items: CartItem[];
  customerName: string;
  contactNumber: string;
  serviceType: 'pickup' | 'delivery' | 'dine-in' | 'takeout';
  address?: string;
  pickupTime?: string;
  paymentMethod: 'gcash' | 'maya' | 'bank-transfer' | 'cod';
  referenceNumber?: string;
  total: number;
  notes?: string;
}

export type PaymentMethod = 'gcash' | 'maya' | 'bank-transfer' | 'cod';
export type ServiceType = 'pickup' | 'delivery' | 'dine-in' | 'takeout';

// Site Settings Types
export interface SiteSetting {
  id: string;
  value: string;
  type: 'text' | 'image' | 'boolean' | 'number';
  description?: string;
  updated_at: string;
}

export interface SiteSettings {
  site_name: string;
  site_logo: string;
  site_description: string;
  currency: string;
  currency_code: string;
  hero_image: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  store_hours: string;
  contact_number: string;
  address: string;
  facebook_url: string;
  facebook_handle: string;
  site_tagline: string;
  hero_slides?: HeroSlide[];
}

export interface HeroSlide {
  url: string;
  title: string;
  subtitle: string;
  description: string;
}