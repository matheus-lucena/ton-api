import { Request, Response, NextFunction } from 'express';
import { STATUS_INTERNAL_SERVER_ERROR } from '../config/http';
import { GENERIC_ERROR } from '../config/messages';

export function clientErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('clientErrorHandler');
  if (req.xhr) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).send({ error: GENERIC_ERROR });
  } else {
    next(err);
  }
}
