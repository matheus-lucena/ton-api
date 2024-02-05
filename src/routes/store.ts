import express, { Request, Response } from 'express';
import { list, buy } from '../controllers/store';
import { wrapFunction } from '../utils/wrapError';

export const router = express.Router();

router.get(
  '/',
  wrapFunction(async (req: Request, res: Response) => list(req, res)),
);
router.post(
  '/',
  wrapFunction(async (req: Request, res: Response) => buy(req, res)),
);
