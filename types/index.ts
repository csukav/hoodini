export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  createdAt: Date;
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    zip: string;
    city: string;
    address: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  note?: string;
  stripeSessionId?: string;
}
