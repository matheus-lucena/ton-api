/* eslint-disable no-unused-vars */
import { agent } from 'supertest';
import { app } from '../../src/app';
import { Request, NextFunction } from 'express';
import { AuthenticationResult, CreateUser, GetUser, UserPassword } from '../mocks/auth';
import { AUTH_USER_NOT_EXIST, AUTH_USER_TOKEN_UNAUTHORIZED, AUTH_USER_WRONT_LOGIN } from '../../src/config/messages';
import { STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED } from '../../src/config/http';
import { HttpResult } from '../../src/utils/http';

const appAgent = agent(app);

jest.mock('aws-jwt-verify', () => {
  return {
    CognitoJwtVerifier: { create: jest.fn() },
  };
});

jest.mock('../../src/middleware/auth', () => {
  return jest.fn().mockImplementation(() => ({
    isAuthorized: jest.fn((req: Request, res, Response, next: NextFunction) => {
      res.status(STATUS_UNAUTHORIZED).send(new HttpResult(AUTH_USER_TOKEN_UNAUTHORIZED, {}));
    }),
  }));
});

jest.mock('../../src/services/impl/cognito', () => {
  return jest.fn().mockImplementation(() => ({
    login: jest.fn((email: string, password: string) => undefined),
    getUser: jest.fn((email: string) => GetUser),
  }));
});

describe('/auth', function () {
  it('loginUser', done => {
    appAgent
      .post('/auth/login')
      .set({
        Accept: 'application/json',
      })
      .send({ email: 'teste', password: 'teste@sadJD2', name: 'testeee', family_name: 'testee' })
      .expect(STATUS_UNAUTHORIZED)
      .expect(res => {
        expect(res.body.message).toEqual(AUTH_USER_WRONT_LOGIN);
      })
      .end(done);
  });
});
