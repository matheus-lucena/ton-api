import express, { Request, Response } from 'express';
import { register, getInfo, list, update } from '../controllers/products';
import { wrapFunction } from '../utils/wrapError';
import { ProducSn, ProductRequest } from '../types/request/products';
import { TypedRequestBody } from '../types/request';

export const router = express.Router();

router.get(
  '/',
  wrapFunction(async (req: Request, res: Response) => list(req, res)),
);
router.get(
  '/:sn',
  wrapFunction(async (req: Request<ProducSn>, res: Response) => getInfo(req, res)),
);
router.post(
  '/',
  wrapFunction(async (req: TypedRequestBody<ProductRequest>, res: Response) => register(req, res)),
);

router.put(
  '/',
  wrapFunction(async (req: TypedRequestBody<ProductRequest>, res: Response) => update(req, res)),
);
