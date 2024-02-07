import { describe, it } from '@jest/globals';
import { agent } from 'supertest';
import listenApp from '../src/local';
import { healthcheck } from '../src/app';

import httpMocks from 'node-mocks-http';

const appAgent = agent(listenApp);

jest.mock('aws-jwt-verify', () => {
  return {
    CognitoJwtVerifier: { create: jest.fn() },
  };
});

describe('Server', () => {
  it('healthcheck', async () => {
    appAgent
      .get('/healthcheck')
      .expect(200)
      .expect(res => {
        expect(res.body.message).toEqual('ok');
      });
  });

  it('healthcheckFunc', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/teste',
    });
    const response = httpMocks.createResponse();
    const result = await healthcheck(request, response);
    expect(result.statusCode).toEqual(200);
  });
});
