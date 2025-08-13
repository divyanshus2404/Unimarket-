export interface User {
  id: string;
  email: string;
  full_name: string;
  university_email: string;
  university_id: string;
  university_name: string;
  profile_image?: string;
  rating: number;
  total_reviews: number;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  images: string[];
  seller_id: string;
  seller: User;
  university_id: string;
  status: 'active' | 'sold' | 'inactive';
  created_at: string;
  updated_at: string;
  views: number;
  favorites: number;
}

export interface Review {
  id: string;
  product_id: string;
  reviewer_id: string;
  reviewer: User;
  seller_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface Filter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  university?: string;
  sortBy?: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'rating' | 'views';
}