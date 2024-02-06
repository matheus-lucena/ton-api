import { describe, it } from '@jest/globals';
import { MOCK_PRODUCT } from '../mocks/product';

import { agent } from 'supertest';
import { app } from '../../src';
import { Request, NextFunction } from 'express';
import { Product } from '../../src/types/model/product';
import { STATUS_CONFLICT } from '../../src/config/http';

const appAgent = agent(app);

jest.mock('aws-jwt-verify', () => {
  return {
    CognitoJwtVerifier: { create: jest.fn() },
  };
});

jest.mock('../../src/middleware/auth', () => {
  return jest.fn().mockImplementation(() => ({
    isAuthorized: jest.fn((_req: Request, res, _Response, next: NextFunction) => {
      res.locals.userId = 'testeId';
      next();
    }),
  }));
});

jest.mock('../../src/services/impl/product', () => {
  return jest.fn().mockImplementation(() => ({
    // eslint-disable-next-line no-unused-vars
    getProduct: jest.fn((_sn: string) => MOCK_PRODUCT),
    // eslint-disable-next-line no-unused-vars
    createProduct: jest.fn((_product: Product) => MOCK_PRODUCT),
    // eslint-disable-next-line no-unused-vars
    updateProduct: jest.fn((_product: Product) => MOCK_PRODUCT),
  }));
});

describe('productControllerRegister', () => {
  it('postExist', async () => {
    const token = 'Bearer teste';
    await appAgent
      .post('/products')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .send({
        ...MOCK_PRODUCT,
        sn: '132890183089jsad',
      })
      .expect(STATUS_CONFLICT);
  });
  it('put', async () => {
    const token = 'Bearer teste';
    return await appAgent
      .put('/products')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .send({
        ...MOCK_PRODUCT,
        sn: 'ak812jiasjd89jsad',
      })
      .expect(200);
  });
});
