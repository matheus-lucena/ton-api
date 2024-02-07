import { describe, it } from '@jest/globals';
import { MOCK_PRODUCT } from '../mocks/product';

import { agent } from 'supertest';
import { app } from '../../src/app';
import { Request, NextFunction } from 'express';
import { Product } from '../../src/types/model/product';
import { STATUS_BAD_REQUEST, STATUS_NOT_FOUND } from '../../src/config/http';

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
    getProduct: jest.fn((_sn: string) => undefined),
    // eslint-disable-next-line no-unused-vars
    createProduct: jest.fn((_product: Product) => MOCK_PRODUCT),
    // eslint-disable-next-line no-unused-vars
    updateProduct: jest.fn((_product: Product) => MOCK_PRODUCT),
  }));
});

describe('productControllerRegister', () => {
  it('post', async () => {
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
      .expect(200);
  });

  it('postNoValid', async () => {
    const token = 'Bearer teste';
    await appAgent
      .post('/products')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .send(MOCK_PRODUCT)
      .expect(STATUS_BAD_REQUEST);
  });
  it('putNoExist', async () => {
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
      .expect(STATUS_NOT_FOUND);
  });
  it('putNoValid', async () => {
    const token = 'Bearer teste';
    return await appAgent
      .put('/products')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .send({
        ...MOCK_PRODUCT,
      })
      .expect(STATUS_BAD_REQUEST);
  });
});
