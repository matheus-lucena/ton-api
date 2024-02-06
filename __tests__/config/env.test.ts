import { describe, it, expect } from '@jest/globals';

import {
  APP_PORT,
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_USER_POOL_ID,
  COGNITO_SECRET,
  DYNAMODB_PRODUCTS_TABLE,
  DYNAMODB_HISTORY_TABLE,
  DYNAMODB_PRODUCTS_ACTIVE_GSI,
} from '../../src/config/app';

describe('config.app.env', () => {
  it('test env', async () => {
    expect(APP_PORT).toEqual('5005');
    expect(AWS_REGION).toEqual('region');
    expect(COGNITO_CLIENT_ID).toEqual('client_id');
    expect(COGNITO_USER_POOL_ID).toEqual('user_pool');
    expect(COGNITO_SECRET).toEqual('secret');
    expect(DYNAMODB_PRODUCTS_TABLE).toEqual('table_products');
    expect(DYNAMODB_HISTORY_TABLE).toEqual('table_history');
    expect(DYNAMODB_PRODUCTS_ACTIVE_GSI).toEqual('gsi_active');
  });
});
