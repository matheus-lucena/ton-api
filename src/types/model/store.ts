import { Product } from './product';

interface ProductStore extends Product {
  count: number;
}

export interface Store {
  products: ProductStore[];
  value: number;
  date: string;
}
