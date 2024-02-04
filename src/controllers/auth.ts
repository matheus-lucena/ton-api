import { NextFunction, Request, Response } from 'express';

import { STATUS_BAD_REQUEST, STATUS_CONFLICT, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_UNAUTHORIZED } from '../config/http';
import { HttpResult } from '../utils/http';
import {
  AUTH_USER_FAILURE_CREATE,
  AUTH_USER_PASSWORD_NOT_MEET_REQUIREMENTS,
  AUTH_USER_EXIST,
  AUTH_USER_WRONT_LOGIN,
  AUTH_USER_CREATED_SUCCESSFULL,
  AUTH_USER_INFO,
  AUTH_USER_NOT_EXIST,
} from '../config/messages';
import CognitoService from '../services/impl/cognito';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';

const PASSWORD_REGEX = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

const TEST_EMAIL = 'teste10@teste.com';
const TEST_PASSWORD = 'teste2@dD';

export async function register(req: Request, res: Response) {
  const cognitoService = new CognitoService();
  const user = await cognitoService.getUser(TEST_EMAIL);
  if (user) {
    return res.status(STATUS_CONFLICT).json(new HttpResult(AUTH_USER_EXIST, {}));
  }
  if (!PASSWORD_REGEX.test(TEST_PASSWORD)) {
    return res.status(STATUS_BAD_REQUEST).json(new HttpResult(AUTH_USER_PASSWORD_NOT_MEET_REQUIREMENTS, {}));
  }

  let create_result;

  try {
    create_result = await cognitoService.createUser(TEST_EMAIL);
  } catch (e) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json(new HttpResult(AUTH_USER_FAILURE_CREATE, {}));
  }

  if (create_result.User && create_result.User.Username) {
    await cognitoService.setUserPassword(create_result.User.Username, TEST_PASSWORD);
    return res.json(new HttpResult(AUTH_USER_CREATED_SUCCESSFULL, {}));
  }
}

export async function login(req: Request, res: Response) {
  const cognitoService = new CognitoService();
  const user = await cognitoService.getUser(TEST_EMAIL);
  if (!user) {
    return res.status(STATUS_NOT_FOUND).json({
      message: AUTH_USER_NOT_EXIST,
    });
  }
  const result: AuthenticationResultType | undefined = await cognitoService.login(TEST_EMAIL, TEST_PASSWORD);

  if (result) {
    return res.json({
      access_token: result.AccessToken,
      refresh_token: result.RefreshToken,
      expires_in: result.ExpiresIn,
    });
  } else {
    return res.status(STATUS_UNAUTHORIZED).json(new HttpResult(AUTH_USER_WRONT_LOGIN, {}));
  }
}

export async function getInfo(req: Request, res: Response) {
  const cognitoService = new CognitoService();
  const user = await cognitoService.getUser(TEST_EMAIL);
  return res.json(new HttpResult(AUTH_USER_INFO, user));
}
