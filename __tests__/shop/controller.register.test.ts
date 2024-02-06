import { describe, it } from '@jest/globals';
import { MOCK_INPUT_SHOP, MOCK_RESPONSE_SHOP } from '../mocks/shop';

import { agent } from 'supertest';
import { app } from '../../src';
import { Request, NextFunction } from 'express';
import { STATUS_BAD_REQUEST } from '../../src/config/http';
import { ShopRequest } from '../../src/types/request/shop';

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

jest.mock('../../src/services/impl/shop', () => {
  return jest.fn().mockImplementation(() => ({
    // eslint-disable-next-line no-unused-vars
    buy: jest.fn((_shop: ShopRequest) => MOCK_RESPONSE_SHOP),
    // eslint-disable-next-line no-unused-vars
    listShop: jest.fn(() => [MOCK_RESPONSE_SHOP]),
    // eslint-disable-next-line no-unused-vars
    getShop: jest.fn((_id: string) => MOCK_RESPONSE_SHOP),
  }));
});

describe('shopController', () => {
  it('buy', async () => {
    const token = 'Bearer teste';
    await appAgent
      .post('/shop')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .send(MOCK_INPUT_SHOP)
      .expect(res => {
        expect(res.body.data).toEqual(MOCK_RESPONSE_SHOP);
      })
      .expect(200);
  });

  it('badRequestBuy', async () => {
    const token = 'Bearer teste';
    await appAgent
      .post('/shop')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .send({})
      .expect(STATUS_BAD_REQUEST);
  });

  it('list', async () => {
    const token = 'Bearer teste';
    await appAgent
      .get('/shop')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .expect(res => {
        expect(res.body.data).toEqual([MOCK_RESPONSE_SHOP]);
      })
      .expect(200);
  });
});
