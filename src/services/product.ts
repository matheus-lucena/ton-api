/* eslint-disable no-unused-vars */

import { Product } from '../types/model/product';

interface ProductService {
  createProduct(product: Product): Promise<Product | undefined>;
  getProduct(sn: string): Promise<Product | undefined>;
  listProduct(): Promise<Product[]>;
  updateProduct(product: Product): Promise<Product | undefined>;
}

export default ProductService;
