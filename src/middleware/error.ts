import { Request, Response, NextFunction } from 'express';
import { STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from '../config/http';
import { GENERIC_ERROR, GENERIC_PATH_NOT_FOUND } from '../config/messages';
import { HttpResult } from '../utils/http';

// Error object used in error handling middleware function
class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

// eslint-disable-next-line no-unused-vars
export const errorResponder = (err: AppError, req: Request, res: Response, next: NextFunction) => {
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

// eslint-disable-next-line no-unused-vars
export const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(STATUS_NOT_FOUND).json(new HttpResult(GENERIC_PATH_NOT_FOUND, {}));
};
