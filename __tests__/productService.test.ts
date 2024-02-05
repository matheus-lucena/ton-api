import { describe, it, expect, beforeEach } from '@jest/globals';

import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import ProductServiceImpl from '../src/services/impl/product';
import { Product } from '../src/types/model/product';
import { LIST_MOCK_PRODUCT, MOCK_PRODUCT, MOCK_UPDATE_PRODUCT } from './mocks/product';

const ddbMock = mockClient(DynamoDBDocumentClient);
const productServiceImpl = new ProductServiceImpl();

describe('productServiceImpl', () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it('validGetProduct', async () => {
    ddbMock.on(GetCommand).resolves({
      Item: MOCK_PRODUCT,
    });
    const dbProduct: Product | undefined = await productServiceImpl.getProduct(MOCK_PRODUCT.sn);
    expect(dbProduct?.name).toStrictEqual(MOCK_PRODUCT.name);
    expect(dbProduct?.sn).toStrictEqual(MOCK_PRODUCT.sn);
  });

  it('validListProducts', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: LIST_MOCK_PRODUCT,
    });
    const dbProducts: Product[] = await productServiceImpl.listProduct();
    expect(dbProducts).toHaveLength(LIST_MOCK_PRODUCT.length);
    expect(dbProducts[1].value).toStrictEqual(LIST_MOCK_PRODUCT[1].value);
    expect(dbProducts[0].name).toStrictEqual(LIST_MOCK_PRODUCT[0].name);
  });

  it('validCreateProduct', async () => {
    ddbMock.on(GetCommand).resolves({
      Item: MOCK_PRODUCT,
    });
    const dbProduct: Product | undefined = await productServiceImpl.createProduct(MOCK_PRODUCT);
    expect(dbProduct).toEqual(MOCK_PRODUCT);
  });

  it('validUpdateProduct', async () => {
    ddbMock.on(GetCommand).resolves({
      Item: MOCK_UPDATE_PRODUCT,
    });
    const dbProduct: Product | undefined = await productServiceImpl.updateProduct(MOCK_UPDATE_PRODUCT);
    expect(dbProduct).toEqual(MOCK_UPDATE_PRODUCT);
  });

  it('undefiniedGetProduct', async () => {
    ddbMock.on(GetCommand).resolves({});
    const dbProduct: Product | undefined = await productServiceImpl.getProduct(MOCK_PRODUCT.sn);
    expect(dbProduct).toBeUndefined();
  });

  it('undefiniedCreateProduct', async () => {
    ddbMock.on(GetCommand).resolves({});
    const dbProduct: Product | undefined = await productServiceImpl.createProduct(MOCK_PRODUCT);
    expect(dbProduct).toBeUndefined();
  });

  it('undefiniedUpdateProduct', async () => {
    ddbMock.on(GetCommand).resolves({});
    const dbProduct: Product | undefined = await productServiceImpl.updateProduct(MOCK_PRODUCT);
    expect(dbProduct).toBeUndefined();
  });

  it('emptyListProduct', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    const dbProducts: Product[] = await productServiceImpl.listProduct();
    expect(dbProducts).toHaveLength(0);
  });

  it('undefiniedListProduct', async () => {
    ddbMock.on(QueryCommand).resolves({});
    const dbProducts: Product[] = await productServiceImpl.listProduct();
    expect(dbProducts).toEqual(undefined);
  });
});
