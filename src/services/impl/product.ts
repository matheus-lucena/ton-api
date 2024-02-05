import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Product, ProductUpdate } from '../../types/model/product';
import ProductService from '../product';
import { DYNAMODB_PRODUCTS_ACTIVE_GSI, DYNAMODB_PRODUCTS_TABLE } from '../../config/app';
import { getDynamodbClient } from '../../utils/dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

//AWS.DynamoDB.Converter.marshall({})

class ProductServiceImpl implements ProductService {
  client: DynamoDBDocumentClient;
  constructor() {
    this.client = getDynamodbClient(new DynamoDBClient());
  }

  async createProduct(product: Product): Promise<Product | undefined> {
    const command = new PutCommand({
      TableName: DYNAMODB_PRODUCTS_TABLE,
      Item: product,
    });
    await this.client.send(command);
    return await this.getProduct(product.sn);
  }

  async getProduct(sn: string): Promise<Product | undefined> {
    const command = new GetCommand({
      TableName: DYNAMODB_PRODUCTS_TABLE,
      Key: {
        sn: sn,
      },
    });
    return (await this.client.send(command)).Item as Product | undefined;
  }

  async listProduct(): Promise<Product[]> {
    const command = new QueryCommand({
      TableName: DYNAMODB_PRODUCTS_TABLE,
      IndexName: DYNAMODB_PRODUCTS_ACTIVE_GSI,
    });
    return (await this.client.send(command)).Items as Product[];

    /*return [
      {
        name: 'T4',
        sn: '90182390189038',
        image_url: 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_48,q_auto/site-ton/maquininhas/new-t3-smart-1',
        value: 80,
      },
      {
        name: 'T3',
        sn: '178293718978',
        image_url: 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_48,q_auto/site-ton/maquininhas/new-t3-1',
        value: 80,
      },
      {
        name: 'T2',
        sn: '218371827389',
        image_url: 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_48,q_auto/site-ton/maquininhas/new-t1-chip-1',
        value: 60,
      },
      {
        name: 'T1',
        sn: '12378123812',
        image_url: 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_48,q_100/site-ton/maquininhas/new-t1-1',
        value: 42.42,
      },
      {
        name: 'T6',
        sn: '938193812',
        image_url: 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_48,q_100/site-ton/maquininhas/new-t1-1',
        value: 42.42,
      },
    ];*/
  }
  async updateProduct(sn: string, product: ProductUpdate): Promise<Product | undefined> {
    const currentItem = await this.getProduct(sn);
    const newItem = {
      ...currentItem,
      ...product,
      sn: sn,
    };
    const command = new PutCommand({
      TableName: DYNAMODB_PRODUCTS_TABLE,
      Item: newItem,
    });

    await this.client.send(command);
    return await this.getProduct(sn);
  }
}

export default ProductServiceImpl;
