// src/types.ts

export interface CartItem {
  /** ID del producto real en la base de datos */
  id: number;
  title: string;
  price: string;
  discount: string;
  quantity: number;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  discount: string;
  image: string;
  section_id: string;
  category_id: string;
  featured: boolean;
  size: 'small' | 'medium' | 'large' | 'xl';
}

export interface Offer {
  id: string;
  title: string;
  image: string;
  link: string;
  isActive: boolean;
  section_id: string;
  size: 'small' | 'medium' | 'large' | 'xl';
}
export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

export interface Section {
  id: string;
  title: string;
  /** 'category' para secciones de Categorías, 'products' para Productos, 'offers' para Ofertas */
  type: 'category' | 'products' | 'offers';
  layout: 'grid' | 'carousel' | 'featured';
  isActive: boolean;
  /** Al obtenerlas desde el backend, cada sección trae sus productos en `items` */
  items?: Product[];
  /** ...y sus ofertas en `offers` */
  offers?: Offer[];
  position: number;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  paymentMethod: 'transfer' | 'cash';
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  status: 'pending' | 'in_progress' | 'paid' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface OrderStats {
  totalOrders: number;
  completedOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface CategoryItem {
  id: string;
  title: string;
  image: string;
  category_id: string;
}
