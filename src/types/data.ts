export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  shortDesc: string;
  type: string;
  specs: string[];
  image: string;
  additionalImages?: string[];
  meta?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}

export interface FilterState {
  brand: string[];
  memory: string[];
  storage: string[];
  priceRange: [number, number];
  features: string[];
  availability: boolean;
  specialOffers: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  meta: {
    title?: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  products: Product[];
}

export interface SiteData {
  meta: {
    name: string;
    description: string;
    baseUrl: string;
  };
  categories: {
    [key: string]: CategoryData;
  };
} 