export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
