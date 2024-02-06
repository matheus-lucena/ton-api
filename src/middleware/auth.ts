import { Request, Response, NextFunction } from 'express';
import { HttpResult } from '../utils/http';
import { STATUS_UNAUTHORIZED } from '../config/http';
import { AUTH_USER_TOKEN_MISSING, AUTH_USER_TOKEN_UNAUTHORIZED } from '../config/messages';
import JwtServiceImpl from '../services/impl/jwt';

class AuthMiddleware {
  jwtServiceImpl;

  constructor(jwtServiceImpl?: JwtServiceImpl) {
    this.jwtServiceImpl = jwtServiceImpl ? jwtServiceImpl : new JwtServiceImpl();
  }

  isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(STATUS_UNAUTHORIZED).json(new HttpResult(AUTH_USER_TOKEN_MISSING, {}));
    }
    const userId: string | undefined = await this.jwtServiceImpl.validate(req.headers.authorization);
    if (userId) {
      res.locals.userId = userId;
      next();
    } else {
      return res.status(STATUS_UNAUTHORIZED).send(new HttpResult(AUTH_USER_TOKEN_UNAUTHORIZED, {}));
    }
  };
}

export default AuthMiddleware;
