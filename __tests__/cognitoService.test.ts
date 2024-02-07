import { describe, it } from '@jest/globals';
import CognitoServiceImpl from '../src/services/impl/cognito';
import { mockClient } from 'aws-sdk-client-mock';
import {
  AdminInitiateAuthCommand,
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { AuthenticationResult, CreateUser, GetUser, UserPassword } from './mocks/auth';
const userPoolMock = mockClient(CognitoIdentityProviderClient);

const cognitoServiceImpl = new CognitoServiceImpl();

describe('CognitoServiceImpl', () => {
  beforeEach(async () => {
    userPoolMock.reset();
    userPoolMock.onAnyCommand().resolves({});
  });

  it('validLogin', async () => {
    userPoolMock.on(AdminInitiateAuthCommand).resolves({ AuthenticationResult });
    const result = await cognitoServiceImpl.login('teste', 'teste');
    expect(result).toStrictEqual(AuthenticationResult);
  });

  it('validGetUser', async () => {
    userPoolMock.on(AdminGetUserCommand).resolves(GetUser);
    const result = await cognitoServiceImpl.getUser('teste');
    expect(result).toStrictEqual(GetUser);
  });

  it('validSetUserPassword', async () => {
    userPoolMock.on(AdminSetUserPasswordCommand).resolves(UserPassword);
    const result = await cognitoServiceImpl.setUserPassword('teste', 'teste');
    expect(result).toStrictEqual(UserPassword);
  });

  it('validCreateUser', async () => {
    userPoolMock.on(AdminCreateUserCommand).resolves(CreateUser);
    const result = await cognitoServiceImpl.createUser('teste', 'teste', 'testee');
    expect(result).toStrictEqual(CreateUser);
  });

  it('invalidCreateUser', async () => {
    userPoolMock.on(AdminCreateUserCommand).resolves({});
    const result = await cognitoServiceImpl.setUserPassword('teste', 'teste');
    expect(result).toEqual({});
  });

  it('invalidSetUserPassword', async () => {
    userPoolMock.on(AdminSetUserPasswordCommand).resolves({});
    const result = await cognitoServiceImpl.setUserPassword('teste', 'teste');
    expect(result).toEqual({});
  });

  it('invalidGetUser', async () => {
    userPoolMock.on(AdminGetUserCommand).resolves({});
    const result = await cognitoServiceImpl.getUser('teste');
    expect(result).toEqual({});
  });

  it('invalidLogin', async () => {
    userPoolMock.on(AdminInitiateAuthCommand).resolves({});
    const result = await cognitoServiceImpl.login('teste', 'teste');
    expect(result).toBeUndefined();
  });
});
