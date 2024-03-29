import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DYNAMODB_SHOP_TABLE, DYNAMODB_SHOP_TABLE_CLIENT_GSI } from '../../config/app';
import { getDynamodbClient } from '../../utils/dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import ShopService from '../shop';
import { ShopRequest } from '../../types/request/shop';
import { randomUUID } from 'crypto';
import ProductServiceImpl from './product';

//AWS.DynamoDB.Converter.marshall({})

class ShopServiceImpl implements ShopService {
  client: DynamoDBDocumentClient;
  client_id: string;
  constructor(client_id: string) {
    this.client_id = client_id;
    this.client = getDynamodbClient(new DynamoDBClient());
  }

  async getShop(id: string): Promise<ShopRequest | undefined> {
    const command = new GetCommand({
      TableName: DYNAMODB_SHOP_TABLE,
      Key: {
        id,
      },
    });
    return (await this.client.send(command)).Item as ShopRequest | undefined;
  }

  async buy(shop: ShopRequest): Promise<ShopRequest | undefined> {
    const productServiceImpl = new ProductServiceImpl();
    const dbProducts = await productServiceImpl.listProduct();

    const total = shop.products
      .map(prod => {
        const dbPdt = dbProducts.find(dbPdt => dbPdt.sn == prod.sn);
        if (dbPdt && dbPdt.active) {
          prod.value = dbPdt.value;
          return dbPdt.value * prod.count;
        }
        prod.count = 0;
        return 0;
      })
      .reduce((_total, preco) => _total + preco);

    const id = randomUUID();
    const command = new PutCommand({
      TableName: DYNAMODB_SHOP_TABLE,
      Item: {
        ...shop,
        client_id: this.client_id,
        id,
        total: total,
        date: Date.now(),
      },
    });
    await this.client.send(command);
    return this.getShop(id);
  }
  async listShop(): Promise<ShopRequest[]> {
    const command = new QueryCommand({
      TableName: DYNAMODB_SHOP_TABLE,
      IndexName: DYNAMODB_SHOP_TABLE_CLIENT_GSI,
      KeyConditionExpression: `client_id = :value`,
      ExpressionAttributeValues: {
        ':value': this.client_id,
      },
    });
    return (await this.client.send(command))?.Items as ShopRequest[];
  }
}

export default ShopServiceImpl;
