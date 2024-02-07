/* eslint-disable no-unused-vars */
import { agent } from 'supertest';
import { app } from '../../src/app';
import { Request, NextFunction } from 'express';
import { STATUS_INTERNAL_SERVER_ERROR } from '../../src/config/http';
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

jest.mock('../../src/services/impl/cognito', () => {
  return jest.fn().mockImplementation(() => ({
    createUser: jest.fn((email: string) => {
      throw new Error('teste');
    }),
    getUser: jest.fn((email: string) => undefined),
  }));
});

describe('/auth', function () {
  it('registerUser', async () => {
    await appAgent
      .post('/auth')
      .set({
        Accept: 'application/json',
      })
      .send({
        email: 'teste2@teste.com',
        password: 'teste@123dD',
      })
      .expect(STATUS_INTERNAL_SERVER_ERROR);
  });
});
