/* eslint-disable no-unused-vars */

import { Product } from '../types/product';

interface ProductService {
  createProduct(product: Product): Promise<Product>;
  getProduct(sn: string): Promise<Product>;
  listProduct(): Promise<Product[]>;
  updateProduct(product: Product): Promise<Product>;
}

export default ProductService;
