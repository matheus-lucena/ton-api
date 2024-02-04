import { Product } from '../../types/product';
import ProductService from '../product';
import { ListTablesCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
const client = new DynamoDBClient({});

class ProductServiceImpl implements ProductService {
  createProduct(product: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  getProduct(sn: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  listProduct(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  updateProduct(product: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
}

export default ProductServiceImpl;
