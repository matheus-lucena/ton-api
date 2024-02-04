import { Response } from 'express';

export function getUserId(res: Response): string {
  return res.locals.userId;
}
