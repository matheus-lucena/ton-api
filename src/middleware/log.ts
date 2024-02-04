import { Request, Response, NextFunction } from 'express';

export function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('logErrors');
  console.error(err.stack);
  next(err);
}
