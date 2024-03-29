/* eslint-disable no-unused-vars */
import { agent } from 'supertest';
import { app } from '../../src/app';
import { Request, NextFunction } from 'express';
import { AuthenticationResult, CreateUser, GetUser, UserPassword } from '../mocks/auth';
import { AUTH_USER_PASSWORD_NOT_MEET_REQUIREMENTS, GENERIC_INVALID_FIELDS } from '../../src/config/messages';
import { STATUS_BAD_REQUEST } from '../../src/config/http';

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
    createUser: jest.fn((email: string, name: string, family_name: string) => CreateUser),
    login: jest.fn((email: string, password: string) => AuthenticationResult),
    setUserPassword: jest.fn((email: string, password: string) => UserPassword),
    getUser: jest.fn((email: string) => GetUser),
  }));
});

describe('/auth', function () {
  it('getUser', done => {
    const token = 'Bearer teste';
    appAgent
      .get('/auth')
      .set({
        Accept: 'application/json',
        Authorization: token,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data).toEqual(GetUser);
      })
      .end(done);
  });

  it('loginUser', done => {
    appAgent
      .post('/auth/login')
      .set({
        Accept: 'application/json',
      })
      .send({ email: 'teste', password: 'tes@dsadas2te' })
      .expect(200)
      .expect(res => {
        expect(res.body.access_token).toEqual(AuthenticationResult.AccessToken);
        expect(res.body.refresh_token).toEqual(AuthenticationResult.RefreshToken);
        expect(res.body.expires_in).toEqual(AuthenticationResult.ExpiresIn);
      })
      .end(done);
  });

  it('loginUserInvalidBody', done => {
    appAgent
      .post('/auth/login')
      .set({
        Accept: 'application/json',
      })
      .send({ email: 'teste', password: 'asd' })
      .expect(STATUS_BAD_REQUEST)
      .expect(res => {
        expect(res.body.message).toEqual(GENERIC_INVALID_FIELDS);
      })
      .end(done);
  });

  it('registerConflictUser', done => {
    appAgent
      .post('/auth')
      .set({
        Accept: 'application/json',
      })
      .send({
        email: 'teste2@teste.com',
        password: 'teste@123dD',
        name: 'testeee',
        family_name: 'testee',
      })
      .end(done)
      .expect(209);
  });
});
