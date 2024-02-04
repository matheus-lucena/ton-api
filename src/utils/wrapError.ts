/* eslint-disable no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const wrapFunction: any = (fn: {
  (req: Request<any, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>>;
  (arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, arg1: Response<any, Record<string, any>>, arg2: NextFunction): any;
}) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    let e = null;
    try {
      await fn(req, res, next);
    } catch (err) {
      e = err;
      next(err);
    }

    if (!e) {
      next();
    }
  };
};
