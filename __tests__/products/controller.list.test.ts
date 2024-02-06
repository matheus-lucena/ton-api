import { describe, it, expect } from '@jest/globals';
import { LIST_MOCK_PRODUCT, MOCK_PRODUCT } from '../mocks/product';

import { agent } from 'supertest';
import { app } from '../../src';
import { Request, NextFunction } from 'express';

const appAgent = agent(app);

jest.mock('aws-jwt-verify', () => {
  return {
    CognitoJwtVerifier: { create: jest.fn() },
  };
});

jest.mock('../../src/middleware/auth', () => {
  return jest.fn().mockImplementation(() => ({
    isAuthorized: jest.fn((req: Request, res, Response, next: NextFunction) => {
      res.locals.userId = 'testeId';
      next();
    }),
  }));
});

jest.mock('../../src/services/impl/product', () => {
  return jest.fn().mockImplementation(() => ({
    listProduct: jest.fn(() => LIST_MOCK_PRODUCT),
    // eslint-disable-next-line no-unused-vars
    getProduct: jest.fn((_sn: string) => MOCK_PRODUCT),
  }));
});

describe('productControllerList', () => {
  it('list', async () => {
    const token = 'Bearer teste';
    return await appAgent
      .get('/products')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .expect(res => {
        expect(res.body.data).toEqual(LIST_MOCK_PRODUCT);
      })
      .expect(200);
  });
  it('get', async () => {
    const token = 'Bearer teste';
    return await appAgent
      .get('/products/sn')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .expect(res => {
        expect(res.body.data).toEqual(MOCK_PRODUCT);
      })
      .expect(200);
  });
});
