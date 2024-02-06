import { describe, it, expect, beforeEach } from '@jest/globals';
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
    listProduct: jest.fn(() => []),
    // eslint-disable-next-line no-unused-vars
    getProduct: jest.fn((_sn: string) => undefined),
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
        expect(res.body.data).toEqual([]);
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
        expect(res.body.data).toEqual(undefined);
      })
      .expect(404);
  });
});
