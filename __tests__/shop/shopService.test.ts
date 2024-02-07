import { describe, it, expect, beforeEach } from '@jest/globals';

import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import ShopServiceImpl from '../../src/services/impl/shop';
import { ShopRequest } from '../../src/types/request/shop';
import { MOCK_INPUT_SHOP, MOCK_RESPONSE_SHOP } from '../mocks/shop';
import { LIST_MOCK_PRODUCT } from '../mocks/product';

const ddbMock = mockClient(DynamoDBDocumentClient);
const shopServiceImpl = new ShopServiceImpl('testeUser');

describe('shopServiceImpl', () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it('validGetShop', async () => {
    ddbMock.on(GetCommand).resolves({
      Item: MOCK_RESPONSE_SHOP,
    });
    const dbShop: ShopRequest | undefined = await shopServiceImpl.getShop(MOCK_RESPONSE_SHOP?.id ? MOCK_RESPONSE_SHOP.id : '');
    expect(dbShop?.total).toStrictEqual(MOCK_RESPONSE_SHOP.total);
    expect(dbShop).toStrictEqual(MOCK_RESPONSE_SHOP);
  });

  it('validListProducts', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [MOCK_RESPONSE_SHOP],
    });
    const dbShops: ShopRequest[] = await shopServiceImpl.listShop();
    expect(dbShops).toHaveLength(1);
    expect(dbShops).toStrictEqual([MOCK_RESPONSE_SHOP]);
  });

  it('validCreateShop', async () => {
    ddbMock.on(GetCommand).resolves({
      Item: MOCK_RESPONSE_SHOP,
    });
    ddbMock.on(QueryCommand).resolves({
      Items: LIST_MOCK_PRODUCT,
    });
    const dbShop: ShopRequest | undefined = await shopServiceImpl.buy(MOCK_INPUT_SHOP);
    expect(dbShop).toEqual(MOCK_RESPONSE_SHOP);
  });
});
