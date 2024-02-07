import { Request, Response } from 'express';

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
  GENERIC_INVALID_FIELDS,
} from '../config/messages';
import CognitoService from '../services/impl/cognito';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { UserRegisterRequestRule, UserRequestBody, UserLoginRequestRule } from '../types/request/auth';
import { TypedRequestBody } from '../types/request';
import { getUserId } from '../utils/user';
import { make } from 'simple-body-validator';

const PASSWORD_REGEX = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

export async function register(req: TypedRequestBody<UserRequestBody>, res: Response) {
  const validator = make(req.body, UserRegisterRequestRule);
  if (!validator.validate()) {
    return res.status(STATUS_BAD_REQUEST).json(new HttpResult(GENERIC_INVALID_FIELDS, undefined, validator.errors().all()));
  }
  const { email, password, name, family_name } = req.body;
  const cognitoService = new CognitoService();
  const user = await cognitoService.getUser(email);
  if (user) {
    return res.status(STATUS_CONFLICT).json(new HttpResult(AUTH_USER_EXIST, {}));
  }
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(STATUS_BAD_REQUEST).json(new HttpResult(AUTH_USER_PASSWORD_NOT_MEET_REQUIREMENTS, {}));
  }

  let create_result;

  try {
    create_result = await cognitoService.createUser(email, name, family_name);
  } catch (e) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json(new HttpResult(AUTH_USER_FAILURE_CREATE, {}));
  }

  if (create_result.User && create_result.User.Username) {
    await cognitoService.setUserPassword(create_result.User.Username, req.body.password);
    return res.json(new HttpResult(AUTH_USER_CREATED_SUCCESSFULL, {}));
  }
}

export async function login(req: TypedRequestBody<UserRequestBody>, res: Response) {
  const validator = make(req.body, UserLoginRequestRule);
  if (!validator.validate()) {
    return res.status(STATUS_BAD_REQUEST).json(new HttpResult(GENERIC_INVALID_FIELDS, undefined, validator.errors().all()));
  }
  const { email, password } = req.body;
  const cognitoService = new CognitoService();
  const user = await cognitoService.getUser(req.body.email);
  if (!user) {
    return res.status(STATUS_NOT_FOUND).json({
      message: AUTH_USER_NOT_EXIST,
    });
  }
  const result: AuthenticationResultType | undefined = await cognitoService.login(email, password);

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
  const user = await cognitoService.getUser(getUserId(res));
  return res.json(new HttpResult(AUTH_USER_INFO, user));
}
