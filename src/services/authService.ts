/* eslint-disable no-unused-vars */

import {
  AdminCreateUserCommandOutput,
  AdminSetUserPasswordCommandOutput,
  AdminGetUserCommandOutput,
  AuthenticationResultType,
} from '@aws-sdk/client-cognito-identity-provider';

interface AuthService {
  createUser(email: string): Promise<AdminCreateUserCommandOutput>;
  setUserPassword(username: string, password: string): Promise<AdminSetUserPasswordCommandOutput>;
  getUser(username: string): Promise<AdminGetUserCommandOutput | undefined>;
  login(username: string, password: string): Promise<AuthenticationResultType | undefined>;
}

export default AuthService;
