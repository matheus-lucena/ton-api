import express, { Request, Response } from 'express';
import { list, buy } from '../controllers/shop';
import { wrapFunction } from '../utils/wrapError';
import { ShopRequest } from '../types/request/shop';
import { TypedRequestBody } from '../types/request';

export const router = express.Router();

router.get(
  '/',
  wrapFunction(async (req: Request, res: Response) => list(req, res)),
);

router.post(
  '/',
  wrapFunction(async (req: TypedRequestBody<ShopRequest>, res: Response) => buy(req, res)),
);
