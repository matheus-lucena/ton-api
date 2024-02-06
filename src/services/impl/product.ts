import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Product } from '../../types/model/product';
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
      Item: {
        ...product,
        active: String(product.active),
      },
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
      KeyConditionExpression: `active = :value`,
      ExpressionAttributeValues: {
        ':value': 'true',
      },
    });
    return (await this.client.send(command)).Items as Product[];
  }

  async updateProduct(product: Product): Promise<Product | undefined> {
    const { sn } = product;
    const currentItem = await this.getProduct(sn);
    const newItem = {
      ...currentItem,
      ...product,
      active: String(product.active),
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
