import { Request, Response } from 'express';
import { HttpResult } from '../utils/http';
import { GENERIC_SUCCESS } from '../config/messages';
import StoreServiceImpl from '../services/impl/store';
import { Store } from '../types/model/store';

export async function list(req: Request, res: Response) {
  const storeServiceImpl = new StoreServiceImpl();
  return res.json(new HttpResult(GENERIC_SUCCESS, storeServiceImpl.listHistory()));
}

export async function buy(req: Request, res: Response) {
  const storeServiceImpl = new StoreServiceImpl();
  const store: Store = {
    products: [
      {
        name: 'teste',
        count: 2,
        image_url: 'https://',
        sn: '19238192',
        value: 23.0,
        active: true,
      },
    ],
    value: 46.0,
    date: Date.now().toString(),
  };
  res.json(new HttpResult(GENERIC_SUCCESS, storeServiceImpl.buy(store)));
}
