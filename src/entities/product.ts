
export interface ProductVariant {
  id: string;
  name: string;
  value: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantidade: number;
  images: ProductImage[];
  colors: ProductVariant[];
  sizes: ProductVariant[];
}
