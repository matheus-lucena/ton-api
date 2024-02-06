import { Request, Response } from 'express';
import ShopServiceImpl from '../services/impl/shop';
import { HttpResult } from '../utils/http';
import { GENERIC_INVALID_FIELDS, GENERIC_SUCCESS } from '../config/messages';
import { ShopRequest, ShopRequestRule } from '../types/request/shop';
import { STATUS_BAD_REQUEST } from '../config/http';
import { TypedRequestBody } from '../types/request';
import { make } from 'simple-body-validator';
import { getUserId } from '../utils/user';

export async function list(req: Request, res: Response) {
  const shopServiceImpl = new ShopServiceImpl(getUserId(res));
  return res.json(new HttpResult(GENERIC_SUCCESS, await shopServiceImpl.listShop()));
}

export async function buy(req: TypedRequestBody<ShopRequest>, res: Response) {
  const validator = make(req.body, ShopRequestRule);
  if (!validator.validate() || !req.body.products || req.body.products.length == 0) {
    return res.status(STATUS_BAD_REQUEST).json(new HttpResult(GENERIC_INVALID_FIELDS, undefined, validator.errors().all()));
  }
  const shopServiceImpl = new ShopServiceImpl(getUserId(res));
  res.json(new HttpResult(GENERIC_SUCCESS, await shopServiceImpl.buy(req.body)));
}
