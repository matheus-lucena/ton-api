import { describe, it, expect } from '@jest/globals';
import { when } from 'jest-when';

import JwtServiceImpl from '../src/services/impl/jwt';

const jwtServiceImpl = new JwtServiceImpl();

jest.mock('aws-jwt-verify', () => {
  return {
    CognitoJwtVerifier: { create: jest.fn() },
  };
});

describe('JwtServiceImpl', () => {
  it('invalidTokenValidate', async () => {
    const token = 'Bearer ajskdj12hjiasndkadaksndsa';
    const spyValidate = jest.spyOn(jwtServiceImpl, 'validate');
    when(spyValidate).calledWith(token).mockResolvedValue(undefined);
    const response: string | undefined = await jwtServiceImpl.validate(token);
    expect(response).toBeUndefined();
  });

  it('validTokenValidate', async () => {
    const token = 'Bearer ajskdj12hjiasndkadaksndsa';
    const user = 'testeUser';
    const spyValidate = jest.spyOn(jwtServiceImpl, 'validate');
    when(spyValidate).calledWith(token).mockResolvedValue(user);
    const response: string | undefined = await jwtServiceImpl.validate(token);
    expect(response).toStrictEqual(user);
  });

  it('withoutToken', async () => {
    const token = undefined;
    const spyValidate = jest.spyOn(jwtServiceImpl, 'validate');
    when(spyValidate).calledWith(token);
    const response: string | undefined = await jwtServiceImpl.validate(token);
    expect(response).toBeUndefined();
  });
});
