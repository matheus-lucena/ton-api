/* eslint-disable no-unused-vars */
import { agent } from 'supertest';
import { app } from '../../src/app';
import { Request, NextFunction } from 'express';
import { AuthenticationResult, CreateUser, GetUser, UserPassword } from '../mocks/auth';
import { AUTH_USER_NOT_EXIST, AUTH_USER_PASSWORD_NOT_MEET_REQUIREMENTS } from '../../src/config/messages';
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
        name: 'testeee',
        family_name: 'testee',
      })
      .expect(200);
  });
  
  it('invalidPasswordRegisterUser', async () => {
    await appAgent
      .post('/auth')
      .set({
        Accept: 'application/json',
      })
      .send({
        email: 'teste20@teste.com',
        password: 'teste',
      })
      .expect(STATUS_BAD_REQUEST);
  });

  it('loginUser', done => {
    appAgent
      .post('/auth/login')
      .set({
        Accept: 'application/json',
      })
      .send({ email: 'teste', password: 'tes@SD2dte' })
      .expect(404)
      .expect(res => {
        expect(res.body.message).toEqual(AUTH_USER_NOT_EXIST);
      })
      .end(done);
  });

  it('registerUserNotMeetPasswordRequirements', done => {
    appAgent
      .post('/auth')
      .set({
        Accept: 'application/json',
      })
      .send({ email: 'teste', password: 'asdasdasdasd', name: 'testeee', family_name: 'testee', })
      .expect(STATUS_BAD_REQUEST)
      .expect(res => {
        expect(res.body.message).toEqual(AUTH_USER_PASSWORD_NOT_MEET_REQUIREMENTS);
      })
      .end(done);
  });

});
