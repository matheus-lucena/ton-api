import { Request, Response, NextFunction } from 'express';
import { STATUS_INTERNAL_SERVER_ERROR } from '../config/http';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('errorHandler');
  res.status(STATUS_INTERNAL_SERVER_ERROR);
  res.render('error', { error: err });
}
