import { Request, Response, NextFunction } from 'express';
import { HttpResult } from '../utils/http';
import { STATUS_UNAUTHORIZED } from '../config/http';
import { AUTH_USER_TOKEN_MISSING, AUTH_USER_TOKEN_UNAUTHORIZED } from '../config/messages';
import JwtServiceImpl from '../services/impl/jwt';

export const isAuthorized = async function (req: Request, res: Response, next: NextFunction) {
  !req.headers.authorization && res.status(STATUS_UNAUTHORIZED).json(new HttpResult(AUTH_USER_TOKEN_MISSING, {}));
  const userId: string | undefined = await new JwtServiceImpl().validate(req.headers.authorization);
  if (userId) {
    res.locals.userId = userId;
    next();
  } else {
    res.status(STATUS_UNAUTHORIZED).send(new HttpResult(AUTH_USER_TOKEN_UNAUTHORIZED, {}));
  }
};
