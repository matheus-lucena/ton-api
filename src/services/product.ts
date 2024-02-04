/* eslint-disable no-unused-vars */

import { Product, ProductUpdate } from '../types/model/product';

interface ProductService {
  createProduct(product: Product): Product;
  getProduct(sn: string): Product;
  listProduct(): Product[];
  updateProduct(sn: string, product: ProductUpdate): Product;
}

export default ProductService;
