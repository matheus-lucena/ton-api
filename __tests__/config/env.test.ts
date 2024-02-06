import { describe, it, expect } from '@jest/globals';

import {
  APP_PORT,
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_USER_POOL_ID,
  COGNITO_SECRET,
  DYNAMODB_PRODUCTS_TABLE,
  DYNAMODB_PRODUCTS_ACTIVE_GSI,
  DYNAMODB_SHOP_TABLE,
  DYNAMODB_SHOP_TABLE_CLIENT_GSI,
} from '../../src/config/app';

describe('config.app.env', () => {
  it('test env', async () => {
    expect(APP_PORT).toEqual('5005');
    expect(AWS_REGION).toEqual('region');
    expect(COGNITO_CLIENT_ID).toEqual('client_id');
    expect(COGNITO_USER_POOL_ID).toEqual('user_pool');
    expect(COGNITO_SECRET).toEqual('secret');
    expect(DYNAMODB_PRODUCTS_TABLE).toEqual('pdts');
    expect(DYNAMODB_PRODUCTS_ACTIVE_GSI).toEqual('active-index');
    expect(DYNAMODB_SHOP_TABLE).toEqual('store-pdts');
    expect(DYNAMODB_SHOP_TABLE_CLIENT_GSI).toEqual('client_id-index');
  });
});
