/* eslint-disable no-unused-vars */

import { Product, ProductUpdate } from '../types/model/product';

interface ProductService {
  createProduct(product: Product): Promise<Product | undefined>;
  getProduct(sn: string): Promise<Product | undefined>;
  listProduct(): Promise<Product[]>;
  updateProduct(sn: string, product: ProductUpdate): Promise<Product | undefined>;
}

export default ProductService;
