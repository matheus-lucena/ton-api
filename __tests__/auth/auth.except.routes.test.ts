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
    getUser: jest.fn((email: string) => {
      throw new Error('teste');
    }),
  }));
});

describe('/auth', function () {
  it('getUser', async () => {
    const token = 'Bearer teste';
    return await appAgent
      .get('/auth')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .expect(STATUS_INTERNAL_SERVER_ERROR);
  });
});
