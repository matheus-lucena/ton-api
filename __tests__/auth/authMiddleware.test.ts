import { describe, it, expect } from '@jest/globals';
import AuthMiddleware from '../../src/middleware/auth';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';
import JwtServiceImpl from '../../src/services/impl/jwt';
import { when } from 'jest-when';
import { getUserId } from '../../src/utils/user';

jest.mock('aws-jwt-verify', () => {
  return {
    CognitoJwtVerifier: { create: jest.fn() },
  };
});

const jwtServiceImpl = new JwtServiceImpl();

const authMiddleware = new AuthMiddleware(jwtServiceImpl);

const { isAuthorized } = authMiddleware;

describe('middleware-auth', () => {
  it('401WithoutHeader', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/teste',
    });
    const response = httpMocks.createResponse();
    const next = sinon.spy();
    const result = await isAuthorized(request, response, next);
    expect(result?.statusCode).toEqual(401);
  });

  it('401WithHeader', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/teste',
      headers: {
        authorization: 'Bearer teste',
      },
    });
    const response = httpMocks.createResponse();
    const next = sinon.spy();
    const result = await isAuthorized(request, response, next);
    expect(result?.statusCode).toEqual(401);
  });

  it('200Authenticated', async () => {
    const token = 'Bearer teste';
    const user = 'testeUser';

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/teste',
      headers: {
        authorization: token,
      },
    });
    const response = httpMocks.createResponse();
    const next = sinon.spy();

    const spyValidate = jest.spyOn(jwtServiceImpl, 'validate');
    when(spyValidate).calledWith(token).mockResolvedValue(user);
    await isAuthorized(request, response, next);
    expect(response.statusCode).toEqual(200);
    expect(getUserId(response)).toEqual(user);
  });
});
