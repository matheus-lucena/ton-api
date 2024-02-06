import { Request, Response, NextFunction } from 'express';
import { STATUS_INTERNAL_SERVER_ERROR } from '../config/http';
import { GENERIC_ERROR } from '../config/messages';
import { HttpResult } from '../utils/http';

// eslint-disable-next-line no-unused-vars
export const errorResponder = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.header('Content-Type', 'application/json');

  const status = err.statusCode || STATUS_INTERNAL_SERVER_ERROR;
  res.status(status).json(new HttpResult(GENERIC_ERROR, {}));
};

export const errorLogger = async function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(`error ${err.message}`);
  next(err);
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} url:: ${req.url}`);
  next();
};
